'use strict';

import React from "react";
import {connect} from "react-redux";
import {Row, Col, FormControls, Button, Panel} from "react-bootstrap";
import moment from 'moment'
import BusinessDetailItem from './BusinessDetailItem'

class BusinessDetail extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            bsStyle: null,
            open: false
        };

    }

    onStatusClick() {

        this.setState({open: !this.state.open});

    }

    render() {

        var {selectedEmployee} = this.props;
        console.log("tjkmk,.m")
        console.log(selectedEmployee);
        var selectedBUDetail = null;
        var pastBUDetail = null;

        if (_.size(selectedEmployee)>0) {

            if (selectedEmployee.businessUnits != null) {
                console.log(selectedEmployee.businessUnits);
                /*  _.each(selectedEmployee.businessUnits.current, (bu)=> {
                 arrBUs.push(bu);

                 });

                 _.each(selectedEmployee.businessUnits.past, (bu)=> {
                 arrBUs.push(bu);
                 });*/

                selectedBUDetail = _.map(_.keys(selectedEmployee.businessUnits.current), (rowNumber)=> {
                    if (selectedEmployee.businessUnits.current[rowNumber] != null)
                        return <BusinessDetailItem key={rowNumber}
                                                   businessUnit={selectedEmployee.businessUnits.current[rowNumber]}
                                                   rowNumber={rowNumber}/>
                    else
                        return <div className="subscriptions-table no-record-found-block">No Details found</div>
                });

                pastBUDetail = _.map(_.keys(selectedEmployee.businessUnits.past), (rowNumber)=> {
                    if (selectedEmployee.businessUnits.past[rowNumber] != null)
                        return <BusinessDetailItem key={rowNumber}
                                                   businessUnit={selectedEmployee.businessUnits.past[rowNumber]}
                                                   rowNumber={rowNumber}/>
                });
            }

        }

        return (
            <form className="form-horizontal admin-right-panel">
                {selectedBUDetail}
                {pastBUDetail == "" ? "" : <Button className=""
                                                   bsStyle="primary"
                                                   onClick={ this.onStatusClick.bind(this)}>
                    Show Previous BusinessUnits...
                </Button>}

                <Panel className="subscription-detail-box"
                       collapsible
                       expanded={this.state.open}>
                    {
                        this.state.open ? pastBUDetail : <span />
                    }
                </Panel>

            </form>
        );

    }

}

const mapStateToProps = (state) => ({
    selectedEmployee: state.employee.selectedEmployee
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessDetail);
