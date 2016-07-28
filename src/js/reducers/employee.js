import {createReducer} from "../utils";
import _ from "lodash";

const initialState = {
    employeeList: null,
    selectedEmployee: null,
    employeeDetailsTab: true,
    projectDetailsTab: false,
    businessDetailsTab: false,
    statusText: null,
    selectedOption: 'employee',
    activeKey: 1,
    totalEmployeeList: 0,
    pageOffset: 1,
    currentPage: 1,
    holidays: {
        "January": "2",
        "February": "0",
        "March": "1",
        "April": "1",
        "May": "0",
        "June": "0",
        "July": "0",
        "August": "1",
        "September": "1",
        "October": "2",
        "November": "0",
        "December": "0"
    }
};

export default createReducer(initialState, {
    EMPLOYEES_RECEIVED: (state, payload) => {

        var newState = _.cloneDeep(state);
        if (newState.selectedEmployee === null) {
            newState.selectedEmployee = payload.selectedEmployee;
            //newState.employeeDetails = payload.employeeDetails;
        }
        newState.totalEmployeeList = payload.totalEmployeeList;
        newState.employeeList = payload.employeeList;
        newState.currentPage = payload.currentPage;

        return newState;

    },
    CLEAN_REDUCER_DATA: (state, payload)=> {
        return _.cloneDeep(initialState);

    },
    EMPLOYEES_SELECTED: (state, payload)=> {

        var newState = _.cloneDeep(state);

        newState.selectedEmployee = payload.selectedEmployee;
        // newState.employeeDetails = payload.employeeDetails;

        return newState;
    },
    SHOW_EMPLOYEES_DETAILS: (state, payload) => {

        return Object.assign({}, state, {
            employeeDetailsTab: true,
            businessDetailsTab: false,
            projectDetailsTab: false,
            selectedOption: payload.selectedOption,
            activeKey: payload.activeKey
        });

    },
    SHOW_BUSINESS_DETAILS: (state, payload) => {

        return Object.assign({}, state, {
            employeeDetailsTab: false,
            businessDetailsTab: true,
            projectDetailsTab: false,
            selectedOption: payload.selectedOption,
            activeKey: payload.activeKey
        });

    },
    SHOW_PROJECT_DETAILS: (state, payload) => {

        return Object.assign({}, state, {
            employeeDetailsTab: false,
            businessDetailsTab: false,
            projectDetailsTab: true,
            selectedOption: payload.selectedOption,
            activeKey: payload.activeKey
        });

    },
    EMPLOYEE_CREATION_FAILED: (state, payload)=> {

        var newState = _.cloneDeep(state);
        newState.statusText = payload;
        return newState;

    },
    CURRENT_PAGE_OF_EMPLOYEE_LIST: (state, payload)=> {

        var newState = _.cloneDeep(state);
        newState.pageOffset = payload.pageOffset;
        newState.currentPage = payload.currentPage;
        return newState;

    },
    CLEAN_HELP_BLOCK_ERROR_MESSAGE: (state, payload)=> {

        var newState = _.cloneDeep(state);
        newState.statusText = payload;
        return newState;

    },

});
