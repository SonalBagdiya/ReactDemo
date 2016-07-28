'use strict';

import React, {Component, View} from "react";
import {NavItem, Nav} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as employeeActionCreators from "../../actions/employee";
import EmployeeDetailItem from "./EmployeeDetailItem";
import ProjectDetail from "./ProjectDetail";
import BusinessDetail from "./BusinessDetail";

class EmployeeDetails extends React.Component {

    getProjectDetailTab(e) {

        e.preventDefault();
        //  this.props.employeeActions.showSubscriptionDetail('subscription', 2);
        this.props.employeeActions.showProjectDetails('employee', 2);

    }

    getEmployeeDetailsTab(e) {

        e.preventDefault();
        this.props.employeeActions.showEmployeeDetails('employee', 1);

    }

    getBusinessDetailsTab(e) {

        e.preventDefault();
        // this.props.employeeActions.showEmployeeDetails('employee', 1);
        this.props.employeeActions.showBusinessDetails('employee', 3);

    }

    render() {

        let DetailScreen = null;

        let {projectDetailsTab, businessDetailsTab, employeeDetailsTab, activeKey} = this.props;

        if (employeeDetailsTab) {
            DetailScreen = <EmployeeDetailItem />;
        }

        if (projectDetailsTab) {
            DetailScreen = <ProjectDetail />;
        }

        if (businessDetailsTab) {
            DetailScreen = <BusinessDetail />;
        }

        return (
            <div>

                <Nav bsStyle="tabs" activeKey={activeKey}>
                    <NavItem eventKey={1} title="Employee Details"
                             onClick={this.getEmployeeDetailsTab.bind(this)}>
                        Employee Details
                    </NavItem>
                    <NavItem eventKey={2} title="Project Details"
                             onClick={this.getProjectDetailTab.bind(this)}>
                        Project Details
                    </NavItem>
                    <NavItem eventKey={3} title="Business Unit Details"
                             onClick={this.getBusinessDetailsTab.bind(this)}>
                        Business Unit Details
                    </NavItem>
                </Nav>

                {DetailScreen}

            </div>
        );

    }

}

const mapStateToProps = (state) => ({
    businessDetailsTab: state.employee.businessDetailsTab,
    employeeDetailsTab: state.employee.employeeDetailsTab,
    projectDetailsTab: state.employee.projectDetailsTab,
    activeKey: state.employee.activeKey
});

const mapDispatchToProps = (dispatch) => ({
    employeeActions: bindActionCreators(employeeActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails);
