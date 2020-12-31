import React ,{useState,useEffect} from "react";
import "./App.css";
import {MenuItem,FormControl,Select } from '@material-ui/core';
// import{MenuItem,FormControl,Select} from "@material_ui/core"

function App() {


    const [countries, setCountries]= 
    useState([]);
    const [country, setCountry]=useState("worldwide");
    // State = how to write a variable in react


    // api used from disease.sh


    // USEEFFECT = runs piece of code base on given condition
    // at end there is square bracket in which we use variable 
    // when that variable is change useeffect run again with
    useEffect(() =>{
        // async -> send a request , wait for it , do something with it 
        const getCountiresData = async () =>{
            await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) =>{
                const countries = data.map((country) =>({
                    name: country.country,
                    value: country.countryInfo.iso2
                }));
                setCountries(countries);
            });


        };
        getCountiresData();
        // setCountry("WorldWide");

    },[]);

    const onCountryChange = async(event)=>{
        const countryCode=event.target.value;
        // console.log(countryCode);
        setCountry(countryCode);
    };


  return (
    <div className="app">
     <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
        {/* // BEM naming convention in which first is component and second is element */}
            <Select variant="outlined" onChange={onCountryChange} value={country}>
                
            
                {/* {we loop though country and show here} */} 


                <MenuItem value="worldwide"> Worldwide</MenuItem>
                {countries.map(country=> (
                        <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}

                {/* 
                <MenuItem value="worldwide"> wide</MenuItem> 
                <MenuItem value="worldwide"> World</MenuItem>   */}
            </Select>
        </FormControl>



     </div>
   
     
     {/* {Header} */}
     {/* {Title + Select input dropdown field} */}


      
     {/* {Info Boxs} */}
     {/* {Info Boxs} */}
     {/* {Info Boxs} */}



     {/* {Table} */}
     {/* {Graph} */}

     {/* {Map} */}
    </div>
  );
}

export default App;
