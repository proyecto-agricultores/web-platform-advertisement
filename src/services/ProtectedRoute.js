import React, { useEffect, useState } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import api from "./api";
import Loading from "components/Loading/Loading";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    let mounted = true;
    api
      .hello()
      .then(() => {
        if (mounted) {
          setIsAuthenticated(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsAuthenticated(false);
        setIsLoading(false);

        console.log("error", error);
      });

    return function cleanup() {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          console.log("isAuthenticated", isAuthenticated);
          if (isAuthenticated) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
    </>
  );
};

ProtectedRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  component: PropTypes.func.isRequired,
};

export default withRouter(ProtectedRoute);
