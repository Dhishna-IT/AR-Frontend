const map = L.map("map");
// Initializes map
map.setView([10.04846, 76.33125], 18);
// Sets initial coordinates and zoom level
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
// Sets map data source and associates with map
let marker, circle, zoomed;
const options = {
  enableHighAccuracy: true,
  maximumAge: 2000, // Force a fresh location
  timeout: 5000, // Maximum time to wait for a location
};
navigator.geolocation.watchPosition(success, error, options);
function success(pos) {
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;
  const accuracy = pos.coords.accuracy;
  if (marker) {
    map.removeLayer(marker);
    map.removeLayer(circle);
  }
  // Removes any existing marker and circle (new ones about to be set)
  marker = L.marker([lat, lng]).addTo(map);
  circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);
  // Adds marker to the map and a circle for accuracy
  if (!zoomed) {
    zoomed = map.fitBounds(circle.getBounds());
  }
  // Set zoom to boundaries of accuracy circle
  map.setView([lat, lng]);
  // Set map focus to current user position
}
function error(err) {
  if (err.code === 1) {
    alert(
      "Please allow geolocation(GPS) access in your mobile device manually"
    );
  } else {
    alert("Cannot get current location");
  }
}
