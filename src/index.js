/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import UserProfile from "views/UserProfile/UserProfile";
import Login from "views/Login/Login";
import ProtectedRoute from "services/ProtectedRoute";

const hist = createBrowserHistory();

function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/admin" component={Admin} />
        <ProtectedRoute path="/user" component={UserProfile} />
        <Route path="*" component={() => "NOT FOUND 404"} />
        <Redirect from="/" to="/admin/dashboard" />
        <Redirect from="/material-dashboard-react" to="/admin/dashboard" />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
