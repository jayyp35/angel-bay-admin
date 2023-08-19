import React, { useEffect, useState } from 'react';
import { getBuyers } from '../../../../services/services';
import check from '../../../../assets/check-green.svg';
import mobile from '../../../../assets/mobile.svg';
import styles from './ExistingBuyers.module.scss';
import clsx from 'clsx';
import { INVOICE_CONSTANTS } from '../../Invoicing';

function ExistingBuyers({ formData, setFormData, resetFormData, selectBuyer }) {
    const [buyers, setBuyers] = useState<any>([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        getBuyers(
            { searchTerm: '', limit: 10 },
            {
                onStart: () => setFetching(true),
                onSuccess: (data) => setBuyers([...data]),
                finally: () => setFetching(false),
            },
        );
    }, []);

    return (
        <div className={styles.ExistingBuyers}>
            <div className={styles.Title}>Existing Buyers</div>
            {buyers?.map((buyer, i) => (
                <div
                    key={i}
                    className={clsx(styles.Buyer, {
                        [styles.SelectedBuyer]: buyer.id === formData?.id,
                    })}
                    onClick={() => selectBuyer(buyer)}>
                    <div>
                        <div className={styles.Company}>{buyer?.companyName}</div>
                        <div className={styles.Person}>{buyer?.personOfContact}</div>
                    </div>
                    <div className={styles.Contact}>
                        <img src={mobile} height={'12px'} alt='' />
                        {buyer?.contactNumber}
                    </div>

                    {buyer.id === formData?.id && (
                        <img className={styles.CheckImg} src={check} alt='chk' height='15px' />
                    )}
                </div>
            ))}
        </div>
    );
}

export default ExistingBuyers;
