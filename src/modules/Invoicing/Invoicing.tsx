import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Invoicing.module.scss';
import Right from './components/Right/Right';
import Company from './components/Company/Company';
import { addInvoiceService } from '../../services/services';
import { useAppSelector } from '../../utils/hooks';
import OrderDetails from './components/OrderDetails/OrderDetails';

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

export const ORDER_CONSTANTS = {
    STYLE_CODE: 'styleCode',
    CUSTOMISATION: 'customisation',
};

function Invoice(props) {
    const user = useAppSelector((state) => state.user.userData);
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
    const [orderDetails, setOrderDetails] = useState<any>({
        docId: '',
        styles: [
            {
                [ORDER_CONSTANTS.STYLE_CODE]: '',
                [ORDER_CONSTANTS.CUSTOMISATION]: '',
            },
        ],
    });
    const [creating, setCreating] = useState(false);
    const [createdDocId, setCreatedDocId] = useState('');

    const changeValue = (key, value) => {
        setFormData((formData) => ({
            ...formData,
            [key]: value,
        }));
    };

    const createOrder = () => {
        addInvoiceService(formData, user, {
            onStart: () => {
                setCreating(true);
            },
            onSuccess: (docId: string) => {
                setOrderDetails({
                    docId: docId,
                    styles: [
                        {
                            [ORDER_CONSTANTS.STYLE_CODE]: '',
                            [ORDER_CONSTANTS.CUSTOMISATION]: '',
                        },
                    ],
                });
            },
            finally: () => {
                setCreating(false);
            },
        });
    };

    return (
        <div className={styles.Invoice}>
            <div className={styles.Left}>
                <Company
                    createOrder={createOrder}
                    formData={formData}
                    changeValue={changeValue}
                    creating={creating}
                />

                {!!orderDetails && <OrderDetails orderDetails={orderDetails} />}
            </div>

            <div className={styles.Right}>
                <Right />
            </div>
        </div>
    );
}

export default Invoice;
