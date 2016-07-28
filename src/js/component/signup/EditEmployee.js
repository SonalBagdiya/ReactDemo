'use strict';

import React, {Component, View} from "react";
import {Grid, Row, Col, Jumbotron, BreadcrumbItem} from "react-bootstrap";
import {connect} from "react-redux";
import StepStatus from "./StepStatus";
import EditUserInfo from "./EditUserInfo";
import EditProjectDetails from "./EditProjectDetails";
import EditBusinessUnitDetails from "./EditBusinessUnitDetails";
import {Element} from "react-scroll";
import RouteBreadcrumb from "../common/RouteBreadcrumb";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as empActionsCreator from "../../actions/signup";
import {bindActionCreators} from "redux";

class EditEmployee extends Component {

    constructor(props) {

        super(props);
        this.state = {}

    }

    render() {
        let selectedEmployeeName = "";
        let breadcrumbItem = null;
        let userId = null;
        //alert(this.props.routeParams);
        if (this.props.routeParams != null)
            userId = this.props.routeParams.userId;
        if (this.props.selectedEmployee != null)
            selectedEmployeeName = this.props.selectedEmployee.first_name == null ? this.props.selectedEmployee.firstName : this.props.selectedEmployee.first_name;
        breadcrumbItem =
            <BreadcrumbItem active> User / {selectedEmployeeName}</BreadcrumbItem>

        // let breadcrumbValue = <BreadcrumbItem active>E User</BreadcrumbItem>
        var comp = null;

        if (this.props.currentStep == 'step1') {
            comp = <EditUserInfo employeeId={userId}/>;
        }
        else if (this.props.currentStep == 'step2') {
            comp = <EditProjectDetails employeeId={userId}/>;
        }
        else if (this.props.currentStep == 'step3') {
            comp = <EditBusinessUnitDetails employeeId={userId}/>;
        }

        return (

            <Element className="" name="splashScreen">
                <div>
                    {/*  <Row>
                     <Col md={12}>
                     <RouteBreadcrumb breadcrumbValue={breadcrumbItem} breadcrumbHomeLink="#/dashboard/home"/>
                     </Col>
                     </Row>*/}
                    <div>
                        <Jumbotron className="text-center">
                            <div className="orgs-content">
                                <ReactCSSTransitionGroup transitionName="react-animation"
                                                         transitionAppear
                                                         transitionAppearTimeout={500}
                                                         transitionEnter={false}
                                                         transitionLeave={false}>
                                    <Grid>
                                        <Row className="text-center">
                                            <Col md={12}>
                                                <StepStatus/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                {comp}
                                            </Col>
                                        </Row>
                                    </Grid>
                                </ReactCSSTransitionGroup>
                            </div>
                        </Jumbotron>
                    </div>
                </div>
            </Element>
        );

    }

}

const mapStateToProps = (state) => ({
    currentStep: state.signup.currentStep,
    selectedEmployee: state.employee.selectedEmployee,

});

const mapDispatchToProps = (dispatch) => ({
    empActions: bindActionCreators(empActionsCreator, dispatch),
    routeDispatch: dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(EditEmployee);
