import styles from './ImgCard.module.scss';
import plusIcon from '../../../assets/plus.svg';
import { useEffect, useRef, useState } from 'react';
import { storage } from '../../../utils/firebase/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';

function ImgCard({
  images,
  path,
  onUploadSuccess
}: {
  images: string[];
  path: string;
  onUploadSuccess: Function;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [filesToShow, setFilesToShow] = useState<any>([]);
  // const [allDone, setAllDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event) {
    const files = Array.from(event.target.files).map((file: any) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      uploadPercent: 0,
      imageUrl: ''
    }));
    setFiles(event.target.files);
    setFilesToShow(files);
  }

  const updateUploadProgress = (percent, index) => {
    setFilesToShow((files) => {
      return files.map((file, j) => {
        return {
          ...file,
          ...(index === j) ? { uploadPercent: percent } : {}
        }
      })
    })
  }

  const updateImageUrl = (url, index) => {
    setFilesToShow((files) => {
      return files.map((file, j) => {
        return {
          ...file,
          ...(index === j) ? { imageUrl: url } : {}
        }
      })
    })
  }

  const checkIfAllComplete = () => {
    let allDone = true;
    for (let i = 0; i < filesToShow?.length; i++) {
      if (filesToShow[i].uploadPercent !== 100 || !filesToShow[i].imageUrl) {
        allDone = false;
        break;
      }
    }
    if (allDone) {
      // setAllDone(true);
      setFilesToShow([]);
      onUploadSuccess(filesToShow);
      setFiles([]);
    }
  }

  useEffect(() => {
    if (files?.length) {
      handleUpload()
    }
  }, [files])

  useEffect(() => {
    if (filesToShow?.length) {
      checkIfAllComplete();
    }
  }, [filesToShow]);

  const onImgCardClick = () => {
    if (!path) return toast.error('Please enter the style code first');
    inputRef.current?.click?.()
  }

  const handleUpload = () => {
    Array.from(files)?.forEach((file, index) => {
      const storageRef = ref(storage, `/styleimgs/${path}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          updateUploadProgress(percent, index);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            updateImageUrl(url, index);
            console.log(url);
          });
        }
      );
    })

  };

  const getProgress = (percent) => {
    return (
      <div className={styles.ProgressContainer} style={{ visibility: (percent === null || percent === 100) ? 'hidden' : 'visible' }}>
        <div className={styles.ProgressBar} style={{ width: `${percent}%` }}></div>
      </div>
    )
  }

  return (
    <div className={styles.Images}>

      {!!images?.length && images?.map((file, i) => (
        <div key={`${file}-${i}`}>
          <div className={styles.ImgCard}>
            <img src={file || ''} alt="" width='100%' />
          </div>
          {getProgress(null)}
        </div>
      ))}

      {!!filesToShow?.length && filesToShow?.map((file, i) => (
        <div key={`${file.name}-${i}`}>
          <div className={styles.ImgCard}>
            <img src={file?.imageUrl || URL.createObjectURL(files[i]) || ''} alt="" width='100%' />
          </div>
          {getProgress(file.uploadPercent)}
        </div>
      ))}

      <div>
        <div className={styles.ImgCard} onClick={onImgCardClick}>
          <img src={plusIcon} alt='plus' height='15px' />
          <input className={styles.FileInput} type='file' ref={inputRef} onChange={handleChange} accept='/image/*' multiple />
        </div>
        {getProgress(null)}
      </div>
      {/* {allDone && 'Done'} */}
    </div>
  )
}

export default ImgCard;