import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import "./CreateAd.css";
import AdAudienceForm from "components/AdAudienceForm/AdAudienceForm";

function CreateAd() {
  const checkboxOptions = [
    { key: "Cultivo", value: "cultivo" },
    { key: "Pedido", value: "pedido" },
  ];

  const initialValues = {
    checkboxOption: [],
    sowingInitialDate: null,
    sowingFinalDate: null,
    harvestInitialDate: null,
    harvestFinalDate: null,
  };

  const validationSchema = Yup.object({
    checkboxOption: Yup.array().min(1, "Elija al menos una opción."),
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
          {() => <AdAudienceForm checkboxOptions={checkboxOptions} />}
        </Formik>
      </div>
      );
    </div>
  );
}

export default CreateAd;
