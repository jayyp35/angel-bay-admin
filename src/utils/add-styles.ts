import { CONSTANTS, categoriesMap, materialsMap } from "../store/constants/style-constants"
import { getAllSubstrings } from "./utils";

export const modifyStyleFormData = (formData) => {
  let styleCodeSearches = getAllSubstrings(formData[CONSTANTS.STYLE_CODE]);
  let styleNumberSearches = getAllSubstrings(formData[CONSTANTS.SERIAL]);;

  return {
    ...formData,
    [CONSTANTS.MATERIALS]: formData[CONSTANTS.MATERIALS].map((material) => material.value),
    [CONSTANTS.CATEGORIES]: formData[CONSTANTS.CATEGORIES].map((category) => category.value),
    z_searchTerms: [...styleNumberSearches, ...styleCodeSearches]
  }
}

export const getStyleFormData = (styleData) => {
  return {
    ...styleData,
    [CONSTANTS.MATERIALS]: styleData[CONSTANTS.MATERIALS].map((materialCode) => ({
      value: materialCode,
      label: materialsMap[materialCode]
    })),
    [CONSTANTS.CATEGORIES]: styleData[CONSTANTS.CATEGORIES].map((categoryCode) => ({
      value: categoryCode,
      label: categoriesMap[categoryCode]
    }))
  }
}