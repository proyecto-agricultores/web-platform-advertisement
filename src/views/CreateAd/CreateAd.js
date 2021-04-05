import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import "./CreateAd.css";
import AdAudienceForm from "components/AdAudienceForm/AdAudienceForm";
import api from "services/api";
import departmentOptions from "../../data/departments.json";

function CreateAd() {
  const [loadingSupplies, setLoadingSupplies] = useState(true);
  const [supplyOptions, setSupplyOptions] = useState(null);
  const [regionOptions, setRegionOptions] = useState([
    { key: "Todas los regiones", value: "0" },
  ]);
  const [districtOptions, setDistrictOptions] = useState([
    { key: "Todos los distritos", value: "0" },
  ]);

  useEffect(() => {
    api.supplies().then((response) => {
      const supplies = response.data.map((supply) => {
        const { id: value, name: key } = supply;
        return { key: key, value: value };
      });
      supplies.push({ key: "Todos los insumos", value: "0" });
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
    departmentOption: "0",
    regionOption: "0",
    districtOption: "0",
    supplyOption: [],
    areaUnitOption: "m2",
    minimumAreaInput: "",
    maximumAreaInput: "",
    sowingInitialDate: null,
    sowingFinalDate: null,
    harvestInitialDate: null,
    harvestFinalDate: null,
  };

  const validationSchema = Yup.object({
    publicationTypeOption: Yup.array().min(1, "Elija al menos una opción."),
    sowingInitialDate: Yup.date().required("Campo requerido.").nullable(),
    sowingFinalDate: Yup.date().required("Campo requerido.").nullable(),
    harvestInitialDate: Yup.date().required("Campo requerido.").nullable(),
    harvestFinalDate: Yup.date().required("Campo requerido.").nullable(),
  });

  const onSumbit = (values) => {
    console.log("Form data", values);
  };

  return (
    <div>
      <div className="create-ad-form">
        <h3>Audiencia</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSumbit}
        >
          {() => (
            <Form>
              <AdAudienceForm
                publicationTypeOptions={publicationTypeOptions}
                supplyOptions={supplyOptions}
                departmentOptions={departmentOptions}
                regionOptions={regionOptions}
                districtOptions={districtOptions}
                areaUnitOptions={areaUnitOptions}
              />
              <button type="submit">Calcular audiencia</button>
            </Form>
          )}
        </Formik>
      </div>
      );
    </div>
  );
}

export default CreateAd;
