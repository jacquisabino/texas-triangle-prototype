import DataTable from 'datatables.net-dt';

const Papa = require("papaparse");

let results; 

Papa.parse(small_dataset.csv, {
  header: false,
  complete: function(data) {
    results = data.data
  },
});

// Initialise a DataTable
const table = new DataTable('#myTable', {
    ajax: 'results'
});
table.column(0).visible(false, false);
table.column(1).visible(false, false);

for (var i = 2; i < 14; i++) {
	table.column(i).visible(false, false);
}

for (var i = 15; i < 69; i++) {
	table.column(i).visible(false, false);
}

table.columns.adjust().draw(false); // adjust column sizing and redraw