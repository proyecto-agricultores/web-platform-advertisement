import React, { useState } from "react";
import AppBar from "../../components/AppBar/AppBar";
import { Formik, Form } from "formik";
import Textfield from "../../components/Formik/TextField";
import Button from "../../components/Formik/Button";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import { CulqiProvider, Culqi } from "react-culqi";
import api from "../../services/api";
import CircularProgress from "@material-ui/core/CircularProgress";

import Snackbar from "../../components/Utils/Snackbar/Snackbar";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    textAlign: "center",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

const BuyCredits = () => {
  const classes = useStyles();
  const [totalCredits, setTotalCredits] = useState(0);
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
      <AppBar />
      <CulqiProvider
        publicKey="pk_test_2ijYcRyHdtLDn8xO"
        amount={0}
        title="Comprar Créditos"
        description="Usted está comprando créditos."
        onToken={(token) => {
          console.log("token received", token);
          setIsLoading(true);
          api
            .purchaseCredits(totalCredits, token.id, token.email)
            .then((response) => {
              console.log(response);
              setAlert("Créditos comprados correctamente.", "success");
              setIsLoading(false);
            })
            .catch((error) => {
              setAlert(
                error.response.data.message.user_message ||
                  "Error al realizar el pago.",
                "error"
              );
              setIsLoading(false);
            });
        }}
        onError={(error) => {
          console.error("something bad happened", error);
        }}
        options={{
          style: {
            maincolor: "#09b44d",
            buttontext: "white",
            maintext: "black",
            desctext: "black",
            logo: "//cosecha-app.s3.amazonaws.com/logo/logo-cosecha.png",
          },
        }}
      >
        <div>
          <Culqi>
            {({ openCulqi, setAmount, amount }) => {
              return (
                <Container maxWidth="md">
                  <div className={classes.formWrapper}>
                    <Formik
                      initialValues={{
                        credits: "",
                      }}
                      onSubmit={async (values) => {
                        setTotalCredits(values.credits * 10);
                        setAmount(values.credits * 10);
                        openCulqi();
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
                            <Button>Comprar</Button>
                          </Grid>
                        </Grid>
                      </Form>
                    </Formik>
                    {isLoading && <CircularProgress size={30} />}
                  </div>
                </Container>
              );
            }}
          </Culqi>
        </div>
      </CulqiProvider>
      <Snackbar
        alertIsOpen={alertIsOpen}
        setAlertIsOpen={setAlertIsOpen}
        text={alertText}
        severity={alertSeverity}
      />
    </div>
  );
};

export default BuyCredits;
