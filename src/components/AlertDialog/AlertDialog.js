import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AlertDialog = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
          {props.content}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCancel} color="primary">
            {props.cancelMessage}
          </Button>
          {props.successMessage && (
            <Button onClick={props.handleSuccess} color="primary" autoFocus>
              {props.successMessage}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
