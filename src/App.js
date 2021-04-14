import "./App.css";

import React from "react";
import { Route, Switch } from "react-router-dom";

import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Login from "./views/Login/Login";
import CreateAd from "./views/CreateAd/CreateAd";
import ProtectedRoute from "./services/ProtectedRoute";
import MyAds from "./views/MyAds/MyAds";
import SignUp from "./views/SignUp/SignUp";
import CodeConfirmation from "./views/CodeConfirmation/CodeConfirmation";

let theme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
  palette: {
    primary: {
      main: "#09b44d",
      light: "#d0f1dd",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ffcc99",
      light: "#ffcc99",
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signUp" component={SignUp} />
          <ProtectedRoute path="/myAds" component={MyAds} />
          <ProtectedRoute path="/createAd" component={CreateAd} />
          {/* <ProtectedRoute
            path="/codeConfirmation"
            component={CodeConfirmation}
          /> */}
          <Route path="/codeConfirmation" component={CodeConfirmation} />
          <Route path="*" component={() => "NOT FOUND 404"} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
