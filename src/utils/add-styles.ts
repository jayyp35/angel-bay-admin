import { CONSTANTS, categoriesMap, materialsMap } from "../store/constants/style-constants"

export const modifyStyleFormData = (formData) => {
  return {
    ...formData,
    [CONSTANTS.MATERIALS]: formData[CONSTANTS.MATERIALS].map((material) => material.value),
    [CONSTANTS.CATEGORIES]: formData[CONSTANTS.CATEGORIES].map((category) => category.value)
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