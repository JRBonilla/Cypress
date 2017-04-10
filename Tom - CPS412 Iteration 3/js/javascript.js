var map;
var lat, lng;
var currentPosition;
var currentLat, currentLng;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 6
	});
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition( function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			currentPosition = pos;
			currentLat = position.coords.latitude;
			currentLng = position.coords.longitude;
			map.setCenter(pos);
			
			var infoWindow = new google.maps.InfoWindow({content: "You are here"});
			
			
		},
		function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	}
	else {
		handleLocationError(false, infoWindow, map.getCenter());
	}
	
	google.maps.event.addListener(map, "rightclick", function(event) {
		lat = event.latLng.lat();
		lng = event.latLng.lng();
		alert("Lat=" + lat + "; Lng=" + lng);
	});
}
/*
getting custom markers from google
   var pinColor = "FE7569";
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));
		
		    var marker = new google.maps.Marker({
                position: new google.maps.LatLng(0,0), 
                map: map,
                icon: pinImage,
                shadow: pinShadow
            });
https://support.google.com/fusiontables/answer/2679986
*/
function addMarker(Lat, Lng, title, color) {
	var pinColor = color;
	
	var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
		new google.maps.Size(21,34),
		new google.maps.Point(0,0),
		new google.maps.Point(10,34));
	
	var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
		new google.maps.Size(40,37),
		new google.maps.Point(0,0),
		new google.maps.Point(12,35));
	
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(Lat, Lng),
		map: map,
		icon: pinImage,
		shadow: pinShadow,
		animation: google.maps.Animation.DROP,
		title: title
	});
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
							'Error: The Geolocation service failed.' :
							'Error: Your browser doesn\'t support geolocation.');
}