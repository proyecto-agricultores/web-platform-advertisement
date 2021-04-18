import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  checkBoxesDiv: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

function CheckboxGroup(props) {
  const classes = useStyles();
  const { label, name, options, ...rest } = props;

  return (
    <div className="form-control">
      <label className="ad-labels">{label}</label>
      <div className={classes.checkBoxesDiv}>
        <Field name={name}>
          {({ field }) => {
            return options.map((option) => {
              return (
                <React.Fragment key={option.key}>
                  <div>
                    <input
                      type="checkbox"
                      id={option.value}
                      {...field}
                      {...rest}
                      value={option.value}
                      checked={field.value.includes(option.value)}
                    />
                    <label htmlFor={option.value}>{option.key}</label>
                  </div>
                </React.Fragment>
              );
            });
          }}
        </Field>
      </div>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default CheckboxGroup;
