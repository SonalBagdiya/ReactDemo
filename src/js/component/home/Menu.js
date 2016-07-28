'use strict';

import React, {Component, View} from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-scroll";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as appActionCreators from "../../actions/app";
import ReactDOM from "react-dom";

class Menu extends Component {

    constructor(props) {

        super(props);
        this.state = {};

    }

    gotoSignUpPage(e) {

        this.collapseNavigation();
        e.preventDefault();
        this.props.appActions.showSignUp();
        this.setState({selectedOption: 'signup'});

    }

    gotoLoginPage(e) {

        this.collapseNavigation();
        e.preventDefault();
        this.props.appActions.showLogin();
        this.setState({selectedOption: 'login'});

    }

    onProductSelected() {

        this.collapseNavigation();
        this.props.appActions.showHome();

    }

    onHomeSelected() {

        this.props.appActions.showHome();

    }

    collapseNavigation() {

        if (window.innerWidth<650) {
            const navBar = ReactDOM.findDOMNode(this);
            const btnToggle = navBar.querySelector('button.navbar-toggle');
            btnToggle.click();
        }

    }

    onOptionSelected(selectedKey) {

        this.setState({selectedOption: selectedKey});

    }

    render() {

        let brandImg = (<img style={{marginTop:-10}} src={this.props.logo} alt=""/>);
        let inverseClass = this.props.inverseMenu ? 'inverse-menu' : 'menu';
        let itemColor = this.props.inverseMenu ? '' : 'inverse-menu-color';

        return (
            <Navbar inverse fixedTop fluid className={'home-menu '+inverseClass}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="splashScreen" href="#" smooth duration={500}
                              onClick={this.onHomeSelected.bind(this)}>{brandImg}</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav onSelect={this.onOptionSelected.bind(this)}
                         activeKey={this.state.selectedOption}
                         pullRight>
                        <li role="presentation">
                            <Link to="contact" href="#" onClick={this.onProductSelected.bind(this)}
                                  className={itemColor} smooth duration={500}>CONTACT</Link>
                        </li>
                        <li role="presentation">
                            <Link to="splashScreen" href="#" onClick={this.gotoSignUpPage.bind(this)}
                                  className={itemColor} smooth duration={500}>
                                SIGNUP
                            </Link>
                        </li>
                        <li role="presentation">
                            <Link to="splashScreen" href="#" onClick={this.gotoLoginPage.bind(this)}
                                  className={itemColor} smooth duration={500}>
                                LOGIN
                            </Link>
                        </li>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );

    }

}


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
