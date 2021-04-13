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
import { useHistory } from "react-router";

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
  submitButton: {
    textAlign: "center",
    fontFamily: "Poppins",
    backgroundColor: theme.palette.primary.main,
    border: 0,
    color: "white",
    borderRadius: "10px",
    outline: "none",
    margin: "5px 0",
    fontSize: "15px",
  },
  center: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

function CreateAd(props) {
  const classes = useStyles();
  // const [loadingSupplies, setLoadingSupplies] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [supplyOptions, setSupplyOptions] = useState([]);
  const [totalAudience, setTotalAudience] = useState(null);
  const history = useHistory();

  useEffect(() => {
    api
      .supplies()
      .then((response) => {
        const supplies = response.data.map((supply) => {
          const { id: value, name: key } = supply;
          return { key: key, value: value.toString() };
        });
        setSupplyOptions(supplies);
      })
      .catch((error) => {
        console.log(error);
        history.push("/");
      });
    return;
  }, [history]);

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

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    return `${date.getDate()}/${month}/${date
      .getFullYear()
      .toString()
      .slice(-2)} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  const defaultDate = () => "1/1/20 0:0:0";

  const onSumbit = (values) => {
    console.log(values);
    api
      .calculateAudience({
        departmentId: selectedDepartment,
        regionId: selectedRegion,
        districtId: selectedDistrict,
        forOrders: values.publicationTypeOption.includes("pedido")
          ? true
          : false,
        forPublications: values.publicationTypeOption.includes("cultivo")
          ? true
          : false,
        beginningSowingDate: values.sowingInitialDate
          ? formatDate(values.sowingInitialDate)
          : defaultDate(),
        endingSowingDate: values.sowingFinalDate
          ? formatDate(values.sowingFinalDate)
          : defaultDate(),
        beginningHarvestDate: values.harvestInitialDate
          ? formatDate(values.harvestInitialDate)
          : defaultDate(),
        endingHarvestDate: values.harvestFinalDate
          ? formatDate(values.harvestFinalDate)
          : defaultDate(),
        supplies: values.supplyOption.map((option) => {
          console.log(option);
          return parseInt(option, 10);
        }),
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const resetDates = (setValues, values) => {
    setValues({
      ...values,
      sowingInitialDate: null,
      sowingFinalDate: null,
      harvestInitialDate: null,
      harvestFinalDate: null,
    });
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
                  resetDates={resetDates}
                />
                <hr />
                <div className={classes.center}>
                  <button className={classes.submitButton} type="submit">
                    Calcular audiencia
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <h3>
            Audiencia total:{" "}
            {totalAudience ? totalAudience : "Todavía no ha sido calculada"}
          </h3>
          <h2 className={classes.steps}>Paso 2: Subir datos de su anuncio</h2>
          <h2 className={classes.steps}>Paso 3: ¡Subir anuncio!</h2>
        </div>
      </div>
    </>
  );
}

export default CreateAd;
