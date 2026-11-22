import DataTable from './node_modules/datatables.net-dt/js/dataTables.dataTables.mjs';


const Papa = require("papaparse");

let results; 

// converting csv data to json  

Papa.parse(small_dataset.csv, {
  header: true,
  complete: function(data) {
    results = data.data
  },
});

// Initialise a DataTable
let table = new DataTable('#myTable', {
    ajax: 'results'
});

// results are objects of data keyed by the field name 

// using data tables to display ajax objects of sourced data (with search engine)  

/*
table.column(0).visible(false, false);
table.column(1).visible(false, false);

for (var i = 2; i < 14; i++) {
	table.column(i).visible(false, false);
}

for (var i = 15; i < 69; i++) {
	table.column(i).visible(false, false);
} 

table.columns.adjust().draw(false); // adjust column sizing and redraw */

