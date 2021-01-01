import React ,{useState,useEffect} from "react";
import "./App.css";
import {MenuItem,FormControl,Select ,Card ,CardContent} from '@material-ui/core';
//import{MenuItem,FormControl,Select} from "@material_ui/core"
import InfoBox from './InfoBox'; 
import Map from './Map';

function App() {
     
                    
    const [countries, setCountries]= 
    useState([]);
    const [country, setCountry]=useState("worldwide");
    const [countryInfo, setCountryInfo]=useState([]);
    //State = how to write a variable in react


    // for worldwide data just after loading 

    useEffect( () => {
        fetch("https://disease.sh/v3/covid-19/all").then( (response) => response.json())
        .then((data) => {
            setCountryInfo(data);
        });



    },[]);

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
        // setCountry(countryCode);

        const url = countryCode ==='worldwide' ? "https://disease.sh/v3/covid-19/all" :
        `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        // {/* for world wide date the is diffrent api call so for that we use if else */}
        // https://disease.sh/v3/covid-19/all  that gives worldwide data 
        // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE] that gives all info about country

        await fetch(url).then(response => response.json()).then(data=>{
            setCountry(countryCode);

            setCountryInfo(data);


        });

    };
    console.log("country info >>>>>",countryInfo);


  return (
    <div className="app">
    <div className="app_left">
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


    <div className="app__stats">

                <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
                <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/> />
                <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
                
    
                {/* {Info Boxs} */}
                {/* {Info Boxs} */}
                {/* {Info Boxs} */}


    </div>
      



     {/* {Map} */}
     <Map />


    </div>
    <Card className="app__right">
                <CardContent>
                    {/* {Table} */}
                    <h3> Live cases by Country</h3>
                    {/* {Graph} */}
                    <h3>Worldwide new cases</h3>
                </CardContent>
                
        
     
     

    </Card>


    </div>
  );
}

export default App;
