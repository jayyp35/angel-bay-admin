import { CONSTANTS } from "../store/constants/style-constants"

export const modifyStyleFormData = (formData) => {
  return {
    ...formData,
    [CONSTANTS.MATERIALS]: formData[CONSTANTS.MATERIALS].map((material) => material.value),
    [CONSTANTS.CATEGORIES]: formData[CONSTANTS.CATEGORIES].map((category) => category.value)
  }
}