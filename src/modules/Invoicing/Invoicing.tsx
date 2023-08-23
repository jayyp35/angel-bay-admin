import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Invoicing.module.scss';
import ExistingBuyers from './components/ExistingBuyers/ExistingBuyers';
import Company from './components/Company/Company';
import { addBuyerService, addInvoiceService, getBuyers } from '../../services/services';
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
    CITY: 'city',
    STATE: 'state',
    LANDMARK: 'addr_3',
    PINCODE: 'pincode',
    ID: 'id',
};

export const ORDER_CONSTANTS = {
    STYLE_CODE: 'styleCode',
    COMMENTS: 'comments',
    CUSTOMISATION: 'customisation',
    UPCHARGE: 'upcharge',
    ADDITIONAL_CHARGE: 'additionalCharge',
};

function Invoice(props) {
    const {
        COMPANY_NAME,
        PERSON_OF_CONTACT,
        CONTACT_NUMBER,
        EMAIL,
        ADDR_LINE1,
        ADDR_LINE2,
        CITY,
        STATE,
        LANDMARK,
        PINCODE,
        SHIPPING_DETAILS,
    } = INVOICE_CONSTANTS;
    const user = useAppSelector((state) => state.user.userData);

    const [addingBuyer, setAddingBuyer] = useState(false);
    const [creating, setCreating] = useState(false);
    const [formData, setFormData] = useState({
        [COMPANY_NAME]: '',
        [PERSON_OF_CONTACT]: '',
        [CONTACT_NUMBER]: '',
        [EMAIL]: '',
    });
    const [shippingDetails, setShippingDetails] = useState({
        [ADDR_LINE1]: '',
        [ADDR_LINE2]: '',
        [CITY]: '',
        [STATE]: '',
        [LANDMARK]: '',
        [PINCODE]: '',
    });

    const [selectedBuyer, setSelectedBuyer] = useState(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const [buyers, setBuyers] = useState<any>([]);

    const changeValue = (key, value) => {
        setFormData((formData) => ({
            ...formData,
            [key]: value,
        }));
    };
    const changeShippingValue = (key, value) => {
        setShippingDetails((shippingDetails) => ({
            ...shippingDetails,
            [key]: value,
        }));
    };

    const initialiseBuyerData = (buyer) => {
        if (buyer) {
            setFormData({
                [COMPANY_NAME]: buyer?.[COMPANY_NAME] || '',
                [PERSON_OF_CONTACT]: buyer?.[PERSON_OF_CONTACT] || '',
                [CONTACT_NUMBER]: buyer?.[CONTACT_NUMBER] || '',
                [EMAIL]: buyer?.[EMAIL] || '',
            });
        }
        if (buyer?.[SHIPPING_DETAILS]) {
            setShippingDetails({
                [ADDR_LINE1]: buyer?.[SHIPPING_DETAILS]?.[ADDR_LINE1] || '',
                [ADDR_LINE2]: buyer?.[SHIPPING_DETAILS]?.[ADDR_LINE2] || '',
                [CITY]: buyer?.[SHIPPING_DETAILS]?.[CITY] || '',
                [STATE]: buyer?.[SHIPPING_DETAILS]?.[STATE] || '',
                [LANDMARK]: buyer?.[SHIPPING_DETAILS]?.[LANDMARK] || '',
                [PINCODE]: buyer?.[SHIPPING_DETAILS]?.[PINCODE] || '',
            });
        } else {
            setShippingDetails({
                [ADDR_LINE1]: '',
                [ADDR_LINE2]: '',
                [CITY]: '',
                [STATE]: '',
                [LANDMARK]: '',
                [PINCODE]: '',
            });
        }
    };

    const resetFormData = () => {
        setFormData({
            [COMPANY_NAME]: '',
            [PERSON_OF_CONTACT]: '',
            [CONTACT_NUMBER]: '',
            [EMAIL]: '',
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
                setShowDrawer(true);
            },
            finally: () => {
                setAddingBuyer(false);
            },
        });
    };

    const fetchBuyers = (searchTerm) => {
        getBuyers(
            { searchTerm: searchTerm, limit: 10 },
            {
                onSuccess: (data) => setBuyers([...data]),
            },
        );
    };

    // const createOrder = () => {
    //     addInvoiceService(formData, user, {
    //         onStart: () => {
    //             setCreating(true);
    //         },
    //         onSuccess: (docId: string) => {
    //             // setOrderDetails({
    //             //     docId: docId,
    //             //     styles: [
    //             //         {
    //             //             [ORDER_CONSTANTS.STYLE_CODE]: '',
    //             //             [ORDER_CONSTANTS.CUSTOMISATION]: '',
    //             //         },
    //             //     ],
    //             // });
    //             setShowDrawer(true);
    //         },
    //         finally: () => {
    //             setCreating(false);
    //         },
    //     });
    // };

    const handleCreateOrderClick = () => {
        if (formData[INVOICE_CONSTANTS.ID]) {
            setShowDrawer(true);
        } else addBuyer();
    };

    const selectBuyer = (buyer) => {
        setSelectedBuyer(buyer);
        initialiseBuyerData(buyer);
        setShowDrawer(true);
    };

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

                {showDrawer && (
                    <SideDrawer
                        onClose={() => {
                            setShowDrawer(false);
                            fetchBuyers('');
                        }}>
                        <SideDrawer.Header>Order Details</SideDrawer.Header>
                        <OrderDetails
                            selectedBuyer={selectedBuyer}
                            formData={formData}
                            shippingDetails={shippingDetails}
                            setSelectedBuyer={setSelectedBuyer}
                            setFormData={setFormData}
                            changeValue={changeValue}
                            changeShippingValue={changeShippingValue}
                        />
                    </SideDrawer>
                )}
            </div>

            <div className={styles.Right}>
                <ExistingBuyers
                    buyers={buyers}
                    setBuyers={setBuyers}
                    fetchBuyers={fetchBuyers}
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
