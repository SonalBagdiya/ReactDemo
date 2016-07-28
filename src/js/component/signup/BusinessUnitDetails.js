'use strict';

import React, {Component, View} from "react";
import {Row, Col, Button, Input, Glyphicon} from "react-bootstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as SaveStatus from "../../actions/signup";
import * as appActionCreators from "../../actions/app";
import DateTimeField from "react-bootstrap-datetimepicker";
import moment from 'moment'
import AddBusinessUnitRow from "./AddBusinessUnitRow";

class BusinessUnitDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {serverErrorMessage: true}
    }

    onNext(e) {
        let arrBusinessUnit = [];

        _.each(this.props.selectedBusinessUnits, (bu)=> {
            arrBusinessUnit.push(bu)
        });

        let businessUnitList = {
            businessUnits: arrBusinessUnit
        }

        this.props.signupActions.addProjectInfo(businessUnitList);

        let {step_2_data, userinfo} = this.props;

        e.preventDefault();

        let userInformation = {
            employeeNumber: userinfo.employeeNumber,
            firstName: userinfo.firstName,
            lastName: userinfo.lastName,
            email: userinfo.email,
            designation: userinfo.designation,
            dateOfJoining: userinfo.dateOfJoining,
            experience: {
                "years": userinfo.totalYearExperience,
                "months": userinfo.totalMonthExperience
            },
            ctcLast: userinfo.ctcLast,
            ctcBand: userinfo.ctcBand,
            notice: userinfo.noticePeriod,
            billingStatus: userinfo.billingStatus,
            skypeID: userinfo.skypeID,
            primarySkills: userinfo.primarySkills,
            secondarySkills: userinfo.secondarySkills,
            currentlyWorkingBUName: userinfo.currentlyWorkingBUName,
            "projects": step_2_data.projects,
            businessUnits: businessUnitList.businessUnits
        }
        console.log("========");
        console.log(userInformation);
        console.log("========");

        this.props.signupActions.submitEmployeeDetails(userInformation);

    }

    componentWillUnmount() {
        let arrBusinessUnit = [];

        _.each(this.props.selectedBusinessUnits, (bu)=> {
            arrBusinessUnit.push(bu)
        });

        let businessUnitList = {
            businessUnits: arrBusinessUnit
        }
        let {step_2_data, userinfo} = this.props;

        let userInformation = {
            employeeNumber: userinfo.employeeNumber,
            firstName: userinfo.firstName,
            lastName: userinfo.lastName,
            email: userinfo.email,
            designation: userinfo.designation,
            dateOfJoining: userinfo.dateOfJoining,
            experience: {
                "years": userinfo.totalYearExperience,
                "months": userinfo.totalMonthExperience
            },
            ctcLast: userinfo.ctcLast,
            ctcBand: userinfo.ctcBand,
            notice: userinfo.noticePeriod,
            billingStatus: userinfo.billingStatus,
            skypeID: userinfo.skypeID,
            primarySkills: userinfo.primarySkills,
            secondarySkills: userinfo.secondarySkills,
            currentlyWorkingBUName: userinfo.currentlyWorkingBUName,
            "projects": step_2_data.projects,
            businessUnits: businessUnitList.businessUnits
        }

        this.props.signupActions.onComponentRemoved(userInformation);

    }

    onBack(e) {

        e.preventDefault();
        this.props.signupActions.onBackClick("step2");

    }

    onAddBusinessUnit() {

        this.setState({serverErrorMessage: false});
        this.props.signupActions.addNewBusinessUnit();

    }

    render() {
        var {selectedBusinessUnits} = this.props;
        var selectedBusinessUnitsComps = _.map(_.keys(selectedBusinessUnits), (rowNumber)=> {
            return <AddBusinessUnitRow key={rowNumber} selectBU={selectedBusinessUnits[rowNumber]}
                                       rowNumber={rowNumber}/>
        });

        return (
            <ReactCSSTransitionGroup transitionName="react-animation"
                                     transitionAppear
                                     transitionAppearTimeout={500}
                                     transitionEnter={false}
                                     transitionLeave={false}>
                <form name="signup" onSubmit={this.onNext.bind(this)}>
                    <Row className="text-center">
                        <Col md={12} sm={8} xs={12} lg={12} className="signUp-box">
                            <div className="login-label text-center">Business Unit Details</div>
                            <Row>
                                <Col xs={12}>
                                    <div>
                                        <div className='text-danger'>
                                            {this.props.statusText}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <Button bsStyle="success" className="pull-right right-buffer"
                                            onClick={this.onAddBusinessUnit.bind(this)}>
                                        <Glyphicon glyph="plus"/> Add More
                                    </Button>
                                </Col>
                            </Row>
                            {selectedBusinessUnitsComps}
                            <Row>
                                <Col xs={6} sm={6} md={6}>

                                    <Button bsStyle="warning" bsSize="large"
                                            className="full-width"
                                            onClick={this.onBack.bind(this)}>
                                        BACK
                                    </Button>
                                </Col>
                                <Col xs={6} sm={6} md={6}>
                                    <Button bsStyle="primary" type="submit" bsSize="large"
                                            className="full-width" onClick={this.onNext.bind(this)}>
                                        SUBMIT
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
    step_2_data: state.signup.signupInfo.employeeInfo,
    userinfo: state.signup.signupInfo.userinfo,
    statusText: state.signup.statusText,
    selectedBusinessUnits: state.signup.selectedBusinessUnits
});

const mapDispatchToProps = (dispatch) => ({
    signupActions: bindActionCreators(SaveStatus, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessUnitDetails);
