import React, { useEffect, useState } from "react";
import ReactCodeInput from "react-code-input";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import api from "../../services/api";
import Snackbar from "../../components/Utils/Snackbar/Snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  centerGrid: {
    textAlign: "center",
    height: "400px",
  },
}));

const CodeConfirmation = () => {
  const classes = useStyles();
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [alertProps, setAlertProps] = useState({
    text: "",
    severity: "success",
  });

  useEffect(() => {
    api.generateTwilioCode();
  }, []);

  const handleChange = (e) => {
    if (e.length === 4) {
      api
        .sendTwilioCode(e)
        .then(() => {
          setAlertProps({ text: "Cuenta verificada", severity: "success" });
          setAlertIsOpen(true);
        })
        .catch((error) => {
          console.error(error);
          setAlertProps({
            text: "El código es incorrecto. Intente nuevamente",
            severity: "error",
          });
          setAlertIsOpen(true);
        });
    }
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        className={classes.centerGrid}
      >
        <Grid item xs={12}>
          <h1>Confirmación de código</h1>
          Revise los mensajes de su teléfono.
        </Grid>
        <Grid item xs={12}>
          <img
            src="logo-cosecha.png"
            alt="Logo"
            style={{ width: "50px", height: "50px" }}
          />
        </Grid>
        <Grid item xs={12}>
          <ReactCodeInput type="number" fields={4} onChange={handleChange} />
          <Snackbar
            alertIsOpen={alertIsOpen}
            setAlertIsOpen={setAlertIsOpen}
            text={alertProps.text}
            severity={alertProps.severity}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CodeConfirmation;
