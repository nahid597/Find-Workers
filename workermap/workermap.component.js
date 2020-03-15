mapboxgl.accessToken = 'pk.eyJ1IjoibmFoaWQ1OTciLCJhIjoiY2syMzQwZThqMHNnODNnbnIwZTYxbXptciJ9.pCJVXu5d-k1CDRZ9qJsFJQ';

style = 'mapbox://styles/mapbox/streets-v10';

var map;
var marker;
var lng = 88.54;
var lat = 24.56;

var dbElementsCount = 0;
var putUrl = 'http://127.0.0.1:4444/admin/workers/update';

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

// update data in database after 10 second continuous

function updateDataInDatabaseAfterTenSecond() {

    navigator.geolocation.getCurrentPosition(response => {

        var workerlat = response.coords.latitude;
        var workerlng = response.coords.longitude;

        console.log("update data " + workerlat);
        console.log("update data " + workerlng);
        var sendData = {
            Coordinate: {
                x: workerlat,
                y: workerlng
            },
            _id: worker_id
        };

        var jsonSendData = JSON.stringify(sendData);

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", putUrl, true);
        xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
        xhr.onload = function() {
            var users = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.table(users);
            } else {
                console.error(users);
            }
        };
        xhr.send(jsonSendData);
    });


}

setInterval(() => {
    updateDataInDatabaseAfterTenSecond();
}, 10 * 1000);


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


var worker_Lat = 25.60;
var worker_Lng = 89.14;
var connected_user_Lat = 25.56;
var connected_user_Lng = 89.62;

var star = [];


function getWorkerDataFromDatabase() {

    if (worker_id) {
        client.get('http://127.0.0.1:4444/admin/workers?_id=' + worker_id, function(response) {
            // do something with response
            var dbElement = JSON.parse(response);
            console.log(dbElement);
            var dbElementCount = dbElement.length;

            console.log(dbElementCount);

            if (dbElementCount > 0) {

                // disply route button
                var routeButton = document.getElementById("routeButton");
                routeButton.innerHTML = '<button type="button" onClick= "goToRouteButton()" class = "btn btn-warning btn-small">Go to Route</button>';

                for (var i = 0; i < dbElementCount; i++) {
                    worker_Lng = dbElement[i].Coordinate.y;
                    worker_Lat = dbElement[i].Coordinate.x;



                    // get connected user lat lng
                    connected_user_Lat = dbElement[i].userCoordinate.lat;
                    connected_user_Lng = dbElement[i].userCoordinate.lng;
                }

                start = [connected_user_Lng, connected_user_Lat];

                // console.log('nahid');
                console.log("connect user lat" + connected_user_Lat);
                workerMarker(worker_Lat, worker_Lng);
                animateMarker(worker_id);

                if (connected_user_Lat != 0 || connected_user_Lng != 0) {
                    userMarker(connected_user_Lat, connected_user_Lng);
                }

            }



            //console.log('connected user ' + connected_user_Lng);

        });
    }

}

// get connected user

getWorkerDataFromDatabase();


function workerMarker(lat, lng) {

    //navigator.geolocation.getCurrentPosition(position => {

    //lng = position.coords.longitude;
    //lat = position.coords.latitude;

    console.log("w1: " + lng);
    console.log("w2:" + lat);

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
        getRoute(start);

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
    document.getElementById("routeButton").style.visibility = 'hidden';
    document.getElementById("instructions").style.visibility = 'visible';

    console.log("worker lat for route " + worker_Lat);
    console.log("worker lat for route " + worker_Lng);

    var coords = [worker_Lng, worker_Lat];

    // call route function

    getRoute(coords);

}


