import Input from '../../../../common/_custom/Input2/Input';
import CreatableSelect from 'react-select/creatable';
import { INVOICE_CONSTANTS, ORDER_CONSTANTS } from '../../Invoicing';
import styles from './OrderDetails.module.scss';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../../../utils/hooks';
import { getStyles } from '../../../../services/services';
import BuyerDetails from './BuyerDetails/BuyerDetails';
import bin from '../../../../assets/bin.svg';
import Sizes from '../../../Home/components/AddStyles/Sizes/Sizes';
import { CONSTANTS, SIZE } from '../../../../store/constants/style-constants';
import Button from '../../../../common/_custom/Button/Button';

function OrderDetails({ selectedBuyer }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [styleOptions, setStyleOptions] = useState([]);

    const debouncedSearchTerm = useDebounce(searchTerm, 200);

    const [orderDetails, setOrderDetails] = useState<any>({
        buyerId: '',
        styles: [
            {
                selectedStyle: null,
                [ORDER_CONSTANTS.CUSTOMISATION]: '',
                [ORDER_CONSTANTS.RANGES]: '',
                [CONSTANTS.SIZES]: {
                    [SIZE.XS]: '0',
                    [SIZE.S]: '0',
                    [SIZE.M]: '0',
                    [SIZE.L]: '0',
                    [SIZE.XL]: '0',
                    [SIZE.XXL]: '0',
                    [SIZE.XXXL]: '0',
                    [SIZE.FS]: '0',
                },
            },
        ],
    });

    useEffect(() => {
        search(debouncedSearchTerm);
    }, [debouncedSearchTerm]);
    useEffect(() => {
        console.log('order detauls', orderDetails);
    }, [orderDetails]);

    const onStyleSelect = (payload, index) => {
        const styleToSelect = payload?.[payload?.length - 1];
        setOrderDetails((orderDetails) => ({
            ...orderDetails,
            styles: orderDetails.styles.map((style, i) => {
                if (i === index)
                    return {
                        ...style,
                        selectedStyle: styleToSelect,
                    };
                else return style;
            }),
        }));
    };

    const changeField = (key, value, index) => {
        setOrderDetails((orderDetails) => ({
            ...orderDetails,
            styles: orderDetails.styles.map((style, i) => {
                if (i === index)
                    return {
                        ...style,
                        [key]: value,
                    };
                else return style;
            }),
        }));
    };

    const changeSizeCount = (size, value, index) => {
        setOrderDetails((orderDetails) => ({
            ...orderDetails,
            styles: orderDetails.styles.map((style, i) => {
                if (i === index)
                    return {
                        ...style,
                        [CONSTANTS.SIZES]: {
                            ...style[CONSTANTS.SIZES],
                            [size]: value,
                        },
                    };
                else return style;
            }),
        }));
    };

    const addStyle = () => {
        setOrderDetails((orderDetails) => ({
            ...orderDetails,
            styles: [
                ...orderDetails.styles,
                {
                    selectedStyle: null,
                    [ORDER_CONSTANTS.CUSTOMISATION]: '',
                    [ORDER_CONSTANTS.RANGES]: '',
                    [CONSTANTS.SIZES]: {
                        [SIZE.XS]: '0',
                        [SIZE.S]: '0',
                        [SIZE.M]: '0',
                        [SIZE.L]: '0',
                        [SIZE.XL]: '0',
                        [SIZE.XXL]: '0',
                        [SIZE.XXXL]: '0',
                        [SIZE.FS]: '0',
                    },
                },
            ],
        }));
    };

    const deleteStyle = (index) => {
        let styles = JSON.parse(JSON.stringify(orderDetails.styles));
        console.log('filtered array before delte', index, styles);
        let filteredStyles = styles.filter((style, i) => i !== index);
        console.log('filtered array after delte', index, filteredStyles);
        setOrderDetails((orderDetails) => ({
            ...orderDetails,
            styles: filteredStyles,
        }));
    };

    const search = async (searchTerm = '') => {
        getStyles(
            {
                limit: 10,
                searchTerm: searchTerm,
            },
            {
                onSuccess: (data) => {
                    setStyleOptions(
                        data?.map((item) => ({
                            value: item.serialNumber || item.styleCode,
                            label: item.serialNumber || item.styleCode,
                            ...item,
                        })),
                    );
                },
            },
        );
    };

    return (
        <div className={styles.OrderDetails}>
            <div className={styles.LeftSection}>
                {' '}
                <BuyerDetails selectedBuyer={selectedBuyer} />
                {orderDetails?.styles?.map((style, index) => (
                    <div className={styles.SingleItem} key={`${index}-a`}>
                        {index + 1}.&nbsp;
                        <div style={{ marginRight: '20px' }}>
                            <CreatableSelect
                                options={styleOptions}
                                isMulti
                                name='Style Code'
                                placeholder='Style Code / Serial'
                                className={styles.Select}
                                onChange={(payload) => onStyleSelect(payload, index)}
                                value={[style.selectedStyle]}
                                closeMenuOnSelect={true}
                            />
                            <div className={styles.Inputs}>
                                <Input
                                    value={style[ORDER_CONSTANTS.CUSTOMISATION]}
                                    placeholder='Customisations'
                                    onChange={(val) =>
                                        changeField(ORDER_CONSTANTS.CUSTOMISATION, val, index)
                                    }
                                    style={{ marginTop: '0px', width: '100px' }}
                                    size='tiny'
                                />
                                <Input
                                    value={style[ORDER_CONSTANTS.RANGES]}
                                    placeholder='Size Range'
                                    onChange={(val) =>
                                        changeField(ORDER_CONSTANTS.RANGES, val, index)
                                    }
                                    style={{ marginTop: '0px', width: '100px' }}
                                    size='tiny'
                                />
                            </div>
                        </div>
                        <div>
                            <Sizes
                                formData={style}
                                changeSizesData={(size, val) => changeSizeCount(size, val, index)}
                                variant='invoice'
                            />
                        </div>
                        {!!style.selectedStyle && (
                            <div className={styles.StyleData}>
                                <div className={styles.Data}>
                                    {' '}
                                    <div className={styles.Item}>
                                        <div className={styles.Bold}>Item Code:</div>
                                        {style.selectedStyle?.serialNumber ||
                                            style.selectedStyle?.styleCode}
                                    </div>
                                    <div className={styles.Item}>
                                        <div className={styles.Bold}>Price:</div>{' '}
                                        {style.selectedStyle?.price}/-
                                    </div>
                                </div>
                                <div className={styles.Images}>
                                    {style.selectedStyle?.images?.map((img, i) => (
                                        <img src={img.imageUrl} alt='' key={i} height='60px' />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div>
                            <img
                                src={bin}
                                alt='b'
                                height='25px'
                                className={styles.Delete}
                                onClick={() => deleteStyle(index)}
                            />
                        </div>
                    </div>
                ))}
                <Button small text='Add' onClick={addStyle} fit style={{ marginTop: '10px' }} />
                <Button
                    small
                    text='Generate PDF'
                    onClick={() => {}}
                    fit
                    style={{ marginTop: '10px' }}
                />
            </div>

            <div className={styles.RightSection}>Right section</div>
        </div>
    );
}

export default OrderDetails;
