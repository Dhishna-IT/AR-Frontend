let locIndex = 0;
let locations = [];

// Function to calculate distance between two points given their latitude and longitude
function calcDistance(lat1, lon1, lat2, lon2) {
  lon1 = lon1 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;
  lat1 = lat1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;

  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
  let c = 2 * Math.asin(Math.sqrt(a));
  let r = 6371;
  return c * r;
}

// Function to check if the user is near a location within a given threshold
function isUserNearLocation(userLatt, userLong, locationLatt, locationLong, threshold) {
  const distance = calcDistance(userLatt, userLong, locationLatt, locationLong);
  return distance <= threshold;
}

// Function to handle location updates
function handleLocationUpdate(position) {
  const userLatt = position.coords.latitude;
  const userLong = position.coords.longitude;

  if (locIndex !== -1) {
    const thresholdDistance = 10; // Set your desired threshold distance
    const isNearLocation = isUserNearLocation(
      userLatt,
      userLong,
      parseFloat(locations[locIndex].x1),
      parseFloat(locations[locIndex].x2),
      thresholdDistance
    );

    if (isNearLocation) {
      const newLatitude = locations[locIndex].x1;
      const newLongitude = locations[locIndex].x2;
      const modelElement = document.getElementById('gltfModel');

      if (modelElement) {
        modelElement.setAttribute('gps-new-entity-place', `latitude: ${newLatitude}; longitude: ${newLongitude};`);
      }
      console.log("User is near the location ");
    } else {
      console.log("User is not near the location.");
    }
  } else {
    console.log("No more locations to check.");
  }
}

// Function to handle location errors
function handleLocationError(error) {
  console.error('Error getting user location:', error);
}

// Fetch location data from the API
fetch('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/location')
  .then(response => response.json())
  .then(locationData => {
    locations = locationData.locations; // Assuming the API response contains locations data
    console.log(locations, "Location data from the API");

    navigator.geolocation.watchPosition(
      handleLocationUpdate,
      handleLocationError,
      {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 2000
      }
    );
  })
  .catch(error => {
    console.error('Error fetching location data:', error);
  });
