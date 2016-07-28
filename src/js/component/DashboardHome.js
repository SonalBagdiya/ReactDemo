'use strict';

import React, {Component, View} from "react";
import {Grid, Row, Button, Panel, Col, Input, Glyphicon, Table, Pagination} from "react-bootstrap";
import EmployeeListingItem from "./employee/EmployeeListingItem";
import {push} from "redux-router";
import {connect} from "react-redux";
import * as employeeActionCreators from "../actions/employee";
import {bindActionCreators} from "redux";

class DashboardHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchNameText: '',
            searchProjectText: '',
            searchBillableText: '',
            searchReportingText: '',
            month: new Date().getMonth() + 1,
            bu: "select"
        }

    }

    handleSelect(event, selectedEvent) {
        this.props.employeeActions.saveCurrentPageNumber(selectedEvent.eventKey, this.props.paginationLimit);

    }

    componentDidMount() {
        // this.props.empActions.addUpdateClick();
        let {pageOffset, paginationLimit} = this.props;
        let {employeeActions} = this.props;

        employeeActions.fetchUsers(1, 50);

    }

    onEmployeeSearch(e) {

        this.setState({searchNameText: e.target.value});

    }

    onProjectSearch(e) {

        this.setState({searchProjectText: e.target.value});

    }

    onBillableSearch(e) {

        this.setState({searchBillableText: e.target.value});

    }

    onReportingSearch(e) {
        this.setState({searchReportingText: e.target.value});

    }

    goToAddEmployee() {
        this.props.routeDispatch(push("dashboard/user/create"));

    }

    getBusinessDatesCount(startDate, endDate) {
        var count = 0;
        var curDate = startDate;
        while (curDate<=endDate) {
            var dayOfWeek = curDate.getDay();
            if (!((dayOfWeek == 6) || (dayOfWeek == 0)))
                count++;
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    }

    onMonthChange(e) {

        this.setState({month: e.target.value});

    }

    onBUChange(e) {

        this.setState({bu: e.target.value});

    }

    render() {
        var d = new Date();
        var stDate = new Date(d.getFullYear(), d.getMonth(), 1);
        var endDate = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        var locale = "en-us";
        var currentMonth = d.toLocaleString(locale, {month: "long"});
        var currentYear = d.getFullYear();

        var businessDays = this.getBusinessDatesCount(stDate, endDate)

        var {employeeList, totalEmployeeList, paginationLimit, currentPage, holidays} = this.props;

        var billableDays = businessDays - holidays[currentMonth];


        let searchNameKey = this.state.searchNameText;
        if (searchNameKey && searchNameKey.length>0) {
            employeeList = _.filter(employeeList, (employee) => {
                    var selectedOrgName = employee.first_name == null ? employee.firstName : employee.first_name;
                    var empID = employee.employeeNumber + ''
                    if (selectedOrgName.toLowerCase().indexOf(searchNameKey.toLowerCase()) != -1) {
                        return employee;
                    }
                    else if (employee.email.toLowerCase().indexOf(searchNameKey.toLowerCase()) != -1) {
                        return employee;
                    }
                    else if (empID.toLowerCase().indexOf(searchNameKey.toLowerCase()) != -1) {
                        return employee;
                    }
                }
            );

        }

        let remainder = totalEmployeeList % paginationLimit;
        let total = totalEmployeeList / paginationLimit;
        total = Math.floor(total);
        if (remainder>0) {
            total = total + 1;
        }
        let pagination = null;
        pagination = null;
        pagination =
            <Pagination
                prev
                next
                first
                last
                bsSize="small"
                ellipsis
                boundaryLinks
                items={total}
                maxButtons={3}
                activePage={currentPage}
                onSelect={this.handleSelect.bind(this)}/>

        let searchProjKey = this.state.searchProjectText;
        if (searchProjKey && searchProjKey.length>0) {
            employeeList = _.filter(employeeList, (employee) => {
                    let currentProjName = employee.projects.current[0] == null ? "" : (employee.projects.current[0].name == null ? "" : employee.projects.current[0].name);
                    return currentProjName.toLowerCase().indexOf(searchProjKey.toLowerCase()) != -1;
                }
            );
        }

        let searchBillableKey = this.state.searchBillableText;
        if (searchBillableKey && searchBillableKey.length>0) {
            employeeList = _.filter(employeeList, (employee) => {
                    let billingStatus = employee.billingStatus == null ? "" : employee.billingStatus;
                    return billingStatus.toLowerCase().indexOf(searchBillableKey.toLowerCase()) != -1;
                }
            );
        }

        let searchReportingKey = this.state.searchReportingText;
        if (searchReportingKey && searchReportingKey.length>0) {
            employeeList = _.filter(employeeList, (employee) => {
                    let ReportingTo = employee.projects.current[0] == null ? "" : (employee.projects.current[0].reportingTo == null ? "" : employee.projects.current[0].reportingTo.name);

                    return ReportingTo.toLowerCase().indexOf(searchReportingKey.toLowerCase()) != -1;
                }
            );
        }


        let employeeListing = null;
        let arrProjects = [];
        let billableCount = 0;
        let shadowCount = 0
        let benchCount = 0
        let empCount = 0
        var selectedMonth = this.state.month;
        var selectedBU = this.state.bu;

        if (_.size(employeeList)>0) {

            employeeListing = _.map(employeeList, (employee) => {

               // var buName = employee.businessUnits.current[0] == null ? "" : employee.businessUnits.current[0].name;
                var buName = employee.currentlyWorkingBUName;
                if (buName == selectedBU || selectedBU == "select") {
                    empCount = 0;
                   // alert(selectedMonth);
                    _.each(employee.projects.current, (project)=> {
                        if (project.billingStatus == "billable")
                            billableCount++;
                        if (project.billingStatus == "shadow")
                            shadowCount++;
                        if (project.billingStatus == "bench")
                            benchCount++;

                        if (selectedMonth != "select") {
                            if (project.dateOfLeaving == null && project.dateOfLeaving == undefined) {
                                var dtJoin = new Date(project.dateOfJoining);
                                var joingMnth = dtJoin.getMonth() + 1;
                                var joiningYear = dtJoin.getFullYear()
                                var yr = d.getFullYear()
                                if (selectedMonth>=joingMnth && joiningYear == yr) {

                                    //alert(selectedMonth + " ," +joingMnth)
                                    empCount++
                                }
                            }
                            else {
                                var dtLeave = new Date(project.dateOfLeaving);
                                var dtJoin = new Date(project.dateOfJoining);
                                var joingMnth = dtJoin.getMonth() + 1;
                                var leavingMnth = dtLeave.getMonth() + 1;
                                var joiningYear = dtJoin.getFullYear()
                                var leavingYear = dtLeave.getFullYear()
                                var yr = d.getFullYear()
                                if(joiningYear === yr && joiningYear === leavingYear) {
                                if (selectedMonth<=leavingMnth && selectedMonth>=joingMnth) {
                                    empCount++
                                }
                            }
                            }
                        } else {
                            empCount++
                        }
                    });

                    if (selectedMonth != "select") {
                        _.each(employee.projects.past, (project)=> {

                            if (project.dateOfLeaving == null && project.dateOfLeaving == undefined) {
                                var dtJoin = new Date(project.dateOfJoining);
                                var joingMnth = dtJoin.getMonth() + 1;
                                var joiningYear = dtJoin.getFullYear()
                                var yr = d.getFullYear()
                                if (selectedMonth>=joingMnth && joiningYear == yr)
                                    empCount++
                         //   alert(selectedMonth + " ," +joingMnth)

                            }
                            else {
                                var dtLeave = new Date(project.dateOfLeaving);
                                var dtJoin = new Date(project.dateOfJoining);
                                var joingMnth = dtJoin.getMonth() + 1;
                                var leavingMnth = dtLeave.getMonth() + 1;
                                var joiningYear = dtJoin.getFullYear()
                                var leavingYear = dtLeave.getFullYear()
                                var yr = d.getFullYear()
                            if(joiningYear === yr && joiningYear === leavingYear) {
                                if (selectedMonth<=leavingMnth && selectedMonth>=joingMnth) {
                                    empCount++
                                }
                            }
                            }
                        });
                    } else {
                        empCount++
                    }
                    //  alert(empCount);
                    if (empCount>0)
                        return <EmployeeListingItem employee={employee}
                                                    key={employee._id} currentProject={arrProjects}/>;
                    else
                        return null;
                }
            });
        }

        if (employeeListing === null) {
            employeeListing = <tbody>
            <tr className="subscriptions-table no-record-found-block">
                <td colSpan="6">No Employees found</td>
            </tr>
            </tbody>
        }

        return (

            <Table responsive bordered condensed hover className="subscription-products-table margin-top-65">
                <tr>
                    <td>

                        <Row>
                            <Col md={2} sm={12} xs={12} className="heading-month">
                                {/*{currentMonth} {currentYear} - BU6*/}
                                <Input type="select"
                                       placeholder="Select Month"
                                       title="Select Month"
                                       value={this.state.month}
                                       className="subscription-product-inputs"
                                       onChange={this.onMonthChange.bind(this)} required>
                                    <option value="select">Select Month</option>
                                    <option key="January" value="1">January</option>
                                    <option key="February" value="2">February</option>
                                    <option key="March" value="3">March</option>
                                    <option key="April" value="4">April</option>
                                    <option key="May" value="5">May</option>
                                    <option key="June" value="6">June</option>
                                    <option key="July" value="7">July</option>
                                    <option key="August" value="8">August</option>
                                    <option key="September" value="9">September</option>
                                    <option key="October" value="10">October</option>
                                    <option key="November" value="11">November</option>
                                    <option key="December" value="12">December</option>
                                </Input>
                                {pagination}
                            </Col>
                            <Col md={2} sm={12} xs={12} className="heading-month">
                                <Input type="select"
                                       placeholder="Select BU"
                                       title="Select BU"
                                       value={this.state.bu}
                                       className="subscription-product-inputs"
                                       onChange={this.onBUChange.bind(this)} required>
                                    <option value="select">Select BU</option>
                                    <option key="BU-1" value="BU-1">BU-1</option>
                                    <option key="BU-2" value="BU-2">BU-2</option>
                                    <option key="BU-3" value="BU-3">BU-3</option>
                                    <option key="BU-4" value="BU-4">BU-4</option>
                                    <option key="BU-5" value="BU-5">BU-5</option>
                                    <option key="BU-6" value="BU-6">BU-6</option>
                                    <option key="BU-7" value="BU-7">BU-7</option>
                                </Input>
                            </Col>
                            <Col md={2} sm={12} xs={12} className="text-center">
                                <div className="heading-billing"><br/>
                                    Billable days - {billableDays} <br/>
                                    Billable hrs - {billableDays * 8} <br/>
                                    Holidays - {holidays[currentMonth]} <br/>
                                </div>
                            </Col>
                            <Col md={2} sm={12} xs={12} className="text-center">
                                <div className="heading-billing"><br/>
                                    Total Billable: {billableCount} <br/>
                                    Total Bench: {benchCount} <br/>
                                    Total Shadow: {shadowCount}
                                </div>
                            </Col>
                            <Col md={3} sm={12} xs={12} className="text-center"> <br/>
                                <Button bsStyle="primary"
                                        className="pull-right"
                                        title="Add Employees"
                                        onClick={this.goToAddEmployee.bind(this)}>
                                    <Glyphicon glyph="plus"/>
                                    &nbsp;&nbsp;Add Employees
                                </Button>
                            </Col>

                        </Row>

                    </td>
                </tr>
                <tbody>
                <tr>
                    <td>
                        <Table responsive bordered condensed hover className="subscription-products-table">
                            <thead className="subscription-products-table-thead">
                            <tr className="subscription-products-table-thead">
                                <td>
                                    <Input type="text" value={this.state.searchNameText} placeholder="Search"
                                           onChange={this.onEmployeeSearch.bind(this)}/>
                                </td>
                                <td>
                                    <Input type="text" value={this.state.searchProjectText} placeholder="Search"
                                           onChange={this.onProjectSearch.bind(this)}/>
                                </td>
                                <td>
                                    <Input type="text" value={this.state.searchBillableText} placeholder="Search"
                                           onChange={this.onBillableSearch.bind(this)}/>
                                </td>
                                <td>
                                    <Input type="text" value={this.state.searchReportingText} placeholder="Search"
                                           onChange={this.onReportingSearch.bind(this)}/>
                                </td>
                            </tr>
                            <tr>
                                <th className="padding-10">
                                    <b>Name</b>
                                </th>
                                <th className="padding-10">
                                    <b>Current Project</b>
                                </th>
                                <th className="padding-10">
                                    <b>Billable</b>
                                </th>
                                <th className="padding-10">
                                    <b>Reporting To</b>
                                </th>
                            </tr>
                            </thead>
                            {employeeListing}
                        </Table>
                    </td>
                </tr>
                </tbody>
                <tr>
                    <td>
                        <Row>
                            <Col md={2} sm={12} xs={12} className="heading-month">{pagination}</Col>
                        </Row>
                    </td>
                </tr>
            </Table>

        );

    }

}

const mapStateToProps = (state) => ({
    employeeList: state.employee.employeeList,
    pageOffset: state.employee.pageOffset,
    currentPage: state.employee.currentPage,
    totalEmployeeList: state.employee.totalEmployeeList,
    paginationLimit: state.common.paginationLimit,
    holidays: state.employee.holidays
});

const mapDispatchToProps = (dispatch) => ({
    employeeActions: bindActionCreators(employeeActionCreators, dispatch),
    //empActions: bindActionCreators(empActionsCreator, dispatch),
    routeDispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHome);
