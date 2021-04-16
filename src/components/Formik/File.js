import React from "react";
import TextError from "../Formik/TextError";
import { ErrorMessage } from "formik";
import { Button } from "@material-ui/core";

const File = (props) => {
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
      <Button
        onClick={() => fileRef.click()}
        color="primary"
        variant="contained"
      >
        {props.text}
      </Button>{" "}
      {props.formik.values.file && props.formik.values.file.name}
      <ErrorMessage component={TextError} name={"file"} />
    </div>
  );
};

export default File;
