// Reducers/UserReducer.js
import { toast } from "react-toastify";
import {
    LOGIN_USER, LOGOUT_USER,
    REGISTER_USER, DELETE_USER,
    RESET_PASSWORD, LOAD_USER,
    ERROR_USER, CURRENT_USER,
    UPDATE_USER
} from "../ActionTypes/ActionTypes";

// État initial pour le reducer utilisateur
const initialState = {
    user: null,
    loading: false,
    error: null,
};

const UserReducer=(state=initialState,{type,payload})=>{

console.log(payload)
    switch (type) {
        case LOAD_USER:
            return{...state,load:true}
        case LOGIN_USER:
            localStorage.setItem("token",payload.token)
            toast(payload.msg);
            return{...state,user:payload.foundUser,load:false}
        case LOGOUT_USER:
            localStorage.removeItem("token")
            toast("Logout successfully")
                return{...state,user:null,load:false}
        case REGISTER_USER:
            localStorage.setItem("token",payload.token)
            return{...state,load:false,user:payload.newUser}
        case DELETE_USER:
            localStorage.removeItem("token")
            return{...state,user:null,load:false}
        case RESET_PASSWORD:
            return{...state,load:false}
        case ERROR_USER:
            return{...state,error:payload,load:false}
        case CURRENT_USER:
            return{...state,load:false,user:payload}
        case UPDATE_USER:
            return{...state,load:false,user:payload}    
        default:
            return state
    }
}

export default UserReducer
