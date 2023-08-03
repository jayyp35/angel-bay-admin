import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Input from '../../../../common/_custom/Input2/Input';
import Text from '../../../../common/_custom/Text/Text';
import styles from './EditStyles.module.scss';
import ImgCard from '../../../../common/_custom/ImgCard/ImgCard';
import clsx from 'clsx';
import Button from '../../../../common/_custom/Button/Button';
import Sizes from './Sizes/Sizes';
import { db } from '../../../../utils/firebase/firebase';
import { toast } from 'react-toastify';
import RightSection from './RightSection/RightSection';
import { CONSTANTS, SIZE } from '../../../../store/constants/style-constants';
import { modifyStyleFormData } from '../../../../utils/add-styles';
import { Navigate, useNavigate, useParams } from 'react-router-dom';


function EditStyles({ styleToEdit }) {

  const [adding, setAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [formData, setFormData] = useState<any>({
    [CONSTANTS.STYLE_CODE]: '',
    [CONSTANTS.NAME]: '',
    [CONSTANTS.SERIAL]: '',
    [CONSTANTS.DESCRIPTION]: '',
    [CONSTANTS.PRICE]: '',
    [CONSTANTS.IMAGES]: [],
    [CONSTANTS.MATERIALS]: [],
    [CONSTANTS.CATEGORIES]: []
  });

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (styleToEdit) setFormData(JSON.parse(JSON.stringify(styleToEdit)));
  }, [styleToEdit])

  useEffect(() => {
    if (params?.styleId) verifyStyleExists(params?.styleId);
    else {
      toast.error('Invalid Style Code! Redirecting');
      navigate('/home/add')
    }
  }, [])

  const verifyStyleExists = async (styleId) => {
    const docRef = doc(db, "styles", styleId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      toast.error('Invalid Style Code! Redirecting');
      navigate('/home/add')
    }
  }

  const changeFormData = (key: string, value: string) => {
    setFormData((formData) => ({
      ...formData,
      [key]: value
    }))
  }

  const changeSizesData = (sizekey: string, value: string) => {
    setFormData((formData) => ({
      ...formData,
      [CONSTANTS.SIZES]: {
        ...formData[CONSTANTS.SIZES],
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
      [CONSTANTS.IMAGES]: [...formData[CONSTANTS.IMAGES], ...imgUrls]
    }))
  }

  const onReadyStocksAvailableClick = () => {
    setFormData((formData) => ({
      ...formData,
      [CONSTANTS.SIZES]: {
        [SIZE.S]: '0',
        [SIZE.M]: '0',
        [SIZE.L]: '0',
        [SIZE.XL]: '0',
        [SIZE.XXL]: '0'
      }
    }))
  }

  const onAddCatergory = (categories) => {
    // const categories = options?.map((option) => option?.value) || [];
    setFormData((formData) => ({
      ...formData,
      [CONSTANTS.CATEGORIES]: categories
    }))
  }

  const onAddMaterial = (materials) => {
    // const categories = options?.map((option) => option?.value) || [];
    setFormData((formData) => ({
      ...formData,
      [CONSTANTS.MATERIALS]: materials
    }))
  }

  const addData = async () => {
    setAdding(true);
    let errorMsg = validateStyleData();
    if (errorMsg) {
      setAdding(false);
      return toast.error(errorMsg);
    }
    const docId = formData[CONSTANTS.STYLE_CODE] || formData[CONSTANTS.SERIAL];
    const data = modifyStyleFormData(formData);

    try {
      await setDoc(doc(db, "styles", docId), data);
      setAddSuccess(true);
      setAdding(false)

    } catch (err) {
      setAdding(false)
      console.log('err', err);
    }
  }

  const validateStyleData = () => {
    if (!(formData[CONSTANTS.STYLE_CODE] || formData[CONSTANTS.SERIAL])) return 'Please enter valid Style Code OR Serial'
    if (!formData[CONSTANTS.PRICE]) return 'Please enter a valid Price'
    return '';
  }

  const onEdit = () => {
    setAddSuccess(false);
  }

  return (
    <div className={styles.EditStyles}>

      <div className={styles.MainSection}>
        <div className={styles.DoubleRow} style={{ marginTop: '0' }}>
          <Input label='Serial Number' value={formData[CONSTANTS.SERIAL]} onChange={(val) => changeFormData(CONSTANTS.SERIAL, val)} disabled={addSuccess} />
          <Input label='Style Code' value={formData[CONSTANTS.STYLE_CODE]} onChange={(val) => changeFormData(CONSTANTS.STYLE_CODE, val)} disabled={addSuccess} />
          <Input label='Price' value={formData[CONSTANTS.PRICE]} onChange={(val) => changeFormData(CONSTANTS.PRICE, val)} prefill='₹' pattern='[0-9]*' disabled={addSuccess} />

        </div>

        <Text label='Description' value={formData[CONSTANTS.DESCRIPTION]} onChange={(val) => changeFormData(CONSTANTS.DESCRIPTION, val)} disabled={addSuccess} />

        <div
          className={clsx(styles.Card, { [styles.InactiveCard]: !formData[CONSTANTS.SIZES] })}
          style={{
            cursor: addSuccess ? 'not-allowed' : '',
            pointerEvents: addSuccess ? 'none' : 'all'
          }}
        >
          {formData[CONSTANTS.SIZES] ? <Sizes formData={formData} changeSizesData={changeSizesData} /> : (
            <div onClick={onReadyStocksAvailableClick}>
              {addSuccess ? 'No Ready Stocks Added' : 'Click to Add Ready Stocks'}
            </div>
          )}
        </div>

        <div className={styles.Images}>
          <ImgCard
            images={formData[CONSTANTS.IMAGES]}
            path={formData[CONSTANTS.STYLE_CODE] || formData[CONSTANTS.SERIAL]}
            onUploadSuccess={onImagesUploadSuccess}
            errorMessage={validateStyleData()}
            disabled={addSuccess}
          />
        </div>

      </div>

      <div className={styles.Right}>
        <RightSection
          addSuccess={addSuccess}
          onAddClick={addData}
          adding={adding}
          onAddCatergory={onAddCatergory}
          onAddMaterial={onAddMaterial}
          formData={formData}
          // styleId={formData[CONSTANTS.SERIAL] || formData[CONSTANTS.STYLE_CODE]}
          onEdit={onEdit} />
      </div>

    </div>
  )
}

export default EditStyles