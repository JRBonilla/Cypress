var map;
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
	
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
							'Error: The Geolocation service failed.' :
							'Error: Your browser doesn\'t support geolocation.');
}