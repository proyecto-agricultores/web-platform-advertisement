import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid, Snackbar, Typography } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import MuiPhoneNumber from "material-ui-phone-number";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import LocationForm from "../../components/AdLocationDropdown/LocationForm";
import Textfield from "../../components/Formik/TextField";
import Button from "../../components/Formik/Button";
import File from "../../components/Formik/File";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
  note: {
    ...theme.typography.caption,
  },
}));

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  password: "",
  dni: "",
  ruc: "",
};

const dniOrRucValidation = (name) =>
  Yup.string().when(name === "dni" ? "ruc" : "dni", {
    is: (value) => value === undefined,
    then: Yup.string()
      .test(
        "len",
        `Debe tener ${name === "dni" ? "8" : "10"} dígitos`,
        (val) => val?.length === (name === "dni" ? 8 : 10)
      )
      .required("Debe ingresar un DNI o un RUC"),
    otherwise: Yup.string().when(name, {
      is: (value) => value !== undefined,
      then: Yup.string().test(
        "len",
        `Debe tener ${name === "dni" ? "8" : "10"} dígitos`,
        (val) => val?.length === (name === "dni" ? 8 : 10)
      ),
    }),
  });

const FORM_VALIDATION = Yup.object().shape(
  {
    firstName: Yup.string().required("Campo requerido"),
    lastName: Yup.string().required("Campo requerido"),
    password: Yup.string().required("Campo requerido"),
    dni: dniOrRucValidation("dni"),
    ruc: dniOrRucValidation("ruc"),
    file: Yup.mixed()
      .required("Campo requerido")
      .test(
        "fileType",
        "Archivo no soportado",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  },
  ["dni", "ruc"]
);

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const SignUp = () => {
  const classes = useStyles();

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [alertIsOpen, setAlertIsOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item xs={12}>
          <h1>Registro</h1>
        </Grid>
        <Grid item xs={12}>
          <img
            src="logo-cosecha.png"
            alt="Logo"
            style={{ width: "50px", height: "50px" }}
          />
        </Grid>

        <Grid item xs={12} container>
          <Container maxWidth="md">
            <div className={classes.formWrapper}>
              <Formik
                initialValues={{
                  ...INITIAL_FORM_STATE,
                }}
                validationSchema={FORM_VALIDATION}
                onSubmit={(values) => {
                  console.log("hola");
                  if (
                    selectedDepartment === "" ||
                    selectedDistrict === "" ||
                    selectedRegion === ""
                  ) {
                    setAlertIsOpen(true);
                    return;
                  }
                  console.log(values);
                }}
              >
                {(formik) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>Tus datos</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Textfield name="firstName" label="Nombres" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Textfield name="lastName" label="Apellidos" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box mt={2}>
                          <MuiPhoneNumber
                            defaultCountry={"pe"}
                            name="phoneNumber"
                            fullWidth={true}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Textfield
                          name="password"
                          type="password"
                          label="Contraseña"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Textfield name="dni" label="DNI" type="number" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Textfield name="ruc" label="RUC" type="number" />
                      </Grid>
                      <Grid item xs={12}>
                        <div className={classes.note}>
                          Nota: debe ingresar su DNI y/o su RUC.
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <LocationForm
                          selectedDepartment={selectedDepartment}
                          setSelectedDepartment={setSelectedDepartment}
                          selectedRegion={selectedRegion}
                          setSelectedRegion={setSelectedRegion}
                          selectedDistrict={selectedDistrict}
                          setSelectedDistrict={setSelectedDistrict}
                          isSignUp={true}
                        />
                        <Snackbar
                          open={alertIsOpen}
                          autoHideDuration={6000}
                          onClose={() => setAlertIsOpen(false)}
                        >
                          <Alert
                            onClose={() => setAlertIsOpen(false)}
                            severity="error"
                          >
                            Seleccione su zona
                          </Alert>
                        </Snackbar>
                      </Grid>
                      <Grid item xs={12} container justify="center">
                        <File formik={formik} text="Subir una foto de perfil" />
                      </Grid>
                      <Grid item xs={12} container justify="center">
                        <Button>CREAR USUARIO</Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </div>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
