import React, { useState } from "react";
import Button from "components/CustomButtons/Button.js";
import PropTypes from "prop-types";
import "./Login.css";
import api from "services/api";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";
import MuiPhoneNumber from "material-ui-phone-number";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

function Login(props) {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [validator, setValidator] = useState({
    phoneNumber: null,
    password: null,
  });
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    if (typeof e === "string") {
      setFormData({ ...formData, phoneNumber: e });
    } else {
      setFormData({ ...formData, [e.target.name]: e.currentTarget.value });
    }
  }

  async function handleSumbit(e) {
    setIsLoading(true);
    e.preventDefault();
    if (formData.phoneNumber === "" || formData.password === "") {
      setValidator({
        phoneNumber:
          formData.phoneNumber === ""
            ? "El número de teléfono es requerido."
            : null,
        password:
          formData.password === "" ? "La contraseña es requerida." : null,
      });
      setIsLoading(false);
      return;
    }
    try {
      let response = await api.token({
        phone_number: formData.phoneNumber,
        password: formData.password,
      });
      let { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      setIsLoading(false);
      props.history.push("/ad");
    } catch (error) {
      setIsLoading(false);
      setAlertIsOpen(true);
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
        {validator.phoneNumber && (
          <p className="validator-text">{validator.phoneNumber}</p>
        )}
        <TextField
          id="standard-password-input"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          name="password"
          onChange={handleChange}
        />
        {validator.password && (
          <p className="validator-text">{validator.password}</p>
        )}
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
        {isLoading && <CircularProgress size={30} />}
        <Dialog
          open={alertIsOpen}
          onClose={() => setAlertIsOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Credenciales incorrectas"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              El usuario o la contraseña son incorrectas.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setAlertIsOpen(false)}
              color="primary"
              autoFocus
            >
              Reintentar
            </Button>
          </DialogActions>
        </Dialog>
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
