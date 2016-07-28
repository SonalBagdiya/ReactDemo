import React from "react";
import {connect} from "react-redux";
import AppMaskComponent from "../component/common/AppMaskComponent";
import {push} from "redux-router";
import * as authActionCreator from "../actions/auth";
import * as appActionCreator from "../actions/app";
import {bindActionCreators} from "redux";

var ReactToastr = require("react-toastr");

class App extends React.Component {

    componentWillMount() {
        this.checkAuth(this.props.isAuthenticated);

    }

    checkAuth(isAuthenticated) {
     /*   var object = JSON.parse(sessionStorage.getItem("tokenTime")),
        dateString = object.timestamp;*/
        var now = new Date().getTime().toString();
        //compareTime(sessionStorage.getItem("tokenTime"), now);
        if (!isAuthenticated) {
          //  alert("test");
            let redirectAfterLogin = this.props.location.pathname;
            this.props.authActions.setUrlPath(redirectAfterLogin);
            if ((sessionStorage.getItem('firstName') != null) && (sessionStorage.getItem('id_token') != null)) {
                this.props.authActions.authenticateUserToken(sessionStorage.getItem('id_token'), "dashboard/home");
                this.props.routeDispatch(push("dashboard/home"));
            }
            else
                this.props.routeDispatch(push(`/?next=${redirectAfterLogin}`));
        }

    }

    render() {
       // alert("error="+this.props.statusText)
        let style = "container-fluid"
        if (this.props.auth != null) {
            style = "custom-container-fluid"
        }
        return (
            <div className={style}>
                {this.props.children}
                <AppMaskComponent show={this.props.loading}/>
            </div>
        );

    }

}

const mapStateToProps = (state) => ({
    loading: state.app.loading,
    auth: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated ,
    statusText: state.auth.statusText,
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActionCreator, dispatch),
    appActions: bindActionCreators(appActionCreator, dispatch),
    routeDispatch: dispatch,
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
