import React, { useState } from "react";
import AlertDialog from "../../components/AlertDialog/AlertDialog";
import { Formik, Form } from "formik";
import Textfield from "../../components/Formik/TextField";
import { Container, Grid } from "@material-ui/core";
import Button from "../../components/Formik/Button";
import * as Yup from "yup";
import api from "../../services/api";
import Snackbar from "../../components/Utils/Snackbar/Snackbar";

function RechargeCredits(props) {
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [isLoading, setIsLoading] = useState(false);

  const setAlert = (text, severity) => {
    setAlertIsOpen(true);
    setAlertText(text);
    setAlertSeverity(severity);
  };

  return (
    <div>
      <AlertDialog
        title="Recarga de créditos"
        content={
          <Container maxWidth="md">
            <Formik
              initialValues={{
                credits: "",
              }}
              onSubmit={async (values) => {
                console.log("Hey");
                api
                  .rechargeAdCredits(props.addId, values.credits)
                  .then((response) => {
                    setAlert("Créditos recargados correctamente.", "success");
                  })
                  .catch((error) => {
                    console.log(error);
                    if (error.response.status === 400) {
                      setAlert(
                        error.response.data?.message || "Error",
                        "error"
                      );
                    } else {
                      setAlert("Error al recargar los créditos.", "error");
                    }
                    console.log(error);
                  })
                  .finally(props.handleCancel());
              }}
              validationSchema={Yup.object().shape({
                credits: Yup.string().required("Campo requerido"),
              })}
            >
              <Form>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={12}>
                    <Textfield name="credits" label="Créditos" />
                  </Grid>
                  <Grid item xs={12}>
                    <Button>Recargar</Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Container>
        }
        open={props.open}
        handleCancel={props.handleCancel}
        cancelMessage="Cancelar Operación"
      ></AlertDialog>
      <Snackbar
        alertIsOpen={alertIsOpen}
        setAlertIsOpen={setAlertIsOpen}
        text={alertText}
        severity={alertSeverity}
      />
    </div>
  );
}

export default RechargeCredits;
