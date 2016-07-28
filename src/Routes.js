let React = require('react');
let {Router, Route, IndexRoute} = require('react-router');
import {App} from "./js/containers";
import Home from "./js/component/Home";
import Dashboard from "./js/component/Dashboard";
import DashboardHome from "./js/component/DashboardHome";
import EmployeeList from "./js/component/employee/EmployeeList";
import SignUp from "./js/component/signup/SignUp";
import EditEmployee from "./js/component/signup/EditEmployee";
import PageNotFoundError from "./js/component/common/PageNotFoundError";

const authenticate = function (nextState, replaceState) {
    /* if (nextState.location.pathname == "/dashboard/home") {
     replaceState(null, '/');
     }*/
    if (!sessionStorage.getItem("id_token")) {
        replaceState(null, '/');
    }
}

var Routes = (
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>

            <Route path="dashboard" component={Dashboard} onEnter={authenticate}>
                <IndexRoute component={DashboardHome}/>
                <Route path="home" component={DashboardHome}/>
                <Route path="users" component={EmployeeList}/>
                <Route path="user/create" component={SignUp}/>
                <Route path="user/edit/:userId"
                       component={EditEmployee}/>
            </Route>

            <Route path="*" component={PageNotFoundError}/>

        </Route>
    </Router>
);

export default Routes;
