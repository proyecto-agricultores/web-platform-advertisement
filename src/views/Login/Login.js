import React, { useState } from "react";
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
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import useButtonStyles from "../../styles/useButtonStyles";

import "./Login.css";
import api from "../../services/api";

function Login() {
  const history = useHistory();
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

  const classes = useButtonStyles();

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
      history.push("/");
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
        <h1>Anunciantes</h1>
        <img
          src="logo-cosecha.png"
          alt="Logo"
          style={{ width: "50px", height: "50px" }}
        />
        <MuiPhoneNumber
          defaultCountry={"pe"}
          onChange={handleChange}
          name="phoneNumber"
        />
        {validator.phoneNumber && (
          <p className="validator-text">{validator.phoneNumber}</p>
        )}
        <div className="login-field">
          <TextField
            id="standard-password-input"
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            name="password"
            onChange={handleChange}
          />
        </div>
        {validator.password && (
          <p className="validator-text">{validator.password}</p>
        )}
        <Box mt={3} mb={1}>
          <Button
            classes={{
              root: classes.root,
            }}
            color="primary"
            className="center"
            onClick={handleSumbit}
            disabled={isLoading}
          >
            Ingresar
          </Button>
        </Box>
        <Link to="/signUp" style={{ fontSize: "11px", textDecoration: "none" }}>
          Regístrate
        </Link>
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
              El usuario o la contraseña son incorrectos.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAlertIsOpen(false)} variant="contained">
              Reintentar
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </Grid>
  );
}

export default Login;
