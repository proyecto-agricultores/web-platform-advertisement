import "./App.css";

import React from "react";
import { Route, Switch } from "react-router-dom";

import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Login from "./views/Login/Login";
import CreateAd from "./views/CreateAd/CreateAd";
import ProtectedRoute from "./services/ProtectedRoute";

let theme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
  palette: {
    primary: {
      main: "#09B44D",
    },
    secondary: {
      main: "#D0F1DD",
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
          <ProtectedRoute path="/ad" component={CreateAd} />
          <Route path="*" component={() => "NOT FOUND 404"} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
