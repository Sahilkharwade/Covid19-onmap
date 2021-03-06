import React ,{useState,useEffect} from "react";
import "./App.css";
import {MenuItem,FormControl,Select ,Card ,CardContent} from '@material-ui/core';
//import{MenuItem,FormControl,Select} from "@material_ui/core"
import InfoBox from './InfoBox'; 
import Map from './Map';
import Table from './Table';
import {sortData,prettyPrintStat} from './util';
import LineGraph from './LineGraph';
// import "leaflet/dis/leaflet.css"
import "leaflet/dist/leaflet.css";

function App() {
     
                    
    const [countries, setCountries]= 
    useState([]);
    const [country, setCountry]=useState("worldwide");
    const [countryInfo, setCountryInfo]=useState([]);
    const [tableData, setTableData]=useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 20.5937 , lng: 78.9629 });
    const [mapZoom, setMapZoom] = useState(3);
    //State = how to write a variable in react
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");

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
                // sort data in decending order by cases
                const sortedData = sortData(data);
                setTableData(sortedData);
                setMapCountries(data);
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

        const url = countryCode ==="worldwide" ? "https://disease.sh/v3/covid-19/all" :
        `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        // {/* for world wide date the is diffrent api call so for that we use if else */}
        // https://disease.sh/v3/covid-19/all  that gives worldwide data 
        // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE] that gives all info about country

        await fetch(url).then(response => response.json()).then(data=>{
            setCountry(countryCode);

            if(countryCode ==="worldwide")
                setMapCenter({ lat: 20.5937 , lng: 78.9629 })
            else
            setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
             
            setCountryInfo(data);

            
            // console.log("change>>>>>>>>" , mapCenter ,data);
            setMapZoom(5);


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
        {/* Component With A Modifier if we use app--dropdown   */}
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

                <InfoBox isRed active={casesType === "cases"} onClick={(e) => setCasesType("cases")} title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}/>
                <InfoBox active={casesType === "recovered"} onClick={(e) => setCasesType("recovered")} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/> 
                <InfoBox isRed active={casesType === "deaths"} onClick={(e) => setCasesType("deaths")} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />
                
    
                { /* {Info Boxs} */ }
                { /* {Info Boxs} */ }
                {/* {Info Boxs} */}


    </div>
           

                



     {/* {Map} */}
     <Map
        casesType={casesType}
        countries={mapCountries}
        center={mapCenter}
        zoom={mapZoom}
      />


    </div>
    <Card className="app__right">
                <CardContent >
                    {/* {Table} */}
                    <h3> Live cases by Country</h3>
                    <Table countries={tableData}/>
                    {/* {Graph} */}
                    <h3 className="app_Graphtitle">Worldwide new {casesType}</h3>
                    <LineGraph className="app__Graph" casesType={casesType} />
                   
                </CardContent>
                
         
     
     

    </Card>


    </div>
  );
}

export default App;
