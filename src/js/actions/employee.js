import {get, post} from "./common";
import constants from "../constants";
import {push} from "redux-router";
import {parseJSON} from "../utils";
import _ from "lodash";

let {
    FETCH_EMPLOYEES, EMPLOYEES_RECEIVED, EMPLOYEES_SELECTED, SHOW_EMPLOYEES_DETAILS, SHOW_PROJECT_DETAILS, SHOW_BUSINESS_DETAILS, EMPLOYEE_CREATED, EMPLOYEE_CREATION_FAILED, CURRENT_PAGE_OF_EMPLOYEE_LIST, CLEAN_HELP_BLOCK_ERROR_MESSAGE, EMPLOYEES_REQUEST, ADD_EMPLOYEES, EMPLOYEES_EMPTY
} = constants;

export function fetchUsers(currentPage, paginationLimit) {

    return (dispatch) => {

        let endPointURL = '/users/' + currentPage;

        get(endPointURL)
            .then((response)=> {

                let employeesList = response.docs;
                let totalEmployeesList = response.total;

                if (_.size(employeesList)>0) {
                    dispatch({type: FETCH_EMPLOYEES});

                    /*  getEmployeeDetails(employeesList[0]._id)
                     .then((orgResponse)=> {*/
                    dispatch({
                        type: EMPLOYEES_RECEIVED,
                        payload: {
                            totalEmployeeList: totalEmployeesList,
                            employeeList: employeesList,
                            selectedEmployee: employeesList[0],
                            //employeeDetails: orgResponse,
                            currentPage: currentPage
                        }
                    });
                    /* })*/

                }
                else {
                    dispatch({type: EMPLOYEES_EMPTY});
                }

            })

    }

}

export function selectEmployee(employee) {
    return (dispatch)=> {
        dispatch({type: EMPLOYEES_REQUEST});

        sessionStorage.setItem('activeEmployee', employee._id);

        getEmployeeDetails(employee._id)
            .then((orgResponse)=> {

                dispatch({
                    type: EMPLOYEES_SELECTED,
                    payload: {
                        selectedEmployee: employee
                        //employeeDetails: orgResponse
                    }

                });

            })

    }
}

export function selectEmployeeById(employeeId) {
    return (dispatch)=> {
        dispatch({type: EMPLOYEES_REQUEST});

        sessionStorage.setItem('activeEmployee', employeeId);

        getEmployeeDetails(employeeId)
            .then((orgResponse)=> {

                dispatch({
                    type: EMPLOYEES_SELECTED,
                    payload: {
                        selectedEmployee: orgResponse
                        //employeeDetails: orgResponse
                    }

                });

            })

    }
}

export function createEmployeeData(employee) {
    return (dispatch)=> {
        dispatch({type: ADD_EMPLOYEES});
        let endPointURL = 'employees';

        post(endPointURL, employee)
            .then((response)=> {
                dispatch({
                    type: EMPLOYEE_CREATED
                })

                dispatch(push("/dashboard/employees"));

            }).catch(error=> {
            parseJSON(error).then((errorObj)=> {
                dispatch({
                    type: EMPLOYEE_CREATION_FAILED,
                    payload: errorObj.message
                });
            })
        })
    }

}

export function showEmployeeDetails(selectedOption, activeKey) {

    return {
        type: SHOW_EMPLOYEES_DETAILS,
        payload: {
            selectedOption: selectedOption,
            activeKey: activeKey
        }
    }

}

export function showProjectDetails(selectedOption, activeKey) {

    return {
        type: SHOW_PROJECT_DETAILS,
        payload: {
            selectedOption: selectedOption,
            activeKey: activeKey
        }
    }

}

export function showBusinessDetails(selectedOption, activeKey) {

    return {
        type: SHOW_BUSINESS_DETAILS,
        payload: {
            selectedOption: selectedOption,
            activeKey: activeKey
        }
    }

}

function getEmployeeDetails(employeeId) {

    let endPointURL = '/user/' + employeeId;
    return get(endPointURL);

}

export function saveCurrentPageNumber(currentPage, paginationLimit) {

    let pageOffset = (currentPage - 1) * paginationLimit;

    return (dispatch) => {
        dispatch({

            type: CURRENT_PAGE_OF_EMPLOYEE_LIST,
            payload: {
                pageOffset: pageOffset,
                currentPage: currentPage
            }

        });
        dispatch(fetchUsers(currentPage, paginationLimit));
    }

}

export function clearHelpBlockErrorMessage() {

    return {
        type: CLEAN_HELP_BLOCK_ERROR_MESSAGE,
        payload: null
    }

}
