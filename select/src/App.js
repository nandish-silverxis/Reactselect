
import React, { useEffect, useState } from "react";
import AsyncSelect from 'react-select/async';

const CountrySelect = () => {
  const [countrydata,setCountrydata]=useState([]);
  const [selectedCountry,setSelectedCountry]=useState(null);

  
    const countryOptions = async(inputValue) =>
    new Promise(async(resolve) => {
      var payload = {
        name: inputValue,
        // limit: 10,
      };
      const responce=await fetch("https://kriyan-node-demo.onrender.com/api/v1/get-country",{
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      });
      const jsondata = await responce.json();
      console.log(jsondata.data)
      var countryArray = jsondata.data;
        var countryData = [];
        countryArray.forEach(function (element) {
          countryData.push(element);
        });
        resolve(countryData);
    }); 
    const handleCountryChange = (selectedOption) => {
      setSelectedCountry(selectedOption);
      if (selectedOption) {
        // setValue("country_id", selectedOption.id);
        // clearErrors("country_id");
      } else {
        // setValue("country_id", "");
      }
    };
  return (

    <AsyncSelect
                    value={selectedCountry}
                    className={`dsf`}
                    classNamePrefix="select"
                    placeholder={"country"}
                    isSearchable
                    cacheOptions
                    defaultOptions
                    loadOptions={countryOptions}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    onChange={(selectedOption) => {
                      handleCountryChange(selectedOption);
                    }}
                  />
  );
};

export default function App() {
  return (
    <div className="App">
      <CountrySelect />
    </div>
  );
}
