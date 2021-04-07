import React, { useState } from "react";

import api from "../../services/api";
import departmentOptions from "../../data/departments.json";
import "./LocationForm.css";

const regionsInitialValue = [{ key: "Todas los regiones", value: 0 }];
const districtsInitialValue = [{ key: "Todos los distritos", value: 0 }];

function LocationForm(props) {
  const [regionOptions, setRegionOptions] = useState(regionsInitialValue);
  const [regionsAreLoading, setRegionsAreLoading] = useState(false);
  const [districtOptions, setDistrictOptions] = useState(districtsInitialValue);
  const [districtsAreLoading, setDistrictsAreLoading] = useState(false);

  const generateDropdown = (name, label, options, onChange, isLoading) => (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} onChange={onChange} disabled={isLoading}>
        {options.map((option) => (
          <option key={option.key} value={option.value}>
            {option.key}
          </option>
        ))}
      </select>
    </>
  );

  const handleDepartmentChange = (e) => {
    const departmentId = e.currentTarget.value;
    props.setSelectedDepartment(departmentId);
    setRegionsAreLoading(true);
    api.getRegionsByDepartmentId(departmentId).then((response) => {
      const newRegions = response.data.map((region) => {
        const { id: value, name: key } = region;
        return { key: key, value: value };
      });
      newRegions.unshift(regionsInitialValue[0]);
      setRegionOptions(newRegions);
      setDistrictOptions(districtsInitialValue);
      setRegionsAreLoading(false);
    });
  };

  const handleRegionChange = (e) => {
    const regionId = e.currentTarget.value;
    props.setSelectedRegion(regionId);
    setDistrictsAreLoading(true);
    api.getDistrictsByRegionId(regionId).then((response) => {
      const newDistricts = response.data.map((district) => {
        const { id: value, name: key } = district;
        return { key: key, value: value };
      });
      newDistricts.unshift(districtsInitialValue[0]);
      setDistrictOptions(newDistricts);
      setDistrictsAreLoading(false);
    });
  };

  const handleDistrictChange = (e) => {
    const districtId = e.currentTarget.value;
    props.setSelectedDistrict(districtId);
  };

  return (
    <div className="create-ad-form-location-container">
      <h4>Zona</h4>
      <ul className="create-ad-form-location-dropdowns">
        <li className="create-ad-form-location-dropdown">
          {generateDropdown(
            "departments",
            "Departamento",
            departmentOptions,
            handleDepartmentChange,
            false
          )}
        </li>
        <li className="create-ad-form-location-dropdown">
          {generateDropdown(
            "regions",
            "Región",
            regionOptions,
            handleRegionChange,
            regionsAreLoading
          )}
        </li>
        <li className="create-ad-form-location-dropdown">
          {generateDropdown(
            "districts",
            "Distrito",
            districtOptions,
            handleDistrictChange,
            districtsAreLoading
          )}
        </li>
      </ul>
    </div>
  );
}

export default LocationForm;
