
import React from "react";
import {MenuItem,FormControl,Select } from '@material-ui/core';
// import{MenuItem,FormControl,Select} from "@material_ui/core"

function App() {
  return (
    <div className="app">
     <h1>COVID-19 TRACKER</h1>
     <FormControl className="app__dropdown">
     {/* // BEM naming convention in which first is component and second is element */}
      <Select
        varient="outlined"
        value="abc"
      >
      <MenuItem value="worldwide"> Worldwide</MenuItem>
      <MenuItem value="worldwide"> wide</MenuItem>
      <MenuItem value="worldwide"> World</MenuItem>  


      </Select>
     </FormControl>
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
