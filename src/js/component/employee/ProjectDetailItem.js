'use strict';

import React from "react";
import {connect} from "react-redux";
import {Row, Col, FormControls} from "react-bootstrap";
import moment from 'moment'

class ProjectDetailItem extends React.Component {

    render() {

        var {rowNumber, project} = this.props;
        let DtJoining = null;
        let DtLeaving = null;
        let billingStartDt = null;
        let billingEndDt = null;
        let reportingTo = null;
        let billingType = null;
        let billingRate = null;

        DtJoining = project.dateOfJoining == null ? "" : moment(project.dateOfJoining).format("DD/MM/YYYY");
        DtLeaving = project.dateOfLeaving == null ? "" : moment(project.dateOfLeaving).format("DD/MM/YYYY");
        billingStartDt = project.billingStartDate == null ? "" : moment(project.billingStartDate).format("DD/MM/YYYY");
        billingEndDt = project.billingEndDate == null ? "" : moment(project.billingEndDate).format("DD/MM/YYYY");
        reportingTo = project.reportingTo == null ? "" : (project.reportingTo.name == null ? "" : project.reportingTo.name);
        billingType = project.billing == null ? "" : (project.billing.type == null ? "" : project.billing.type);
        billingRate = project.billing == null ? "" : (project.billing.rate == null ? "" : project.billing.rate);

        return (
            <div className="box">
                <Row className="text-center">
                    <Col md={12}>
                        <Row>
                            <Col md={4}>
                                <FormControls.Static className="text-wrap" label="Project Name : "
                                                     labelClassName="col-xs-4"
                                                     wrapperClassName="col-xs-6" value={project.name}/>
                                <FormControls.Static className="text-wrap" label="Sub-Project Name : "
                                                     labelClassName="col-xs-4"
                                                     wrapperClassName="col-xs-6" value={project.subName}/>
                                <FormControls.Static className="text-wrap" label="Role : " labelClassName="col-xs-4"
                                                     wrapperClassName="col-xs-6" value={project.role}/>
                                <FormControls.Static className="text-wrap" label="Date of Joining : "
                                                     labelClassName="col-xs-4"
                                                     wrapperClassName="col-xs-6" value={DtJoining}/>
                                <FormControls.Static className="text-wrap" label="Date of Leaving : "
                                                     labelClassName="col-xs-4"
                                                     wrapperClassName="col-xs-6" value={DtLeaving}/>
                            </Col>
                            <Col md={4}>
                                <FormControls.Static className="text-wrap" label="Reporting To : "
                                                     labelClassName="col-xs-4"
                                                     wrapperClassName="col-xs-6" value={reportingTo}/>
                                <FormControls.Static className="text-wrap" label="Billing Rate : "
                                                     labelClassName="col-xs-4"
                                                     wrapperClassName="col-xs-6"
                                                     value={billingRate+"("+billingType+")"}/>
                                <FormControls.Static className="text-wrap" label="Billing Status : "
                                                     labelClassName="col-xs-4"
                                                     wrapperClassName="col-xs-6" value={project.billingStatus}/>
                                <FormControls.Static className="text-wrap" label="Billing Start date : "
                                                     labelClassName="col-xs-4"
                                                     wrapperClassName="col-xs-6" value={billingStartDt}/>
                                <FormControls.Static className="text-wrap" label="Billing End date : "
                                                     labelClassName="col-xs-4"
                                                     wrapperClassName="col-xs-6" value={billingEndDt}/>
                            </Col>
                            <Col md={4}>
                                <FormControls.Static className="text-wrap" label="Client Invoice Amount : "
                                                     labelClassName="col-xs-4"
                                                     wrapperClassName="col-xs-6" value={project.clientInvoiceAmount}/>
                                <FormControls.Static className="text-wrap" label="Expenses Recovery : "
                                                     labelClassName="col-xs-4"
                                                     wrapperClassName="col-xs-6" value={project.expensesRecovery}/>
                                <FormControls.Static className="text-wrap" label="Client Bonus : "
                                                     labelClassName="col-xs-4"
                                                     wrapperClassName="col-xs-6" value={project.clientBonus}/>
                                <FormControls.Static className="text-wrap" label="Rate Progression : "
                                                     labelClassName="col-xs-4"
                                                     wrapperClassName="col-xs-6" value={project.rateProgression}/>
                                <FormControls.Static className="text-wrap" label="Billing Percent : "
                                                     labelClassName="col-xs-4"
                                                     wrapperClassName="col-xs-6" value={project.billingPercent}/>
                            </Col>
                        </Row> </Col>
                </Row>
            </div>

        );

    }

}

const mapStateToProps = (state) => ({
    selectedEmployee: state.employee.selectedEmployee,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailItem);
