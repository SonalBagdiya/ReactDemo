'use strict';

import React, {Component, View} from "react";
import {Navbar, NavItem, Nav} from "react-bootstrap";

class Header extends Component {

    render() {

        return (
            <Navbar inverse fixedTop fluid className={'home-menu inverse-menu'}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <img className='logo' src='img/logo.png' alt=""/>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1}>Login</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );

    }

}

export default Header;
