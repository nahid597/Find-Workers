mapboxgl.accessToken = 'pk.eyJ1IjoibmFoaWQ1OTciLCJhIjoiY2syMzQwZThqMHNnODNnbnIwZTYxbXptciJ9.pCJVXu5d-k1CDRZ9qJsFJQ';

style = 'mapbox://styles/mapbox/streets-v10';

var map;
var marker;
var lng = 88.54;
var lat = 24.56;

this.initializeMap();

function initializeMap() {
    /// locate the user
    console.log('map');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(lat);
            lat = position.coords.latitude;
            lng = position.coords.longitude;

            //console.log(lat, lng);
            map.flyTo({
                center: [lng, lat]
            });
        });
    } else {
        alert("please turn on your location...");
    }

    this.buildMap();

}

function buildMap() {
    console.log('map2');
    map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [lng, lat]

    });

    workerMarker();
    /// Add map controls
    map.addControl(new mapboxgl.NavigationControl());
}

function workerMarker() {

    navigator.geolocation.getCurrentPosition(position => {

        lng = position.coords.longitude;
        lat = position.coords.latitude;

        //console.log("w1: " + lng);
        //console.log("w2:" + lat);

        var el = document.createElement('div');
        var male = document.createElement('i');
        male.className = 'fa fa-male';
        male.style = "font-size:50px; color: red";
        el.appendChild(male);
        //console.log("nahid");

        //var maleSymbol = document.getElementById("maleSymbol");

        popup = new mapboxgl.Popup({
                offset: 38,
                closeOnClick: false,
            })
            .setHTML('it is you');
        // .setHTML(generatedHtmlelemnets(id, name, category, rating, phone));
        marker = new mapboxgl.Marker(el)
            .setLngLat([lng, lat])
            .setPopup(popup)
            //.getLngLat()
            .addTo(map)

    });

}