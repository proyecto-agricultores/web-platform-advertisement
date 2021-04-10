import { makeStyles } from "@material-ui/core";
import React from "react";
import FormikControl from "../Formik/FormikControl";

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
    flexWrap: "wrap",
    justifyContent: "space-evenly",
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
      <div className={classes.flexDate}>
        <FormikControl
          control="date"
          label="Fecha inicial de siembra"
          name="sowingInitialDate"
        />
        <FormikControl
          control="date"
          label="Fecha final de siembra"
          name="sowingFinalDate"
        />
        <FormikControl
          control="date"
          label="Fecha inicial de cosecha"
          name="harvestInitialDate"
        />
        <FormikControl
          control="date"
          label="Fecha final de cosecha"
          name="harvestFinalDate"
        />
      </div>
    </div>
  );
}

export default AdAudienceForm;
