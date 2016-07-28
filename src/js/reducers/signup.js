import {createReducer} from "../utils";
import _ from "lodash";

const initialState = {
    selectedProjects: {
        1: {}
    },
    selectedBusinessUnits: {
        1: {}
    },
    count: 1,
    step_1_Status: false,
    step_2_Status: false,
    step_3_Status: false,
    currentStep: 'step1',
    statusText: '',

    signupInfo: {
        "employeeInfo": {},
        "userinfo": {
            "email": "",
        }
    },

    updateUserInfo: {
        "userInfo": {
            "email": "",
            "firstName": "",
            "lastName": "",
            "totalExperience": {
                "years": "",
                "months": ""
            }
        },
        "projects": null,

        "businessUnits": null

    },
};

export default createReducer(initialState, {
    STATUS_ADDED_SUCCESSFULLY: (state, payload)=> {

        var newState = _.cloneDeep(state);
        newState.currentStep = payload;
        return newState;

    },
    ON_BACK_CLICK: (state, payload)=> {

        var newState = _.cloneDeep(state);
        newState.currentStep = payload;
        newState.statusText = "";
        return newState;

    },
    STEP_1_DATA_ADDED_SUCCESSFULLY: (state, payload)=> {
        var newState = _.cloneDeep(state);
        newState.signupInfo.userinfo = payload;
        newState.currentStep = 'step2';
        newState.step_1_Status = true;
        return newState;

    },
    STEP_2_DATA_ADDED_SUCCESSFULLY: (state, payload)=> {

        var newState = _.cloneDeep(state);
        newState.signupInfo.employeeInfo = payload;
        newState.currentStep = 'step3';
        newState.step_2_Status = true;
        return newState;

    },
    STEP_3_DATA_ADDED_SUCCESSFULLY: (state, payload)=> {

        var newState = _.cloneDeep(state);
        newState.signupInfo.employeeInfo = payload;
        newState.step_3_Status = true;
        return newState;

    },
    DATA_ADDED_ON_BACK_CLICK: (state, payload)=> {

        var newState = _.cloneDeep(state);
        newState.signupInfo.employeeInfo = payload;
        return newState;

    },
    DATA_UPDATED_ON_PROJECT_BACK_CLICK: (state, payload)=> {

        var newState = _.cloneDeep(state);
        newState.updateUserInfo.projects = payload;
        return newState;

    },
    DATA_UPDATED_ON_BU_BACK_CLICK: (state, payload)=> {

        var newState = _.cloneDeep(state);
        newState.updateUserInfo.projects = payload;
        return newState;

    },
    SIGNUP_USER_FAILURE: (state, payload)=> {

        var newState = _.cloneDeep(state);
        newState.statusText = payload;
        return newState;

    },
    SIGNUP_USER_SUCCESS: (state, payload)=> {
        console.log("==PAYLOAD======");
        console.log(payload);
        console.log("========");
        var newState = _.cloneDeep(state);
        newState.signupInfo.userinfo = payload;
        return newState;
    },
    UPDATE_USER_INFO: (state, payload)=> {

        var newState = _.cloneDeep(state);
        newState.updateUserInfo.userInfo = payload;
        newState.currentStep = 'step2';
        newState.step_1_Status = true;
        return newState;

    },
    UPDATE_PROJECT_INFO: (state, payload)=> {

        var newState = _.cloneDeep(state);
        newState.updateUserInfo.projects = payload;
        newState.currentStep = 'step3';
        newState.step_2_Status = true;
        return newState;

    },
    UPDATE_USER_FAILURE: (state, payload)=> {

        var newState = _.cloneDeep(state);
        newState.statusText = payload;
        return newState;

    },
    UPDATE_USER_SUCCESS: (state, payload)=> {

        var newState = _.cloneDeep(state);
        newState.updateUserInfo = payload;
        return newState;
    },
    ADD_UPDATE_CLICK: (state, payload)=> {
        var newState = _.cloneDeep(state);
        newState.signupInfo = initialState.signupInfo;
        newState.updateUserInfo = initialState.updateUserInfo;
        newState.selectedProjects = initialState.selectedProjects;
        newState.selectedBusinessUnits = initialState.selectedBusinessUnits;

        if (payload == "add") {
            newState.selectedProjects[newState.count] = {};
            newState.selectedBusinessUnits[newState.count] = {};
        }
        else {
            console.log("deleted");
            delete newState.selectedProjects[1];
            delete newState.selectedBusinessUnits[1];
        }
        newState.currentStep = 'step1';
        newState.count = 1;
        newState.statusText = "";
        newState.step_1_Status = true;
        console.log("---------------------------------");
        console.log(newState);
        console.log("---------------------------------");

        return newState;
    },
    ADD_NEW_PROJECT: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.count++;
        _state.selectedProjects[_state.count] = {};

        return _state;

    },
    PROJECT_DELETED: (state, payload) => {

        var _state = _.cloneDeep(state);

        delete _state.selectedProjects[payload.rowNumber];

        _.each(_.keys(_state.selectedProjects), (key)=> {
            // _state.selectedProjects[key].disabled = false;
            //_state.selectedProjects[key].error = false;
        });

        return _state;

    },
    PROJECT_SELECTED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedProjects[payload.rowNumber].name = payload.projectName;
        return _state;

    },
    ROLE_ADDED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedProjects[payload.rowNumber].role = payload.roleName;
        return _state;

    },
    DOJ_ADDED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedProjects[payload.rowNumber].dateOfJoining = payload.dateOfJoining;
        return _state;

    },
    DOL_ADDED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedProjects[payload.rowNumber].dateOfLeaving = payload.dateOfLeaving;
        return _state;

    },
    REPORTING_ADDED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedProjects[payload.rowNumber].reportingTo = payload.reporting;
        return _state;

    },
    BILLING_ADDED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedProjects[payload.rowNumber].billing = payload.billing;
        return _state;

    },
    ADD_NEW_BUSINESS_UNIT: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.count++;
        _state.selectedBusinessUnits[_state.count] = {};
        _state.statusText = "";
        return _state;

    },
    BU_NAME_ADDED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedBusinessUnits[payload.rowNumber].name = payload.name;
        _state.statusText = "";
        return _state;

    },
    BU_DOJ_ADDED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedBusinessUnits[payload.rowNumber].dateOfJoining = payload.dateOfJoining;
        _state.statusText = "";
        return _state;

    },
    BU_DOL_ADDED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedBusinessUnits[payload.rowNumber].dateOfLeaving = payload.dateOfLeaving;
        _state.statusText = "";
        return _state;

    },
    BU_DELETED: (state, payload) => {

        var _state = _.cloneDeep(state);

        delete _state.selectedBusinessUnits[payload.rowNumber];

        _.each(_.keys(_state.selectedBusinessUnits), (key)=> {
            /*  _state.selectedBusinessUnits[key].disabled = false;
             _state.selectedBusinessUnits[key].error = false;*/
        });
        _state.statusText = "";

        return _state;
    },
    EDIT_NEW_PROJECT: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedProjects = payload.data;
        _state.count = payload.count
        return _state;

    },
    EDIT_NEW_BU: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedBusinessUnits = payload.data;
        _state.count++;
        _state.statusText = "";
        return _state;

    },
    BILLING_STATUS_ADDED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedProjects[payload.rowNumber].billingStatus = payload.billingStatus;
        _state.statusText = "";
        return _state;

    },
    BILLING_PERCENT_ADDED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedProjects[payload.rowNumber].billingPercent = payload.billingPercent;
        _state.statusText = "";
        return _state;

    },
    RATE_PROGRESSION_ADDED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedProjects[payload.rowNumber].rateProgression = payload.rateProgression;
        _state.statusText = "";
        return _state;

    },
    CLIENT_BONUS_ADDED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedProjects[payload.rowNumber].clientBonus = payload.clientBonus;
        _state.statusText = "";
        return _state;

    },
    EXPENSES_RECOVERY_ADDED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedProjects[payload.rowNumber].expensesRecovery = payload.expensesRecovery;
        _state.statusText = "";
        return _state;

    },
    CLIENT_INVOICE_ADDED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedProjects[payload.rowNumber].clientInvoiceAmount = payload.clientInvoiceAmount;
        _state.statusText = "";
        return _state;

    },
    BILIING_START_ADDED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedProjects[payload.rowNumber].billingStartDate = payload.billingStartDate;
        _state.statusText = "";
        return _state;

    },
    BILIING_END_ADDED: (state, payload) => {

        var _state = _.cloneDeep(state);
        _state.selectedProjects[payload.rowNumber].billingEndDate = payload.billingEndDate;
        _state.statusText = "";
        return _state;

    },


});
