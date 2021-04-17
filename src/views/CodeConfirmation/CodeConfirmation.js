import React, { useEffect, useState } from "react";
import ReactCodeInput from "react-code-input";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Link } from "@material-ui/core";
import api from "../../services/api";
import Snackbar from "../../components/Utils/Snackbar/Snackbar";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
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
        .then((response) => {
          console.log(response.data);
          if (response.data == "pending") {
            setAlertProps({
              text: "El código es incorrecto. Intente nuevamente.",
              severity: "warning",
            });
            setAlertIsOpen(true);
          } else {
            setAlertProps({ text: "Cuenta verificada", severity: "success" });
            setAlertIsOpen(true);
            history.replace("/");
          }
        })
        .catch((error) => {
          console.error(error);
          setAlertProps({
            text:
              "Existe un problema con nuestro servidor. Refresque la página e intente nuevamente en unos momentos.",
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
          Usted acaba de recibir un mensaje SMS. Ingrese el código recibido a
          continuación.
        </Grid>
        <Grid item xs={12}>
          <img
            src="logo-cosecha.png"
            alt="Logo"
            style={{ width: "50px", height: "50px" }}
          />
        </Grid>
        <Grid item xs={12}>
          <ReactCodeInput fields={4} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <Link
            onClick={() => {
              api.generateTwilioCode();
            }}
          >
            Reenviar el código.
          </Link>
        </Grid>

        <Snackbar
          alertIsOpen={alertIsOpen}
          setAlertIsOpen={setAlertIsOpen}
          text={alertProps.text}
          severity={alertProps.severity}
        />
      </Grid>
    </div>
  );
};

export default CodeConfirmation;
