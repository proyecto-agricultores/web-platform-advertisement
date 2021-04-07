import { makeStyles } from "@material-ui/core/styles";

const useButtonStyles = makeStyles({
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
  },
});

export default useButtonStyles;
