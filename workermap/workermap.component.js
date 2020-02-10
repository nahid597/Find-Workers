mapboxgl.accessToken = 'pk.eyJ1IjoibmFoaWQ1OTciLCJhIjoiY2syMzQwZThqMHNnODNnbnIwZTYxbXptciJ9.pCJVXu5d-k1CDRZ9qJsFJQ';

style = 'mapbox://styles/mapbox/streets-v10';

var map;
var marker;
var lng = 88.54;
var lat = 24.56;

const worker_id = document.location.search.replace(/^.*?\=/, '');
console.log("worker id: " + worker_id);

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

    //workerMarker();
    /// Add map controls
    map.addControl(new mapboxgl.NavigationControl());
}

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            //console.log(anHttpRequest.status);
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        };

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    };
};

var client = new HttpClient();


var worker_Lat = 25.990;
var worker_Lng = 99.9990;
var connected_user_Lat = 0;
var connected_user_Lng = 0;


function getWorkerDataFromDatabase() {
    client.get('http://192.168.0.110:4444/admin/workers?_id=' + worker_id, function(response) {
        // do something with response
        var dbElement = JSON.parse(response);
        console.log(dbElement);
        var dbElementCount = dbElement.length;

        for (var i = 0; i < dbElementCount; i++) {
            worker_Lng = dbElement[i].Coordinate.y;
            worker_Lat = dbElement[i].Coordinate.x;

            // get connected user lat lng
            connected_user_Lat = dbElement[i].UserCoord.lat;
            connected_user_Lng = dbElement[i].UserCoord.lng;
        }

        // console.log('nahid');
        workerMarker(worker_Lat, worker_Lng);
        if (connected_user_Lat != 0 || connected_user_Lng != 0) {
            userMarker(connected_user_Lat, connected_user_Lng);
        }

        //console.log('connected user ' + connected_user_Lng);

    });
}

// get connected user

getWorkerDataFromDatabase();


function workerMarker(lat, lng) {

    //navigator.geolocation.getCurrentPosition(position => {

    //lng = position.coords.longitude;
    //lat = position.coords.latitude;

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

    // });

}

// connected user marker 

function userMarker(user_Lat, user_Lng) {

    // alert('please click on marker to get details of worker');
    var size = 150;

    var pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        onAdd: function() {
            var canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
        },

        render: function() {
            var duration = 1000;
            var t = (performance.now() % duration) / duration;

            var radius = size / 2 * 0.3;
            var outerRadius = size / 2 * 0.7 * t + radius;
            var context = this.context;

            // draw outer circle
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
            context.fillStyle = 'rgba(30, 139, 195,' + (1 - t) + ')';
            //rgba(30, 139, 195, 1)
            // rgba(31, 58, 147, 1)
            context.fill();

            // draw inner circle
            context.beginPath();
            context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
            context.fillStyle = 'rgba(31, 58, 147, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();

            // update this image's data with data from the canvas
            this.data = context.getImageData(0, 0, this.width, this.height).data;

            // keep the map repainting
            map.triggerRepaint();

            // return `true` to let the map know that the image was updated
            return true;
        }
    };


    map.on('load', function() {

        // getRoute(start);
        // navigator.geolocation.getCurrentPosition(position => {
        // lat = position.coords.latitude;
        // lng = position.coords.longitude;
        // console.log("lat " + lat);
        // console.log("lng " + lng);

        // call route function for ruting...
        //getRoute(start);

        map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

        map.addLayer({
            "id": "points",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [user_Lng, user_Lat]
                        }
                    }]
                }
            },
            "layout": {
                "icon-image": "pulsing-dot",
                "text-field": "User",
                "text-size": 20,
                "text-font": [
                    "Arial Unicode MS Bold"
                ],

            },
            "paint": {
                "text-color": "red",
            }
        });

        // });
    });


}

function goToRouteButton() {
    console.log("button clicked ");
}

// disply route button

var routeButton = document.getElementById("routeButton");

routeButton.innerHTML = '<button type="button" onClick= "goToRouteButton()" class = "btn btn-warning btn-small">Go to Route</button>';