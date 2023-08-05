import { CONSTANTS } from "./constants"

export const setSearchTerm = (payload: string) => {
  return {
    type: CONSTANTS.SET_SEARCH_TERM,
    payload: payload
  }
}

export const setStyleData = (payload: any) => {
  return {
    type: CONSTANTS.GET_STYLE_DATA_SUCCESS,
    payload
  }
}