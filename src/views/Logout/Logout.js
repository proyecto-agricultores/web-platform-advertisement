import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem("access_token", "");
    localStorage.setItem("refresh_token", "");
    history.replace("/login");
  }, [history]);
  return <div></div>;
};

export default Logout;
