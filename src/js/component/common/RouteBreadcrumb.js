'use strict';

import React, {Component, View} from "react";
import {Breadcrumb, BreadcrumbItem} from "react-bootstrap";

class RouteBreadcrumb extends React.Component {

    render() {

        var {breadcrumbValue, breadcrumbHomeLink} = this.props;

        return (
            <Breadcrumb>
                <BreadcrumbItem href={breadcrumbHomeLink}>
                    Home
                </BreadcrumbItem>
                {breadcrumbValue}
            </Breadcrumb>
        );

    }

}

export default RouteBreadcrumb;
