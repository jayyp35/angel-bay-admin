import { getAllSubstrings } from './utils';
import { INVOICE_CONSTANTS } from '../modules/Invoicing/Invoicing';
import { Timestamp } from 'firebase/firestore';

export const getAddBuyerData = (formData, user, isAdd = false) => {
    let companyNameSearches = getAllSubstrings(formData[INVOICE_CONSTANTS.COMPANY_NAME]);

    return {
        ...formData,
        z_searchTerms: [
            ...companyNameSearches,
            ...(formData[INVOICE_CONSTANTS.CONTACT_NUMBER]
                ? [formData[INVOICE_CONSTANTS.CONTACT_NUMBER]]
                : []),
        ],
        invoices: [],
        ...(isAdd
            ? {
                  createdAt: Timestamp.now(),
                  createdBy: user?.email,
              }
            : {
                  updatedAt: Timestamp.now(),
                  updatedBy: user?.email,
              }),
    };
};
