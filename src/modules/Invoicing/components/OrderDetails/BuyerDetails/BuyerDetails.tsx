import { useEffect, useState } from 'react';
import pencil from '../../../../../assets/pencil-blue.svg';
import styles from './BuyerDetails.module.scss';
import Button from '../../../../../common/_custom/Button/Button';
import Input from '../../../../../common/_custom/Input3/Input';
import { INVOICE_CONSTANTS } from '../../../Invoicing';
import { setShippingDetails } from '../../../../../services/services';
import { toast } from 'react-toastify';
import { validateShippingData } from '../../../../../services/validations';

function BuyerDetails({
    selectedBuyer,
    formData,
    shippingDetails,
    setFormData,
    changeValue,
    changeShippingValue,
    setSelectedBuyer,
}) {
    const {
        PERSON_OF_CONTACT,
        COMPANY_NAME,
        CONTACT_NUMBER,
        EMAIL,
        SHIPPING_DETAILS,
        ADDR_LINE1,
        ADDR_LINE2,
        CITY,
        STATE,
        LANDMARK,
        PINCODE,
    } = INVOICE_CONSTANTS;
    const [editDetails, setEditDetails] = useState(false);
    const [editShipping, setEditShipping] = useState(false);

    useEffect(() => {
        console.log('selected buyer', selectedBuyer);
        if (selectedBuyer && !selectedBuyer?.shippingDetails) setEditShipping(true);
    }, [selectedBuyer]);

    const saveShipping = () => {
        let errorMsg = validateShippingData(shippingDetails);
        if (errorMsg) return toast.error(errorMsg);
        setShippingDetails(shippingDetails, selectedBuyer.id, {
            finally: () => {
                setSelectedBuyer((selectedBuyer) => ({ ...selectedBuyer, shippingDetails }));
                toast.success('Shipping Details Saved');
                setEditShipping(false);
            },
        });
    };

    return (
        <div className={styles.BuyerDetails}>
            <div className={styles.Section}>
                <div className={styles.Title}>
                    Buyer Details
                    <div className={styles.Btn}>
                        {editDetails ? (
                            <Button
                                text='Save'
                                onClick={() => setEditDetails(false)}
                                tiny
                                style={{ marginTop: '0' }}
                            />
                        ) : (
                            <img
                                src={pencil}
                                alt=''
                                height={'14px'}
                                onClick={() => setEditDetails(true)}
                            />
                        )}
                    </div>
                </div>

                <div>
                    <div className={styles.Info}>
                        <span className={styles.Bold}>Company Name:</span>{' '}
                        <Input
                            onChange={(val) => changeValue(COMPANY_NAME, val)}
                            value={
                                editDetails ? formData?.[COMPANY_NAME] : selectedBuyer?.companyName
                            }
                            disabled={!editDetails}
                        />
                    </div>
                    <div className={styles.Info}>
                        <span className={styles.Bold}>Person Of Contact:</span>{' '}
                        <Input
                            onChange={(val) => changeValue(PERSON_OF_CONTACT, val)}
                            value={
                                editDetails
                                    ? formData?.[PERSON_OF_CONTACT]
                                    : selectedBuyer?.personOfContact
                            }
                            disabled={!editDetails}
                        />
                    </div>
                    <div className={styles.Info}>
                        <span className={styles.Bold}>Contact Number:</span>{' '}
                        <Input
                            onChange={(val) => changeValue(CONTACT_NUMBER, val)}
                            value={
                                editDetails
                                    ? formData?.[CONTACT_NUMBER]
                                    : selectedBuyer?.contactNumber
                            }
                            disabled={!editDetails}
                        />
                    </div>
                    <div className={styles.Info}>
                        <span className={styles.Bold}>Email:</span>{' '}
                        <Input
                            onChange={(val) => changeValue(EMAIL, val)}
                            value={editDetails ? formData?.[EMAIL] : selectedBuyer?.email}
                            disabled={!editDetails}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.Section}>
                <div className={styles.Title}>
                    Shipping Details
                    <div className={styles.Btn}>
                        {editShipping ? (
                            <Button
                                text={
                                    !selectedBuyer?.shippingDetails
                                        ? 'Save Shipping Details'
                                        : 'Save'
                                }
                                onClick={saveShipping}
                                tiny
                                style={{ marginTop: '0' }}
                            />
                        ) : (
                            <img
                                src={pencil}
                                alt=''
                                height={'14px'}
                                onClick={() => setEditShipping(true)}
                            />
                        )}
                    </div>
                </div>

                <div>
                    <div className={styles.Info}>
                        <span className={styles.Bold}>Address Line 1:</span>{' '}
                        <Input
                            onChange={(val) => changeShippingValue(ADDR_LINE1, val)}
                            value={
                                editShipping
                                    ? shippingDetails?.[ADDR_LINE1]
                                    : selectedBuyer?.[SHIPPING_DETAILS]?.[ADDR_LINE1]
                            }
                            disabled={!editShipping}
                        />
                    </div>
                    <div className={styles.Info}>
                        <span className={styles.Bold}>Address Line 2:</span>{' '}
                        <Input
                            onChange={(val) => changeShippingValue(ADDR_LINE2, val)}
                            value={
                                editShipping
                                    ? shippingDetails?.[ADDR_LINE2]
                                    : selectedBuyer?.[SHIPPING_DETAILS]?.[ADDR_LINE2]
                            }
                            disabled={!editShipping}
                        />
                    </div>
                    <div className={styles.InfoDouble}>
                        <div>
                            <span className={styles.Bold}>City:</span>{' '}
                            <Input
                                onChange={(val) => changeShippingValue(CITY, val)}
                                value={
                                    editShipping
                                        ? shippingDetails?.[CITY]
                                        : selectedBuyer?.[SHIPPING_DETAILS]?.[CITY]
                                }
                                disabled={!editShipping}
                            />
                        </div>
                        <div>
                            <span className={styles.Bold}>State:</span>{' '}
                            <Input
                                onChange={(val) => changeShippingValue(STATE, val)}
                                value={
                                    editShipping
                                        ? shippingDetails?.[STATE]
                                        : selectedBuyer?.[SHIPPING_DETAILS]?.[STATE]
                                }
                                disabled={!editShipping}
                            />
                        </div>
                    </div>
                    <div className={styles.Info}>
                        <span className={styles.Bold}>Pincode:</span>{' '}
                        <Input
                            onChange={(val) => changeShippingValue(PINCODE, val)}
                            value={
                                editShipping
                                    ? shippingDetails?.[PINCODE]
                                    : selectedBuyer?.[SHIPPING_DETAILS]?.[PINCODE]
                            }
                            disabled={!editShipping}
                        />
                    </div>
                </div>
                {/* )} */}
            </div>
        </div>
    );
}

export default BuyerDetails;
