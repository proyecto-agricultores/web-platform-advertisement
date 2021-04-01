import React from "react";
import FormikControl from "../Formik/FormikControl";

function AdAudienceForm(props) {
  return (
    <div className="ad-audience-form">
      <FormikControl
        control="checkbox"
        label="Tipo de publicación"
        name="checkboxOption"
        options={props.checkboxOptions}
      />
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
      <button type="submit">Calcular audiencia</button>
    </div>
  );
}

export default AdAudienceForm;
