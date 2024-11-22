import {
    LOAD_RESOURCES,
    ADD_RESOURCE,
    DELETE_RESOURCE,
    UPDATE_RESOURCE,
    ERROR_RESOURCE,
    GET_RESOURCE_BY_ID,
    GET_ALL_RESOURCES
} from "../ActionTypes/ActionTypes";

const initialState = {
    resources: [],
    resource: null,
    loading: false,
    error: null,
};

const ResourceReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_RESOURCES:
            return { ...state, loading: true };
        case GET_ALL_RESOURCES:
            return { ...state, loading: false, resources: action.payload, error: null };
        case GET_RESOURCE_BY_ID:
            return { ...state, loading: false, resource: action.payload, error: null };
        case ADD_RESOURCE:
            return { ...state, loading: false, resources: [...state.resources, action.payload], error: null };
        case DELETE_RESOURCE:
            return { 
                ...state, 
                loading: false, 
                resources: state.resources.filter(res => res._id !== action.payload), // Ensure using _id
                error: null 
            };
        case UPDATE_RESOURCE:
            return {
                ...state,
                loading: false,
                resources: state.resources.map(res => (res._id === action.payload._id ? action.payload : res)), // Ensure using _id
                error: null,
            };
        case ERROR_RESOURCE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default ResourceReducer;
