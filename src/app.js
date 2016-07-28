import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import Root from "./js/containers/Root";
import configureStore from "./js/stores/configureStore";
import {userLoggedIn} from './js/actions/auth';
import GoogleLogin from '../src/js/component/Home';

const responseGoogle = (response) => {
    console.log(response);
};

const target = (
    document.getElementById('google-login')
);
const store = configureStore(window.__INITIAL_STATE__);
const node = <Root store={store}/>

ReactDOM.render(node, target);
