'use strict';

import React, {Component, View} from "react";
import {Row, Col, Button, Glyphicon, Input} from "react-bootstrap";
import DateTimeField from "react-bootstrap-datetimepicker";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as SaveStatus from "../../actions/signup";
import moment from 'moment'
import AddProjectRow from "./AddProjectRow";

class ProjectDetails extends Component {

    constructor(props) {
        super(props);

    }

    onNext(e) {
        let arrProjects = [];

        _.each(this.props.selectedProjects, (project)=> {
            arrProjects.push(project)
        });

        let projectList = {
            projects: arrProjects
        }
        e.preventDefault();
        this.props.empActions.addProjectInfo(projectList);
    }

    componentWillUnmount() {
        let arrProjects = [];
        _.each(this.props.selectedProjects, (project)=> {
            arrProjects.push(project)
        });

        let projectList = {
            projects: arrProjects
        }

        this.props.empActions.onComponentRemoved(projectList);

    }

    onAddProject() {

        this.props.empActions.addNewProject();

    }

    onBack(e) {

        e.preventDefault();
        this.props.empActions.onBackClick("step1");

    }

    render() {
        var {selectedProjects} = this.props;
        var selectedProjectComps = _.map(_.keys(selectedProjects), (rowNumber)=> {

            return <AddProjectRow key={rowNumber} selectProject={selectedProjects[rowNumber]}
                                  rowNumber={rowNumber}/>
        });

        return (
            <ReactCSSTransitionGroup transitionName="react-animation"
                                     transitionAppear
                                     transitionAppearTimeout={500}
                                     transitionEnter={false}
                                     transitionLeave={false}>
                <form name="signup" onSubmit={this.onNext.bind(this)}>
                    <Row className="text-center">
                        <Col md={12} sm={8} xs={12} lg={12} className="signUp-box">
                            <Row>
                                <Button bsStyle="success" className="pull-right right-buffer"
                                        onClick={this.onAddProject.bind(this)}>
                                    <Glyphicon glyph="plus"/> Add More
                                </Button>
                            </Row>
                            {selectedProjectComps}
                            <Row>
                                <Col xs={6} sm={6} md={6}>
                                    <Button bsStyle="warning" bsSize="large" className="full-width"
                                            onClick={this.onBack.bind(this)}>
                                        BACK
                                    </Button>
                                </Col>
                                <Col xs={6} sm={6} md={6}>
                                    <Button type="submit" bsStyle="primary" bsSize="large" className="full-width">
                                        NEXT
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </form>
            </ReactCSSTransitionGroup>
        );

    }

}

const mapStateToProps = (state) => ({
    step_2_data: state.signup.signupInfo.employeeInfo,
    employeeList: state.employee.employeeList,
    selectedProjects: state.signup.selectedProjects
});

const mapDispatchToProps = (dispatch) => ({
    empActions: bindActionCreators(SaveStatus, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
