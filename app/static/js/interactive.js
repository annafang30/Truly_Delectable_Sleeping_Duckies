var mcd_icon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/annafang30/Truly_Delectable_Sleeping_Duckies/main/app/static/assets/mcd_icon.png",
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
    if (getDistance([stores.features[i].geometry.coordinates[1], stores.features[i].geometry.coordinates[0]], [stuy_mcd[0], stuy_mcd[1]]) < 300) {
        var mark = new L.Marker([stores.features[i].geometry.coordinates[1], stores.features[i].geometry.coordinates[0]], {icon: mcd_icon});
        marker.push(mark);
        map.addLayer(mark);
        mark.bindPopup(stores.features[i].properties.street + ": " + stores.features[i].properties.dot);
        buildLocationList(stores.features[i]);
    }
}

map.on('moveend', (e) => {
    if(map.getZoom() >= 10){
        for (let i = 0; i < marker.length; i++) {
            map.removeLayer(marker[i]);
        }
        marker = new Array();
        clearLocationList();
        for (let i = 0; i < stores.features.length; i++) {
            if (getDistance([stores.features[i].geometry.coordinates[1], stores.features[i].geometry.coordinates[0]], [map.getCenter().lat, map.getCenter().lng]) < 450) {
                var mark = new L.Marker([stores.features[i].geometry.coordinates[1], stores.features[i].geometry.coordinates[0]], {icon: mcd_icon});
                marker.push(mark);
                map.addLayer(mark);
                mark.bindPopup(stores.features[i].properties.street + ": " + stores.features[i].properties.dot);
                buildLocationList(stores.features[i]);
            }
        }
    }
    else{
        for (let i = 0; i < marker.length; i++) {
            map.removeLayer(marker[i]);
        }
        marker = new Array();
        clearLocationList();
    }
})

function buildLocationList(store) {
        /* Add a new listing section to the sidebar. */
        const listings = document.getElementById('listings');
        const listing = listings.appendChild(document.createElement('div'));
        /* Assign a unique `id` to the listing. */
        listing.id = `listing-${store.properties.id}`;
        /* Assign the `item` class to each listing for styling. */
        listing.className = 'item';

        /* Add the link to the individual listing created above. */
        const name = listing.appendChild(document.createElement('b'));
        name.href = '#';
        name.className = 'title';
        name.id = `link-${store.properties.id}`;
        name.innerHTML = `${store.properties.street}`;

        /* Add details to the individual listing. */
        const details = listing.appendChild(document.createElement('div'));
        details.innerHTML = `${store.properties.city}`;
        details.innerHTML += `, broken: ${store.properties.is_broken}`;
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

function getDistance(origin, destination) {
    lat1 = origin[0]
    long1 = origin[1]
    lat2 = destination[0]
    long2 = destination[1]

    return 2*6371 * Math.asin(Math.sqrt(Math.sin((lat2-lat1)/2) * Math.sin((lat2-lat1)/2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin((long2 - long1)/2) * Math.sin((long2 - long1)/2)))
}