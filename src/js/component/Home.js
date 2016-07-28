'use strict';

import React, {PropTypes, Component} from 'react';
import {RouteHandler} from "react-router";
import {Grid, Row, Button, Panel, Col, Input, Glyphicon} from "react-bootstrap";
import Menu from "./home/Menu";
import SplashScreen from "./home/SplashScreen";
import HomeFooter from "./home/HomeFooter";
import ContactUs from "./home/ContactUs";
import SignUp from "./signup/SignUp";
import SignUpSuccess from "./signup/SignUpSuccess";
import {connect} from "react-redux";
import GoogleLogin from './google';
import * as authActionCreators from "../actions/auth";
import {bindActionCreators} from "redux";


class Home extends Component {

    render() {
        var style = {
            display: 'none'
        };
        if (this.props.statusText != null && this.props.statusText != "")
            alert("error=" + this.props.statusText)
        return (
            <div>
                <div id="divLogo">
                    <Menu className='logo' logo='img/Synerzip-logo.png'/>
                </div>
                <div id="name">
                    <SplashScreen />
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state) => ({
    loginScreen: state.app.loginScreen,
    signUpScreen: state.app.signUpScreen,
    homeScreen: state.app.homeScreen,
    signupSuccessComponent: state.app.signupSuccessComponent,
    statusText: state.auth.statusText
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActionCreators, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
