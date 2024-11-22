import {
    CURRENT_USER,
    DELETE_USER,
    ERROR_USER,
    LOAD_USER,
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    RESET_PASSWORD,
    UPDATE_USER
} from "../ActionTypes/ActionTypes";
import axios from "axios";

// Base URL
const baseURL = "http://localhost:8000/api/user";

// Action pour le login de l'utilisateur
export const loginUser = ({ email, password, role }) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const response = await axios.post(`${baseURL}/login`, { email, password, role });
        dispatch({
            type: LOGIN_USER,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR_USER,
            payload: error,
        });
    }
};

// Action pour le logout de l'utilisateur
export const logoutUser = () => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        dispatch({
            type: LOGOUT_USER,
        });
    } catch (error) {
        dispatch({
            type: ERROR_USER,
            payload: error,
        });
    }
};

// Action pour enregistrer un nouvel utilisateur
export const registerUser = (newUser) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const response = await axios.post(`${baseURL}/register`, newUser);
        dispatch({
            type: REGISTER_USER,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR_USER,
            payload: error,
        });
    }
};

// Action pour supprimer un utilisateur par ID
export const deleteUser = (_id) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const response = await axios.delete(`${baseURL}/delete/${_id}`);
        dispatch({
            type: DELETE_USER,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR_USER,
            payload: error,
        });
    }
};

// Action pour réinitialiser le mot de passe d'un utilisateur
export const resetPasswordUser = (_id, newPassword) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const response = await axios.put(`${baseURL}/resetPassword/${_id}`, { newPassword });
        dispatch({
            type: RESET_PASSWORD,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR_USER,
            payload: error,
        });
    }
};

// Action pour obtenir l'utilisateur actuel
export const current = () => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const config = {
            headers: { authorization: localStorage.getItem('token') },
        };
        console.log(config)
        const response = await axios.post(`${baseURL}/current`, config);
        dispatch({
            type: CURRENT_USER,
            payload: response.data,
        });
    } catch (error) {  
        dispatch({
            type: ERROR_USER,
            payload: error,
        });
    }
};
// Action pour mettre à jour un utilisateur par ID
export const updateUser = (_id, updatedUser) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const response = await axios.put(`${baseURL}/update/${_id}`, updatedUser);
        dispatch({
            type: UPDATE_USER,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR_USER,
            payload: error,
        });
    }
};
