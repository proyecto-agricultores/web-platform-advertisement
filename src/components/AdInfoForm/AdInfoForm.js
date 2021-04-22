import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import "./AdInfoForm.css";
import FormikControl from "../Formik/FormikControl";
import useButtonStyles from "../../styles/useButtonStyles";
import useGlobalStyles from "../../styles/useGlobalStyles";
import File from "../Formik/File";
import api from "../../services/api";
import Snackbar from "../Utils/Snackbar/Snackbar";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "20px",
    paddingLeft: "10px",
    color: "white",
    width: "100%",
  },
}));

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

function AdInfoForm(props) {
  const classes = useStyles();
  const buttonStyles = useButtonStyles();
  const globalStyles = useGlobalStyles();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [alertState, setAlertState] = useState({
    isOpen: false,
    text: "",
    severity: "error",
  });

  const initialValues = {
    name: "",
    url: "",
    file: null,
    credits: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Campo requerido."),
    url: Yup.string().required("Campo requerido"),
    file: Yup.mixed()
      .required("Campo requerido")
      .test(
        "fileType",
        "Archivo no soportado",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
    credits: Yup.number().required("Campo requerido"),
  });

  const parseDate = (date) => {
    if (date) {
      const formattedDate = new Date(date);
      return `${formattedDate.getDate()}/${
        formattedDate.getMonth() + 1
      }/${formattedDate.getFullYear().toString().slice(-2)} 0:0:0`;
    } else {
      return "1/1/20 0:0:0";
    }
  };

  const onSubmit = (values) => {
    setIsLoading(true);
    const adData = {
      remainingCredits: values.credits,
      departmentId: props.audience.departmentId || 0,
      regionId: props.audience.regionId || 0,
      districtId: props.audience.districtId || 0,
      forOrders: props.audience.forOrders ? "True" : "False",
      forPublications: props.audience.forPublications ? "True" : "False",
      url: values.url,
      name: values.name,
      beginningSowingDate: parseDate(props.audience.beginningSowingDate),
      endingSowingDate: parseDate(props.audience.endingSowingDate),
      beginningHarvestDate: parseDate(props.audience.beginningHarvestDate),
      endingHarvestDate: parseDate(props.audience.endingHarvestDate),
      supplies: props.audience.supplies,
      file: values.file,
    };
    api
      .postAd(adData)
      .then(() => {
        setAlertState({
          isOpen: true,
          text: "Anuncio creado",
          severity: "success",
        });
        setTimeout(() => {
          history.replace("/");
        }, 1200);
      })
      .catch((error) => {
        if (error.response?.status !== 401) {
          setAlertState({
            isOpen: true,
            text: error.response.data.message || "Error al crear el anuncio",
            severity: "error",
          });
        } else {
          history.replace("/login");
        }
        setIsLoading(false);
      });
  };

  return (
    <div className="ad-info-form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className="ad-info-form-name">
              <h3 className={classes.title}>Nombre</h3>
              <FormikControl control="input" type="text" name="name" />
            </div>
            <div className="ad-info-form-url">
              <h3 className={classes.title}>URL</h3>
              <FormikControl control="input" type="text" name="url" />
            </div>
            <div className="ad-info-form-image">
              <h3 className={classes.title}>Imagen</h3>
              <File formik={formik} text="Subir foto del anuncio" />
            </div>
            <div className="ad-info-form-credits">
              <h3 className={classes.title}>Créditos</h3>
              <FormikControl control="input" type="number" name="credits" />
            </div>
            <div className={globalStyles.center}>
              <button
                className={buttonStyles.submitButton}
                type="submit"
                disabled={isLoading}
              >
                Subir anuncio
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <Snackbar
        alertIsOpen={alertState.isOpen}
        setAlertIsOpen={() => setAlertState({ ...alertState, isOpen: false })}
        text={alertState.text}
        severity={alertState.severity}
      />
    </div>
  );
}

export default AdInfoForm;
