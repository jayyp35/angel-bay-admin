import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Input from '../../../../common/_custom/Input2/Input';
import Text from '../../../../common/_custom/Text/Text';
import styles from './EditStyles.module.scss';
import ImgCard from '../../../../common/_custom/ImgCard/ImgCard';
import clsx from 'clsx';
import Sizes from './Sizes/Sizes';
import { db } from '../../../../utils/firebase/firebase';
import { toast } from 'react-toastify';
import RightSection from './RightSection/RightSection';
import { CONSTANTS, SIZE } from '../../../../store/constants/style-constants';
import { getStyleFormData, modifyStyleFormData } from '../../../../utils/add-styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../utils/hooks';
import { SyncStyleSets } from '../../../../services/services';

function EditStyles({ styleToEdit }) {
    const user = useAppSelector((state) => state.user.userData);
    const [adding, setAdding] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [formData, setFormData] = useState<any>({
        [CONSTANTS.STYLE_CODE]: '',
        [CONSTANTS.NAME]: '',
        [CONSTANTS.SERIAL]: '',
        [CONSTANTS.DESCRIPTION]: '',
        [CONSTANTS.PRICE]: '',
        [CONSTANTS.KEYWORDS]: '',
        [CONSTANTS.IMAGES]: [],
        [CONSTANTS.MATERIALS]: [],
        [CONSTANTS.CATEGORIES]: [],
        [CONSTANTS.STYLES_IN_SET]: [],
    });

    useEffect(() => {
        if (styleToEdit) setFormData(getStyleFormData(styleToEdit));
    }, [styleToEdit]);

    const verifyStyleExists = async (styleId) => {
        const docRef = doc(db, 'styles', styleId);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            toast.error('Invalid Style Code!');
            // navigate('/home/add')
        }
    };

    const addStylesInSet = (payload) => {
        const updatedPayload = payload?.map((style) => ({
            name: style?.name || '',
            price: style?.price,
            styleCode: style?.styleCode || '',
            serialNumber: style?.serialNumber,
            images: [style?.images?.[0]],
            label: style?.serialNumber || style?.styleCode,
            value: style?.serialNumber,
        }));
        setFormData((formData) => ({
            ...formData,
            [CONSTANTS.STYLES_IN_SET]: updatedPayload,
        }));
    };
    const changeFormData = (key: string, value: string) => {
        setFormData((formData) => ({
            ...formData,
            [key]: value,
        }));
    };

    const changeSizesData = (sizekey: string, value: string) => {
        setFormData((formData) => ({
            ...formData,
            [CONSTANTS.SIZES]: {
                ...formData[CONSTANTS.SIZES],
                [sizekey]: value,
            },
        }));
    };

    const onImagesUploadSuccess = (files = []) => {
        let imgUrls: any = [];
        files.forEach((file: any) => {
            imgUrls.push({
                name: file.name,
                imageUrl: file.imageUrl,
            });
        });
        setFormData((formData) => ({
            ...formData,
            [CONSTANTS.IMAGES]: [...formData[CONSTANTS.IMAGES], ...imgUrls],
        }));
    };

    const onImageDeleteSuccess = (index) => {
        const filteredImages = formData[CONSTANTS.IMAGES]?.filter((img, i) => i !== index);
        const updatedFormData = {
            ...formData,
            [CONSTANTS.IMAGES]: [...filteredImages],
        };
        setFormData(updatedFormData);
        addData(updatedFormData);
    };

    const onReadyStocksAvailableClick = () => {
        setFormData((formData) => ({
            ...formData,
            [CONSTANTS.SIZES]: {
                [SIZE.S]: '0',
                [SIZE.M]: '0',
                [SIZE.L]: '0',
                [SIZE.XL]: '0',
                [SIZE.XXL]: '0',
            },
        }));
    };

    const onAddCatergory = (categories) => {
        setFormData((formData) => ({
            ...formData,
            [CONSTANTS.CATEGORIES]: categories,
        }));
    };

    const onAddMaterial = (materials) => {
        setFormData((formData) => ({
            ...formData,
            [CONSTANTS.MATERIALS]: materials,
        }));
    };

    const addData = async (updatedData) => {
        const uploadData = updatedData ? updatedData : formData;
        setAdding(true);
        let errorMsg = validateStyleData();
        if (errorMsg) {
            setAdding(false);
            return toast.error(errorMsg);
        }
        const docId = uploadData[CONSTANTS.SERIAL];
        const data = modifyStyleFormData(uploadData, false, user);

        try {
            await setDoc(doc(db, 'styles', docId), data);
            SyncStyleSets({
                styleData: data,
            });
            !updatedData && setAddSuccess(true);
            setAdding(false);
        } catch (err) {
            setAdding(false);
            console.log('err', err);
        }
    };

    const validateStyleData = () => {
        if (!formData[CONSTANTS.SERIAL]) return 'Serial Number is mandatory';
        if (!formData[CONSTANTS.PRICE]) return 'Please enter a valid Price';
        return '';
    };

    const onEdit = () => {
        setAddSuccess(false);
    };

    return (
        <div className={styles.EditStyles}>
            <div className={styles.MainSection}>
                <div className={styles.DoubleRow} style={{ marginTop: '0' }}>
                    <Input
                        label='Serial Number'
                        value={formData[CONSTANTS.SERIAL]}
                        onChange={(val) => changeFormData(CONSTANTS.SERIAL, val)}
                        disabled={addSuccess}
                    />
                    <Input
                        label='Style Code'
                        value={formData[CONSTANTS.STYLE_CODE]}
                        onChange={(val) => changeFormData(CONSTANTS.STYLE_CODE, val)}
                        disabled={addSuccess}
                    />
                    <Input
                        label='Price'
                        value={formData[CONSTANTS.PRICE]}
                        onChange={(val) => changeFormData(CONSTANTS.PRICE, val)}
                        prefill='₹'
                        pattern='[0-9]*'
                        disabled={addSuccess}
                    />
                    <Input
                        label='Keywords'
                        placeholder='(Enter search keywords separated by space)'
                        value={formData[CONSTANTS.KEYWORDS]}
                        onChange={(val) => changeFormData(CONSTANTS.KEYWORDS, val)}
                        disabled={addSuccess}
                    />
                </div>

                <Text
                    label='Description'
                    value={formData[CONSTANTS.DESCRIPTION]}
                    onChange={(val) => changeFormData(CONSTANTS.DESCRIPTION, val)}
                    disabled={addSuccess}
                />

                <div
                    className={clsx(styles.Card, {
                        [styles.InactiveCard]: !formData[CONSTANTS.SIZES],
                    })}
                    onClick={onReadyStocksAvailableClick}
                    style={{
                        cursor: addSuccess ? 'not-allowed' : '',
                        pointerEvents: addSuccess ? 'none' : 'all',
                    }}>
                    {formData[CONSTANTS.SIZES] ? (
                        <Sizes formData={formData} changeSizesData={changeSizesData} />
                    ) : (
                        <div>
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
                        onImageDeleteSuccess={onImageDeleteSuccess}
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
                    onEdit={onEdit}
                    addStylesInSet={addStylesInSet}
                />
            </div>
        </div>
    );
}

export default EditStyles;
