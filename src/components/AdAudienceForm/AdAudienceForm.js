import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import FormikControl from "../Formik/FormikControl";

import "./AdAudienceForm.css";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "white",
    backgroundColor: theme.palette.secondary.main,
    paddingLeft: "10px",
    borderRadius: "20px",
    width: "100%",
  },
  flexDate: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-evenly",
    listStyle: "none",
    padding: 0,
    margin: 0,
    width: "40%",
  },
  orangeButton: {
    textAlign: "center",
    fontFamily: "Poppins",
    borderColor: theme.palette.secondary.main,
    backgroundColor: "transparent",
    width: "225px",
    borderRadius: "20px",
    outline: "none",
    margin: "5px 0",
  },
  flexButtons: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  liDate: {
    width: "200px",
    margin: "10px 0px",
  },
  divDates: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-evenly",
  },
  separator: {
    width: "1px",
    backgroundColor: "black",
  },
  note: {
    ...theme.typography.caption,
  },
}));

function AdAudienceForm(props) {
  const classes = useStyles();

  return (
    <div>
      <h3 className={classes.title}>Segregar audiencia</h3>
      <FormikControl
        control="checkbox"
        label="Tipo de publicación"
        name="publicationTypeOption"
        options={props.publicationTypeOptions}
      />
      <h3 className={classes.title}>Insumo</h3>
      <FormikControl
        control="checkbox"
        label="Seleccione los insumos en los que desea que aparezca su publicación"
        name="supplyOption"
        options={props.supplyOptions}
      />
      <div className={classes.flexButtons}>
        <button
          type="button"
          className={classes.orangeButton}
          onClick={() =>
            props.selectAllSupplies(props.formik.setValues, props.formik.values)
          }
        >
          Seleccionar todos
        </button>
        <button
          type="button"
          className={classes.orangeButton}
          onClick={() =>
            props.deselectAllSupplies(
              props.formik.setValues,
              props.formik.values
            )
          }
        >
          Deseleccionar todos
        </button>
      </div>
      <h3 className={classes.title}>Fechas</h3>
      <div className={classes.divDates}>
        <ul className={classes.flexDate}>
          <li className={classes.liDate}>
            <FormikControl
              control="date"
              label="Fecha inicial de siembra"
              name="sowingInitialDate"
            />
          </li>
          <li className={classes.liDate}>
            <FormikControl
              control="date"
              label="Fecha final de siembra"
              name="sowingFinalDate"
            />
          </li>
        </ul>
        <div className={classes.separator} />
        <ul className={classes.flexDate}>
          <li className={classes.liDate}>
            <FormikControl
              control="date"
              label="Fecha inicial de cosecha"
              name="harvestInitialDate"
            />
          </li>
          <li className={classes.liDate}>
            <FormikControl
              control="date"
              label="Fecha final de cosecha"
              name="harvestFinalDate"
            />
          </li>
        </ul>
      </div>
      <div className={classes.flexButtons}>
        <button
          type="button"
          className={classes.orangeButton}
          onClick={() =>
            props.resetDates(props.formik.setValues, props.formik.values)
          }
        >
          Limpiar fechas
        </button>
      </div>
      <Typography className={classes.note}>
        Nota: este campo es opcional.
      </Typography>
    </div>
  );
}

export default AdAudienceForm;
