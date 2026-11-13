// CSV Search Engine using JavaScript 
// For now, building graph 

let graph = {};

// hashmap for each owner present and their properties
const properties = new Map();
const addToOwner = new Map();

let addresses = new Set();
let owners = new Set();

let ready = false;

// Load and parse the CSV file
// Only unique nodes are parcelID
// only things I care about are ParcelID, Address, and landlord
// functionally creates a bipartitie graph (idk)
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

            const addy = cols[2].trim();
            const id = cols[3].trim();
            const owner = cols[14].trim();

            // parcel id is the only unique element per line so that will 
            // be left set 
            // first map to address 

            if(!addy || !id || !owner) continue;
            if(!graph[id]) graph[id] = [];
            graph[id].push(addy);
            graph[id][addy] = [];
            graph[id][addy].push(owner);
            addresses.add(addy);
            owners.add(owner);

            if(!properties.has(owner)){
                // create new set to keep track of parcels  
                let parcelSet = new Set();
                parcelSet.add(id);
                properties.set(owner, parcelSet);
            } else {
                // owner is already present 
                let currParcels = properties.get(owner);
                currParcels.add(id);
                // shouldn't have to re add to map. Since sets are mutable
            }

            // can the same address have different owners (I think so)
            // two different parcels can belong of the same address can 
            // belong to two different people. I actually don't know 
            // for the purposes of today, I will assume not but i will need to check
            if(!addToOwner.has(addy)){
                addToOwner.set(addy, owner);
            }
            
          }


        ready = true;
        document.getElementById('status').textContent =
        `✅ Dataset loaded: ${addresses.size.toLocaleString()} adresses ready.`;

        /* For simple testing purposes  
        const addressArr = [...addresses];
        
        const bulletedList = addressArr.map(add => `<li>${add}</li>`).join("");
        const htmlContent = `<ul class="address-list">${bulletedList}</ul>`;

        document.getElementById('status').innerHTML = htmlContent; */
    })
    .catch(err => {
        document.getElementById('status').textContent = '❌ ' + err.message;
    });

// Using BFS to find parcelID/s based on, address OR Landlord 
// To Do: using DataTable implementation to compare runtime 
// this is simpler but I worry abt it scaling poorly 

/* But if number of times an address or owner appears is unkown, bfs and dfs 
can't do much efficiency wise. What I can do is create a hash map 
owner: number of properties 

I'm probably guna end up using data table stuff but for now just a quick search
implementation 

Could I have an owner matched to list of parcelIds instead of count 

Would still be a hashmap since keys are unique 

'City of SA' : [1,2,3,4,5]

what abt for address lookup. If I have a simple list of addresses and their 
owners, I should be able to use hashmap above. 

'123 Ave' : 'city of sa'

*/

/* parameters: address OR Owner this is returned by my radio button input, 
                user input 

    to do: default radio button clicked or display error for submitting 
    without clicking
*/
function findParcels(){
    const addressCheck = document.getElementById('address').value; 
    const ownerCheck = document.getElementById('landlord').value; 

    if(!addressCheck && !ownerCheck) return { error: `Invalid Selection, must 
    check a radio button.` };
    
    const query = document.getElementById('addOrLan').value.toLowerCase();

    // strict input (change later)
    if(addressCheck && !addresses.has(query)) return { error: `Invalid address "${query}".` };
    if(ownerCheck && !owners.has(query)) return { error: `Invalid owner "${query}".` };

    const t0 = performance.now();
    
    let toDisplay;

    if(addressCheck){
        const currOwner = addToOwner.get(query);
        toDisplay = properties.get(currOwner);
        
    } else {
        toDisplay = properties.get(query);
    }

    return toDisplay;
}

// UI stuff 

const resultBox = document.getElementById('results');
const errorBox = document.getElementById('error');
// pressing Enter in the text field
document.getElementById('addOrLan').addEventListener('keydown', e => {
    errorBox.classList.add('hidden');
    resultBox.classList.add('hidden');

    if (!ready) {
        errorBox.textContent = 'Dataset still loading — try again in a second.';
        errorBox.classList.remove('hidden');
        return;
      }
    

});
