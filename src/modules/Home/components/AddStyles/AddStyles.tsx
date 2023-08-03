import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Input from '../../../../common/_custom/Input2/Input';
import Text from '../../../../common/_custom/Text/Text';
import styles from './AddStyles.module.scss';
import ImgCard from '../../../../common/_custom/ImgCard/ImgCard';
import clsx from 'clsx';
import Button from '../../../../common/_custom/Button/Button';
import Sizes from './Sizes/Sizes';
import { db } from '../../../../utils/firebase/firebase';
import { toast } from 'react-toastify';
import RightSection from './RightSection/RightSection';

export const STYLE_CODE = 'styleCode';
export const NAME = 'name';
export const SERIAL = 'serialNumber';
export const DESCRIPTION = 'description';
export const MATERIALS = 'materials';
export const PRICE = 'price';
export const SIZES = 'sizes';
export const IMAGES = 'images';
export const CATEGORIES = 'categories';

export const S = 's';
export const M = 'm';
export const L = 'l';
export const XL = 'xl';
export const XXL = 'xxl';

function AddStyles() {

  const [adding, setAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [formData, setFormData] = useState<any>({
    [STYLE_CODE]: '',
    [NAME]: '',
    [SERIAL]: '',
    [DESCRIPTION]: '',
    [PRICE]: '',
    [IMAGES]: [],
    [MATERIALS]: [],
    [CATEGORIES]: []
  });

  const changeFormData = (key: string, value: string) => {
    setFormData((formData) => ({
      ...formData,
      [key]: value
    }))
  }

  const changeSizesData = (sizekey: string, value: string) => {
    setFormData((formData) => ({
      ...formData,
      [SIZES]: {
        ...formData[SIZES],
        [sizekey]: (value)
      }
    }))
  }

  const onImagesUploadSuccess = (files = []) => {
    let imgUrls: any = [];
    files.forEach((file: any) => {
      imgUrls.push(file.imageUrl);
    })
    setFormData((formData) => ({
      ...formData,
      [IMAGES]: [...formData[IMAGES], ...imgUrls]
    }))
  }

  const onReadyStocksAvailableClick = () => {
    setFormData((formData) => ({
      ...formData,
      [SIZES]: {
        [S]: '0',
        [M]: '0',
        [L]: '0',
        [XL]: '0',
        [XXL]: '0'
      }
    }))
  }

  const addData = async () => {
    setAdding(true);
    let errorMsg = validateStyleData();
    if (errorMsg) {
      setAdding(false);
      return toast.error(errorMsg);
    }

    const docRef = doc(db, "styles", formData[STYLE_CODE]);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setAdding(false);
      return toast.error('This style code already exists')
    }
    try {
      await setDoc(doc(db, "styles", formData[STYLE_CODE]), formData);
      setAddSuccess(true);
      setAdding(false)

    } catch (err) {
      setAdding(false)
      console.log('err');
    }
  }

  useEffect(() => {
    console.log('adds', addSuccess)
  }, [addSuccess])
  const validateStyleData = () => {
    if (!(formData[STYLE_CODE] || formData[SERIAL])) return 'Please enter valid Style Code OR Serial'
    if (!formData[PRICE]) return 'Please enter a valid Price'
    return '';
  }

  return (
    <div className={styles.AddStyles}>

      <div className={styles.MainSection}>
        <div className={styles.DoubleRow} style={{ marginTop: '0' }}>
          <Input label='Serial Number' value={formData[SERIAL]} onChange={(val) => changeFormData(SERIAL, val)} disabled={addSuccess} />
          <Input label='Style Code' value={formData[STYLE_CODE]} onChange={(val) => changeFormData(STYLE_CODE, val)} disabled={addSuccess} />
          <Input label='Price' value={formData[PRICE]} onChange={(val) => changeFormData(PRICE, val)} prefill='₹' pattern='[0-9]*' disabled={addSuccess} />

        </div>

        <Text label='Description' value={formData[DESCRIPTION]} onChange={(val) => changeFormData(DESCRIPTION, val)} disabled={addSuccess} />

        <div
          className={clsx(styles.Card, { [styles.InactiveCard]: !formData[SIZES] })}
          style={{
            cursor: addSuccess ? 'not-allowed' : '',
            pointerEvents: addSuccess ? 'none' : 'all'
          }}
        >
          {formData[SIZES] ? <Sizes formData={formData} changeSizesData={changeSizesData} /> : (
            <div onClick={onReadyStocksAvailableClick}>Click to Add Ready Stocks</div>
          )}
        </div>

        <div className={styles.Images}>
          <ImgCard
            images={formData[IMAGES]}
            path={formData[STYLE_CODE] || formData[SERIAL]}
            onUploadSuccess={onImagesUploadSuccess}
            errorMessage={validateStyleData()}
            disabled={addSuccess}

          />
        </div>

        <Button text='Add Style' onClick={addData} loading={adding} disabled={adding} />
      </div>

      <div className={styles.Right}>
        <RightSection addSuccess={addSuccess} />
      </div>

    </div>
  )
}

export default AddStyles