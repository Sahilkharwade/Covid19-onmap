// this is not component this is utility funtions

export const sortData=(data)=>{
    const sortedData = [...data];
    // copying data to sortedData


        sortedData.sort((a,b)=>{
            // if(a.cases > b.cases) return -1;
            // else return 1;

            return b.cases-a.cases;

        });

        return sortedData;





};