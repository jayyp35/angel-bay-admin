import React, { useEffect, useState } from 'react';
import { getBuyers } from '../../../../services/services';
import check from '../../../../assets/check-green.svg';
import mobile from '../../../../assets/mobile.svg';
import styles from './ExistingBuyers.module.scss';
import clsx from 'clsx';
import { INVOICE_CONSTANTS } from '../../Invoicing';
import Search from '../../../../common/_custom/Search/Search';
import { useDebounce } from '../../../../utils/hooks';

function ExistingBuyers({
    formData,
    setFormData,
    resetFormData,
    selectBuyer,
    buyers,
    setBuyers,
    fetchBuyers,
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [fetching, setFetching] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        fetchBuyers(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    return (
        <div className={styles.ExistingBuyers}>
            <div className={styles.Title}>Existing Buyers</div>
            <Search
                value={searchTerm}
                onChange={(val) => setSearchTerm(val)}
                style={{ marginTop: 0 }}
                placeholder='Search by Company Name / Person / Mobile'
            />
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
