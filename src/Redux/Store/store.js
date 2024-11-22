import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk"; // Import correct de redux-thunk
import rootReducer from "../Reducers"; // Assurez-vous que ce chemin est correct

// Création du store avec rootReducer et redux-thunk comme middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;