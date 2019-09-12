
mapboxgl.accessToken = 'pk.eyJ1IjoibmFoaWQ1OTciLCJhIjoiY2p4ejZ5bHk1MDFiYzNubnRnbHZtb3JjMyJ9._66RgxKGbfjUgWDqwwl7Pw';


var map;
style = 'mapbox://styles/mapbox/streets-v10';

var p = 0;
var popup = [];
var marker = [];

var lng = 88.54;
var lat = 24.56;

var start = [lng, lat];

var success = 0;

// if we want to show arrival time without domain
//getRoute(start);

this.initializeMap();

var canvas = map.getCanvasContainer();

for (var i = 1; i <= 5; i++) {
  this.workerMarker(88.60580 + p, 24.366079199999998, i, 'nahid', 'Engineer', '01783272160');
  p += 0.01;
}

function initializeMap() {
  /// locate the user
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(lat);
      lat = position.coords.latitude;
      lng = position.coords.longitude;

      console.log(lat, lng);
      map.flyTo({
        center: [lng, lat]
      });
    });
  }
  else {
    alert("please turn on your location service...");
  }

  this.buildMap();

}

function buildMap() {
  map = new mapboxgl.Map({
    container: 'map',
    style: this.style,
    zoom: 13,
    center: [lng, lat]

  });

  //this.createMarker();
  // this.markerAnimation();
  this.userMarker();

  /// Add map controls
  map.addControl(new mapboxgl.NavigationControl());
}


// create a function to make a directions request
function getRoute(end) {
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  //console.log(end);
  var start = [lng, lat];
  var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

  // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
  var req = new XMLHttpRequest();
  req.responseType = 'json';
  req.open('GET', url, true);
  req.onload = function () {
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
    var steps = data.legs[0].steps;
    $("#instructions").hide();
    //$('#finishedWork').hide();
    var tripInstructions = [];
    for (var i = 0; i < steps.length; i++) {
      tripInstructions.push('<br><li>' + steps[i].maneuver.instruction) + '</li>';
      instructions.innerHTML = '<span class="duration">Arrival Time: ' + Math.floor(data.duration / 60) + ' min 🚴 </span>' 
      + '<button type="button" class="btn btn-danger btn-sm" onClick = "finishedWork()"> Finished Work</button>';
     
    }

    if (success) {
     // $('#closeButton').show();
      $('#instructions').show();
     // map.getSource('route').hide();

    }

   
    // success = 0;


  };
  req.send();

}

function finishedWork(){
 // console.log("close button");
 $("#instructions").hide();
 location.reload(true);
 
}



function userMarker() {

  alert('please click on marker to get details of worker');
  var size = 110;

  var pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    onAdd: function () {
      var canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext('2d');
    },

    render: function () {
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


  map.on('load', function () {

    // getRoute(start);
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
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
                "coordinates": [lng, lat]
              }
            }]
          }
        },
        "layout": {
          "icon-image": "pulsing-dot"
        }
      });

    });
  });


}

var popupCount = 0;

var worklng , worklat;

function workerMarker(lng, lat, id, name, category, phone) {

  // navigator.geolocation.watchPosition(position => {

  //   lng = position.coords.longitude;
  //   lat = position.coords.latitude;

    //console.log("w1: " + lng);
    //console.log("w2:" + lat);

    popup[id] = new mapboxgl.Popup({
      offset: 38,
      //closeOnClick: false,

    })
      // .setHTML()
      .setHTML(generatedHtmlelemnets(id, name, category, phone));

    this.marker[i] = new mapboxgl.Marker({
      color: 'red',
    })
      .setLngLat([lng, lat])
      .setPopup(popup[id])
      //.getLngLat()
      .addTo(map);

  //});

}




function generatedHtmlelemnets(id, name, category, phone) {

  // var LngLat = this.marker[id].getLngLat();
  // console.log(LngLat.lng);
  // console.log(LngLat.lat);
  var html = "";

  html += "<h3>" + name + "</h3>";
  html += "<h3>" + category + "</h3>";
  html += "<h4>" + '<a href="tel:' + phone + '">call to worker</a>' + "</h4>";
  // html += "<button type='button' onclick= 'confirmToWorker()'>This Button</button>"
  html += "<div>" + '<button type = "button" class = "btn btn-success" onClick = "confirmToWorker(' + id + ')"> confirm </button>' + "</div>"
  //console.log(html);

  return html;
}

function confirmToWorker(id) {
  // console.log(id);
  var lnglat = this.marker[id].getLngLat();
    // console.log(lnglat.lng);
    // console.log(lnglat.lat);
  //getRoute(lnglat.lng, lnglat.lat);

  var ln = lnglat.lng;
  var lt = lnglat.lat;
  var coords = [ln, lt];

  getRoute(coords);

  this.getInstractionsOfDrive();
  popup[id].remove();

  success = 1;

}


function getInstractionsOfDrive() {

}

function singleSelectChangeText() {
  //Getting Value


  var selObj = document.getElementById("singleSelectTextDDJS");
  var setValue = selObj.options[selObj.selectedIndex].value;
  console.log(setValue);


  //Setting Value
  // document.getElementById("textFieldTextJS").value = selValue;
}
