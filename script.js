const Papa = require("papaparse");

Papa.parse(small_dataset.csv, {
  header: true,
  complete: function(results) {
    console.log(results.data); 
  },
});