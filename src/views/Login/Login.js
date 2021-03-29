import React, { useState } from "react";
import Button from "components/CustomButtons/Button.js";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";
import MuiPhoneNumber from "material-ui-phone-number";
import "./Login.css";
import api from "services/api";

function Login(props) {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  function handleChange(e) {
    if (typeof e === "string") {
      setFormData({ ...formData, phoneNumber: e });
    } else {
      setFormData({ ...formData, [e.target.name]: e.currentTarget.value });
    }
  }

  async function handleSumbit(e) {
    e.preventDefault();
    try {
      let response = await api.token({
        phone_number: formData.phoneNumber,
        password: formData.password,
      });
      let { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      props.history.push("/admin/dashboard");
    } catch (error) {
      console.error(error);
      // alert(error.response.data.error);
    }
  }

  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"
    >
      <form id="login-form-cosecha">
        <h3>Login</h3>
        <MuiPhoneNumber
          defaultCountry={"pe"}
          onChange={handleChange}
          name="phoneNumber"
        />
        <TextField
          id="standard-password-input"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          name="password"
          onChange={handleChange}
        />
        <Box m={3}>
          <Button
            type="button"
            color="primary"
            className="center"
            onClick={handleSumbit}
          >
            LOG IN
          </Button>
        </Box>
      </form>
    </Grid>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
