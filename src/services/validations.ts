// import CONSTANTS
import { INVOICE_CONSTANTS } from '../modules/Invoicing/Invoicing';

export const validateBuyerData = (formData) => {
    if (!(formData[INVOICE_CONSTANTS.COMPANY_NAME] || formData[INVOICE_CONSTANTS.CONTACT_NUMBER]))
        return 'Enter either the Company Name or Contact Number';
    return '';
};
