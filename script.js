import Papa from 'papaparse';

// First, convert csv file to json objects 
Papa.parse(small_dataset.csv, {header: true, complete: function(results) {
    console.log("Finsihed: ", results.data);}
    } );