import { Timestamp } from 'firebase/firestore';
import { CONSTANTS, categoriesMap, materialsMap } from '../store/constants/style-constants';
import { getAllSubstrings } from './utils';
import dayjs from 'dayjs';

export const modifyStyleFormData = (formData, isAdd = false, user) => {
    let styleCodeSearches = getAllSubstrings(formData[CONSTANTS.STYLE_CODE]);
    let styleNumberSearches = getAllSubstrings(formData[CONSTANTS.SERIAL]);

    return {
        ...formData,
        [CONSTANTS.MATERIALS]: formData[CONSTANTS.MATERIALS].map((material) => material.value),
        [CONSTANTS.CATEGORIES]: formData[CONSTANTS.CATEGORIES].map((category) => category.value),
        [CONSTANTS.KEYWORDS]: [
            ...formData[CONSTANTS.KEYWORDS]?.split(' ')?.map((style) => style?.toLowerCase?.()),
        ],
        z_searchTerms: [...styleNumberSearches, ...styleCodeSearches],
        ...(isAdd
            ? {
                  createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                  createdBy: user?.email,
              }
            : {
                  updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                  updatedBy: user?.email,
              }),
    };
};

export const getStyleFormData = (styleData) => {
    return {
        ...styleData,
        [CONSTANTS.MATERIALS]: styleData[CONSTANTS.MATERIALS].map((materialCode) => ({
            value: materialCode,
            label: materialsMap[materialCode],
        })),
        [CONSTANTS.CATEGORIES]: styleData[CONSTANTS.CATEGORIES].map((categoryCode) => ({
            value: categoryCode,
            label: categoriesMap[categoryCode],
        })),
        [CONSTANTS.KEYWORDS]: styleData[CONSTANTS.KEYWORDS].join(' '),
    };
};
