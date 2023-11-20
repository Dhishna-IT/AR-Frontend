let locations = []; 
let setModel = false 
// let user;
let locIndex1 =0 ;
// let user 

console.log("the user id is",localStorage.getItem("uid"))



// Function to calculate distance between two points given their latitude and longitude
function calcDistance(lat1, lon1, lat2, lon2) {
// console.log(typeof(lat1),typeof(lon1),typeof(lat2),typeof(lon2))
  lon1 = lon1 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;
  lat1 = lat1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;

  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
  let c = 2 * Math.asin(Math.sqrt(a));
  let r = 6371;
  return c * r * 1000;
}

// Function to check if the user is near a location within a given threshold
function isUserNearLocation(userLatt, userLong, locationLatt, locationLong, threshold) {
    // console.log("the user location s dnfkjndsbkfeb",typeof(userLatt),userLong);
  const distance = calcDistance(userLatt, userLong, locationLatt, locationLong);
  console.log("the distance",distance)
  return distance <= threshold;
}

// Function to handle location updates
function handleLocationUpdate(position) {

  const userLatt = position.coords.latitude;
  const userLong = position.coords.longitude
//   console.log("the user location",userLatt,userLong);

  if (locIndex1 !== -1) {
    const thresholdDistance = 1000; // Set your desired threshold distance
    const isNearLocation = isUserNearLocation(
      userLatt,
      userLong,
      parseFloat(locations[locIndex1].x1),
      parseFloat(locations[locIndex1].x2),
      thresholdDistance
    );

    // console.log(typeof(locations[locIndex1].x1),typeof(locations[locIndex1].x2),"tpyeee emf lsngjkn ")

    if (isNearLocation) {
      const newLatitude = parseFloat(locations[locIndex1].x1);
      const newLongitude = parseFloat(locations[locIndex1].x2);
      console.log("the new location",newLatitude,newLongitude)
      const modelElement = document.getElementById('gltfModel');
    
    if(!setModel){
        if (modelElement) {
          modelElement.setAttribute('gps-new-entity-place', `latitude: ${newLatitude}; longitude: ${newLongitude};`);
          console.log("the model is set");
          setModel = true;
        }
    }
      console.log("User is near the location ");
    } else {
      console.log("User is not near the location.");
      const modelElement = document.getElementById('gltfModel');
      if (modelElement) {
        modelElement.setAttribute('gps-new-entity-place', `null`);
        console.log("the model is removed set");
      }

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
