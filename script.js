import DataTable from 'datatables.net-dt';

const Papa = require("papaparse");

Papa.parse(small_dataset.csv, {
  header: true,
  complete: function(results) {
    console.log(results.data); 
  },
});

// Initialise a DataTable
const table = new DataTable('#myTable', {
    // Options
});