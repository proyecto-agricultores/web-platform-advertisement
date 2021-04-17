import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import api from "../../services/api";
import Snackbar from "../../components/Utils/Snackbar/Snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function AdCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [showCard, setShowCard] = React.useState(true);

  const setAlert = (text, severity) => {
    setAlertIsOpen(true);
    setAlertText(text);
    setAlertSeverity(severity);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    showCard && (
      <div>
        <Card className={classes.root}>
          {props.name && <CardHeader title={props.name} />}
          <CardMedia
            className={classes.media}
            image={props.picture_URL}
            title={props.name}
          />
          <CardContent>
            <Typography color="textSecondary">
              Créditos restantes: {props.remaining_credits}
            </Typography>
            {props.for_orders && (
              <Box m={1}>
                <Chip label="Ordenes" color="gray" deleteIcon={<DoneIcon />} />
              </Box>
            )}
            {props.for_publications && (
              <Box m={1}>
                <Chip
                  label="Publicaciones"
                  color="gray"
                  deleteIcon={<DoneIcon />}
                />
              </Box>
            )}
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="visitar enlace"
              href={props.URL}
              target="blank"
            >
              <PlayArrowIcon />
            </IconButton>
            <IconButton
              aria-label="eliminar anuncio"
              onClick={() => {
                api
                  .deleteAd(props.id)
                  .then((res) => {
                    setShowCard(false);
                    console.log(res);
                  })
                  .catch((error) => {
                    setAlert(
                      `Hubo un error. El anuncio no se eliminó.`,
                      "error"
                    );
                    console.log(error);
                  });
                console.log("Hello");
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h5">Geolocalización</Typography>
              <Typography paragraph>
                {props.department}, {props.region}, {props.district}
              </Typography>
              <Typography variant="h5">Fechas</Typography>
              <Typography paragraph>
                beginning_sowing_date: {props.beginning_sowing_date} <br />
                ending_sowing_date: {props.ending_sowing_date} <br />
                beginning_harvest_date: {props.beginning_harvest_date} <br />
                ending_harvest_date: {props.ending_harvest_date}
              </Typography>
              <Typography variant="h5">Código de Anuncio</Typography>
              <Typography paragraph>id: {props.id}</Typography>
            </CardContent>
          </Collapse>
        </Card>
        <Snackbar
          alertIsOpen={alertIsOpen}
          setAlertIsOpen={setAlertIsOpen}
          text={alertText}
          severity={alertSeverity}
        />
      </div>
    )
  );
}

export default AdCard;
