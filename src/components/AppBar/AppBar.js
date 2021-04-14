import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
  link: {
    color: "white",
  },
}));

const AppBar = () => {
  const classes = useStyles();

  return (
    <div>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Cosecha - Anunciantes
          </Typography>
          <Link to="/myAds" style={{ textDecoration: "none" }}>
            <Button color="default" className={classes.link}>
              Mis anuncios
            </Button>
          </Link>
          <Link to="/createAd" style={{ textDecoration: "none" }}>
            <Button color="default" className={classes.link}>
              Crear anuncio
            </Button>
          </Link>
        </Toolbar>
      </MuiAppBar>
    </div>
  );
};

export default AppBar;
