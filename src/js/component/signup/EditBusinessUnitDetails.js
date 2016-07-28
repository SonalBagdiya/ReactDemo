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
import * as employeeActionCreators from "../../actions/employee";
import AddBusinessUnitRow from "./AddBusinessUnitRow";

class EditBusinessUnitDetails extends Component {

    constructor(props) {

        super(props);
        //this.state = this.getInitialStateForBUDetails(props);
    }

    getInitialStateForBUDetails(props) {
        if (props.projectInfo.currentBUName != null) {
            return {
                previousBUName: props.projectInfo.previousBUName,
                previousBUDateofJoining: props.projectInfo.previousBUDateofJoining,
                previousBUDateofLeaving: props.projectInfo.previousBUDateofLeaving,
                currentBUName: props.projectInfo.currentBUName,
                currentBUDateofJoining: props.projectInfo.currentBUDateofJoining,
                format: "YYYY-MM-DDTHH:mm:ss.SSS",
                inputFormat: "DD/MM/YYYY",
                mode: "date"
            }
        }
        else if (props.step_2_data != null) {
            let pastdateofJoining = props.step_2_data.past[0] == null ? "" : props.step_2_data.past[0].dateOfJoining;
            let pastdateofLeaving = props.step_2_data.past[0] == null ? "" : props.step_2_data.past[0].dateOfLeaving;
            let currentdateofJoining = props.step_2_data.current[0] == null ? "" : props.step_2_data.current[0].dateOfJoining;
            let pastdateofJoiningText = "";
            let pastdateofLeavingText = "";
            let currentdateofJoiningText = "";
            let previousBusName = null;
            let previousBusDateofJoining = null;
            let previousBusDateofLeaving = null;
            let currentBusName = null;
            let currentBusDateofJoining = null;

            if (pastdateofJoining != null) {
                pastdateofJoiningText = this.dateformattingText(pastdateofJoining)
                pastdateofJoining = this.dateformatting(pastdateofJoining)
            }
            else {
                pastdateofJoining : moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
                pastdateofJoiningText : "Date of Joining";
            }

            if (pastdateofLeaving != null) {
                pastdateofLeavingText = this.dateformattingText(pastdateofLeaving)
                pastdateofLeaving = this.dateformatting(pastdateofLeaving)
            }
            else {
                pastdateofLeaving : moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
                pastdateofLeavingText : "Date of Leaving";
            }

            if (currentdateofJoining != null) {
                currentdateofJoiningText = this.dateformattingText(currentdateofJoining)
                currentdateofJoining = this.dateformatting(currentdateofJoining)
            } else {
                currentdateofJoining : moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
                currentdateofJoiningText : "Date of Leaving";
            }

            if (props.step_2_data.current[0] != null) {
                currentBusName = props.step_2_data.current[0].name;
            }
            if (props.step_2_data.past[0] != null) {
                previousBusName = props.step_2_data.past[0].name;
            }
            return {
                previousBUName: previousBusName,
                previousBUDateofJoining: pastdateofJoining,
                previousBUDateofLeaving: pastdateofLeaving,
                currentBUName: currentBusName,
                currentBUDateofJoining: currentdateofJoining,
                format: "YYYY-MM-DDTHH:mm:ss.SSS",
                inputFormat: "DD/MM/YYYY",
                mode: "date"
            }

        }
    }

    componentDidMount() {
        const {step_2_data, selectedBusinessUnits} = this.props;
        if (selectedBusinessUnits[1] == undefined && selectedBusinessUnits[1] == null) {
            if (step_2_data != null) {
                let count = 1;
                let selectedBusinessUnits = {
                    1: {}
                }
                let arrProjects = [];
                _.each(step_2_data.current, (bu)=> {
                    selectedBusinessUnits[count] = bu;
                    count++;
                });

                _.each(step_2_data.past, (bu)=> {
                    selectedBusinessUnits[count] = bu;
                    count++;
                });

                this.props.signupActions.updateBU(selectedBusinessUnits);
            }
        }
    }

