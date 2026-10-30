// CSV Search Engine using JavaScript 
// For now, building graph 

let graph = {};
let nodeSet = new nodeSet;
let ready = false;

// Load and parse the CSV file
// Only unique nodes are parcelID
// only things I care about are ParcelID, Address, and landlord
// functionally creates a bipartitie graph 
fetch('Data/owners_data_total_supp_sample_5000.csv')
    .then(res => {
        if(!res.ok) throw new Error('Could not load Data/owners_data');
        return res.text();
    })