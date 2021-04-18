import { makeStyles } from "@material-ui/core/styles";

const useButtonStyles = makeStyles((theme) => ({
  root: {
    background: "#09B44D",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 30,
    padding: "0 15px",
    "&:hover": {
      backgroundColor: "#D0F1DD",
    },
    fontFamily: "Poppins",
  },
  submitButton: {
    textAlign: "center",
    fontFamily: "Poppins",
    backgroundColor: theme.palette.primary.main,
    border: 0,
    color: "white",
    borderRadius: "10px",
    outline: "none",
    margin: "5px 0",
    fontSize: "15px",
    "&:disabled": {
      backgroundColor: theme.palette.primary.light,
    },
    padding: "5px",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default useButtonStyles;
