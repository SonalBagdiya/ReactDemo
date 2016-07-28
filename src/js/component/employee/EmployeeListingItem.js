'use strict';

import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as employeeActionCreators from "../../actions/employee";
import {ListGroupItem} from "react-bootstrap";
import {Glyphicon, Table, Button} from "react-bootstrap";
import {push} from "redux-router";

class EmployeeListingItem extends React.Component {

    showEmployeeInfo(e) {
        e.preventDefault();
        let {employeeActions, employee} = this.props;

        employeeActions.selectEmployee(employee);
        employeeActions.showEmployeeDetails('user', 1);
        this.props.routeDispatch(push("dashboard/users"));
    }

    goToEditEmployee(id) {
        //alert(id)
        //this.props.routeDispatch(push("dashboard/user/create"));
        // this.setState({addEmployee:true});
        this.props.routeDispatch(push("dashboard/user/edit/" + id));
    }

    render() {

        let {selectedEmployee, employee} = this.props;
        let styleClass = '';
        let currentProjName = null;
        let ReportingTo = null;
        let ReportingToID = null;
        //console.log(employee);
        if (selectedEmployee && (employee._id == selectedEmployee._id)) {
            styleClass = "active ";
        }
        let employeeFirstName = employee.firstName == null ? "" : employee.firstName;
        let employeeLastName = employee.lastName == null ? "" : employee.lastName;
        let billingStatus = null;

        if (employee.projects.current[0] != null) {
            currentProjName = employee.projects == null ? "" : (employee.projects.current[0].name == null ? "" : employee.projects.current[0].name);
            ReportingTo = employee.projects == null ? "" : (employee.projects.current[0].reportingTo == null ? "" : employee.projects.current[0].reportingTo.name);
            ReportingToID = employee.projects == null ? "" : (employee.projects.current[0].reportingTo == null ? "" : employee.projects.current[0].reportingTo.id);
            billingStatus = employee.projects == null ? "" : (employee.projects.current[0].billingStatus == null ? "" : employee.projects.current[0].billingStatus);
        }

        return (
            <tbody>
            <tr onClick={this.showEmployeeInfo.bind(this)}>
                {/*<td className="padding-10">
                 <Button bsStyle="primary"
                 className="pull-left"
                 title="View Employees"
                 onClick={this.showEmployeeInfo.bind(this)>
                 <Glyphicon glyph="list">
                 </Button></td>  onClick={this.goToEditEmployee.bind(this, ReportingToID)}*/}
                    <td className="padding-10">{employee.employeeNumber},&nbsp;{employeeFirstName}&nbsp;&nbsp;{employeeLastName}</td>
                    <td className="padding-10" >{currentProjName}</td>
                    <td className="padding-10" >{billingStatus}</td>
                    <td className="padding-10"><span className="pointer">{ReportingTo}</span></td>
                    </tr>
                    </tbody>
                    );

                }

                }

                const mapStateToProps = (state) => ({
                selectedEmployee: state.employee.selectedEmployee
            });

                const mapDispatchToProps = (dispatch) => ({
                employeeActions: bindActionCreators(employeeActionCreators, dispatch) ,
                routeDispatch: dispatch
            });

                export default connect(mapStateToProps, mapDispatchToProps)(EmployeeListingItem);
