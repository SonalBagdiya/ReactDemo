'use strict';

import React, {Component, View} from "react";
import {Grid, Row, Col, Jumbotron, BreadcrumbItem} from "react-bootstrap";
import {connect} from "react-redux";
import StepStatus from "./StepStatus";
import SignUpUserInfo from "./SignUpUserInfo";
import ProjectDetails from "./ProjectDetails";
import BusinessUnitDetails from "./BusinessUnitDetails";
import {Element} from "react-scroll";
import RouteBreadcrumb from "../common/RouteBreadcrumb";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as empActionsCreator from "../../actions/signup";
import {bindActionCreators} from "redux";

class SignUp extends Component {

    constructor(props) {

        super(props);
    }

    componentDidMount() {
        this.props.empActions.addUpdateClick("add");
    }

    render() {
        let breadcrumbValue = <BreadcrumbItem active>Add User</BreadcrumbItem>
        var comp = null;

        if (this.props.currentStep == 'step1') {
            comp = <SignUpUserInfo />;
        }
        else if (this.props.currentStep == 'step2') {
            comp = <ProjectDetails />;
        }
        else if (this.props.currentStep == 'step3') {
            comp = <BusinessUnitDetails />;
        }

        return (

            <Element className="" name="splashScreen">
                <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
