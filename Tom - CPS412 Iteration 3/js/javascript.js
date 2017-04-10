var map;
var lat, lng;
var currentPosition;
var currentLat, currentLng;
var controlDiv, control;

var popupReport = document.getElementById('reportPopup');
var span = document.getElementsByClassName("close")[0];

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
		alert("Report location saved at Lat=" + lat + "; Lng=" + lng);
	});
	
	controlDiv = document.createElement('div');
	control = new createMapMenu(controlDiv, map);
	
	controlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
	
	//Test markers
	var temp = addMarker(43.504736854976954, -79.969482421875, "test1", "40454f");
	addMarker(43.71950494269107, -79.365234375, "test2", "0047ba");
	addMarker(43.824619821317356, -79.1070556640625, "test3", "ba0303");
	//Change first marker from grey to red
	setMarkerColor(temp, "ba0303");
	
}

function createMapMenu(controlDiv, map) {
	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
	console.log(controlDiv);
    controlDiv.appendChild(controlUI);
	
	// Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Save Report';
    controlUI.appendChild(controlText);
	
	controlUI.addEventListener('click', function() {
		if(lat != null && lng != null) {
			//div_show();
			alert("Stored new report");
			popupReport.style.display = "block";
		}
		else {
			alert("Please right click on the map to set location of report");
		}
	});
}

span.onclick = function() {
	popupReport.style.display = "none";
}

window.onclick = function(event) {
	if(event.target == popupReport) {
		popupReport.style.display = "none";
	}
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
	var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color,
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
	
	return marker;
}

function setMarkerColor(marker, color) {
	var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color,
		new google.maps.Size(21,34),
		new google.maps.Point(0,0),
		new google.maps.Point(10,34));
	
	marker.setIcon(pinImage);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
							'Error: The Geolocation service failed.' :
							'Error: Your browser doesn\'t support geolocation.');
}

function div_show() {
	document.getElementById('reportPopup').style.display = "block";
}

function div_hide() {
	document.getElementById('reportPopup').style.display = "none";
}