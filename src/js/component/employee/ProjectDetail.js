'use strict';

import React from "react";
import {connect} from "react-redux";
import {Row, Col, FormControls, Button, Panel} from "react-bootstrap";
import moment from 'moment'
import ProjectDetailItem from "./ProjectDetailItem";

class ProjectDetail extends React.Component {

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
        var selectedProjectDetail = null;
        var pastProjectDetail = null;
        if (_.size(selectedEmployee)>0) {

            if (selectedEmployee.projects != null) {
                selectedProjectDetail = _.map(_.keys(selectedEmployee.projects.current), (rowNumber)=> {
                    if (selectedEmployee.projects.current[rowNumber] != null)
                        return <ProjectDetailItem key={rowNumber} project={selectedEmployee.projects.current[rowNumber]}
                                                  rowNumber={rowNumber}/>
                    else
                        return <FormControls.Static className="subscriptions-table no-record-found-block">No Current
                            Projects
                        </FormControls.Static>
                });

                pastProjectDetail = _.map(_.keys(selectedEmployee.projects.past), (rowNumber)=> {
                    if (selectedEmployee.projects.past[rowNumber] != null)
                        return <ProjectDetailItem key={rowNumber} project={selectedEmployee.projects.past[rowNumber]}
                                                  rowNumber={rowNumber}/>
                });

            }
        }

        return (
            <form className="form-horizontal admin-right-panel">
                {selectedProjectDetail}
                {pastProjectDetail == "" ? "" : <Button className=""
                                                        bsStyle="primary"
                                                        onClick={ this.onStatusClick.bind(this)}>
                    Show Previous Projects...
                </Button>}

                <Panel className="subscription-detail-box"
                       collapsible
                       expanded={this.state.open}>
                    {
                        this.state.open ? pastProjectDetail : <span />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
