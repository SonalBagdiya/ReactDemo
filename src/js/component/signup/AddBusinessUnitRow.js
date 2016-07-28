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

class AddBusinessUnitRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previousBUName: props.selectBU.name,
            previousBUDateofJoining: props.selectBU.dateOfJoining,
            previousBUDateofLeaving: props.selectBU.dateOfLeaving,
            format: "YYYY-MM-DDTHH:mm:ss.SSS",
            inputFormat: "DD/MM/YYYY",
            mode: "date"
        }
        if (props.selectBU.dateOfJoining != null && props.selectBU.dateOfJoining != "Invalid date") {
            this.state.previousBUDateofJoining = props.selectBU.dateOfJoining;
            this.state.previousBUDateofJoiningdefaultText = moment(props.selectBU.dateOfJoining).format("DD/MM/YYYY");
        }
        else {
            this.state.previousBUDateofJoining = moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
            this.state.previousBUDateofJoiningdefaultText = "Date of Joining"
        }
        if (props.selectBU.dateOfLeaving != null && props.selectBU.dateOfLeaving != "Invalid date") {
            this.state.previousBUDateofLeaving = props.selectBU.dateOfLeaving;
            this.state.previousBUDateofLeavingdefaultText = moment(props.selectBU.dateOfLeaving).format("DD/MM/YYYY");
        }
        else {
            this.state.previousBUDateofLeaving = moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
            this.state.previousBUDateofLeavingdefaultText = "Date of Leaving"
        }
    }

    onBUDeleted() {

        this.props.signupActions.buDeleted(this.props.rowNumber);

    }

    onPreviousBUNameChange(e) {

        this.setState({previousBUName: e.target.value});
        this.props.signupActions.buNameAdded(this.props.rowNumber, e.target.value);
    }

    onPreviousBUDateofJoiningChange(e) {

        this.setState({previousBUDateofJoining: e});
        this.props.signupActions.buDateOfJoiningAdded(this.props.rowNumber, e);

    }

    onPreviousBUDateofLeavingChange(e) {

        this.setState({previousBUDateofLeaving: e});
        this.props.signupActions.buDateOfLeavingAdded(this.props.rowNumber, e);

    }

    render() {
        //alert(rowNumber);
        const {format, mode, inputFormat} = this.state;
        let {statusText, selectedBusinessUnits, rowNumber} = this.props;

        if (statusText !== '') {
            this.state.serverErrorMessage = true;
        }
        else {
            this.state.serverErrorMessage = false;
        }
        let rowCount = _.keys(selectedBusinessUnits).length;

        return (

            <Row className="text-center">
                <Col md={12} sm={8} xs={12} lg={12}>
                    <div className="pull-right">{rowCount == 1 ? <span> </span> : <Button bsStyle="danger"
                                                                                          bsSize="xsmall"
                                                                                          disabled={selectedBusinessUnits[rowNumber].disabled}
                                                                                          onClick={this.onBUDeleted.bind(this)}
                                                                                          title="Delete a project">
                        <Glyphicon glyph="minus"/>
                    </Button>}</div>
                    <div className="login-label text-left">Business Unit</div>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <Input type="select"
                                       placeholder="Select BU Name*"
                                       value={this.state.previousBUName}
                                       className="subscription-product-inputs"
                                       onChange={this.onPreviousBUNameChange.bind(this)} required>
                                    <option value="">BU Name</option>
                                    <option key="BU-1" value="BU-1">BU-1</option>
                                    <option key="BU-2" value="BU-2">BU-2</option>
                                    <option key="BU-3" value="BU-3">BU-3</option>
                                    <option key="BU-4" value="BU-4">BU-4</option>
                                    <option key="BU-5" value="BU-5">BU-5</option>
                                    <option key="BU-6" value="BU-6">BU-6</option>
                                    <option key="BU-7" value="BU-7">BU-7</option>
                                </Input>

                                {/*<Input type="text"
                                 defaultValue={this.state.previousBUName}
                                 addonBefore={<span className="fa fa-home"></span>}
                                 placeholder="BU Name*"
                                 required
                                 onChange={this.onPreviousBUNameChange.bind(this)} required/>*/}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <DateTimeField
                                    defaultText={this.state.previousBUDateofJoiningdefaultText}
                                    onChange={this.onPreviousBUDateofJoiningChange.bind(this)}
                                    format={format}
                                    inputFormat={inputFormat}
                                    dateTime={this.state.previousBUDateofJoining}
                                    required/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="login-tbox">
                                <DateTimeField
                                    defaultText={this.state.previousBUDateofLeavingdefaultText}
                                    onChange={this.onPreviousBUDateofLeavingChange.bind(this)}
                                    format={format}
                                    inputFormat={inputFormat}
                                    dateTime={this.state.previousBUDateofLeaving}
                                    required/>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

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

export default connect(mapStateToProps, mapDispatchToProps)(AddBusinessUnitRow);