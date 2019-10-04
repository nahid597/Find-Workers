
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


// read data from database

var HttpClient = function () 
{
  this.get = function (aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function () {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
        aCallback(anHttpRequest.responseText);
    };

    anHttpRequest.open("GET", aUrl, true);
    anHttpRequest.send(null);
  };
};

// var data = httpGet('http://localhost:4487/admin/workers');
// console.log(data);

var dbElementsCount = 0;
var storeDbElements;

var client = new HttpClient();
client.get('http://localhost:4487/admin/workers?Active_status=true', function (response) {
  // do something with response
  this.storeDbElements = JSON.parse(response);
  console.log(storeDbElements);
  //console.log(store[1].Coordinate.x);
  this.dbElementsCount = this.storeDbElements.length;
  //console.log(this.dbElementsCount);

  this.showMarkersFromDatabase(this.dbElementsCount);

  // call workersmarkers

  //  for(var id1 = 1; id1 <= 5; id1++)
  //  {
  //   this.workerMarker(88.60580 + p, 24.366079199999998, id1, 'nahid', 'Engineer', '01783272160');
  //   p += 0.01;
  //  }
});

function showMarkersFromDatabase(numbers) {
  console.log("wrker: " + numbers);

  for (var i = 0; i < numbers; i++) {
    //if(this.storeDbElements[i].Active_status)
    this.workerMarker(this.storeDbElements[i].Coordinate.y, this.storeDbElements[i].Coordinate.x, this.storeDbElements[i]._id, this.storeDbElements[i].Name, this.storeDbElements[i].Catagory, this.storeDbElements[i].Rating.rating, this.storeDbElements[i].Phone);
  }
}


var canvas = map.getCanvasContainer();

// for (var i = 1; i <= this.dbElementsCount; i++) {
//   this.workerMarker(88.60580 + p, 24.366079199999998, i, 'nahid', 'Engineer', '01783272160');
//   p += 0.01;
// }

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
    zoom: 10,
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
    var ratingPopup = document.getElementById("ratingPopup");
    var steps = data.legs[0].steps;
    //$("#instructions").hide();
    //$("#ratingPopup").hide();
    //$('#finishedWork').hide();
    var tripInstructions = [];
    for (var i = 0; i < steps.length; i++) {
      tripInstructions.push('<br><li>' + steps[i].maneuver.instruction) + '</li>';
      instructions.innerHTML = '<span class="duration">Arrival Time: ' + Math.floor(data.duration / 60) + ' min 🚴 </span>'
        + '<button type="button" style = "margin:5px" class="btn btn-primary btn-sm" onClick = "finishedWork()"> Finished Work</button>';

    }

    if (success) {
      // $('#closeButton').show();
      document.getElementById("instructions").style.visibility = 'visible';
      //$('#instructions').show();
      // map.getSource('route').hide();

    }


    // success = 0;

    ratingPopup.innerHTML = '<h4 style = "color : #000099; font-weight: bold"> please give rating to worker: </h4>'
      + '<span class="fa fa-star checked1" id= "1" onClick = "starmark(' + 1 + ')" style = "font-size:30px; cursor: pointer "></span>'
      + '<span class="fa fa-star checked1" id= "2" onClick = "starmark(' + 2 + ')" style = "font-size:30px; cursor: pointer "></span>'
      + '<span class="fa fa-star checked1" id= "3" onClick = "starmark(' + 3 + ')" style = "font-size:30px; cursor: pointer "></span>'
      + '<span class="fa fa-star checked1" id= "4" onClick = "starmark(' + 4 + ')" style = "font-size:30px; cursor: pointer "></span>'
      + '<span class="fa fa-star checked1" id= "5" onClick = "starmark(' + 5 + ')" style = "font-size:30px; cursor: pointer "></span>';

    ratingPopup.innerHTML += '<div>' + '<button style = "margin:5px" class = "btn btn-primary" onClick = "submitStars()"> submit </button>' + '</div>';

  };
  req.send();

}

// rating count
var rating = 0;
var storeIdofRating = 0;

function starmark(item) {
  var count = item;
  rating = count;
  //console.log(item);
  //  var subid = item.id.substring(0,1);
  //console.log(subid);
  for (var i = 0; i < 5; i++) {
    if (i < count) {
      document.getElementById((i + 1)).style.color = "red";
    }
    else {
      document.getElementById((i + 1)).style.color = "black";
    }
  }
}


// sumbit rating bar 

