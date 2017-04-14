var map;
var lat, lng;
var currentPosition;
var currentLat, currentLng;
var controlDiv, control;
var reportJSON;

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
		currentLat = lat;
		currentLng = lng;
		alert("Report location saved at Latitude = " + lat + "; Longitude = " + lng);
	});

	controlDiv = document.createElement('div');
	control = new createMapMenu(controlDiv, map);

	controlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);

	//Read the reports from the json file
	readReports(function(response) {
		reportJSON = JSON.parse(response);
		displayMarkers(reportJSON);
	});
}

function displayMarkers(reportJSON) {
	reportJSON.reports.forEach(function(entry) {
		var latJSON = entry.report[4].lat;
		var lngJSON = entry.report[5].lng;
		var description = entry.report[2].description;
		var probType = entry.report[1].probType;
		var reportStatus = entry.report[0].reportStatus;
		addMarker(latJSON, lngJSON, description, reportStatus);
	});
}

function saveReport() {
	var latJSON = currentLat;
	var lngJSON = currentLng;
	var description  = document.getElementById("description").value;
	var probType 	 = document.getElementById("type").value;
	var reportStatus = document.getElementById("status").value;
	if (reportStatus == "red") {
		reportStatus = "ba0303"; //Red
	}
	else if (reportStatus == "yellow") {
		reportStatus = "f1ff30"; //Yellow
	}
	else if (reportStatus == "orange") {
		reportStatus = "ff8930"; //orange
	}
	else {
		reportStatus = "00ba00"; //Green
	}
	var email = document.getElementById("email").value
	var newObj = {report: [{"reportStatus": reportStatus},{"probType": probType},{"description": description},{"email": email},{"lat": latJSON},{"lng": lngJSON}]};
	resetForm();
	reportJSON.reports.push(newObj);

	callPHP(reportJSON);
}

function closeForm() {
	document.getElementById('problemReport').style.display='none';
}

function callPHP(newObj) {
	var httpc = new XMLHttpRequest();
	var url = "js/fileWrite.php";
	var temp = "info=" + (JSON.stringify(newObj));
	httpc.open("POST", url, true);

	httpc.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	httpc.setRequestHeader("Content-Length", temp.length);

	httpc.onreadystatechange = function() {
		console.log("status="+httpc.status + "; readyState=" + httpc.readyState);
		if(httpc.readyState == 4 && httpc.status == 200) {
		}
	}
	httpc.send(temp);
	window.location.reload(true);
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
    controlUI.style.marginTop = '4px';
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

//Read the saved reports from the json file
//Taken from https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
function readReports(callback) {
	var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
	xobj.open('GET', 'js/reports.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
	xobj.send();
}
