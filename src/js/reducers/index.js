import {combineReducers} from "redux";
import {routerStateReducer} from "redux-router";
import auth from "./auth";
import signup from "./signup";
import app from "./app";
import employee from "./employee";
import common from "./common";

export default combineReducers({
    auth,
    app,
    signup,
    employee,
    common,
    router: routerStateReducer
});
