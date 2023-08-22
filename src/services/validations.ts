// import CONSTANTS
import { INVOICE_CONSTANTS } from '../modules/Invoicing/Invoicing';

export const validateBuyerData = (formData) => {
    if (!(formData[INVOICE_CONSTANTS.COMPANY_NAME] || formData[INVOICE_CONSTANTS.CONTACT_NUMBER]))
        return 'Enter either the Company Name or Contact Number';
    return '';
};

export const validateShippingData = (formData) => {
    if (!(formData[INVOICE_CONSTANTS.ADDR_LINE1] || formData[INVOICE_CONSTANTS.ADDR_LINE2]))
        return 'Address Line 1 or Address Line 2 is mandatory';
    if (!formData[INVOICE_CONSTANTS.CITY]) return 'Please Enter City';
    if (!formData[INVOICE_CONSTANTS.STATE]) return 'Please Enter State';
    if (!formData[INVOICE_CONSTANTS.PINCODE]) return 'Please Enter Pincode';
    return '';
};
