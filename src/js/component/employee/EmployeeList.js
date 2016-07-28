/**
 * Created by sonalb on 6/21/2016.
 */

import React, {Component, View} from "react";
import {Row, Col, Button, ListGroup, Glyphicon, Input, Pagination, BreadcrumbItem} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "redux-router";
import * as employeeActionCreators from "../../actions/employee";
import EmployeeListItem from "./EmployeeListItem";
import EmployeeDetails from "./EmployeeDetails";
import RouteBreadcrumb from "../common/RouteBreadcrumb";
import SignUp from "../signup/SignUp";
import * as empActionsCreator from "../../actions/signup";

class EmployeeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            addEmployee: false
        }

    }

    componentDidMount() {

        this.props.empActions.addUpdateClick();

    }

    onSearch(e) {

        this.setState({searchText: e.target.value});

    }

    goToAddEmployee() {

        this.props.routeDispatch(push("dashboard/user/create"));

    }

    goToEditEmployee() {

        this.props.routeDispatch(push("dashboard/user/edit/" + this.props.selectedEmployee._id));
    }

    render() {
        var rightPanel = <EmployeeDetails />

        var {selectedEmployee} = this.props;

        let breadcrumbItem = null;
        let selectedEmployeeName = "";
        let breadcrumbItemLink = "";
        breadcrumbItemLink = "User";

        if (selectedEmployee != null)
            selectedEmployeeName = selectedEmployee.firstName + " " + selectedEmployee.lastName;
        breadcrumbItem =
            <BreadcrumbItem active>{breadcrumbItemLink} / {selectedEmployeeName}</BreadcrumbItem>

        return (
            <div>
                <div className="orgs-content">
                    <Row>
                        <Col xs={1} sm={1} md={1}>
                            <div className="padding-bottom-10"><img alt={selectedEmployeeName}
                                                                    src="img/employee.png"
                                                                    width="100" height="100"
                                                                    onClick={this.goToEditEmployee.bind(this)}/></div>
                        </Col>
                        <Col xs={6} sm={6} md={4}>
                            <div className="details">
                                <div className="name">{selectedEmployeeName}</div>
                                <div className="headline">{selectedEmployee.designation}</div>
                                <div className="status">Billing Status - {selectedEmployee.billingStatus} </div>
                            </div>
                        </Col>
                        <Col xs={1} sm={3} md={1}>
                            <Button bsStyle="primary"
                                    className="pull-right"
                                    title="Edit Employee"
                                    onClick={this.goToEditEmployee.bind(this)}>
                                <Glyphicon glyph="edit"/>&nbsp;&nbsp;Edit Employee
                            </Button>
                        </Col>
                        <Col xs={2} sm={3} md={2}>
                            <Button bsStyle="primary"
                                    className="pull-right"
                                    title="Add Employees"
                                    onClick={this.goToAddEmployee.bind(this)}>
                                <Glyphicon glyph="plus"/>&nbsp;&nbsp;Add Employees
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={12}>
                            <div>{rightPanel}</div>
                        </Col>
                    </Row></div>
            </div>
        );

    }

}

const mapStateToProps = (state) => ({
    selectedEmployee: state.employee.selectedEmployee,
    selectedOption: state.employee.selectedOption,
});

const mapDispatchToProps = (dispatch) => ({
    employeeActions: bindActionCreators(employeeActionCreators, dispatch),
    empActions: bindActionCreators(empActionsCreator, dispatch),
    routeDispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
