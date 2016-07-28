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

class SignUpUserInfo extends Component {

    constructor(props) {

        super(props);

        this.state = {
            employeeNumber: props.userinfo.employeeNumber,
            firstName: props.userinfo.firstName,
            lastName: props.userinfo.lastName,
            email: props.userinfo.email,
            designation: props.userinfo.designation,
            totalYearExperience: props.userinfo.totalYearExperience,
            dateOfJoining: props.userinfo.dateOfJoining,
            totalMonthExperience: props.userinfo.totalMonthExperience,
            billingStatus: props.userinfo.billingStatus,
            ctcLast: props.userinfo.ctcLast,
            ctcBand: props.userinfo.ctcBand,
            noticePeriod: props.userinfo.noticePeriod,
            skypeID: props.userinfo.skypeID,
            primarySkills: props.userinfo.primarySkills,
            secondarySkills: props.userinfo.secondarySkills,
            currentlyWorkingBUName: props.userinfo.currentlyWorkingBUName,
            format: "YYYY-MM-DDTHH:mm:ss.SSS",
            inputFormat: "DD/MM/YYYY",
            mode: "date"
        }
        if (props.userinfo.dateOfJoining != null && props.userinfo.dateOfJoining != "Invalid date") {
            this.state.dateOfJoining = props.userinfo.dateOfJoining
            this.state.defaultText = moment(props.userinfo.dateOfJoining).format("DD/MM/YYYY");
        }
        else {
            this.state.dateOfJoining = moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
            this.state.defaultText = "Date of Joining"
        }
    }

    onBack(e) {

        this.props.routeDispatch(push("/dashboard/home"));

    }

    onHandleNextClick(e) {

        e.preventDefault();

        if (this.state.totalMonthExperience == null)
            this.state.totalMonthExperience = 0;

        this.props.empActions.addUserInfo(
            {
                employeeNumber: this.state.employeeNumber,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                designation: this.state.designation,
                dateOfJoining: this.state.dateOfJoining,
                totalYearExperience: this.state.totalYearExperience,
                totalMonthExperience: this.state.totalMonthExperience,
                billingStatus: this.state.billingStatus,
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

    onBillingStatusChange(e) {

        this.setState({billingStatus: e.target.value});

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
        var {userinfo} = this.props;

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
                                                       onChange={this.onLastNameChange.bind(this)} required/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <Input type="email"
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
                                                       onChange={this.onTotalYearExperienceChange.bind(this)} required/>
                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <div className="login-tbox">
                                                <Input type="number"
                                                       defaultValue={this.state.totalMonthExperience}
                                                       placeholder="Experience month*"
                                                       onChange={this.onTotalMonthExperienceChange.bind(this)}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <Input type="select"
                                                       placeholder="Billing Status*"
                                                       value={this.state.billingStatus}
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
                                    <Row>
                                        <Col xs={12}>
                                            <div className="login-tbox">
                                                <Input type="number"
                                                       defaultValue={this.state.ctcLast}
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
    userinfo: state.signup.signupInfo.userinfo
});

const mapDispatchToProps = (dispatch) => ({
    empActions: bindActionCreators(SaveStatus, dispatch),
    routeDispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpUserInfo);
