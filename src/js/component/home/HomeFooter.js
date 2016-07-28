'use strict';

import React, {Component} from "react";
import {Grid, Row, Col} from "react-bootstrap";

class HomeFooter extends Component {

    render() {

        return (
            <div className="home-footer">
                <Grid>
                    <Row>
                        <Col md={4}>
                            <span className="copyright">Copyright &copy; Synerzip Software 2016</span>
                        </Col>
                        <Col md={4}>
                            <ul className="list-inline social-buttons">
                                <li><a href="#" className="social-btns"><i className="fa fa-twitter"></i></a>
                                </li>
                                <li><a href="#" className="social-btns"><i className="fa fa-facebook"></i></a>
                                </li>
                                <li><a href="#" className="social-btns"><i className="fa fa-linkedin"></i></a>
                                </li>
                            </ul>
                        </Col>
                        <Col md={4}>
                            <ul className="list-inline quicklinks">
                                <li><a href="#">Privacy Policy</a>
                                </li>
                                <li><a href="#">Terms of Use</a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );

    }

}

export default HomeFooter;
