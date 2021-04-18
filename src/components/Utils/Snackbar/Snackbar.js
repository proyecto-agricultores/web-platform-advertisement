import React from "react";
import { Snackbar as MuiSnackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Snackbar = (props) => {
  return (
    <div>
      <MuiSnackbar
        open={props.alertIsOpen}
        autoHideDuration={6000}
        onClose={() => props.setAlertIsOpen(false)}
      >
        <Alert
          onClose={() => props.setAlertIsOpen(false)}
          severity={props.severity}
        >
          {props.text}
        </Alert>
      </MuiSnackbar>
    </div>
  );
};

export default Snackbar;
