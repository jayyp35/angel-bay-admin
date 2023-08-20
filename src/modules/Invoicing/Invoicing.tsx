import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Invoicing.module.scss';
import ExistingBuyers from './components/ExistingBuyers/ExistingBuyers';
import Company from './components/Company/Company';
import { addBuyerService, addInvoiceService } from '../../services/services';
import { useAppSelector } from '../../utils/hooks';
import OrderDetails from './components/OrderDetails/OrderDetails';
import SideDrawer from '../../common/_custom/SideDrawer/SideDrawer';
import { getAddBuyerData } from '../../utils/add-buyer';
import { validateBuyerData } from '../../services/validations';
import { toast } from 'react-toastify';

export const INVOICE_CONSTANTS = {
    COMPANY_NAME: 'companyName',
    PERSON_OF_CONTACT: 'personOfContact',
    CONTACT_NUMBER: 'contactNumber',
    ALTERNATE_NUMBER: 'alternateNumber',
    EMAIL: 'email',
    SHIPPING_DETAILS: 'shippingDetails',
    ADDR_LINE1: 'addr_1',
    ADDR_LINE2: 'addr_2',
    LANDMARK: 'addr_3',
    PIN: 'pincode',
    ID: 'id',
};

export const ORDER_CONSTANTS = {
    STYLE_CODE: 'styleCode',
    CUSTOMISATION: 'customisation',
    RANGES: 'ranges',
};

function Invoice(props) {
    const user = useAppSelector((state) => state.user.userData);

    const [addingBuyer, setAddingBuyer] = useState(false);
    const [creating, setCreating] = useState(false);
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
    // const [orderDetails, setOrderDetails] = useState<any>({
    //     docId: '',
    //     styles: [],
    // });
    const [selectedBuyer, setSelectedBuyer] = useState(null);
    const [showDrawer, setShowDrawer] = useState(false);

    const changeValue = (key, value) => {
        setFormData((formData) => ({
            ...formData,
            [key]: value,
        }));
    };

    const initialiseBuyerData = (buyer) => {
        // setFopr;
    };

    const resetFormData = () => {
        setFormData({
            [INVOICE_CONSTANTS.COMPANY_NAME]: '',
            [INVOICE_CONSTANTS.PERSON_OF_CONTACT]: '',
            [INVOICE_CONSTANTS.CONTACT_NUMBER]: '',
            [INVOICE_CONSTANTS.EMAIL]: '',
        });
    };

    const addBuyer = () => {
        let errorMsg = validateBuyerData(formData);
        if (errorMsg) return toast.error(errorMsg);
        const addBuyerData = getAddBuyerData(formData, user, true);
        addBuyerService(addBuyerData, user, {
            onStart: () => {
                setAddingBuyer(true);
            },
            onSuccess: (buyerId: string) => {
                // setOrderDetails({
                //     buyerId: buyerId,
                //     styles: [
                //         {
                //             [ORDER_CONSTANTS.STYLE_CODE]: '',
                //             [ORDER_CONSTANTS.CUSTOMISATION]: '',
                //         },
                //     ],
                // });
                setShowDrawer(true);
            },
            finally: () => {
                setAddingBuyer(false);
            },
        });
    };

    const createOrder = () => {
        addInvoiceService(formData, user, {
            onStart: () => {
                setCreating(true);
            },
            onSuccess: (docId: string) => {
                // setOrderDetails({
                //     docId: docId,
                //     styles: [
                //         {
                //             [ORDER_CONSTANTS.STYLE_CODE]: '',
                //             [ORDER_CONSTANTS.CUSTOMISATION]: '',
                //         },
                //     ],
                // });
                setShowDrawer(true);
            },
            finally: () => {
                setCreating(false);
            },
        });
    };

    const handleCreateOrderClick = () => {
        if (formData[INVOICE_CONSTANTS.ID]) {
            setShowDrawer(true);
        } else addBuyer();
    };

    const selectBuyer = (buyer) => {
        setSelectedBuyer(buyer);
        setShowDrawer(true);
    };

    // useEffect(() => {
    //     console.log('form data', formData);
    // }, [formData]);

    return (
        <div className={styles.Invoice}>
            <div className={styles.Left}>
                <Company
                    addBuyer={addBuyer}
                    buyerDetailsLoading={addingBuyer}
                    handleCreateOrderClick={handleCreateOrderClick}
                    formData={formData}
                    changeValue={changeValue}
                    creating={creating}
                />

                {/* {!orderDetails?.docId && <OrderDetails orderDetails={orderDetails} />} */}
                {showDrawer && (
                    <SideDrawer onClose={() => setShowDrawer(false)}>
                        <SideDrawer.Header>Order Details</SideDrawer.Header>
                        <OrderDetails selectedBuyer={selectedBuyer} />
                    </SideDrawer>
                )}
            </div>

            <div className={styles.Right}>
                <ExistingBuyers
                    setFormData={setFormData}
                    formData={formData}
                    resetFormData={resetFormData}
                    selectBuyer={selectBuyer}
                />
            </div>
        </div>
    );
}

export default Invoice;
