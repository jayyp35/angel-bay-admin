import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Invoicing.module.scss';
import Right from './components/Right/Right';
import Company from './components/Company/Company';
import { addBuyerService, addInvoiceService } from '../../services/services';
import { useAppSelector } from '../../utils/hooks';
import OrderDetails from './components/OrderDetails/OrderDetails';
import SideDrawer from '../../common/_custom/SideDrawer/SideDrawer';
import { getAddBuyerData } from '../../utils/add-buyer';
import { validateBuyerData } from '../../services/validations';
import { toast } from 'react-toastify';

export const INVOICE_CONSTANTS = {
    COMPANY_NAME: 'name',
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
        [INVOICE_CONSTANTS.COMPANY_NAME]: '',
        [INVOICE_CONSTANTS.PERSON_OF_CONTACT]: '',
        [INVOICE_CONSTANTS.CONTACT_NUMBER]: '',
        [INVOICE_CONSTANTS.EMAIL]: '',
    });
    const [shippingDetails, setShippingDetails] = useState({
        [INVOICE_CONSTANTS.ADDR_LINE1]: '',
        [INVOICE_CONSTANTS.ADDR_LINE2]: '',
        [INVOICE_CONSTANTS.LANDMARK]: '',
        [INVOICE_CONSTANTS.PIN]: '',
    });
    const [orderDetails, setOrderDetails] = useState<any>({
        docId: '',
        styles: [],
    });
    const [buyerDetailsLoading, setBuyerDetailsLoading] = useState(false);
    const [creating, setCreating] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    const changeValue = (key, value) => {
        setFormData((formData) => ({
            ...formData,
            [key]: value,
        }));
    };

    const addBuyer = () => {
        let errorMsg = validateBuyerData(formData);
        if (errorMsg) return toast.error(errorMsg);
        const addBuyerData = getAddBuyerData(formData, user, true);
        addBuyerService(addBuyerData, user, {
            onStart: () => {
                setBuyerDetailsLoading(true);
            },
            onSuccess: (buyerId: string) => {
                setOrderDetails({
                    buyerId: buyerId,
                    styles: [
                        {
                            [ORDER_CONSTANTS.STYLE_CODE]: '',
                            [ORDER_CONSTANTS.CUSTOMISATION]: '',
                        },
                    ],
                });
                setShowDrawer(true);
            },
            finally: () => {
                setBuyerDetailsLoading(false);
            },
        });
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
                setShowDrawer(true);
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
                    addBuyer={addBuyer}
                    buyerDetailsLoading={buyerDetailsLoading}
                    createOrder={createOrder}
                    formData={formData}
                    changeValue={changeValue}
                    creating={creating}
                />

                {/* {!orderDetails?.docId && <OrderDetails orderDetails={orderDetails} />} */}
                {showDrawer && (
                    <SideDrawer onClose={() => setShowDrawer(false)}>
                        <SideDrawer.Header>Order Details</SideDrawer.Header>
                        <OrderDetails orderDetails={orderDetails} />
                    </SideDrawer>
                )}
            </div>

            <div className={styles.Right}>
                <Right />
            </div>
        </div>
    );
}

export default Invoice;
