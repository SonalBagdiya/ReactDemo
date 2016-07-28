'use strict';

import React from "react";
import {connect} from "react-redux";
import {Row, Col, FormControls} from "react-bootstrap";
import moment from 'moment'

class EmployeeDetailItem extends React.Component {

    render() {
        var {selectedEmployee} = this.props;
        let employeeItemDetails = null;

        if (_.size(selectedEmployee)>0) {


            employeeItemDetails = <div className="box"><Row className="text-center">
                <Col md={12}><Row>
                    <Col md={6}>
                        <FormControls.Static className="text-wrap" label="Employee Number : " labelClassName="col-xs-4"
                                             wrapperClassName="col-xs-6" value={selectedEmployee.employeeNumber}/>
                        <FormControls.Static className="text-wrap" label="First Name : " labelClassName="col-xs-4"
                                             wrapperClassName="col-xs-6"
                                             value={selectedEmployee.first_name==null?selectedEmployee.firstName:selectedEmployee.first_name}/>
                        <FormControls.Static className="text-wrap" label="Last Name : " labelClassName="col-xs-4"
                                             wrapperClassName="col-xs-6"
                                             value={selectedEmployee.last_name==null?selectedEmployee.lastName:selectedEmployee.last_name}/>
                        <FormControls.Static className="text-wrap" label="Email : " labelClassName="col-xs-4"
                                             wrapperClassName="col-xs-6" value={selectedEmployee.email}/>
                        <FormControls.Static className="text-wrap" label="Designation : " labelClassName="col-xs-4"
                                             wrapperClassName="col-xs-6" value={selectedEmployee.designation}/>
                        <FormControls.Static className="text-wrap" label="Date of Joining : " labelClassName="col-xs-4"
                                             wrapperClassName="col-xs-6"
                                             value={moment(selectedEmployee.dateOfJoining).format("DD/MM/YYYY")}/>
                        <FormControls.Static className="text-wrap" label="Primary Skills : " labelClassName="col-xs-4"
                                             wrapperClassName="col-xs-6" value={selectedEmployee.primarySkills}/>
                        <FormControls.Static className="text-wrap" label="Secondary Skills : " labelClassName="col-xs-4"
                                             wrapperClassName="col-xs-6" value={selectedEmployee.secondarySkills}/>
                    </Col>
                    <Col md={6}>
                        <FormControls.Static className="text-wrap" label="Total Experience : " labelClassName="col-xs-4"
                                             wrapperClassName="col-xs-6"
                                             value={selectedEmployee.experience==null?"":selectedEmployee.experience.months}/>
                        <FormControls.Static className="text-wrap" label="Billing Status : " labelClassName="col-xs-4"
                                             wrapperClassName="col-xs-6" value={selectedEmployee.billingStatus}/>
                        <FormControls.Static className="text-wrap" label="Currently Working with (BU) : "
                                             labelClassName="col-xs-4"
                                             wrapperClassName="col-xs-6"
                                             value={selectedEmployee.currentlyWorkingBUName}/>
                        {/*<FormControls.Static className="text-wrap" label="Exprerience Band : " labelClassName="col-xs-4"
                         wrapperClassName="col-xs-6" value={selectedEmployee.expBand}/>*/}
                        <FormControls.Static className="text-wrap" label="CTC (Last Financial Year) : "
                                             labelClassName="col-xs-4"
                                             wrapperClassName="col-xs-6" value={selectedEmployee.ctcLast}/>
                        <FormControls.Static className="text-wrap" label="CTC Band : " labelClassName="col-xs-4"
                                             wrapperClassName="col-xs-6" value={selectedEmployee.ctcBand}/>
                        <FormControls.Static className="text-wrap" label="Notice Period (in months) : "
                                             labelClassName="col-xs-4"
                                             wrapperClassName="col-xs-6" value={selectedEmployee.notice}/>
                        <FormControls.Static className="text-wrap" label="Skype Id : " labelClassName="col-xs-4"
                                             wrapperClassName="col-xs-6" value={selectedEmployee.skypeID}/>
                    </Col>
                </Row></Col></Row></div>


        }
        else if (selectedEmployee === null) {
            employeeItemDetails =
                <FormControls.Static className="subscriptions-table no-record-found-block">No Details
                    found</FormControls.Static>
        }

        return (
            <form className="form-horizontal admin-right-panel">
                {employeeItemDetails}
            </form>
        );

    }

}

const mapStateToProps = (state) => ({
    selectedEmployee: state.employee.selectedEmployee
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetailItem);
