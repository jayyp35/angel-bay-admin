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
import { PDFViewer } from '@react-pdf/renderer';
import Button from '../../../../common/_custom/Button/Button';
import InvoicePDF from '../../../InvoicePDF/InvoicePDF';
import { toast } from 'react-toastify';
import StyleSearcher from './StyleSearcher/StyleSearcher';

function OrderDetails({
    selectedBuyer,
    formData,
    setFormData,
    changeValue,
    changeShippingValue,
    shippingDetails,
    setSelectedBuyer,
}) {
    const [showPDF, setShowPDF] = useState(false);

    const [orderDetails, setOrderDetails] = useState<any>({
        buyerId: '',
        styles: [
            {
                selectedStyles: [],
                [ORDER_CONSTANTS.CUSTOMISATION]: '',
                [ORDER_CONSTANTS.COMMENTS]: '',
                [ORDER_CONSTANTS.UPCHARGE]: '10',
                [ORDER_CONSTANTS.ADDITIONAL_CHARGE]: '',
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

    const onStyleSelect = (payload, index) => {
        // const styleToSelect = payload?.[payload?.length - 1];
        setOrderDetails((orderDetails) => ({
            ...orderDetails,
            styles: orderDetails.styles.map((style, i) => {
                if (i === index)
                    return {
                        ...style,
                        selectedStyles: payload,
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
                const total = getTotalQuantity(style?.sizes) + (parseInt(value) || 0);
                if (i === index)
                    return {
                        ...style,
                        [ORDER_CONSTANTS.UPCHARGE]: total > 3 ? 0 : 10,
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
        setOrderDetails((orderDetails) => {
            const stylesLength = orderDetails?.styles?.length;
            if (stylesLength && !orderDetails?.styles?.[stylesLength - 1]?.selectedStyles?.length) {
                toast.error(`Please Select Styles for Sno. ${stylesLength} first`);
                return orderDetails;
            } else {
                return {
                    ...orderDetails,
                    styles: [
                        ...orderDetails.styles,
                        {
                            selectedStyles: [],
                            [ORDER_CONSTANTS.CUSTOMISATION]: '',
                            [ORDER_CONSTANTS.COMMENTS]: '',
                            [ORDER_CONSTANTS.UPCHARGE]: '',
                            [ORDER_CONSTANTS.ADDITIONAL_CHARGE]: '',
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
                };
            }
        });
    };

    const deleteStyle = (index) => {
        let styles = JSON.parse(JSON.stringify(orderDetails.styles));
        let filteredStyles = styles.filter((style, i) => i !== index);
        setOrderDetails((orderDetails) => ({
            ...orderDetails,
            styles: filteredStyles,
        }));
    };

    const getTotalQuantity = (sizes) => {
        let total = 0;
        Object.keys(sizes ?? {}).forEach((size) => {
            total += parseInt(sizes?.[size]) || 0;
        });
        return total;
    };

    const generatePDF = () => {
        if (!orderDetails?.styles?.length) return toast.error('No Styles Added');
        if (!orderDetails?.styles?.[0]?.selectedStyles?.length)
            return toast.error('No Styles Added');

        setShowPDF(true);
    };
    return (
        <div className={styles.OrderDetails}>
            <div className={styles.LeftSection}>
                {showPDF ? (
                    <div style={{ height: '800px', marginBottom: '40px' }}>
                        <Button
                            text='Back'
                            onClick={() => setShowPDF(false)}
                            style={{ margin: '0 0 10px 0' }}
                            small
                            fit
                        />
                        <PDFViewer
                            width={'95%'}
                            height={'100%'}
                            style={{ border: '2px solid #e6e6e6', borderRadius: '8px' }}>
                            <InvoicePDF
                                selectedBuyer={selectedBuyer}
                                orderDetails={orderDetails}
                                getTotalQuantity={getTotalQuantity}
                            />
                        </PDFViewer>
                    </div>
                ) : (
                    <>
                        <BuyerDetails
                            selectedBuyer={selectedBuyer}
                            formData={formData}
                            shippingDetails={shippingDetails}
                            setFormData={setFormData}
                            changeValue={changeValue}
                            changeShippingValue={changeShippingValue}
                            setSelectedBuyer={setSelectedBuyer}
                        />
                        <div className={styles.OrderForm}>
                            {' '}
                            {orderDetails?.styles?.map((style, index) => (
                                <div className={styles.SingleItem} key={`${index}-a`}>
                                    {index + 1}.&nbsp;
                                    <div style={{ marginRight: '20px' }}>
                                        <StyleSearcher
                                            selectedValues={style.selectedStyles}
                                            className={styles.Select}
                                            onChange={(payload) => onStyleSelect(payload, index)}
                                            closeMenuOnSelect={true}
                                        />

                                        <div className={styles.Inputs}>
                                            <Input
                                                value={style[ORDER_CONSTANTS.CUSTOMISATION]}
                                                placeholder='Customisations (Will be included in invoice)'
                                                onChange={(val) =>
                                                    changeField(
                                                        ORDER_CONSTANTS.CUSTOMISATION,
                                                        val,
                                                        index,
                                                    )
                                                }
                                                style={{ marginTop: '0px', width: '100%' }}
                                                size='tiny'
                                            />
                                            <Input
                                                value={style[ORDER_CONSTANTS.COMMENTS]}
                                                placeholder='Comments'
                                                onChange={(val) =>
                                                    changeField(
                                                        ORDER_CONSTANTS.COMMENTS,
                                                        val,
                                                        index,
                                                    )
                                                }
                                                style={{ marginTop: '0px', width: '100%' }}
                                                size='tiny'
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Sizes
                                            formData={style}
                                            changeSizesData={(size, val) =>
                                                changeSizeCount(size, val, index)
                                            }
                                            variant='invoice'
                                        />
                                    </div>
                                    <div className={styles.UpchargeBox}>
                                        <div>
                                            <div className={styles.UpchargeLabel}>
                                                Upcharge <br />
                                                (%)
                                            </div>
                                            <Input
                                                value={style[ORDER_CONSTANTS.UPCHARGE]}
                                                placeholder='Upcharge'
                                                onChange={(val) =>
                                                    changeField(
                                                        ORDER_CONSTANTS.UPCHARGE,
                                                        val,
                                                        index,
                                                    )
                                                }
                                                style={{ marginTop: '0px', width: '50px' }}
                                                size='tiny'
                                            />
                                        </div>
                                        <div>
                                            <div className={styles.UpchargeLabel}>
                                                Additional
                                                <br />
                                                Charges
                                            </div>
                                            <Input
                                                value={style[ORDER_CONSTANTS.ADDITIONAL_CHARGE]}
                                                placeholder='Additional Charge'
                                                onChange={(val) =>
                                                    changeField(
                                                        ORDER_CONSTANTS.ADDITIONAL_CHARGE,
                                                        val,
                                                        index,
                                                    )
                                                }
                                                style={{ marginTop: '0px', width: '50px' }}
                                                size='tiny'
                                            />
                                        </div>
                                    </div>
                                    {!!style.selectedStyles && (
                                        <div className={styles.StyleData}>
                                            <div className={styles.Data}>
                                                {' '}
                                                {/* <div className={styles.Item}>
                                                    <div className={styles.Bold}>Item Code:</div>
                                                    {style.selectedStyle?.serialNumber ||
                                                        style.selectedStyle?.styleCode}
                                                </div> */}
                                                <div
                                                    className={styles.Item}
                                                    style={{ marginTop: '0' }}>
                                                    {!!style.selectedStyles?.length && (
                                                        <>
                                                            {' '}
                                                            <div className={styles.Bold}>
                                                                Price:
                                                            </div>{' '}
                                                            {style.selectedStyles?.map(
                                                                (style, i) => (
                                                                    <span key={i}>
                                                                        {i > 0 ? '+' : ''}{' '}
                                                                        {style?.price}
                                                                    </span>
                                                                ),
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={styles.Images}>
                                                {style.selectedStyles?.map((style, i) => (
                                                    <img
                                                        src={style?.images?.[0]?.imageUrl}
                                                        alt=''
                                                        key={i}
                                                        height='60px'
                                                    />
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
                            <Button
                                small
                                text='Add'
                                onClick={addStyle}
                                fit
                                style={{ marginTop: '10px' }}
                            />
                            <Button
                                small
                                text='Generate PDF'
                                onClick={generatePDF}
                                fit
                                style={{ marginTop: '10px' }}
                            />
                        </div>
                    </>
                )}{' '}
                {/* <div style={{ height: '600px', marginBottom: '40px' }}>
                    {showPDF && (
                        <PDFViewer width={'95%'} height={'100%'}>
                            <InvoicePDF selectedBuyer={selectedBuyer} orderDetails={orderDetails} />
                        </PDFViewer>
                    )}
                </div> */}
            </div>

            <div className={styles.RightSection}>Right section</div>
        </div>
    );
}

export default OrderDetails;
