import constants from "../constants";

let {
    SHOW_LOGIN, SHOW_HOME, SHOW_FORGOT_PASSWORD, SHOW_FORGOT_MESSAGE, SHOW_SIGN_UP, SHOW_SIGN_UP_SUCCESS_COMP, SIGNUP_USER_SUCCESS,
    GOOGLE_LOGIN
} = constants;

export function authGoogle(offline, redirectUri) {
    const auth2 = window.gapi.auth2.getAuthInstance();
    //const {offline, redirectUri, callback} = this.props;
    if (offline) {
        const options = {
            'redirect_uri': redirectUri
        };
        auth2.grantOfflineAccess(options)
            .then((data) => {
                console.log(data);
            });
    } else {
        auth2.signIn()
            .then((response) => {
                console.log(response);

            });
    }
}

export function gcall(resp) {
    const responseGoogle = (resp) => {
        console.log(resp);
    };
    return (dispatch) => {
        dispatch({
            type: GOOGLE_LOGIN,
            payload: resp
        }).catch(error=> {

            let errorDescription = '';

            if (error.message == 'Failed to fetch') {
                errorDescription = 'Server is down. Please try again after some time.';
            }

            if (error.message == 'Unauthorized' || error.message == 'Bad Request') {
                errorDescription = 'Bad Credentials.';
            }

            dispatch({
                type: LOGIN_USER_FAILURE,
                payload: {
                    statusText: errorDescription
                }
            });
        });
    }
}

export function showHome() {

    return {
        type: SHOW_HOME
    }

}

export function showSignUpSuccessFully() {

    return {
        type: SHOW_SIGN_UP_SUCCESS_COMP
    }

}

export function showSignUp() {

    return (dispatch)=> {
        dispatch({type: SHOW_SIGN_UP});
        dispatch({type: SIGNUP_USER_SUCCESS});
    }

}
