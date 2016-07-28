'use strict';

import React, {Component, View} from "react";
import {Row, Col} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as SaveStatus from "../../actions/signup";

class StepStatus extends Component {

    componentDidMount() {
        this.props.empActions.saveStatus("step1");
    }

    onStep1() {

        let {step_1_Status} = this.props;
        if (step_1_Status) {
            this.props.empActions.saveStatus("step1");
        }

    }

    onStep2() {

        let {step_2_Status} = this.props;
        if (step_2_Status) {
            this.props.empActions.saveStatus("step2");
        }

    }

    onStep3() {

        let {step_3_Status} = this.props;
        if (step_3_Status) {
            this.props.empActions.saveStatus("step3");
        }

    }

    render() {

        let step_1_class = "circleBase white-circle-color";
        let step_2_class = "circleBase white-circle-color";
        let step_3_class = "circleBase white-circle-color";

        let {step_1_Status, step_2_Status, step_3_Status, currentStep} = this.props;

        if (currentStep == "step1") {
            step_1_class += " blue-circle-color"
        }

        else if (currentStep == "step2") {
            step_2_class += " blue-circle-color"
        }

        else if (currentStep == "step3") {
            step_3_class += " blue-circle-color"
        }

        if (step_1_Status) {
            step_1_class += " green-circle-color";
        }

        if (step_2_Status) {
            step_2_class += " green-circle-color";
        }

        if (step_3_Status) {
            step_3_class += " green-circle-color";
        }

        return (
            <Row>
                <Col md={12} sm={8} xs={12} lg={12} className="signUp-box">
                    <Row>
                        <Col md={4} sm={4} xs={4}>
                            <h5 className="inverse-menu-color">Employee Details</h5>
                            <div onClick={this.onStep1.bind(this)}>
                                <div className={step_1_class}></div>
                            </div>
                        </Col>
                        <Col md={4} sm={4} xs={4}>
                            <h5 className="inverse-menu-color">Project Details</h5>
                            <div onClick={this.onStep2.bind(this)}>
                                <div className={step_2_class}></div>
                            </div>
                        </Col>
                        <Col md={4} sm={4} xs={4}>
                            <h5 className="inverse-menu-color">Business Unit Details</h5>
                            <div onClick={this.onStep3.bind(this)}>
                                <div className={step_3_class}></div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );

    }

}

const mapStateToProps = (state) => ({
    step_1_Status: state.signup.step_1_Status,
    step_2_Status: state.signup.step_2_Status,
    step_3_Status: state.signup.step_3_Status,
    currentStep: state.signup.currentStep
});

const mapDispatchToProps = (dispatch) => ({
    empActions: bindActionCreators(SaveStatus, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(StepStatus);
