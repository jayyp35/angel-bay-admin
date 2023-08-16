// import { CONSTANTS } from "./constants";
import { CONSTANTS } from './constants';

interface ViewStylesState {
    searchTerm: string;
    stylesData: StyleData[];
}

interface StyleData {
    categories: string[];
    description: string;
    images: string[];
    materials: string[];
    name: string;
    price: string;
    serialNumber: string;
    styleCode: string;
}

const initialState: ViewStylesState = {
    searchTerm: '',
    stylesData: [],
};

const setSearchTerm = (state, action) => {
    return {
        ...state,
        searchTerm: action.payload,
    };
};

const setStyleData = (state, action) => {
    return {
        ...state,
        stylesData: [...action.payload],
    };
};

const reducer = (state = initialState, action: any): ViewStylesState => {
    switch (action.type) {
        // case CONSTANTS.SET_SEARCH_TERM: return setSearchTerm(state, action);
        // case CONSTANTS.GET_STYLE_DATA_SUCCESS: return setStyleData(state, action);
        default:
            return state;
    }
};

export default reducer;
