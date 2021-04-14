import React from "react";
import TextError from "../Formik/TextError";
import useButtonStyles from "../../styles/useButtonStyles";
import { ErrorMessage } from "formik";

const File = (props) => {
  const buttonStyles = useButtonStyles();
  let fileRef = "";

  return (
    <div>
      <input
        id="file"
        name="file"
        type="file"
        onChange={(event) => {
          props.formik.setFieldValue("file", event.currentTarget.files[0]);
        }}
        className="image-control"
        ref={(file) => (fileRef = file)}
      />
      <button
        onClick={() => fileRef.click()}
        type="button"
        className={buttonStyles.submitButton}
      >
        {props.text}
      </button>{" "}
      {props.formik.values.file && props.formik.values.file.name}
      <ErrorMessage component={TextError} name={"file"} />
    </div>
  );
};

export default File;
