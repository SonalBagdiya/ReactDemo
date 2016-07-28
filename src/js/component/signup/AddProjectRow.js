'use strict';

import React, {Component, View} from "react";
import {Row, Col, Button, Glyphicon, Input} from "react-bootstrap";
import DateTimeField from "react-bootstrap-datetimepicker";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as SaveStatus from "../../actions/signup";
import moment from 'moment'

class AddProjectRow extends Component {

    constructor(props) {
        super(props);

        let reportingID = null;
        let billingType = null;
        let billingRate = null;

        if (props.selectProject.reportingTo != null) {
            reportingID = props.selectProject.reportingTo.id
        }
        if (props.selectProject.billing != null) {
            billingType = props.selectProject.billing.type
            billingRate = props.selectProject.billing.rate
        }
        this.state = {
            bsStyle: null,
            currentProjName: props.selectProject.name,
            currentSubProjName: props.selectProject.subName,
            currentRole: props.selectProject.role,
            currDateofJoining: props.selectProject.dateOfJoining,
            currDateofLeaving: props.selectProject.dateOfLeaving,
            billingStatus: props.selectProject.billingStatus,
            billingStartDate: props.selectProject.billingStartDate,
            billingEndDate: props.selectProject.billingEndDate,
            clientInvoiceAmount: props.selectProject.clientInvoiceAmount,
            billingPercent: props.selectProject.billingPercent,
            rateProgression: props.selectProject.rateProgression,
            clientBonus: props.selectProject.clientBonus,
            expensesRecovery: props.selectProject.expensesRecovery,
            currReportingID: reportingID,
            currBillingRateType: billingType,
            currBillingRate: billingRate,
            format: "YYYY-MM-DDTHH:mm:ss.SSS",
            inputFormat: "DD/MM/YYYY",
            mode: "date"
        }

        if (props.selectProject.dateOfJoining != null && props.selectProject.dateOfJoining != "Invalid date") {
            this.state.currDateofJoining = props.selectProject.dateOfJoining;
            this.state.currDateofJoiningdefaultText = moment(props.selectProject.dateOfJoining).format("DD/MM/YYYY");
        }
        else {
            this.state.currDateofJoining = moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
            this.state.currDateofJoiningdefaultText = "Date of Joining"
        }
        if (props.selectProject.dateOfLeaving != null && props.selectProject.dateOfLeaving != "Invalid date") {
            this.state.currDateofLeaving = props.selectProject.dateOfLeaving;
            this.state.currDateofLeavingdefaultText = moment(props.selectProject.dateOfLeaving).format("DD/MM/YYYY");
        }
        else {
            this.state.currDateofLeaving = moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
            this.state.currDateofLeavingdefaultText = "Date of Leaving"
        }
        if (props.selectProject.billingStartDate != null && props.selectProject.billingStartDate != "Invalid date") {
            this.state.billingStartDate = props.selectProject.billingStartDate;
            this.state.billingStartDatedefaultText = moment(props.selectProject.billingStartDate).format("DD/MM/YYYY");
        }
        else {
            this.state.billingStartDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
            this.state.billingStartDatedefaultText = "Billing Start date"
        }
        if (props.selectProject.billingEndDate != null && props.selectProject.billingEndDate != "Invalid date") {
            this.state.billingEndDate = props.selectProject.billingEndDate;
            this.state.billingEndDatedefaultText = moment(props.selectProject.billingEndDate).format("DD/MM/YYYY");
        }
        else {
            this.state.billingEndDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
            this.state.billingEndDatedefaultText = "Billing End date"
        }
    }

    onProjectDeleted() {

        this.props.empActions.projectDeleted(this.props.rowNumber);

    }

    onCurrProjNameChange(e) {
        this.setState({currentProjName: e.target.value});
        this.props.empActions.projectNameSelected(this.props.rowNumber, e.target.value);
    }

    onCurrSubProjNameChange(e) {

        this.setState({currentSubProjName: e.target.value});
    }

    onCurrentRoleChange(e) {

        this.setState({currentRole: e.target.value});
        this.props.empActions.projectRoleAdded(this.props.rowNumber, e.target.value);
    }

    onCurrentDateofJoiningChange(e) {
        //alert(e);
        this.setState({currDateofJoining: e});
        this.props.empActions.dateOfJoiningAdded(this.props.rowNumber, e);
    }

    onCurrentDateofLeavingChange(e) {
        //alert(e);
        this.setState({currDateofLeaving: e});
        this.props.empActions.dateOfLeavingAdded(this.props.rowNumber, e);
    }

