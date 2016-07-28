import constants from "../constants";
import {push} from "redux-router";
import config from "../config";
import {checkHttpStatus, parseJSON} from "../utils";
import {get, post} from "./common";

let {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, CLEAR_LOGIN_ERROR_MESSAGE, LOG_OUT, CLEAN_REDUCER_DATA, SET_REDIRECT_URL_PATH} = constants;

export function userLoggedIn(username, userObject, token) {

    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            username: username,
            userObject: userObject,
            token: token
        }
    }

}

export function authenticateUserToken(token, redirectPath) {
    sessionStorage.setItem('id_token', token);
    return (dispatch) => {
        dispatch({type: LOGIN_USER_REQUEST});

        let url = '/login';

        post(url, {id_token: token})
            .then((response)=> {
                let token = response.token;
                sessionStorage.setItem('token', token);
                getUsers()
                    .then((userResponse)=> {

                        console.log("test----------");
                        sessionStorage.setItem('userResponse', userResponse);

                        saveTosessionStorage(response.user.firstName, '', JSON.stringify(userResponse), '', '', token);

                        // If no path specified in URL after login then landing page should be as per role
                        if (!redirectPath) {
                            redirectPath = getDispatchUrl("");
                        }


                        dispatch(userLoggedIn(response.user.firstName, userResponse, token));

                        dispatch(push(redirectPath));
                    })

            }).catch(error=> {

            let errorDescription = '';
            if (error.statusText == 'Failed to fetch') {
                errorDescription = 'Server is down. Please try again after some time.';
            }

            if (error.statusText == 'Unauthorized' || error.statusText == 'Bad Request') {
                errorDescription = 'Bad Credentials.';
            }

            dispatch({
                type: LOGIN_USER_FAILURE,
                payload: {
                    statusText: errorDescription
                }
            });
        })
    }

}

function saveTosessionStorage(firstName, username, userObject, roleName, orgObject, token) {

    sessionStorage.setItem('firstName', firstName);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('userObject', userObject);
    sessionStorage.setItem('roles', roleName);
    sessionStorage.setItem('orgObject', orgObject);
    sessionStorage.setItem('token', token);
    //var object = {value: token, timestamp: new Date().getTime()}
    sessionStorage.setItem("tokenTime", new Date().getTime());
}

function getMe() {

    let endPointURL = 'me';
    return get(endPointURL);

}

function getDispatchUrlFromUserRole(userResponse) {

    let role = "";
    let url = _.map(userResponse, (roles) => {
        role = roles.name;
        return getDispatchUrl(role);
    });
    return url[0];

}

function getUserRole(userResponse) {

    let role = _.map(userResponse, (roles) => {
        return roles.name;
    });
    return role;

}

function getDispatchUrl(role) {

    switch (role) {
        case '':
            return "dashboard/home";
        // case 'AccountOwner':
        //     return "dashboard/subscriptions";
        default:
            return "/";
    }

}

function getEmployees() {

    let endPointURL = 'employees';
    return get(endPointURL);

}

function getUsers() {

    let endPointURL = '/users';
    return get(endPointURL);

}


export function emptyStatuxText() {

    return (dispatch) => {
        dispatch({
            type: CLEAR_LOGIN_ERROR_MESSAGE,
            payload: {
                statusText: null
            }
        });
    }

}

export function logout() {

    return (dispatch) => {

        sessionStorage.clear();

        dispatch({
            type: LOG_OUT
        });

        dispatch({
            type: CLEAN_REDUCER_DATA
        });

        dispatch(push('/'));
    }

}

export function checkedIfUserLoggedIn() {

    return (dispatch) => {
        let roles = sessionStorage.getItem('roles');
        let url = getDispatchUrl(roles);
        dispatch(push(url));
    }

}

export function setUrlPath(redirectURL) {

    return {
        type: SET_REDIRECT_URL_PATH,
        payload: redirectURL
    }

}
