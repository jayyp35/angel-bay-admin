import { useEffect, useState } from 'react';
import pencil from '../../../../../assets/pencil-blue.svg';
import styles from './BuyerDetails.module.scss';
import Button from '../../../../../common/_custom/Button/Button';
import Input from '../../../../../common/_custom/Input3/Input';

function BuyerDetails({ selectedBuyer }) {
    const [editDetails, setEditDetails] = useState(false);
    const [editShipping, setEditShipping] = useState(false);

    useEffect(() => {
        if (selectedBuyer && !selectedBuyer?.shippingDetails) setEditShipping(true);
    }, [selectedBuyer]);

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
                            onChange={() => {}}
                            value={selectedBuyer?.companyName}
                            disabled={!editDetails}
                        />
                    </div>
                    <div className={styles.Info}>
                        <span className={styles.Bold}>Person Of Contact:</span>{' '}
                        <Input
                            onChange={() => {}}
                            value={selectedBuyer?.personOfContact}
                            disabled={!editDetails}
                        />
                    </div>
                    <div className={styles.Info}>
                        <span className={styles.Bold}>Contact Number:</span>{' '}
                        <Input
                            onChange={() => {}}
                            value={selectedBuyer?.contactNumber}
                            disabled={!editDetails}
                        />
                    </div>
                    <div className={styles.Info}>
                        <span className={styles.Bold}>Email:</span>{' '}
                        <Input
                            onChange={() => {}}
                            value={selectedBuyer?.email}
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
                            onChange={() => {}}
                            value={selectedBuyer?.companyName}
                            disabled={!editShipping}
                        />
                    </div>
                    <div className={styles.Info}>
                        <span className={styles.Bold}>Address Line 2:</span>{' '}
                        <Input
                            onChange={() => {}}
                            value={selectedBuyer?.companyName}
                            disabled={!editShipping}
                        />
                    </div>
                    <div className={styles.InfoDouble}>
                        <div>
                            <span className={styles.Bold}>City:</span>{' '}
                            <Input
                                onChange={() => {}}
                                value={selectedBuyer?.companyName}
                                disabled={!editShipping}
                            />
                        </div>
                        <div>
                            <span className={styles.Bold}>State:</span>{' '}
                            <Input
                                onChange={() => {}}
                                value={selectedBuyer?.companyName}
                                disabled={!editShipping}
                            />
                        </div>
                    </div>
                    <div className={styles.Info}>
                        <span className={styles.Bold}>Pincode:</span>{' '}
                        <Input
                            onChange={() => {}}
                            value={selectedBuyer?.companyName}
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
