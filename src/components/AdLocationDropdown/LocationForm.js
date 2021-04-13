import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import api from "../../services/api";
import departmentOptions from "../../data/departments.json";
import "./LocationForm.css";

const regionsInitialValue = [{ key: "Todas los regiones", value: 0 }];
const districtsInitialValue = [{ key: "Todos los distritos", value: 0 }];

const useStyles = makeStyles((theme) => ({
  dropdown: {
    width: "100%",
    "&:active": {},
  },
  title: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "20px",
    paddingLeft: "10px",
    color: "white",
    width: "100%",
  },
}));

function LocationForm(props) {
  const classes = useStyles();
  const history = useHistory();

  const [regionOptions, setRegionOptions] = useState(regionsInitialValue);
  const [regionsAreLoading, setRegionsAreLoading] = useState(false);
  const [districtOptions, setDistrictOptions] = useState(districtsInitialValue);
  const [districtsAreLoading, setDistrictsAreLoading] = useState(false);

  const generateDropdown = (
    name,
    label,
    options,
    onChange,
    isLoading,
    value
  ) => (
    <>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        value={value}
        name={name}
        id={name}
        onChange={onChange}
        disabled={isLoading}
        className={classes.dropdown}
      >
        {options.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.key}
          </MenuItem>
        ))}
      </Select>
    </>
  );

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;
    props.setSelectedDepartment(departmentId);
    setRegionsAreLoading(true);
    api
      .getRegionsByDepartmentId(departmentId)
      .then((response) => {
        const newRegions = response.data.map((region) => {
          const { id: value, name: key } = region;
          return { key: key, value: value };
        });
        newRegions.unshift(regionsInitialValue[0]);

        props.setSelectedRegion(0);
        setRegionOptions(newRegions);

        props.setSelectedDistrict(0);
        setDistrictOptions(districtsInitialValue);

        setRegionsAreLoading(false);
      })
      .catch((error) => {
        console.log(error);
        history.push("/");
      });
  };

  const handleRegionChange = (e) => {
    const regionId = e.target.value;
    props.setSelectedRegion(regionId);
    setDistrictsAreLoading(true);
    api
      .getDistrictsByRegionId(regionId)
      .then((response) => {
        const newDistricts = response.data.map((district) => {
          const { id: value, name: key } = district;
          return { key: key, value: value };
        });
        props.setSelectedDistrict(0);
        newDistricts.unshift(districtsInitialValue[0]);
        setDistrictOptions(newDistricts);
        setDistrictsAreLoading(false);
      })
      .catch((error) => {
        console.log(error);
        history.push("/");
      });
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    props.setSelectedDistrict(districtId);
  };

  return (
    <div className="create-ad-form-location-container">
      <h3 className={classes.title}>Zona</h3>
      <ul className="create-ad-form-location-dropdowns">
        <li className="create-ad-form-location-dropdown">
          {generateDropdown(
            "departments",
            "Departamento",
            departmentOptions,
            handleDepartmentChange,
            false,
            props.selectedDepartment
          )}
        </li>
        <li className="create-ad-form-location-dropdown">
          {generateDropdown(
            "regions",
            "Región",
            regionOptions,
            handleRegionChange,
            regionsAreLoading,
            props.selectedRegion
          )}
        </li>
        <li className="create-ad-form-location-dropdown">
          {generateDropdown(
            "districts",
            "Distrito",
            districtOptions,
            handleDistrictChange,
            districtsAreLoading,
            props.selectedDistrict
          )}
        </li>
      </ul>
    </div>
  );
}

export default LocationForm;
