import { CONSTANTS } from "./constants";

const initialState = {
  userData: {
    displayName: '',
    email: '',
    metadata: {
      createdAt: '',
      creationTime: '',
      lastLoginAt: '',
      LastSignInTime: ''
    },
    phoneNumber: '',
    photoURL: '',
    uid: ''
  }
}

const setUserData = (state, action) => {
  return {
    ...state,
    userData: {
      ...action.payload
    }
  }
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CONSTANTS.SET_USER_DATA: return setUserData(state, action);
    default: return state;
  }
}

export default reducer;