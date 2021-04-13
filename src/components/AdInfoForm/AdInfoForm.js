import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import "./AdInfoForm.css";
import FormikControl from "../Formik/FormikControl";
import useButtonStyles from "../../styles/useButtonStyles";
import useGlobalStyles from "../../styles/useGlobalStyles";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "20px",
    paddingLeft: "10px",
    color: "white",
    width: "100%",
  },
}));

function AdInfoForm() {
  const classes = useStyles();
  const buttonStyles = useButtonStyles();
  const globalStyles = useGlobalStyles();
  // const fileRef = useRef(null);
  let fileRef = "";

  const initialValues = {
    name: "",
    url: "",
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Campo requerido."),
    url: Yup.string().required("Campo requerido"),
    image: Yup.mixed().required("Campo requerido"),
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
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
              <input
                id="file"
                name="file"
                type="file"
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }}
                className="image-control"
                ref={(file) => (fileRef = file)}
              />
              <button
                onClick={() => fileRef.click()}
                type="button"
                className={buttonStyles.root}
              >
                Subir imagen
              </button>
            </div>
            <div className={globalStyles.center}>
              <button className={buttonStyles.submitButton} type="submit">
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
