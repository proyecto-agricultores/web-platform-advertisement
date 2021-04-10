import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import "./CreateAd.css";
import AdAudienceForm from "../../components/AdAudienceForm/AdAudienceForm";
import departmentOptions from "../../data/departments.json";
import LocationForm from "../../components/AdAudienceForm/LocationForm";
import api from "../../services/api";
import AppBar from "../../components/AppBar/AppBar";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  steps: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    paddingLeft: "10px",
    borderRadius: "20px",
    width: "100%",
  },
  mainDiv: {
    width: "100%",
  },
}));

function CreateAd() {
  const classes = useStyles();
  // const [loadingSupplies, setLoadingSupplies] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [supplyOptions, setSupplyOptions] = useState([]);

  useEffect(() => {
    api.supplies().then((response) => {
      const supplies = response.data.map((supply) => {
        const { id: value, name: key } = supply;
        return { key: key, value: value.toString() };
      });
      setSupplyOptions(supplies);
    });
  }, []);

  const publicationTypeOptions = [
    { key: "Cultivo", value: "cultivo" },
    { key: "Pedido", value: "pedido" },
  ];

  const areaUnitOptions = [
    { key: "Hectáreas", value: "hm2" },
    { key: "Metros cuadrados", value: "m2" },
  ];

  const initialValues = {
    publicationTypeOption: [],
    supplyOption: [],
    sowingInitialDate: null,
    sowingFinalDate: null,
    harvestInitialDate: null,
    harvestFinalDate: null,
  };

  const validationSchema = Yup.object({
    publicationTypeOption: Yup.array().min(1, "Elija al menos una opción."),
    supplyTypeOption: Yup.array().min(1, "Elija al menos una opción."),
  });

  const onSumbit = (values) => {
    console.log("Form data", values);
  };

  const selectAllSupplies = (setValues, values) => {
    const allValues = [];
    for (let i = 1; i <= supplyOptions.length; ++i) {
      allValues.push(i.toString());
    }
    setValues({ ...values, supplyOption: allValues });
  };

  const deselectAllSupplies = (setValues, values) => {
    setValues({ ...values, supplyOption: [] });
  };

  return (
    <>
      <AppBar />
      <div className="create-ad-form-container">
        <div className="create-ad-form">
          <h2 className={classes.steps}>Paso 1: Calcular audiencia</h2>
          <hr />
          <LocationForm
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
          />
          <hr />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSumbit}
          >
            {(formik) => (
              <Form className={classes.mainDiv} onSubmit={formik.handleSubmit}>
                <AdAudienceForm
                  publicationTypeOptions={publicationTypeOptions}
                  supplyOptions={supplyOptions}
                  departmentOptions={departmentOptions}
                  areaUnitOptions={areaUnitOptions}
                  formik={formik}
                  selectAllSupplies={selectAllSupplies}
                  deselectAllSupplies={deselectAllSupplies}
                />
                <button type="submit">Calcular audiencia</button>
              </Form>
            )}
          </Formik>
          <h2 className={classes.steps}>Paso 2: Subir datos de su anuncio</h2>
          <h2 className={classes.steps}>Paso 3: ¡Subir anuncio!</h2>
        </div>
      </div>
    </>
  );
}

export default CreateAd;
