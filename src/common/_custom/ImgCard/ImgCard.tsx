import styles from './ImgCard.module.scss';
import bin from '../../../assets/bin.svg';
import plusIcon from '../../../assets/plus.svg';
import { useEffect, useRef, useState } from 'react';
import { storage } from '../../../utils/firebase/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import ImageViewer from 'react-simple-image-viewer';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import clsx from 'clsx';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

function ImgCard({
    images,
    path,
    errorMessage,
    disabled = false,
    onUploadStart,
    onUploadSuccess,
    onImageDeleteSuccess,
}: {
    images: string[];
    path: string;
    onUploadStart?: Function;
    onUploadSuccess: Function;
    errorMessage: string;
    disabled?: boolean;
    onImageDeleteSuccess: Function;
}) {
    const [files, setFiles] = useState<File[]>([]);
    const [filesToShow, setFilesToShow] = useState<any>([]);
    const [allUploaded, setAllUploaded] = useState(true);
    const [showImagesPreview, setShowImagesPreview] = useState<boolean | number>(false);

    const [deleteItem, setDeleteItem] = useState<any>(false);
    const [deleting, setDeleting] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const showNotice = !!(filesToShow?.length && images?.length);
    function handleChange(event) {
        const files = Array.from(event.target.files).map((file: any) => ({
            name: file.name,
            size: file.size,
            type: file.type,
            uploadPercent: 0,
            imageUrl: '',
        }));
        setAllUploaded(false);
        setFiles(event.target.files);
        setFilesToShow(files);
    }

    const updateUploadProgress = (percent, index) => {
        setFilesToShow((files) => {
            return files.map((file, j) => {
                return {
                    ...file,
                    ...(index === j ? { uploadPercent: percent } : {}),
                };
            });
        });
    };

    const updateImageUrl = (url, index) => {
        setFilesToShow((files) => {
            return files.map((file, j) => {
                return {
                    ...file,
                    ...(index === j ? { imageUrl: url } : {}),
                };
            });
        });
    };

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
            setAllUploaded(true);
            onUploadSuccess(filesToShow);
            setFilesToShow([]);
            setFiles([]);
        }
    };

    useEffect(() => {
        if (files?.length) {
            handleUpload();
        }
    }, [files]);

    useEffect(() => {
        if (filesToShow?.length) {
            checkIfAllComplete();
        }
    }, [filesToShow]);

    const onImgCardClick = () => {
        if (errorMessage) return toast.error(errorMessage);
        if (!path) return toast.error('Upload Path Error');
        inputRef.current?.click?.();
    };

    const handleUpload = async () => {
        onUploadStart?.();
        Array.from(files)?.forEach(async (file, index) => {
            // const compressedFile = await imageCompression(file, {
            //   maxSizeMB: 1,
            //   useWebWorker: true,
            // });
            const storageRef = ref(storage, `/styleimgs/${path}/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                    );

                    updateUploadProgress(percent, index);
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        updateImageUrl(url, index);
                        console.log(url);
                    });
                },
            );
        });
    };

    const getProgress = (percent) => {
        return (
            <>
                <div
                    className={styles.ProgressContainer}
                    style={{
                        visibility: percent === null || percent === 100 ? 'hidden' : 'visible',
                    }}>
                    <div className={styles.ProgressBar} style={{ width: `${percent}%` }}></div>
                </div>

                {(percent || percent === 0) && (
                    <div className={styles.LoadingOverlay}>
                        <LoadingSpinner />
                    </div>
                )}
            </>
        );
    };

    const onBinClick = (e, img, index) => {
        setDeleteItem({
            index: index,
            img: img,
        });
        e.stopPropagation();
    };

    const confirmDelete = () => {
        setDeleting(true);
        const deleteRef = ref(storage, `/styleimgs/${path}/${deleteItem?.img?.name}`);

        deleteObject(deleteRef)
            .then(() => {
                toast.success('Successfully deleted');
                onImageDeleteSuccess?.(deleteItem?.index);
                setDeleteItem(false);
                setDeleting(false);
            })
            .catch((error) => {
                console.log('err', error);
                setDeleting(false);
                toast.error(error);
            });
        //METADATA UPDATE
    };

    return (
        <div className={styles.Images}>
            {!!images?.length &&
                images?.map((file: any, i) => (
                    <div
                        key={`${file}-${i}`}
                        onClick={() => {
                            if (allUploaded) setShowImagesPreview(i);
                        }}>
                        <div className={clsx(styles.ImgCard, styles.ImgUploaded)}>
                            <img src={file?.imageUrl || ''} alt='' width='100%' />
                            <img
                                className={styles.Delete}
                                src={bin}
                                alt='bin'
                                height='20px'
                                onClick={(e) => onBinClick(e, file, i)}
                            />
                        </div>
                        {getProgress(null)}
                    </div>
                ))}

            {!!filesToShow?.length &&
                filesToShow?.map((file, i) => (
                    <div key={`${file.name}-${i}`} style={{ position: 'relative' }}>
                        <div className={styles.ImgCard}>
                            <img
                                src={file?.imageUrl || URL.createObjectURL(files[i]) || ''}
                                alt=''
                                width='100%'
                            />
                        </div>
                        {getProgress(file.uploadPercent)}
                    </div>
                ))}

            {!disabled && (
                <div>
                    <div className={styles.ImgCard} onClick={onImgCardClick}>
                        <img src={plusIcon} alt='plus' height='15px' />
                        <input
                            className={styles.FileInput}
                            type='file'
                            ref={inputRef}
                            onChange={handleChange}
                            accept='/image/*'
                            multiple
                        />
                    </div>
                    {getProgress(null)}
                </div>
            )}
            {/* {showNotice && <div className={styles.Notice}>Please enter Serial Number/Style Code and Price before uploading any images.</div>} */}

            {!!(showImagesPreview !== false) && (
                <ImageViewer
                    src={images}
                    currentIndex={parseInt(`${showImagesPreview}`) || 0}
                    disableScroll={true}
                    closeOnClickOutside={true}
                    onClose={() => setShowImagesPreview(false)}
                />
            )}

            {!!deleteItem && (
                <Modal
                    size='tiny'
                    open={!!deleteItem}
                    onClose={() => setDeleteItem(false)}
                    style={{ height: 'fit-content', width: '400px' }}>
                    Are you sure you want to delete this photo?
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '10px',
                            justifyContent: 'flex-end',
                        }}>
                        <Button text='Confirm' onClick={confirmDelete} small />
                        <Button
                            variant='white'
                            text='Cancel'
                            onClick={() => setDeleteItem(false)}
                            small
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default ImgCard;
