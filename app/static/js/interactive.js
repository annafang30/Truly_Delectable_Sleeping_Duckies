var mapdiv = document.getElementById("map");
var listings = document.getElementById("listings");
var locations = document.getElementById("locations");

resize_map();
window.addEventListener("resize", (e)=> {
    resize_map();
});

function resize_map(){
    mapdiv.style.width = window.innerWidth/1.5 + "px";
    mapdiv.style.height = window.innerWidth*9/16/1.5 + "px";

    listings.style.width = window.innerWidth*0.9 - window.innerWidth/1.5 + "px";
    locations.style.width = listings.style.width;
    listings.style.height = window.innerWidth*9/16/1.5*0.85 + "px";
    console.log(mapdiv.style.width, mapdiv.style.height);
}

var mcd_icon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/annafang30/Truly_Delectable_Sleeping_Duckies/main/app/static/assets/mcd_icon.png",
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [19, 38], // point of the icon which will correspond to marker's location
    popupAnchor:  [0,-38] // point from which the popup should open relative to the iconAnchor
});

var mcd_icon_green = L.icon({
    iconUrl: "https://raw.githubusercontent.com/annafang30/Truly_Delectable_Sleeping_Duckies/main/app/static/assets/mcd_icon_green.png",
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [19, 38], // point of the icon which will correspond to marker's location
    popupAnchor:  [0,-38] // point from which the popup should open relative to the iconAnchor
});

var stuy_mcd = [40.716366, -74.010736]

var map = L.map('map').setView(stuy_mcd, 18);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    container: 'map',
    minZoom: 4
}).addTo(map);

map.attributionControl.setPrefix(false);
L.control.scale(imperial=true).addTo(map);

const stores = {
    "type": "FeatureCollection",
    "features": stats
        };

var marker = new Array();
for (let i = 0; i < stores.features.length; i++) {
    stores.features[i].properties.id = i;
    if (map.getBounds().contains(L.latLng(stores.features[i].geometry.coordinates[1], stores.features[i].geometry.coordinates[0]))) {
        if(stores.features[i].properties.dot == "working"){
            var mark = new L.Marker([stores.features[i].geometry.coordinates[1], stores.features[i].geometry.coordinates[0]], {icon: mcd_icon_green});
        }
        else{
            var mark = new L.Marker([stores.features[i].geometry.coordinates[1], stores.features[i].geometry.coordinates[0]], {icon: mcd_icon});
        }
        marker.push(mark);
        map.addLayer(mark);
        mark.bindPopup(stores.features[i].properties.street + ": " + stores.features[i].properties.dot);
        buildLocationList(stores.features[i]);
    }
}

map.on('moveend', (e) => {
    if(map.getZoom() >= 12){
        for (let i = 0; i < marker.length; i++) {
            map.removeLayer(marker[i]);
        }
        marker = new Array();
        clearLocationList();
        for (let i = 0; i < stores.features.length; i++) {
            if (map.getBounds().contains(L.latLng(stores.features[i].geometry.coordinates[1], stores.features[i].geometry.coordinates[0]))) {
                if(stores.features[i].properties.dot == "working"){
                    var mark = new L.Marker([stores.features[i].geometry.coordinates[1], stores.features[i].geometry.coordinates[0]], {icon: mcd_icon_green});
                }
                else{
                    var mark = new L.Marker([stores.features[i].geometry.coordinates[1], stores.features[i].geometry.coordinates[0]], {icon: mcd_icon});
                }
                marker.push(mark);
                map.addLayer(mark);
                mark.bindPopup(stores.features[i].properties.street + ": " + stores.features[i].properties.dot);
                buildLocationList(stores.features[i]);
            }
        }
        checkEmptyList();
    }
    else{
        for (let i = 0; i < marker.length; i++) {
            map.removeLayer(marker[i]);
        }
        marker = new Array();
        clearLocationList();
        showEmptyList();
    }
})

function buildLocationList(store) {
        /* Add a new listing section to the sidebar. */
        const listings = document.getElementById('listings');
        const listing = listings.appendChild(document.createElement('div'));
        listing.style.border = "solid 1px";
        /* Assign a unique `id` to the listing. */
        listing.id = `listing-${store.properties.id}`;
        /* Assign the `item` class to each listing for styling. */
        listing.className = 'item';

        /* Add the link to the individual listing created above. */
        const name = listing.appendChild(document.createElement('a'));
        name.href = `https://www.google.com/search?q=${store.properties.street}, ${store.properties.city} McDonald's`;
        name.className = 'title';
        name.target = "_blank";
        name.id = `link-${store.properties.id}`;
        name.innerHTML = `${store.properties.street}, ${store.properties.city}`;
        name.style.textDecoration = "none";
        name.style.color = "black";
        name.style.fontWeight = "bold";

        const details = listing.appendChild(document.createElement('div'));
        details.innerHTML = `${store.properties.dot}`;
        if(store.properties.dot == "working"){
            details.style.color = "green";
        }
        else{
            details.style.color = "red";
        }
}

function showEmptyList(){
    const listings = document.getElementById('listings');
    const listing = listings.appendChild(document.createElement('div'));

    const name = listing.appendChild(document.createElement('b'));
    name.innerHTML = `Zoom in to see stores.`;
}

function checkEmptyList(){
    const listings = document.getElementById('listings');
    if(listings.childNodes.length == 0){
        const listing = listings.appendChild(document.createElement('div'));

        const name = listing.appendChild(document.createElement('b'));
        name.innerHTML = `There are no tracked McDonald's here :(`;
    }
}

function clearLocationList(){
    const listings = document.getElementById('listings');
    children = []
    for(let i = 0; i < listings.childNodes.length; i++){
        children[i] = listings.childNodes[i];
    }
    for(let i = 0; i < children.length; i++){
        children[i].remove();
    }
}