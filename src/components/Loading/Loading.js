import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import "./Loading.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function Loading() {
  const classes = useStyles();
  return (
    <div id="cosecha-loading" className={classes.root}>
      <CircularProgress size={70} />
    </div>
  );
}

export default Loading;
