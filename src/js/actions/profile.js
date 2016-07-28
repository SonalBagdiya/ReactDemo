import {FETCH_ACCOUNT_DATA_REQUEST} from "../constants";

export function fetchAccountDataRequest() {

    return {
        type: FETCH_ACCOUNT_DATA_REQUEST
    }

}

export function fetchAccountDataRequestFail(failData) {

    return {
        type: FAIL_ACCOUNT_DATA_REQUEST,
        payload: failData
    }

}

export function fetchAccountData() {

    return function (dispatch) {
        dispatch(fetchAccountDataRequest());
    }

}

export function getAuthorization() {

    return dispatch => {
    }

}
