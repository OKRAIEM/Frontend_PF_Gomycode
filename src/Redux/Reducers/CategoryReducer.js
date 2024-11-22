import {
    LOAD_CATEGORIES, // Remplacez LOAD_CATEGORY par LOAD_CATEGORIES
    ADD_CATEGORY,
    DELETE_CATEGORY,
    UPDATE_CATEGORY,
    ERROR_CATEGORY,
    GET_CATEGORY_BY_ID,
    GET_ALL_CATEGORIES
} from "../ActionTypes/ActionTypes";

const initialState = {
    categories: [],
    category: null,
    loading: false,
    error: null,
};

const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CATEGORIES: // Correction ici
            return { ...state, loading: true };
        case GET_ALL_CATEGORIES:
            return { ...state, loading: false, categories: action.payload, error: null };
        case GET_CATEGORY_BY_ID:
            return { ...state, loading: false, category: action.payload, error: null };
        case ADD_CATEGORY:
            return { ...state, loading: false, categories: [...state.categories, action.payload], error: null };
        case DELETE_CATEGORY:
            return { ...state, loading: false, categories: state.categories.filter(cat => cat.id !== action.payload), error: null };
        case UPDATE_CATEGORY:
            return {
                ...state,
                loading: false,
                categories: state.categories.map(cat => (cat.id === action.payload.id ? action.payload : cat)),
                error: null,
            };
        case ERROR_CATEGORY:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default CategoryReducer;
