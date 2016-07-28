'use strict';

import React, {Component} from "react";
import {Grid, Row, Col, Input} from "react-bootstrap";
import {Element} from "react-scroll";

class ContactUs extends Component {

    render() {

        return (
            <Element className="contact" name="contact">
                <Grid>
                    <Row>
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading">CONTACT US</h2>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-lg-12">
                            <form name="sentMessage">
                                <Row>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <Input type="text" className="form-control" placeholder="Your Name *"/>
                                        </div>
                                        <div className="form-group">
                                            <Input type="email" className="form-control" placeholder="Your Email *"/>
                                        </div>
                                        <div className="form-group">
                                            <Input type="tel" className="form-control" placeholder="Your Phone *"/>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <Input type="textarea" className="form-control"
                                                   placeholder="Your Message *"/>
                                        </div>
                                    </Col>
                                    <div className="clearfix"></div>
                                    <div className="col-lg-12 text-center">
                                        <button type="submit" className="btn btn-xl">Send Message</button>
                                    </div>
                                </Row>
                            </form>
                        </div>
                    </Row>
                </Grid>
            </Element>
        );

    }

}

export default ContactUs;
