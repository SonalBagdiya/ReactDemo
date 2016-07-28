'use strict';

import React, {Component} from "react";
import CommonHeader from "./common/CommonHeader";
import {connect} from "react-redux";
import * as authActionCreator from "../actions/auth";
import * as appActionCreator from "../actions/app";
import {bindActionCreators} from "redux";
import {push} from "redux-router";

class Dashboard extends Component {

    componentWillMount() {
        //  this.checkAuth(this.props.isAuthenticated);

    }

    componentWillReceiveProps(nextProps) {
        // this.checkAuth(nextProps.isAuthenticated);

    }

    checkAuth(isAuthenticated) {
        /* var object = JSON.parse(sessionStorage.getItem("token")),
         dateString = object.timestamp,
         now = new Date().getTime().toString();

         compareTime(dateString, now);*/

        if (!isAuthenticated) {
            let redirectAfterLogin = this.props.location.pathname;
            this.props.authActions.setUrlPath(redirectAfterLogin);
            if ((sessionStorage.getItem('firstName') != null) && (sessionStorage.getItem('token') != null)) {
                this.props.authActions.authenticateUserToken(sessionStorage.getItem('token'), "dashboard/home");
                this.props.routeDispatch(push("dashboard/home"));
            }
            else
                this.props.routeDispatch(push(`/?next=${redirectAfterLogin}`));
        }

    }

    render() {

        let {isAuthenticated} = this.props;
        let componentToBeRendered = null;

        if (isAuthenticated) {
            componentToBeRendered = <div>
                <CommonHeader />

                <div>
                    {this.props.children}
                </div>

            </div>
        }

        return (
            <div>
                {componentToBeRendered}
            </div>
        );

    }

}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    redirectUrlPath: state.auth.redirectUrlPath
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActionCreator, dispatch),
    appActions: bindActionCreators(appActionCreator, dispatch),
    routeDispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
