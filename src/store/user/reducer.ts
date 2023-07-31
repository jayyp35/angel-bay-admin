import { CONSTANTS } from "./constants";

interface UserState {
  userData: UserData
}

interface UserData {
  displayName: string,
  email: string,
  metadata: UserMetadata,
  phoneNumber: string,
  photoURL: string,
  uid: string
}

interface UserMetadata {
  createdAt: string,
  creationTime: string,
  lastLoginAt: string,
  LastSignInTime: string
}

const initialState: UserState = {
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

const reducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case CONSTANTS.SET_USER_DATA: return setUserData(state, action);
    default: return state;
  }
}

export default reducer;