    onBillingStartDateChange(e) {
        //alert(e);
        this.setState({billingStartDate: e});
        this.props.empActions.billingStartDateAdded(this.props.rowNumber, e);
    }

    onBillingEndDateChange(e) {
        //alert(e);
        this.setState({billingEndDate: e});
        this.props.empActions.billingEndDateAdded(this.props.rowNumber, e);
    }

    onCurrReportingChange(e) {

        this.setState({currReportingID: e.target.value});
        this.setState({currReportingName: e.target.options[e.target.selectedIndex].text});
        this.props.empActions.reportingAdded(this.props.rowNumber, e.target.value, e.target.options[e.target.selectedIndex].text);
    }

    onCurrBillingRateTypeChange(e) {

        this.setState({currBillingRateType: e.target.value});
        var billingRate = this.state.currBillingRate;
        this.props.empActions.billingRateAdded(this.props.rowNumber, billingRate, e.target.value);
    }

    onCurrBillingRateChange(e) {

        this.setState({currBillingRate: e.target.value});
        var billingType = this.state.currBillingRateType;
        this.props.empActions.billingRateAdded(this.props.rowNumber, e.target.value, billingType);
    }

    onBillingStatusChange(e) {

        this.setState({billingStatus: e.target.value});
        this.props.empActions.billingStatusAdded(this.props.rowNumber, e.target.value);
    }

    onBillingPercentChange(e) {

        this.setState({billingPercent: e.target.value});
        this.props.empActions.billingPercentAdded(this.props.rowNumber, e.target.value);

    }

    onRateProgressChange(e) {

        this.setState({rateProgression: e.target.value});
        this.props.empActions.rateProgressAdded(this.props.rowNumber, e.target.value);
    }

    onClientBonusChange(e) {

        this.setState({clientBonus: e.target.value});
        this.props.empActions.clientBonusAdded(this.props.rowNumber, e.target.value);
    }

    onExpensesRecoveryChange(e) {

        this.setState({expensesRecovery: e.target.value});
        this.props.empActions.expensesRecoveryAdded(this.props.rowNumber, e.target.value);

    }

    onClientInvoiceAmountChange(e) {

        this.setState({clientInvoiceAmount: e.target.value});
        this.props.empActions.clientInvoiceAmountAdded(this.props.rowNumber, e.target.value);
    }

