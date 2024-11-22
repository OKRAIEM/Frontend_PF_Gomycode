// Reducers/index.js

import { combineReducers } from "redux";
import UserReducer from "./UserReducer";       // Reducer pour le modèle User
import CategoryReducer from "./CategoryReducer"; // Reducer pour le modèle Category
import RessourceReducer from "./RessourceReducer"; // Reducer pour le modèle Ressource

// Combinaison des reducers en un reducer racine
const rootReducer = combineReducers({
  UserReducer,        // Clé "user" dans l’état global
  CategoryReducer,    // Clé "category" dans l’état global
  RessourceReducer,   // Clé "ressource" dans l’état global
});

export default rootReducer;
