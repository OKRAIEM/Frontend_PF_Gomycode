import axios from "axios";
import {
    ADD_RESOURCE,
    DELETE_RESOURCE,
    ERROR_RESOURCE,
    GET_RESOURCE_BY_ID,
    GET_ALL_RESOURCES,
    LOAD_RESOURCES,
    UPDATE_RESOURCE
} from "../ActionTypes/ActionTypes";

// Add a resource
export const addResource = (newResource) => async (dispatch) => {
    dispatch({ type: LOAD_RESOURCES });
    try {
        const response = await axios.post("http://localhost:8000/api/resources/create", newResource);
        console.log(newResource)
        dispatch({
            type: ADD_RESOURCE,
            payload: response.data.newResource, // Ensure you're accessing the correct property
        });
    } catch (error) {
        dispatch({
            type: ERROR_RESOURCE,
            payload: error,
        });
    }
};

// Update a resource
export const updateResource = (id, updatedData) => async (dispatch) => {
    dispatch({ type: LOAD_RESOURCES });
    try {
        const response = await axios.put(`http://localhost:8000/api/resources/update/${id}`, updatedData);
        dispatch({
            type: UPDATE_RESOURCE,
            payload: response.data.updatedRessource,
        });
    } catch (error) {
        dispatch({
            type: ERROR_RESOURCE,
            payload: error,
        });
    }
};

// Delete a resource
export const deleteResource = (id) => async (dispatch) => {
    dispatch({ type: LOAD_RESOURCES });
    try {
        await axios.delete(`http://localhost:8000/api/resources/delete/${id}`);
        dispatch({
            type: DELETE_RESOURCE,
            payload: id, // Pass the resource ID instead of the entire resource
        });
        dispatch(getAllResources()); // Reload all resources after deletion
    } catch (error) {
        dispatch({
            type: ERROR_RESOURCE,
            payload: error,
        });
    }
};

// Get a resource by ID
export const getResourceById = (id) => async (dispatch) => {
    dispatch({ type: LOAD_RESOURCES });
    try {
        const response = await axios.get(`http://localhost:8000/api/resources/getbyID/${id}`);
        dispatch({
            type: GET_RESOURCE_BY_ID,
            payload: response.data.ressource,
        });
    } catch (error) {
        dispatch({
            type: ERROR_RESOURCE,
            payload: error,
        });
    }
};

// Get all resources
export const getAllResources = () => async (dispatch) => {
    dispatch({ type: LOAD_RESOURCES });
    try {
        const response = await axios.get("http://localhost:8000/api/resources/getAll");
        dispatch({
            type: GET_ALL_RESOURCES,
            payload: response.data.ressources,
        });
    } catch (error) {
        dispatch({
            type: ERROR_RESOURCE,
            payload: error,
        });
    }
};
