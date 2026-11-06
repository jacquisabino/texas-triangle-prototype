// CSV Search Engine using JavaScript 
// For now, building graph 

// ref graph 
let refGraph = {};

let graph = {};

// these are new additions 
let addresses = new Set();
let owners = new Set();

let nodeSet = new Set();
let ready = false;

// Load and parse the CSV file
// Only unique nodes are parcelID
// only things I care about are ParcelID, Address, and landlord
// functionally creates a bipartitie graph 
fetch('./Data/small_dataset.csv')
    .then(res => {
        if(!res.ok) throw new Error('Could not load Data/owners_data');
        return res.text();
    })
    .then(text => {
        const lines = text.trim().split(/\r?\n/);
        // skip header row 
        // the elements per line are separated by comma 
        // ans there are a lot but we only care about 
        // situs_pID (index: 3)
        // situs_address (index: 2)
        // owner_name (index: 14) 
        for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',');
            // idk what the smallesst length of a string in file is but I'm pretty sure 
            // they have the same but I might be able to run
            // some sql queries on it to find out fs

            if (cols.length < 2) continue;

            // ref code; net neutral 
            const node = cols[2].trim();
            const neighbor = cols[1].trim();

            const addy = cols[2].trim();
            const id = cols[3].trim();
            const owner = cols[14].trim();

            // id is the only unique element per line so that will 
            // be left set 
            // first map to address 
            if(!addy || !id || !owner) continue;
            if(!graph[id]) graph[id] = [];
            graph[id].push(addy);
            graph[id][addy] = [];
            graph[id][addy].push(owner);
            addresses.add(addy);
            owners.add(owner);


            // reference code; should have zero effect on my actual graph
            if (!node || !neighbor) continue;
            if (!refGraph[node]) refGraph[node] = [];
            refGraph[node].push(neighbor);
            nodeSet.add(node);
            nodeSet.add(neighbor);
          }


        ready = true;
        document.getElementById('status').textContent =
        `✅ Dataset loaded: ${addresses.size.toLocaleString()} addresses ready.`;

        /* For simple testing purposes  */
        const addressArr = [...addresses];
        
        const bulletedList = addressArr.map(add => `<li>${add}</li>`).join("");
        const htmlContent = `<ul class="address-list">${bulletedList}</ul>`;

        document.getElementById('status').innerHTML = htmlContent;
    })
    .catch(err => {
        document.getElementById('status').textContent = '❌ ' + err.message;
    });