import {createStore, combineReducers} from "redux";
import { reducer as formReducer } from 'redux-form'

import snackReducer from "./reducers/snackReducer";

const store = createStore(
    combineReducers({snack: snackReducer,form: formReducer})
);

export default store;

