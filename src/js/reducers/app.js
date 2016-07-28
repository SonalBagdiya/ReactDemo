import {createReducer} from "../utils";
import _ from "lodash";

const initialState = {
    googleResponse: null,
    loginScreen: false,
    homeScreen: true,
    forgotPasswordScreen: false,
    forgotMessageScreen: false,
    signUpScreen: false,
    loading: false,
    signupSuccessComponent: false
};

export default createReducer(initialState, {

    GOOGLE_LOGIN: (state, payload) => {

        return Object.assign({}, state, {
            googleResponse: payload
        });

    },
    SHOW_HOME: (state, payload) => {
        return Object.assign({}, state, {
            loginScreen: false,
            forgotPasswordScreen: false,
            forgotMessageScreen: false,
            signUpScreen: false,
            homeScreen: true
        });
    },
    SHOW_SIGN_UP: (state, payload) => {

        return Object.assign({}, state, {
            loginScreen: false,
            signUpScreen: true,
            homeScreen: false
        });

    },
    LOGIN_USER_REQUEST: (state, payload) => {

        return Object.assign({}, state, {
            loading: true
        });

    },
    LOGIN_USER_FAILURE: (state, payload) => {

        return Object.assign({}, state, {
            loading: false
        });

    },
    LOGIN_USER_SUCCESS: (state, payload) => {

        return Object.assign({}, state, {
            loading: false
        });

    },
    SIGNUP_USER_REQUEST: (state, payload) => {

        return Object.assign({}, state, {
            loading: true
        });

    },
    SIGNUP_USER_SUCCESS: (state, payload) => {

        return Object.assign({}, state, {
            loading: false
        });

    },
    SIGNUP_USER_FAILURE: (state, payload) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    EMPLOYEES_REQUEST: (state, payload) => {

        return Object.assign({}, state, {
            loading: true
        });

    },
    FETCH_EMPLOYEES: (state, payload) => {

        return Object.assign({}, state, {
            loading: true
        });

    },
    ADD_EMPLOYEES: (state, payload) => {

        return Object.assign({}, state, {
            loading: true
        });

    },
    EMPLOYEES_RECEIVED: (state, payload) => {

        return Object.assign({}, state, {
            loading: false
        });

    },
    EMPLOYEES_EMPTY: (state, payload) => {

        return Object.assign({}, state, {
            loading: false
        });

    },
    EMPLOYEES_SELECTED: (state, payload) => {

        return Object.assign({}, state, {
            loading: false
        });

    },
    EMPLOYEE_CREATED: (state, payload) => {

        return Object.assign({}, state, {
            loading: false
        });

    },
    EMPLOYEE_CREATION_FAILED: (state, payload) => {

        return Object.assign({}, state, {
            loading: false
        });

    },
    SHOW_SIGN_UP_SUCCESS_COMP: (state, payload) => {

        return Object.assign({}, state, {
            loginScreen: false,
            forgotPasswordScreen: false,
            forgotMessageScreen: false,
            homeScreen: false,
            signUpScreen: false,
            signupSuccessComponent: true
        });

    },
    CLEAN_REDUCER_DATA: (state, payload)=> {

        return _.cloneDeep(initialState);

    },
});
