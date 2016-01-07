// Google Maps
$.ajax({
  url: 'http://localhost:3000/getKey'
}).done(function(data) {
  key = data; 
})


function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 44.565594, lng: -71.561004},
    disableDefaultUI: true,
    zoomControl: true,
    scrollwheel: false
  });
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('right-panel'));
  
  var control = document.getElementById('floating-panel');
  control.style.display = 'block';
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
  var icon = './images/church.png'
  var churchMarker = new google.maps.Marker({
    position: {lat: 44.565594, lng: -71.561004},
    map: map,
    icon: icon
  })
  var markers = [];

  var onChangeHandler = function() {
    if (markers[0]) {
      markers[0].setMap(null);
      markers.pop();
    }
    calculateAndDisplayRoute(directionsService, directionsDisplay, map, markers);
  };
  document.getElementById('start').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, map, markers) {
  var start = $('#start').val();
  var end = "13 Courthouse Dr, guildhall, vt";
  directionsService.route({
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      markers.push(new google.maps.Marker({
        position: {lat: response.routes[0].legs[0].start_location.lat(), lng: response.routes[0].legs[0].start_location.lng()},
        map: map,
        icon: './images/plane.png'
      }))
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}