function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    //console.log("end data" + end);

    // here we need data from user database
    console.log('connect user lat ' + connected_user_Lat);
    console.log('connect user lng ' + connected_user_Lng);
    console.log('end  lat ' + end[0]);
    console.log('end lng ' + end[1]);


    var start = [connected_user_Lng, connected_user_Lat];

    // console.log("start data" + start);
    var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

    // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', url, true);
    req.onload = function() {
        var data = req.response.routes[0];
        var route = data.geometry.coordinates;
        //console.log(route);
        var geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: route
            }
        };
        // if the route already exists on the map, reset it using setData



        if (map.getSource('route')) {
            map.getSource('route').setData(geojson);
        } else { // otherwise, make a new request
            map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: geojson
                        }
                    }
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#0000FF',
                    'line-width': 10,
                    'line-opacity': 0.85
                }
            });
        }
        // add turn instructions here at the end
        // get the sidebar and add the instructions

        var instructions = document.getElementById('instructions');
        //var finishedWork = document.getElementById('finishedWork');
        // var ratingPopup = document.getElementById("ratingPopup");
        var steps = data.legs[0].steps;
        //$("#instructions").hide();
        //$("#ratingPopup").hide();
        //$('#finishedWork').hide();
        var tripInstructions = [];
        for (var i = 0; i < steps.length; i++) {
            tripInstructions.push('<br><li>' + steps[i].maneuver.instruction) + '</li>';
            instructions.innerHTML = '<span class="duration">Arrival Time: ' + Math.floor((data.duration / 60) / 60) + ' hour ' + Math.floor((data.duration / 60) % 60) + ' min 🚴 </span>' +
                '<button type="button" style = "margin:5px" class="btn btn-primary btn-sm" onClick = "successfulWork()"> Successful Work</button>';

        }

        // if (success) {
        //     // $('#closeButton').show();
        //     document.getElementById("instructions").style.visibility = 'visible';
        //     //$('#instructions').show();
        //     // map.getSource('route').hide();

        // }


        // success = 0;

        // ratingPopup.innerHTML = '<h4 style = "color : #000099; font-weight: bold"> please give rating to worker: </h4>' +
        //     '<span class="fa fa-star checked1" id= "1" onClick = "starmark(' + 1 + ')" style = "font-size:30px; cursor: pointer "></span>' +
        //     '<span class="fa fa-star checked1" id= "2" onClick = "starmark(' + 2 + ')" style = "font-size:30px; cursor: pointer "></span>' +
        //     '<span class="fa fa-star checked1" id= "3" onClick = "starmark(' + 3 + ')" style = "font-size:30px; cursor: pointer "></span>' +
        //     '<span class="fa fa-star checked1" id= "4" onClick = "starmark(' + 4 + ')" style = "font-size:30px; cursor: pointer "></span>' +
        //     '<span class="fa fa-star checked1" id= "5" onClick = "starmark(' + 5 + ')" style = "font-size:30px; cursor: pointer "></span>';

        // ratingPopup.innerHTML += '<div>' + '<button style = "margin:5px" class = "btn btn-primary" onClick = "submitStars()"> submit </button>' + '</div>';

    };

    req.send();

}

function successfulWork() {
    marker.remove();
    location.href = "http://127.0.0.1:4200/profile";
}


function animateMarker(id) {
    var radius = 10;

    // lng1 += 0.34,
    //     lat1 += 0.43

    // console.log("animate lng " + lng1);
    // console.log("animate lat " + lat1);

    // Update the data to a new position based on the animation timestamp. The
    // divisor in the expression `timestamp / 1000` controls the animation speed.
    // this.marker[id].setLngLat([
    //     lng1,
    //     lat1
    // ]);

    //console.log("animate id " + id);

    // console.log("animate " + this.lng1);
    // console.log(this.lng1);

    // show data from database

    if (id) {
        this.client.get('http://127.0.0.1:4444/admin/workers?_id=' + id, function(response) {
            // do something with response
            var dbElement = JSON.parse(response);
            //console.log(store[1].Coordinate.x);
            var dbElementCount = dbElement.length;

            var lng;
            var lat;

            for (var i = 0; i < dbElementCount; i++) {
                lng = dbElement[i].Coordinate.y;
                lat = dbElement[i].Coordinate.x;

                console.log("animate lng " + lng);
                console.log("animate lat " + lat);

                this.marker.setLngLat([
                    lng,
                    lat
                ]);
            }

        });

    }


    // Ensure it's added to the map. This is safe to call if it's already added.
    // this.marker[id].addTo(map);

    setTimeout(() => {
        // Request the next frame of the animation.
        requestAnimationFrame(function() {
            if (typeof marker != 'undefined')
                animateMarker(id);
        });
    }, 10 * 1000);


}