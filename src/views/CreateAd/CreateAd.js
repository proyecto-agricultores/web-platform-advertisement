import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import "./CreateAd.css";
import AdAudienceForm from "../../components/AdAudienceForm/AdAudienceForm";
import departmentOptions from "../../data/departments.json";
import LocationForm from "../../components/AdLocationDropdown/LocationForm";
import api from "../../services/api";
import AppBar from "../../components/AppBar/AppBar";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import AdInfoForm from "../../components/AdInfoForm/AdInfoForm";
import useButtonStyles from "../../styles/useButtonStyles";
import useGlobalStyles from "../../styles/useGlobalStyles";

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

function CreateAd(props) {
  const classes = useStyles();
  // const [loadingSupplies, setLoadingSupplies] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [supplyOptions, setSupplyOptions] = useState([]);
  const [totalAudience, setTotalAudience] = useState(null);
  const [audience, setAudience] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const buttonStyles = useButtonStyles();
  const globalStyles = useGlobalStyles();

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
        if (error.response?.status === 401) {
          history.push("/");
        }
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
    supplyOption: Yup.array().min(1, "Elija al menos una opción."),
  });

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const formattedDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
    return formattedDate;
  };

  const onSumbit = (values) => {
    setIsLoading(true);
    const audience = {
      ...(selectedDepartment && {
        departmentId: selectedDepartment,
      }),
      ...(selectedRegion && {
        regionId: selectedRegion,
      }),
      ...(selectedDistrict && {
        districtId: selectedDistrict,
      }),
      forOrders: values.publicationTypeOption.includes("pedido") ? true : false,
      forPublications: values.publicationTypeOption.includes("cultivo")
        ? true
        : false,
      ...(values.sowingInitialDate && {
        beginningSowingDate: formatDate(values.sowingInitialDate),
      }),
      ...(values.sowingFinalDate && {
        endingSowingDate: formatDate(values.sowingFinalDate),
      }),
      ...(values.harvestInitialDate && {
        beginningHarvestDate: formatDate(values.harvestInitialDate),
      }),
      ...(values.harvestFinalDate && {
        endingHarvestDate: formatDate(values.harvestFinalDate),
      }),
      supplies: values.supplyOption.map((option) => {
        return parseInt(option, 10);
      }),
    };
    api
      .calculateAudience(audience)
      .then((response) => {
        setTotalAudience(response.data.total);
        setAudience(audience);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 401) {
          history.push("/");
        }
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
          <LocationForm
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
          />
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
                <div className={globalStyles.center}>
                  <button
                    className={buttonStyles.submitButton}
                    type="submit"
                    disabled={isLoading}
                  >
                    Generar audiencia para mi anuncio
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <h3>
            Audiencia total:{" "}
            {totalAudience || totalAudience === 0
              ? totalAudience
              : "No calculada aún."}
          </h3>
          <h2 className={classes.steps}>Paso 2: Datos de su anuncio</h2>
          {audience ? (
            <AdInfoForm audience={audience} />
          ) : (
            "Calcule la audiencia antes de subir los datos de su anuncio."
          )}
          <h2 className={classes.steps}>Paso 3: Comprar créditos</h2>
        </div>
      </div>
    </>
  );
}

export default CreateAd;
