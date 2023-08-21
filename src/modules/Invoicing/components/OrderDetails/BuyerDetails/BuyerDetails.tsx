import { useEffect, useState } from 'react';
import pencil from '../../../../../assets/pencil-blue.svg';
import styles from './BuyerDetails.module.scss';
import Button from '../../../../../common/_custom/Button/Button';
import Input from '../../../../../common/_custom/Input3/Input';
import { INVOICE_CONSTANTS } from '../../../Invoicing';

function BuyerDetails({ selectedBuyer, formData, setFormData, changeValue }) {
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
        if (selectedBuyer && !selectedBuyer?.shippingDetails) setEditShipping(true);
    }, [selectedBuyer]);

    const changeShippingDetail = (key, value) => {
        setFormData((formData) => ({
            ...formData,
            [SHIPPING_DETAILS]: {
                ...formData?.[SHIPPING_DETAILS],
                [key]: value,
            },
        }));
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
                                onClick={() => setEditShipping(false)}
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
                            onChange={(val) => changeShippingDetail(ADDR_LINE1, val)}
                            value={
                                editShipping
                                    ? formData?.[SHIPPING_DETAILS]?.[ADDR_LINE1]
                                    : selectedBuyer?.[SHIPPING_DETAILS]?.[ADDR_LINE1]
                            }
                            disabled={!editShipping}
                        />
                    </div>
                    <div className={styles.Info}>
                        <span className={styles.Bold}>Address Line 2:</span>{' '}
                        <Input
                            onChange={(val) => changeShippingDetail(ADDR_LINE2, val)}
                            value={
                                editShipping
                                    ? formData?.[SHIPPING_DETAILS]?.[ADDR_LINE2]
                                    : selectedBuyer?.[SHIPPING_DETAILS]?.[ADDR_LINE2]
                            }
                            disabled={!editShipping}
                        />
                    </div>
                    <div className={styles.InfoDouble}>
                        <div>
                            <span className={styles.Bold}>City:</span>{' '}
                            <Input
                                onChange={(val) => changeShippingDetail(CITY, val)}
                                value={
                                    editShipping
                                        ? formData?.[SHIPPING_DETAILS]?.[CITY]
                                        : selectedBuyer?.[SHIPPING_DETAILS]?.[CITY]
                                }
                                disabled={!editShipping}
                            />
                        </div>
                        <div>
                            <span className={styles.Bold}>State:</span>{' '}
                            <Input
                                onChange={(val) => changeShippingDetail(STATE, val)}
                                value={
                                    editShipping
                                        ? formData?.[SHIPPING_DETAILS]?.[STATE]
                                        : selectedBuyer?.[SHIPPING_DETAILS]?.[STATE]
                                }
                                disabled={!editShipping}
                            />
                        </div>
                    </div>
                    <div className={styles.Info}>
                        <span className={styles.Bold}>Pincode:</span>{' '}
                        <Input
                            onChange={(val) => changeShippingDetail(PINCODE, val)}
                            value={
                                editShipping
                                    ? formData?.[SHIPPING_DETAILS]?.[PINCODE]
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
