import { makeStyles } from "@material-ui/core";
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
  },
  suppliesSelectButtons: {
    textAlign: "center",
    fontFamily: "Poppins",
    borderColor: theme.palette.secondary.main,
    backgroundColor: "transparent",
    width: "225px",
    borderRadius: "20px",
    outline: "none",
    marginBottom: "5px",
  },
  flexSupplyButtons: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  liDate: {
    width: "200px",
    margin: "10px 0px",
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
      <hr />
      <h3 className={classes.title}>Insumo</h3>
      <FormikControl
        control="checkbox"
        label="Seleccione los insumos en los que desea que aparezca su publicación"
        name="supplyOption"
        options={props.supplyOptions}
      />
      <div className={classes.flexSupplyButtons}>
        <button
          type="button"
          className={classes.suppliesSelectButtons}
          onClick={() =>
            props.selectAllSupplies(props.formik.setValues, props.formik.values)
          }
        >
          Seleccionar todos
        </button>
        <button
          type="button"
          className={classes.suppliesSelectButtons}
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
      <hr />
      <h3 className={classes.title}>Fechas</h3>
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
  );
}

export default AdAudienceForm;
