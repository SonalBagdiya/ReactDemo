'use strict';

import React, {Component, View} from "react";
import LoadingMask from "./LoadingMask";

class AppMaskComponent extends React.Component {

    render() {

        var displayStyle = this.props.show ? {display: 'block'} : {display: 'none'};

        return (
            <div className="app-mask" style={displayStyle}>
                <LoadingMask />
            </div>
        )

    }

}

export default AppMaskComponent;
