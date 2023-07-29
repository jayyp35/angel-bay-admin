import { CONSTANTS } from "./constants"

export const setUserData = (payload) => {
  return {
    type: CONSTANTS.SET_USER_DATA,
    payload
  }
}