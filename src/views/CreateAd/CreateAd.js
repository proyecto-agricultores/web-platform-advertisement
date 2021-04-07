import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import "./CreateAd.css";
import AdAudienceForm from "../../components/AdAudienceForm/AdAudienceForm";
import departmentOptions from "../../data/departments.json";
import LocationForm from "../../components/AdAudienceForm/LocationForm";
import api from "../../services/api";
import AppBar from "../../components/AppBar/AppBar";

function CreateAd() {
  // const [loadingSupplies, setLoadingSupplies] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
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
    console.log(selectedDepartment);
    console.log(selectedRegion);
    console.log(selectedDistrict);
  };

  return (
    <>
      <AppBar />
      <div className="create-ad-form-container">
        <div className="create-ad-form">
          <h3>Audiencia</h3>
          <LocationForm
            setSelectedDepartment={setSelectedDepartment}
            setSelectedRegion={setSelectedRegion}
            setSelectedDistrict={setSelectedDistrict}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSumbit}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <AdAudienceForm
                  publicationTypeOptions={publicationTypeOptions}
                  supplyOptions={supplyOptions}
                  departmentOptions={departmentOptions}
                  areaUnitOptions={areaUnitOptions}
                  formik={formik}
                />
                <button type="submit">Calcular audiencia</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default CreateAd;