function submitStars() {

  //  console.log("rating id: "+this.storeIdofRating);
  //  console.log("rating: " + rating);

   var putUrl = 'http://localhost:4487/admin/workers';

   var dbrating =  this.storeDbElements[this.storeIdOfRatingWorker].Rating.rating;
   var dbRatingCount = this.storeDbElements[this.storeIdOfRatingWorker].Rating.count;
  //  console.log(dbrating);
  //  console.log(dbRatingCount);

   dbrating = dbrating * dbRatingCount;
   
   if(rating != 0)
      dbRatingCount ++;
      
   dbrating = (dbrating + rating)/dbRatingCount;
  //  console.log(dbrating);
  //  console.log(dbRatingCount);

   var sendData = {
     Rating: {
       rating: dbrating,
       count: dbRatingCount
     },
     _id: this.storeIdofRating

   };

  //  sendData.Rating.rating = dbrating;
  //  sendData.Rating.count = dbRatingCount;
  //  sendData._id = this.storeIdofRating;

   var jsonSendData = JSON.stringify(sendData);

   var xhr = new XMLHttpRequest();

   xhr.open("PUT", putUrl, true);
   xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
   
   xhr.onload = function () {
    var users = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "200") {
      console.table(users);
    } else {
      console.error(users);
    }
  };
  xhr.send(jsonSendData);
    
   // reload current page

   location.reload(true);
}


function finishedWork() {
  // console.log("close button");
  $("#instructions").hide();

    var popup = document.getElementById("ratingPopup");

    popup.style.visibility = 'visible';
  //popup.style.display = 'block';
  //$("#ratingPopup").show();

  //popup.innerHTML = '<div>'+ "please give rating to worker "+'</div>';

  //location.reload(true);

}



function userMarker() {

  // alert('please click on marker to get details of worker');
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

var worklng, worklat;



function workerMarker(lng, lat, id, name, category, rating, phone) {

  // navigator.geolocation.watchPosition(position => {

  //   lng = position.coords.longitude;
  //   lat = position.coords.latitude;

  //console.log("w1: " + lng);
  //console.log("w2:" + lat);

  var el = document.createElement('div');
  var male = document.createElement('i');
  male.className = 'fa fa-male';
  male.style = "font-size:45px";
  el.appendChild(male);
  console.log("nahid");

  //var maleSymbol = document.getElementById("maleSymbol");

  popup[id] = new mapboxgl.Popup({
    offset: 38,
    //closeOnClick: false,

  })
    // .setHTML()
    .setHTML(generatedHtmlelemnets(id, name, category, rating, phone));
  //console.log("id:" + id);
  this.marker[id] = new mapboxgl.Marker(el)
    .setLngLat([lng, lat])
    .setPopup(popup[id])
    //.getLngLat()
    .addTo(map);

  //});

}




function generatedHtmlelemnets(id, name, category, rating, phone) {

  //console.log(typeof (id));
  // var LngLat = this.marker[id].getLngLat();
  // console.log(LngLat.lng);
  // console.log(LngLat.lat);

  console.log(category);

  var storeCategory = "";

  if(category === '0')
     storeCategory = "কারেন্টের মিস্ত্রি";
  else if(category === '1')
      storeCategory = "গাড়ির মিস্ত্রি";
  else if(category === '2')
      storeCategory = "গ্যাসের চুলার মিস্ত্রি";
  else if(category === '3')
      storeCategory = "পানির লাইনের মিস্ত্রিরি";

  var html = "";

  html += "<h5 style = 'color: green'>" + "Name: " + name + "</h5>";
  html += "<h6 style = 'color: green'>" + "Category: " + storeCategory + "</h6>";
  html += "<h6  style = 'color: red'>" + "<span class='fa fa-star checked' style = 'font-size:20px'></span>" + " : " + rating.toFixed(1) + " / 5" + " </h6>";
  html += "<h4>" + '<a href="tel:' + phone + '">call to worker</a>' + "</h4>";
  // html += "<button type='button' onclick= 'confirmToWorker()'>This Button</button>"
  html += "<div>" + '<button type = "button" class = "btn btn-success" onClick = "confirmToWorker(\'' + id + '\')"> confirm </button>' + "</div>"
  //console.log(html);

  return html;
}

var storeIdOfRatingWorker ;

function confirmToWorker(id1) {
 // console.log(this.storeDbElements[id1].Rating.rating);
  //console.log(id1);
  //console.log(typeof (id1));

  //console.log(this.dbElementsCount);

  var numberOfDbElements = this.dbElementsCount; 


  for(var i = 0; i < numberOfDbElements; i++ )
  {
     if(id1 === this.storeDbElements[i]._id)
     {
        this.storeIdOfRatingWorker = i;
        break;
     }

  }
  
  // id store for rating work
  this.storeIdofRating = id1;

  var lnglat = this.marker[id1].getLngLat();
  // console.log(lnglat.lng);
  // console.log(lnglat.lat);
  //getRoute(lnglat.lng, lnglat.lat);

  var ln = lnglat.lng;
  var lt = lnglat.lat;
  var coords = [ln, lt];

  getRoute(coords);

  this.getInstractionsOfDrive();
  popup[id1].remove();

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
