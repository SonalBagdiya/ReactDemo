'use strict';

import React, {Component, View} from "react";
import {Navbar, NavItem, Nav, NavDropdown, MenuItem, Glyphicon} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as authActionCreator from "../../actions/auth";
import {scroller} from "react-scroll";
import {push} from "redux-router";
import ReactDOM from "react-dom";

class CommonHeader extends Component {

    openDashboardPage() {

        window.scrollTo(-500, 0);
        this.props.routeDispatch(push("/dashboard/home"));

    }

    onLogout() {

        this.collapseNavigation();
        this.props.authActions.logout()
        window.scrollTo(-500, 0);

    }

    onProfileSelected(e) {

        this.collapseNavigation();

    }

    collapseNavigation() {

        if (window.innerWidth<650) {
            const navBar = ReactDOM.findDOMNode(this);
            const btnToggle = navBar.querySelector('button.navbar-toggle');
            btnToggle.click();
        }

    }

    render() {

        return (

            <div className="common-header">
                <Navbar inverse fixedTop fluid className={'home-menu inverse-menu'}>
                    <Navbar.Header>
                        <img key="logo admin-common-header-logo" className="logo admin-common-header-logo pointer"
                             onClick={this.openDashboardPage.bind(this)}
                             src='img/Synerzip-logo.png' alt=""/>
                        <Navbar.Toggle /> </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavDropdown eventKey={2} title={"Welcome "+sessionStorage.getItem("firstName")}
                                         id="basic-nav-dropdown">
                                <MenuItem eventKey={2.1} onClick={this.onLogout.bind(this)}>Logout</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );

    }

}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActionCreator, dispatch),
    routeDispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(CommonHeader);
