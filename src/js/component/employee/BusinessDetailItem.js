'use strict';

import React from "react";
import {connect} from "react-redux";
import {Row, Col, FormControls} from "react-bootstrap";
import moment from 'moment'

class BusinessDetailItem extends React.Component {

    render() {

        var {rowNumber, businessUnit} = this.props;
        console.log(businessUnit);
        let buName = null;
        let dtJoining = null;
        let dtLeaving = null;

        buName = businessUnit.name
        dtJoining = businessUnit.dateOfJoining == null ? "" : moment(businessUnit.dateOfJoining).format("DD/MM/YYYY");
        dtLeaving = businessUnit.dateOfLeaving == null ? "" : moment(businessUnit.dateOfLeaving).format("DD/MM/YYYY");

        return (
            <div className="box"><Row className="text-center">
                <Col md={12}><Row>
                    <Col md={6}>
                        <FormControls.Static className="text-wrap" label="BU Name : " labelClassName="col-xs-3"
                                             wrapperClassName="col-xs-3" value={buName}/>
                        <FormControls.Static className="text-wrap" label="Date of Joining : " labelClassName="col-xs-3"
                                             wrapperClassName="col-xs-3" value={dtJoining}/>
                        <FormControls.Static className="text-wrap" label="Date of Leaving : " labelClassName="col-xs-3"
                                             wrapperClassName="col-xs-3" value={dtLeaving}/>
                    </Col>
                </Row></Col></Row></div>

        );

    }

}

const mapStateToProps = (state) => ({
    selectedEmployee: state.employee.selectedEmployee
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessDetailItem);