    onNext(e) {
        let {step_2_data, updateUserInfo, projectInfo} = this.props;
        let arrBusinessUnit = [];

        _.each(this.props.selectedBusinessUnits, (bu)=> {
            arrBusinessUnit.push(bu)
        });

        let businessUnitList = {
            businessUnits: arrBusinessUnit
        }

        this.props.signupActions.updateProjectInfo(businessUnitList);

        e.preventDefault();
        let updateUserInformation = {
            employeeNumber: updateUserInfo.employeeNumber,
            firstName: updateUserInfo.firstName,
            lastName: updateUserInfo.lastName,
            designation: updateUserInfo.designation,
            dateOfJoining: updateUserInfo.dateOfJoining,
            experience: {
                "years": updateUserInfo.totalYearExperience,
                "months": updateUserInfo.totalMonthExperience
            },
            billingStatus: updateUserInfo.billingStatus,
            ctcLast: updateUserInfo.ctcLast,
            ctcBand: updateUserInfo.ctcBand,
            notice: updateUserInfo.noticePeriod,
            skypeID: updateUserInfo.skypeID,
            primarySkills: updateUserInfo.primarySkills,
            secondarySkills: updateUserInfo.secondarySkills,
            currentlyWorkingBUName: updateUserInfo.currentlyWorkingBUName,
            "projects": projectInfo.projects,
            businessUnits: businessUnitList.businessUnits
        }
        console.log("========");
        console.log(updateUserInformation);
        console.log("========");

        this.props.signupActions.updateEmployeeDetails(updateUserInformation, this.props.employeeId);

    }

    componentWillUnmount() {

        /* let {step_2_data, projectInfo} = this.props;

         let step3Data = {
         previousProjectName: projectInfo.previousProjectName,
         previousSubProjectName: projectInfo.previousSubProjectName,
         previousRole: projectInfo.previousRole,
         prevProjDateOfJoining: projectInfo.prevProjDateOfJoining,
         dateOfLeaving: projectInfo.dateOfLeaving,
         currentProjName: projectInfo.currentProjName,
         currentSubProjName: projectInfo.currentSubProjName,
         currentRole: projectInfo.currentRole,
         currDateofJoining: projectInfo.currDateofJoining,
         currDateofLeaving: projectInfo.currDateofLeaving,
         currReportingName: projectInfo.currReportingName,
         currReportingID: projectInfo.currReportingID,
         currBillingRateType: projectInfo.currBillingRateType,
         currBillingRate: projectInfo.currBillingRate,
         prevReportingName: projectInfo.prevReportingName,
         prevReportingID: projectInfo.prevReportingID,
         prevBillingRateType: projectInfo.prevBillingRateType,
         prevBillingRate: projectInfo.prevBillingRate,
         previousBUName: this.state.previousBUName,
         previousBUDateofJoining: this.state.previousBUDateofJoining,
         previousBUDateofLeaving: this.state.previousBUDateofLeaving,
         currentBUName: this.state.currentBUName,
         currentBUDateofJoining: this.state.currentBUDateofJoining
         }

         this.props.signupActions.onBUComponentRemoved(step3Data);*/

    }

    onAddBusinessUnit() {

        this.props.signupActions.addNewBusinessUnit();

    }

    onBack(e) {

        e.preventDefault();
        this.props.signupActions.onBackClick("step2");

    }

    /* onPreviousBUNameChange(e)
     {

     this.setState({previousBUName: e.target.value});

     }

     onPreviousBUDateofJoiningChange(e)
     {

     this.setState({previousBUDateofJoining: e});

     }

     onPreviousBUDateofLeavingChange(e)
     {

     this.setState({previousBUDateofLeaving: e});

     }

     onCurrentBUNameChange(e)
     {

     this.setState({currentBUName: e.target.value});

     }

     onCurrentBUDateofJoiningChange(e)
     {

     this.setState({currentBUDateofJoining: e});

     }*/

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
    projectInfo: state.signup.updateUserInfo.projects,
    // businessUnits: state.signup.updateUserInfo.businessUnits,
    updateUserInfo: state.signup.updateUserInfo.userInfo,
    statusText: state.signup.statusText,
    step_2_data: state.employee.selectedEmployee.businessUnits,
    selectedBusinessUnits: state.signup.selectedBusinessUnits
});

const mapDispatchToProps = (dispatch) => ({
    signupActions: bindActionCreators(SaveStatus, dispatch),
    employeeActions: bindActionCreators(employeeActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBusinessUnitDetails);
