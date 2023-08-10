import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Invoicing.module.scss';
import Company from './components/Company';
import Right from './components/Right/Right';

export const INVOICE_CONSTANTS = {
    NAME: 'name',
    PERSON_OF_CONTACT: 'personOfContact',
    CONTACT_NUMBER: 'contactNumber',
    ALTERNATE_NUMBER: 'alternateNumber',
    EMAIL: 'email',
    ADDR_LINE1: 'addr_1',
    ADDR_LINE2: 'addr_2',
    LANDMARK: 'addr_3',
    PIN: 'pincode',
};

function Invoice(props) {
    const [formData, setFormData] = useState({
        [INVOICE_CONSTANTS.NAME]: '',
        [INVOICE_CONSTANTS.PERSON_OF_CONTACT]: '',
        [INVOICE_CONSTANTS.CONTACT_NUMBER]: '',
        [INVOICE_CONSTANTS.EMAIL]: '',
        [INVOICE_CONSTANTS.ADDR_LINE1]: '',
        [INVOICE_CONSTANTS.ADDR_LINE2]: '',
        [INVOICE_CONSTANTS.LANDMARK]: '',
        [INVOICE_CONSTANTS.PIN]: '',
    });

    const changeValue = (key, value) => {
        setFormData((formData) => ({
            ...formData,
            [key]: value,
        }));
    };

    const createOrder = () => {
        // const single_order = JSON.parse(JSON.stringify(singleOrderItem));
        // setOrderData([single_order])
    };

    return (
        <div className={styles.Invoice}>
            <div className={styles.Left}>
                <Company createOrder={createOrder} formData={formData} changeValue={changeValue} />
            </div>

            <div className={styles.Right}>
                <Right />
            </div>
        </div>
    );
}

export default Invoice;
