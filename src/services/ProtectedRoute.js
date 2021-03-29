import React, { useEffect, useState } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import api from "./api";
import Loading from "components/Loading/Loading";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function heartBeat() {
      api
        .hello()
        .then(() => {
          setIsAuthenticated(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }

    heartBeat();
  }, []);

  if (!isLoading) {
    return <Loading />;
  }

  console.log(isAuthenticated);

  return (
    <>
      {isLoading && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated) {
              console.log("heartbeat true");
              return <Component {...props} />;
            } else {
              console.log("heartbeat false");
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
      )}
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
