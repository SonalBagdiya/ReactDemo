'use strict';


import React, {PropTypes, Component} from 'react';
import {RouteHandler} from "react-router";
import {Element, Link} from "react-scroll";
import {Grid, Row, Button, Panel, Col, Input, Glyphicon, Jumbotron} from "react-bootstrap";
import {connect} from "react-redux";
import GoogleLogin from '../google';
import * as authActionCreators from "../../actions/auth";
import {bindActionCreators} from "redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class SplashScreen extends Component {

    render() {
        let {responseText} = "";
        const responseGoogle = (response) => {
            console.log(response);
            console.log(response.getAuthResponse().id_token);
            console.log('Logged in as: ' + response.getBasicProfile().getName());
            responseText = response.getAuthResponse().id_token;
            if (responseText != null) {
                this.props.authActions.authenticateUserToken(responseText, this.props.redirectUrlPath);
            }
        };

        return (
            <Element className="splashScreen" name="splashScreen">
                <Grid fluid>
                    <Row>
                        <Jumbotron className="text-center">
                            <div className="content">
                                <ReactCSSTransitionGroup transitionName="react-animation"
                                                         transitionAppear
                                                         transitionAppearTimeout={500}
                                                         transitionEnter={false}
                                                         transitionLeave={false}>
                                    <h1>Welcome to Billing Dashboard!</h1>

                                    <p className="smallText">It's simply the best plm software for retail, fashion,
                                        footwear and consumer goods makers, too.</p>


                                    <p>
                                        <GoogleLogin
                                            clientId={'1014016599626-mjoe78t9qp6bsggv7oih1aeekfo1pfth.apps.googleusercontent.com'}
                                            callback={responseGoogle}
                                            offline={false}
                                        ><span className="btn-xl pointer">Login with Google</span>
                                        </GoogleLogin>
                                    </p>

                                </ReactCSSTransitionGroup>
                            </div>
                        </Jumbotron>
                    </Row>
                </Grid>
            </Element>
        );

    }

}

const mapStateToProps = (state) => ({
//    loginScreen: state.app.loginScreen,
//    forgotPasswordScreen: state.app.forgotPasswordScreen,
//    forgotMessageScreen: state.app.forgotMessageScreen,
//    signUpScreen: state.app.signUpScreen,
//    homeScreen: state.app.homeScreen,
//    signupSuccessComponent: state.app.signupSuccessComponent,
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
