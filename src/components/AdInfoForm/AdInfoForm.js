import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import "./AdInfoForm.css";
import FormikControl from "../Formik/FormikControl";
import useButtonStyles from "../../styles/useButtonStyles";
import useGlobalStyles from "../../styles/useGlobalStyles";
import File from "../Formik/File";

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

  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: "",
    url: "",
    file: null,
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
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    console.log("Form data", values);
    console.log("audience", props.audience);
    setIsLoading(false);
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
    </div>
  );
}

export default AdInfoForm;
