import { Timestamp } from 'firebase/firestore';
import { CONSTANTS, categoriesMap, materialsMap } from '../store/constants/style-constants';
import { getAllSubstrings } from './utils';
import dayjs from 'dayjs';

export const modifyStyleFormData = (formData, isAdd = false, user) => {
    let styleCodeSearches = getAllSubstrings(formData[CONSTANTS.STYLE_CODE]);
    let styleNumberSearches = getAllSubstrings(formData[CONSTANTS.SERIAL]);
    let keywords = formData[CONSTANTS.KEYWORDS]?.split(' ')?.map((style) => style?.toLowerCase?.());
    let stylesInSet = getStylesInSetPayload(formData[CONSTANTS.STYLES_IN_SET]);
    return {
        ...formData,
        [CONSTANTS.MATERIALS]: formData[CONSTANTS.MATERIALS].map((material) => material.value),
        [CONSTANTS.CATEGORIES]: formData[CONSTANTS.CATEGORIES].map((category) => category.value),
        [CONSTANTS.KEYWORDS]: [...keywords],
        [CONSTANTS.STYLES_IN_SET]: stylesInSet,
        z_searchTerms: [...styleNumberSearches, ...styleCodeSearches, ...keywords],
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
const getStylesInSetPayload = (stylesInSet = []) => {
    return stylesInSet?.map((style: any) => ({
        name: style?.name || '',
        price: style?.price,
        styleCode: style?.styleCode || '',
        serialNumber: style?.serialNumber,
        images: style?.images || '',
    }));
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
        [CONSTANTS.STYLES_IN_SET]: styleData[CONSTANTS.STYLES_IN_SET].map((style) => ({
            ...style,
            label: style?.serialNumber,
            value: style?.serialNumber,
        })),
    };
};
