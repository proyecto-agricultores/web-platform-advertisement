import React from "react";
import FormikControl from "../Formik/FormikControl";
import Skeleton from "react-loading-skeleton";

function AdAudienceForm(props) {
  return (
    <div className="ad-audience-form">
      <h4>Segregar audiencia</h4>
      <FormikControl
        control="checkbox"
        label="Tipo de publicación"
        name="publicationTypeOption"
        options={props.publicationTypeOptions}
      />
      <h4>Zona</h4>
      <FormikControl
        control="select"
        label="Seleccione un departamento"
        name="departmentOption"
        options={props.departmentOptions}
      />
      <FormikControl
        control="select"
        label="Seleccione una región"
        name="departmentOption"
        options={props.regionOptions}
      />
      <FormikControl
        control="select"
        label="Seleccione un distrito"
        name="departmentOption"
        options={props.districtOptions}
      />
      <h4>Insumo</h4>
      {props.supplyOptions ? (
        <FormikControl
          control="checkbox"
          label="Seleccione los insumos en los que desea que aparezca su publicación"
          name="supplyOption"
          options={props.supplyOptions}
        />
      ) : (
        <Skeleton />
      )}
      <h4>Tamaño del terreno sembrado por cultivo</h4>
      <FormikControl
        control="select"
        label="Seleccione una unidad"
        name="areaUnitOption"
        options={props.areaUnitOptions}
      />
      <FormikControl
        control="input"
        type="number"
        label="Área mínima"
        name="minimumAreaInput"
      />
      <FormikControl
        control="input"
        type="number"
        label="Área máxima"
        name="maximumAreaInput"
      />
      <h4>Fechas</h4>
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
  );
}

export default AdAudienceForm;