    render() {

        let {employeeList, selectProject} = this.props;
        var {selectedProjects, rowNumber, step_2_data} = this.props;
        let employeeDropDownValues = "";
        if (_.size(employeeList)>0) {
            employeeDropDownValues = _.map(employeeList, (employee) => {
                    return (
                        <option key={employee._id} value={employee._id}>{employee.firstName}</option>
                    );
                }
            )
            ;
        }

        _.each(employeeList, (data)=> {
            if (data.firstName != 'Reporting To' && this.state.currReportingName == '') {
                this.state.bsStyle = 'error';
            }

        });
        const {format, mode, inputFormat} = this.state;

        let rowCount = _.keys(selectedProjects).length;
        let nm = selectProject.name;
        return (

            <Row>
                <Col xs={6} sm={6} md={6}>
                    <div className="login-label text-left">Project Details</div>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <Input type="text"
                                       defaultValue={this.state.currentProjName}
                                       placeholder="Project Name*"
                                       title="Project Name"
                                       onChange={this.onCurrProjNameChange.bind(this)} required/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <Input type="text"
                                       defaultValue={this.state.currentSubProjName}
                                       placeholder="Sub-Project Name*"
                                       title="Sub-Project Name"
                                       onChange={this.onCurrSubProjNameChange.bind(this)}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <Input type="text"
                                       defaultValue={this.state.currentRole}
                                       title="Role"
                                       placeholder="Role*"
                                       onChange={this.onCurrentRoleChange.bind(this)} required/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <DateTimeField
                                    defaultText={this.state.currDateofJoiningdefaultText}
                                    onChange={this.onCurrentDateofJoiningChange.bind(this)}
                                    format={format}
                                    title="Date of Joining"
                                    inputFormat={inputFormat}
                                    dateTime={this.state.currDateofJoining} required/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <DateTimeField
                                    title="Date of Leaving"
                                    defaultText={this.state.currDateofLeavingdefaultText}
                                    onChange={this.onCurrentDateofLeavingChange.bind(this)}
                                    format={format}
                                    inputFormat={inputFormat}
                                    dateTime={this.state.currDateofLeaving}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <Input type="select"
                                       placeholder="Reporting To*"
                                       title="Reporting To"
                                       bsStyle={this.state.bsStyle}
                                       value={this.state.currReportingID}
                                       className="subscription-product-inputs"
                                       onChange={this.onCurrReportingChange.bind(this)} required>
                                    <option value="">Reporting To</option>
                                    {employeeDropDownValues}
                                </Input>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <div className="login-tbox">
                                <Input type="select"
                                       placeholder="Billing Rate Type*"
                                       value={this.state.currBillingRateType}
                                       className="subscription-product-inputs"
                                       onChange={this.onCurrBillingRateTypeChange.bind(this)} required>
                                    <option value="">Billing Rate Type</option>
                                    <option key="monthly" value="monthly">Monthly</option>
                                    <option key="weekly" value="weekly">Weekly</option>
                                    <option key="hourly" value="hourly">Hourly</option>
                                </Input>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div className="login-tbox">
                                <Input type="text"
                                       defaultValue={this.state.currBillingRate}
                                       placeholder="Billing Rate*"
                                       onChange={this.onCurrBillingRateChange.bind(this)} required/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <Input type="select"
                                       placeholder="Billing Status*"
                                       value={selectProject.billingStatus}
                                       className="subscription-product-inputs"
                                       onChange={this.onBillingStatusChange.bind(this)} required>
                                    <option value="">Billing Status</option>
                                    <option key="billable" value="billable">Billable</option>
                                    <option key="bench" value="bench">Bench</option>
                                    <option key="shadow" value="shadow">Shadow</option>
                                </Input>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={6} sm={6} md={6}>
                    <Row>
                        <Col xs={12}>
                            <div className="login-label pull-right">{rowCount == 1 ? <span>&nbsp;</span> :
                                <Button bsStyle="danger"
                                        bsSize="xsmall"
                                        onClick={this.onProjectDeleted.bind(this)}
                                        title="Delete a project">
                                    <Glyphicon glyph="minus"/>
                                </Button>}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <DateTimeField
                                    defaultText={this.state.billingStartDatedefaultText}
                                    onChange={this.onBillingStartDateChange.bind(this)}
                                    format={format}
                                    inputFormat={inputFormat}
                                    title="Billing Start Date"
                                    dateTime={this.state.billingStartDate} required/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <DateTimeField
                                    defaultText={this.state.billingEndDatedefaultText}
                                    onChange={this.onBillingEndDateChange.bind(this)}
                                    format={format}
                                    inputFormat={inputFormat}
                                    title="Billing End Date"
                                    dateTime={this.state.billingEndDate}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <Input type="text"
                                       addonBefore={<Glyphicon glyph="user" />}
                                       defaultValue={this.state.clientInvoiceAmount}
                                       placeholder="Client Invoice Amount*"
                                       title="Client Invoice Amount"
                                       onChange={this.onClientInvoiceAmountChange.bind(this)} required/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <Input type="text"
                                       addonBefore={<Glyphicon glyph="user" />}
                                       defaultValue={this.state.expensesRecovery}
                                       placeholder="Expenses Recovery*"
                                       onChange={this.onExpensesRecoveryChange.bind(this)} title="Expenses Recovery"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <Input type="text"
                                       addonBefore={<Glyphicon glyph="user" />}
                                       defaultValue={this.state.clientBonus}
                                       placeholder="Client Bonus*"
                                       title="Client Bonus"
                                       onChange={this.onClientBonusChange.bind(this)}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <Input type="select"
                                       placeholder="Rate progression*"
                                       title="Rate progression"
                                       value={this.state.rateProgression}
                                       className="subscription-product-inputs"
                                       onChange={this.onRateProgressChange.bind(this)} required>
                                    <option value="select">Rate Progression</option>
                                    <option key="Yes" value="Yes">Yes</option>
                                    <option key="No" value="No">No</option>
                                </Input>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <Input type="select"
                                       placeholder="Billing Percent*"
                                       value={this.state.billingPercent}
                                       className="subscription-product-inputs"
                                       title="Billing Percent"
                                       onChange={this.onBillingPercentChange.bind(this)} required>
                                    <option value="select">Billing Percent</option>
                                    <option key="100" value="100">100</option>
                                    <option key="50" value="50">50</option>
                                    <option key="25" value="25">25</option>
                                </Input>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state) => ({
    step_2_data: state.signup.signupInfo.employeeInfo,
    employeeList: state.employee.employeeList,
    selectedProjects: state.signup.selectedProjects
});

const mapDispatchToProps = (dispatch) => ({
    empActions: bindActionCreators(SaveStatus, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectRow);