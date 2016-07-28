'use strict';

import React, {Component, View} from "react";
import {Row, Col, Glyphicon, Input, Button} from "react-bootstrap";
import DateTimeField from "react-bootstrap-datetimepicker";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as SaveStatus from "../../actions/signup";
import moment from 'moment';
import {push} from "redux-router";
import * as employeeActionCreators from "../../actions/employee";

class EditUserInfo extends Component {

    constructor(props) {

        super(props);

        if (props.updateUserInfo.email != "") {
            this.state = {
                employeeNumber: props.updateUserInfo.employeeNumber,
                firstName: props.updateUserInfo.firstName,
                lastName: props.updateUserInfo.lastName,
                email: props.updateUserInfo.email,
                dateOfJoining: props.updateUserInfo.dateOfJoining,
                designation: props.updateUserInfo.designation,
                billingStatus: props.updateUserInfo.billingStatus,
                totalMonthExperience: props.updateUserInfo.totalMonthExperience,
                totalYearExperience: props.updateUserInfo.totalYearExperience,
                //expBand: props.updateUserInfo.expBand,
                ctcLast: props.updateUserInfo.ctcLast,
                ctcBand: props.updateUserInfo.ctcBand,
                noticePeriod: props.updateUserInfo.noticePeriod,
                skypeID: props.updateUserInfo.skypeID,
                primarySkills: props.updateUserInfo.primarySkills,
                secondarySkills: props.updateUserInfo.secondarySkills,
                currentlyWorkingBUName: props.updateUserInfo.currentlyWorkingBUName,
                format: "YYYY-MM-DDTHH:mm:ss.SSS",
                inputFormat: "DD/MM/YYYY",
                mode: "date"
            }

            if (props.updateUserInfo.dateOfJoining != null || props.updateUserInfo.dateOfJoining != "") {
                this.state.dateOfJoining = moment(props.updateUserInfo.dateOfJoinin).format('YYYY-MM-DDTHH:mm:ss.SSS')
                this.state.defaultText = moment(props.updateUserInfo.dateOfJoining).format("DD/MM/YYYY");
            }
            else {
                this.state.dateOfJoining = moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
                this.state.defaultText = "Date of Joining"
            }
        }
        else if (this.props.userInfo != null) {
            let expMonths = this.props.userInfo.experience == null ? "" : this.props.userInfo.experience.months;
            let expYears = this.props.userInfo.experience == null ? "" : this.props.userInfo.experience.years;

            this.state = {
                employeeNumber: this.props.userInfo.employeeNumber,
                firstName: this.props.userInfo.firstName,
                lastName: this.props.userInfo.lastName,
                email: this.props.userInfo.email,
                designation: this.props.userInfo.designation,
                billingStatus: this.props.userInfo.billingStatus,
                totalMonthExperience: expMonths,
                totalYearExperience: expYears,
                ctcLast: this.props.userInfo.ctcLast,
                ctcBand: this.props.userInfo.ctcBand,
                noticePeriod: this.props.userInfo.notice,
                skypeID: this.props.userInfo.skypeID,
                primarySkills: this.props.userInfo.primarySkills,
                secondarySkills: this.props.userInfo.secondarySkills,
                currentlyWorkingBUName: this.props.userInfo.currentlyWorkingBUName,
                format: "YYYY-MM-DDTHH:mm:ss.SSS",
                inputFormat: "DD/MM/YYYY",
                mode: "date"
            }

            if (this.props.userInfo.dateOfJoining != null) {
                this.state.dateOfJoining = moment(this.props.userInfo.dateOfJoining).format('YYYY-MM-DDTHH:mm:ss.SSS')
                this.state.defaultText = moment(this.props.userInfo.dateOfJoining).format("DD/MM/YYYY");
            }
            else {
                this.state.dateOfJoining = moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
                this.state.defaultText = "Date of Joining"
            }
        }

    }

    componentDidMount() {
        const {employeeId} = this.props;
        // this.props.employeeActions.selectEmployeeById(employeeId);
        //this.props.empActions.updateUserInfo({email: ""});
    }

    onBack(e) {

        // e.preventDefault();
        this.props.routeDispatch(push("/dashboard/users"));

    }

    onHandleNextClick(e) {

        e.preventDefault();
        if (this.state.totalMonthExperience == null)
            this.state.totalMonthExperience = 0;

        if (this.state.dateOfJoining == "Invalid date") {
            this.state.dateOfJoining = moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
        }
        this.props.empActions.updateUserInfo(
            {
                employeeNumber: this.state.employeeNumber,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                designation: this.state.designation,
                billingStatus: this.state.billingStatus,
                dateOfJoining: this.state.dateOfJoining,
                totalMonthExperience: this.state.totalMonthExperience,
                totalYearExperience: this.state.totalYearExperience,
                ctcLast: this.state.ctcLast,
                ctcBand: this.state.ctcBand,
                noticePeriod: this.state.noticePeriod,
                skypeID: this.state.skypeID,
                primarySkills: this.state.primarySkills,
                secondarySkills: this.state.secondarySkills,
                currentlyWorkingBUName: this.state.currentlyWorkingBUName
            }
        );
    }

    onFirstNameChange(e) {

        this.setState({firstName: e.target.value});

    }

    onLastNameChange(e) {

        this.setState({lastName: e.target.value});

    }

    onEmailChange(e) {

        this.setState({email: e.target.value});

    }

    onEmployeeNumberChange(e) {

        this.setState({employeeNumber: e.target.value});

    }

    onDesignationChange(e) {

        this.setState({designation: e.target.value});

    }

    onBillingStatusChange(e) {

        this.setState({billingStatus: e.target.value});

    }

    onTotalMonthExperienceChange(e) {

        this.setState({totalMonthExperience: e.target.value});

    }

    onTotalYearExperienceChange(e) {

        this.setState({totalYearExperience: e.target.value});

    }

    onDateOfJoiningChange(e) {

        this.setState({dateOfJoining: e});
    }

    onCTCLastChange(e) {

        this.setState({ctcLast: e.target.value});

    }

    handleChange(e) {
        return this.setState({dtvalue: e});
    }

    onCTCBandChange(e) {

        this.setState({ctcBand: e.target.value});

    }

    onNoticePeriodChange(e) {

        this.setState({noticePeriod: e.target.value});

    }

    onSkypeIDChange(e) {

        this.setState({skypeID: e.target.value});

    }

    onPrimarySkillsChange(e) {

        this.setState({primarySkills: e.target.value});

    }

    onSecondarySkillsChange(e) {

        this.setState({secondarySkills: e.target.value});

    }

    onCurrentlyWorkingBUNameChange(e) {

        this.setState({currentlyWorkingBUName: e.target.value});

    }


    render() {
        const {format, mode, inputFormat} = this.state;
        var {updateUserInfo} = this.props;

        return (
            <ReactCSSTransitionGroup transitionName="react-animation"
                                     transitionAppear
                                     transitionAppearTimeout={500}
                                     transitionEnter={false}
                                     transitionLeave={false}>
                <form name="signup" onSubmit={this.onHandleNextClick.bind(this)}>
                    <Row className="text-center">
                        <Col md={12} sm={8} xs={12} lg={12} className="signUp-box">

                            <div className="login-label text-center">Employee Details</div>
                            <Row>
                                <Col xs={6} sm={6} md={6}>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <Input type="number"
                                                       defaultValue={this.state.employeeNumber}
                                                       addonBefore={<Glyphicon glyph="user" />}
                                                       placeholder="Employee Number*"
                                                       title="Employee Number"
                                                       onChange={this.onEmployeeNumberChange.bind(this)} required/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <Input type="text"
                                                       defaultValue={this.state.firstName}
                                                       addonBefore={<Glyphicon glyph="user" />}
                                                       placeholder="First Name*"
                                                       title="First Name"
                                                       onChange={this.onFirstNameChange.bind(this)} required/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <Input type="text"
                                                       defaultValue={this.state.lastName}
                                                       addonBefore={<Glyphicon glyph="user" />}
                                                       placeholder="Last Name*"
                                                       title="Last Name"
                                                       onChange={this.onLastNameChange.bind(this)} required/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <Input type="email"
                                                       title="email"
                                                       defaultValue={this.state.email}
                                                       addonBefore={<Glyphicon glyph="envelope" />}
                                                       placeholder="Email*" onChange={this.onEmailChange.bind(this)}
                                                       required/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <Input type="text"
                                                       title="designation"
                                                       defaultValue={this.state.designation}
                                                       addonBefore={<Glyphicon glyph="user" />}
                                                       placeholder="Designation*"
                                                       onChange={this.onDesignationChange.bind(this)}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <DateTimeField
                                                    title="Date of Joining"
                                                    defaultText={this.state.defaultText}
                                                    onChange={this.onDateOfJoiningChange.bind(this)}
                                                    format={format}
                                                    inputFormat={inputFormat}
                                                    dateTime={this.state.dateOfJoining} required/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <Input type="text"
                                                       defaultValue={this.state.primarySkills}
                                                       addonBefore={<Glyphicon glyph="user" />}
                                                       title="Primary Skills"
                                                       placeholder="Primary Skills*"
                                                       onChange={this.onPrimarySkillsChange.bind(this)}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <Input type="text"
                                                       defaultValue={this.state.secondarySkills}
                                                       title="Secondary Skills"
                                                       addonBefore={<Glyphicon glyph="user" />}
                                                       placeholder="Secondary Skills*"
                                                       onChange={this.onSecondarySkillsChange.bind(this)}/>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={6} sm={6} md={6}>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <Input type="select"
                                                       placeholder="Currently working with (BU)"
                                                       title="Currently working with (BU)"
                                                       value={this.state.currentlyWorkingBUName}
                                                       className="subscription-product-inputs"
                                                       onChange={this.onCurrentlyWorkingBUNameChange.bind(this)}
                                                       required>
                                                    <option value="">Currently working with (BU)</option>
                                                    <option key="BU-1" value="BU-1">BU-1</option>
                                                    <option key="BU-2" value="BU-2">BU-2</option>
                                                    <option key="BU-3" value="BU-3">BU-3</option>
                                                    <option key="BU-4" value="BU-4">BU-4</option>
                                                    <option key="BU-5" value="BU-5">BU-5</option>
                                                    <option key="BU-6" value="BU-6">BU-6</option>
                                                    <option key="BU-7" value="BU-7">BU-7</option>
                                                </Input>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>
                                            <div className="login-tbox">
                                                <Input type="number"
                                                       defaultValue={this.state.totalYearExperience}
                                                       placeholder="Experience years*"
                                                       title="Experience years"
                                                       onChange={this.onTotalYearExperienceChange.bind(this)} required/>
                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <div className="login-tbox">
                                                <Input type="number"
                                                       defaultValue={this.state.totalMonthExperience}
                                                       placeholder="Experience month*"
                                                       title="Experience month"
                                                       onChange={this.onTotalMonthExperienceChange.bind(this)}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <Input type="select"
                                                       placeholder="Billing Status*"
                                                       title="Billing Status*"
                                                       value={this.state.billingStatus}
                                                       className="subscription-product-inputs"
                                                       onChange={this.onBillingStatusChange.bind(this)}>
                                                    <option value="select">Billing Status</option>
                                                    <option key="billable" value="billable">Billable</option>
                                                    <option key="bench" value="bench">Bench</option>
                                                    <option key="shadow" value="shadow">Shadow</option>
                                                </Input>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <Input type="number"
                                                       defaultValue={this.state.ctcLast}
                                                       title="CTC (Last Financial Year)"
                                                       addonBefore={<Glyphicon glyph="user" />}
                                                       placeholder="CTC (Last Financial Year)*"
                                                       onChange={this.onCTCLastChange.bind(this)}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <Input type="text"
                                                       title="CTC Band"
                                                       defaultValue={this.state.ctcBand}
                                                       addonBefore={<Glyphicon glyph="user" />}
                                                       placeholder="CTC Band"
                                                       onChange={this.onCTCBandChange.bind(this)}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <Input type="number"
                                                       title="Notice Period (in months)"
                                                       defaultValue={this.state.noticePeriod}
                                                       addonBefore={<Glyphicon glyph="user" />}
                                                       placeholder="Notice Period (in months)*"
                                                       onChange={this.onNoticePeriodChange.bind(this)}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <Input type="text"
                                                       title="Skype Id"
                                                       defaultValue={this.state.skypeID}
                                                       addonBefore={<Glyphicon glyph="user" />}
                                                       placeholder="Skype Id *"
                                                       onChange={this.onSkypeIDChange.bind(this)}/>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <Button bsStyle="warning" bsSize="large" className="full-width"
                                            onClick={this.onBack.bind(this)}>
                                        Cancel
                                    </Button>
                                </Col>
                                <Col xs={6}>
                                    <Button bsStyle="primary" bsSize="large" type="submit" className="full-width">
                                        NEXT
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </form>
            </ReactCSSTransitionGroup>
        );

    }

}

const mapStateToProps = (state) => ({
    // updateUserInfo: state.signup.signupInfo.updateUserInfo,
    userInfo: state.employee.selectedEmployee,
    updateUserInfo: state.signup.updateUserInfo.userInfo
});

const mapDispatchToProps = (dispatch) => ({
    empActions: bindActionCreators(SaveStatus, dispatch),
    employeeActions: bindActionCreators(employeeActionCreators, dispatch),
    routeDispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserInfo);