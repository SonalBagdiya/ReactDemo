'use strict';

import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as organizationActionCreators from "../../actions/employee";
import {ListGroupItem} from "react-bootstrap";

class EmployeeListItem extends React.Component {

    showOrganizationInfo(e) {

        e.preventDefault();
        let {organizationActions, organization} = this.props;

        organizationActions.selectOrganization(organization);
        organizationActions.showEmployeeDetails('user', 1);

    }

    render() {

        let {selectedOrganization, organization} = this.props;
        let styleClass = '';
        //console.log(organization);
        if (selectedOrganization && (organization._id == selectedOrganization._id)) {
            styleClass = "active ";
        }

        return (
            <ListGroupItem className={styleClass + "text-ellipsis"} onClick={this.showOrganizationInfo.bind(this)}>
                {organization.first_name == null ? organization.firstName : organization.first_name }

                {organization.last_name == "" ? organization.lastName : organization.last_name}
            </ListGroupItem>
        );

    }

}

const mapStateToProps = (state) => ({
    selectedOrganization: state.organization.selectedOrganization
});

const mapDispatchToProps = (dispatch) => ({
    organizationActions: bindActionCreators(organizationActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeListItem);
