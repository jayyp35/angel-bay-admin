import { useState } from 'react';
import pencil from '../../../../../assets/pencil-blue.svg';
import styles from './BuyerDetails.module.scss';
import Button from '../../../../../common/_custom/Button/Button';

function BuyerDetails({ selectedBuyer }) {
    const [editDetails, setEditDetails] = useState(false);
    const [editShipping, setEditShipping] = useState(false);
    const shippingDetailsExist = selectedBuyer?.shippingDetails;
    return (
        <div className={styles.BuyerDetails}>
            <div className={styles.Section}>
                <div className={styles.Title}>
                    Buyer Details
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

                {!editDetails ? (
                    <div>
                        <div className={styles.Info}>
                            <span className={styles.Bold}>Company Name:</span>{' '}
                            {selectedBuyer?.companyName}
                        </div>
                        <div className={styles.Info}>
                            <span className={styles.Bold}>Person Of Contact:</span>{' '}
                            {selectedBuyer?.personOfContact}
                        </div>
                        <div className={styles.Info}>
                            <span className={styles.Bold}>Contact Number:</span>{' '}
                            {selectedBuyer?.contactNumber}
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>

            <div className={styles.Section}>
                <div className={styles.Title}>
                    Shipping Details
                    {editShipping ? (
                        <Button
                            text='Save'
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
                {!editShipping ? (
                    <>
                        {shippingDetailsExist ? (
                            <div>
                                <div className={styles.Info}>
                                    <span className={styles.Bold}>Company Name:</span>{' '}
                                    {selectedBuyer?.companyName}
                                </div>
                                <div className={styles.Info}>
                                    <span className={styles.Bold}>Person Of Contact:</span>{' '}
                                    {selectedBuyer?.personOfContact}
                                </div>
                                <div className={styles.Info}>
                                    <span className={styles.Bold}>Contact Number:</span>{' '}
                                    {selectedBuyer?.contactNumber}
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}

export default BuyerDetails;
