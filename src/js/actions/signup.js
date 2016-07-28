import constants from "../constants";
import {get, post, patch} from "./common";
import {parseJSON} from "../utils";
import {push} from "redux-router";

let {
    STEP_1_DATA_ADDED_SUCCESSFULLY, STEP_2_DATA_ADDED_SUCCESSFULLY, STEP_3_DATA_ADDED_SUCCESSFULLY, SIGNUP_USER_REQUEST,
    SIGNUP_USER_FAILURE, SIGNUP_USER_SUCCESS, ON_BACK_CLICK, STATUS_ADDED_SUCCESSFULLY, DATA_ADDED_ON_BACK_CLICK,
    SHOW_SIGN_UP_SUCCESS_COMP, UPDATE_USER_REQUEST, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS, UPDATE_USER_INFO,
    UPDATE_PROJECT_INFO, DATA_UPDATED_ON_PROJECT_BACK_CLICK, DATA_UPDATED_ON_BU_BACK_CLICK, ADD_UPDATE_CLICK,
    ADD_NEW_PROJECT, PROJECT_DELETED, PROJECT_SELECTED, ROLE_ADDED, DOJ_ADDED, DOL_ADDED, REPORTING_ADDED,
    BILLING_ADDED, ADD_NEW_BUSINESS_UNIT, BU_DELETED, BU_NAME_ADDED, BU_DOJ_ADDED, BU_DOL_ADDED, EDIT_NEW_PROJECT,
    EDIT_NEW_BU, BILLING_STATUS_ADDED, BILLING_PERCENT_ADDED, RATE_PROGRESSION_ADDED, CLIENT_BONUS_ADDED,
    EXPENSES_RECOVERY_ADDED, CLIENT_INVOICE_ADDED, BILIING_START_ADDED, BILIING_END_ADDED
} = constants;

export function saveStatus(status) {

    return (dispatch)=> {
        dispatch({
            type: STATUS_ADDED_SUCCESSFULLY,
            payload: status
        });
    }

}

export function updateUserInfo(data) {

    return (dispatch)=> {
        dispatch({
            type: UPDATE_USER_INFO,
            payload: data
        });
    }

}

export function updateProjectInfo(data) {
    console.log("------------------------");
    console.log(data)
    return (dispatch)=> {
        dispatch({
            type: UPDATE_PROJECT_INFO,
            payload: data
        });
    }

}

export function addUpdateClick(action) {

    return (dispatch)=> {
        dispatch({
            type: ADD_UPDATE_CLICK,
            payload: action
        });
    }

}

export function addUserInfo(data) {

    return (dispatch)=> {
        dispatch({
            type: STEP_1_DATA_ADDED_SUCCESSFULLY,
            payload: data
        });
    }

}

export function addProjectInfo(data) {

    return (dispatch)=> {
        dispatch({
            type: STEP_2_DATA_ADDED_SUCCESSFULLY,
            payload: data
        });
    }

}

export function buNameAdded(rowNumber, name) {

    return {
        type: BU_NAME_ADDED,
        payload: {
            rowNumber: rowNumber,
            name: name
        }
    }

}

export function buDateOfJoiningAdded(rowNumber, dateOfJoining) {

    return {
        type: BU_DOJ_ADDED,
        payload: {
            rowNumber: rowNumber,
            dateOfJoining: dateOfJoining
        }
    }

}

export function buDateOfLeavingAdded(rowNumber, dateOfLeaving) {

    return {
        type: BU_DOL_ADDED,
        payload: {
            rowNumber: rowNumber,
            dateOfLeaving: dateOfLeaving
        }
    }

}

export function onBackClick(circleStatus) {

    return (dispatch)=> {
        dispatch({
            type: ON_BACK_CLICK,
            payload: circleStatus
        });
    }

}

export function onComponentRemoved(data) {

    return (dispatch)=> {
        dispatch({
            type: DATA_ADDED_ON_BACK_CLICK,
            payload: data
        });
    }

}

export function projectDeleted(rowNumber) {

    return {
        type: PROJECT_DELETED,
        payload: {
            rowNumber: rowNumber,
        }
    }

}


export function buDeleted(rowNumber) {

    return {
        type: BU_DELETED,
        payload: {
            rowNumber: rowNumber,
        }
    }

}


export function projectNameSelected(rowNumber, projectName) {

    return {
        type: PROJECT_SELECTED,
        payload: {
            rowNumber: rowNumber,
            projectName: projectName
        }
    }

}

export function projectRoleAdded(rowNumber, roleName) {

    return {
        type: ROLE_ADDED,
        payload: {
            rowNumber: rowNumber,
            roleName: roleName
        }
    }

}

export function dateOfJoiningAdded(rowNumber, dateOfJoining) {

    return {
        type: DOJ_ADDED,
        payload: {
            rowNumber: rowNumber,
            dateOfJoining: dateOfJoining
        }
    }

}

export function dateOfLeavingAdded(rowNumber, dateOfLeaving) {

    return {
        type: DOL_ADDED,
        payload: {
            rowNumber: rowNumber,
            dateOfLeaving: dateOfLeaving
        }
    }

}

export function billingStartDateAdded(rowNumber, billingStartDate) {

    return {
        type: BILIING_START_ADDED,
        payload: {
            rowNumber: rowNumber,
            billingStartDate: billingStartDate
        }
    }

}

export function billingEndDateAdded(rowNumber, billingEndDate) {

    return {
        type: BILIING_END_ADDED,
        payload: {
            rowNumber: rowNumber,
            billingEndDate: billingEndDate
        }
    }

}

export function reportingAdded(rowNumber, reportingID, reporting) {

    return {
        type: REPORTING_ADDED,
        payload: {
            rowNumber: rowNumber,
            reporting: {
                id: reportingID,
                name: reporting
            }
        }
    }

}

/*export function billingRateTypeAdded(rowNumber, roleName) {

 return {
 type: ROLE_ADDED,
 payload: {
 rowNumber: rowNumber,
 roleName: roleName
 }
 }

 }*/

export function billingRateAdded(rowNumber, billing, billingType) {

    return {
        type: BILLING_ADDED,
        payload: {
            rowNumber: rowNumber,
            billing: {
                rate: billing,
                type: billingType
            }
        }
    }

}

export function billingStatusAdded(rowNumber, billingStatus) {

    return {
        type: BILLING_STATUS_ADDED,
        payload: {
            rowNumber: rowNumber,
            billingStatus: billingStatus
        }
    }

}

export function billingPercentAdded(rowNumber, billingPercent) {

    return {
        type: BILLING_PERCENT_ADDED,
        payload: {
            rowNumber: rowNumber,
            billingPercent: billingPercent
        }
    }

}

export function rateProgressAdded(rowNumber, rateProgression) {

    return {
        type: RATE_PROGRESSION_ADDED,
        payload: {
            rowNumber: rowNumber,
            rateProgression: rateProgression
        }
    }

}

export function clientBonusAdded(rowNumber, clientBonus) {

    return {
        type: CLIENT_BONUS_ADDED,
        payload: {
            rowNumber: rowNumber,
            clientBonus: clientBonus
        }
    }

}

export function expensesRecoveryAdded(rowNumber, expensesRecovery) {

    return {
        type: EXPENSES_RECOVERY_ADDED,
        payload: {
            rowNumber: rowNumber,
            expensesRecovery: expensesRecovery
        }
    }

}

export function clientInvoiceAmountAdded(rowNumber, clientInvoiceAmount) {

    return {
        type: CLIENT_INVOICE_ADDED,
        payload: {
            rowNumber: rowNumber,
            clientInvoiceAmount: clientInvoiceAmount
        }
    }

}

export function onProjectComponentRemoved(data) {

    return (dispatch)=> {
        dispatch({
            type: DATA_UPDATED_ON_PROJECT_BACK_CLICK,
            payload: data
        });
    }

}

export function onBUComponentRemoved(data) {

    return (dispatch)=> {
        dispatch({
            type: DATA_UPDATED_ON_BU_BACK_CLICK,
            payload: data
        });
    }

}

export function submitEmployeeDetails(signupData) {
    console.log("==SUBMIT======");
    console.log(signupData);
    console.log("========");
    return (dispatch)=> {
        dispatch({type: SIGNUP_USER_REQUEST});

        let endPointURL = '/users';

        post(endPointURL, signupData)
            .then((response)=> {
                dispatch({
                    type: SIGNUP_USER_SUCCESS,
                    payload: response
                });
                dispatch(push("/dashboard/home"));
                // dispatch({type: SHOW_SIGN_UP_SUCCESS_COMP});
            })
            .catch(error=> {

                parseJSON(error).then((errorObj)=> {
                    console.log(errorObj.message);
                    dispatch({
                        type: SIGNUP_USER_FAILURE,
                        payload: errorObj.message
                    });
                })
            })
    }

}


export function addNewProject() {

    return {
        type: ADD_NEW_PROJECT
    }

}

export function updateProject(projectData, count) {

    return (dispatch)=> {
        dispatch({
            type: EDIT_NEW_PROJECT,
            payload: {
                data: projectData,
                count: count
            }
        });
    }

}

export function updateBU(buData) {

    return (dispatch)=> {
        dispatch({
            type: EDIT_NEW_BU,
            payload: {
                data: buData,
            }
        });
    }

}

export function addNewBusinessUnit() {

    return {
        type: ADD_NEW_BUSINESS_UNIT
    }

}

export function updateEmployeeDetails(signupData, id) {
    console.log(signupData);
    return (dispatch)=> {
        dispatch({type: UPDATE_USER_REQUEST});

        let endPointURL = '/users/' + id;

        patch(endPointURL, signupData)
            .then((response)=> {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    payload: signupData
                });
                dispatch(push("/dashboard/home"));
                // dispatch({type: SHOW_SIGN_UP_SUCCESS_COMP});
            })
            .catch(error=> {
                dispatch({type: UPDATE_USER_FAILURE});
                parseJSON(error).then((errorObj)=> {
                    console.log(errorObj.message);
                    dispatch({
                        type: UPDATE_USER_FAILURE,
                        payload: errorObj.message
                    });
                })
            })
    }

}
