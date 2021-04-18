import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Link as MuiLink,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
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
    textDecoration: "none",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
  drawerLinks: {
    color: "black",
    textDecoration: "none",
  },
}));

const links = [
  {
    label: "Mis anuncios",
    href: "/",
  },
  {
    label: "Comprar créditos",
    href: "/buyCredits",
  },
  {
    label: "Crear anuncio",
    href: "/createAd",
  },
];

const AppBar = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const getDrawerChoices = () => {
    return links.map(({ label, href }) => (
      <MuiLink
        component={Link}
        to={href}
        className={classes.drawerLinks}
        key={label}
      >
        <MenuItem>{label}</MenuItem>
      </MuiLink>
    ));
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={classes.drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>
      </>
    );
  };

  const desktopBar = () => {
    return links.map((link) => (
      <Button
        className={classes.link}
        component={Link}
        to={link.href}
        key={link.label}
      >
        {link.label}
      </Button>
    ));
  };

  return (
    <div>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Cosecha - Anunciantes
          </Typography>
          {mobileView ? displayMobile() : desktopBar()}
        </Toolbar>
      </MuiAppBar>
    </div>
  );
};

export default AppBar;
