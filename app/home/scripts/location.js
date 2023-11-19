// Function to calculate distance between two points given their latitude and longitude
let locIndex=0;

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Radius of Earth in meters
  const phi1 = lat1 * (Math.PI / 180);
  const phi2 = lat2 * (Math.PI / 180);
  const deltaPhi = (lat2 - lat1) * (Math.PI / 180);
  const deltaLambda = (lon2 - lon1) * (Math.PI / 180);

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
}

// Function to check if the user is near a location within a given threshold
function isUserNearLocation(userLatt, userLong, locationLatt, locationLong, threshold) {
  const distance = calculateDistance(userLatt, userLong, locationLatt, locationLong);
  return distance <= threshold;
}

// Fetch user's real-time location using Geolocation API
navigator.geolocation.getCurrentPosition(
  (position) => {
      let userLatt = position.coords.latitude;
      let userLong = position.coords.longitude;

      // Fetch location data
      const locationPromise = fetch('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/location')
          .then(response => response.json());

      // Fetch user data
      const uid = localStorage.getItem('uid');
      const userPromise = fetch(`https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/user/${uid}`)
          .then(response => response.json());

      // Wait for both promises to resolve
      Promise.all([locationPromise, userPromise])
          .then(([locationData, userData]) => {
              const loc = locationData.locations;
              const user = userData.result;

              // Function to continuously check user proximity
              function checkProximity() {
                  // Check if the user's level is below a certain threshold
                  if (user.level < locIndex + 1) {
                      const thresholdDistance = 10; // Set your desired threshold distance

                      const isNearLocation = isUserNearLocation(
                          userLatt,
                          userLong,
                          loc[locIndex].x1,
                          loc[locIndex].x2,
                          thresholdDistance
                      );

                      if (isNearLocation) {
                          // Code to make the model visible
                          const newLatitude = loc[locIndex] ? String(loc[locIndex].x1) : '10.046942288501658';
                          const newLongitude = loc[locIndex] ? String(loc[locIndex].x2) : '76.33519972545754';
                          const modelElement = document.getElementById('gltfModel');

                          if (modelElement) {
                              modelElement.setAttribute('gps-new-entity-place', `latitude: ${newLatitude}; longitude: ${newLongitude};`);
                            }
                            console.log("User is near the location ");

                      } else {
                          console.log("User is not near the location.");
                      }
                  } else {
                      console.log("User level is not below the required threshold.");
                  }

                  // Fetch the user's location again and continue checking
                  navigator.geolocation.getCurrentPosition(
                      (position) => {
                          userLatt = position.coords.latitude;
                          userLong = position.coords.longitude;
                          checkProximity();
                      },
                      (error) => {
                          console.error('Error getting user location:', error);

                          // Retry after an error with a short delay (adjust as needed)
                          setTimeout(() => {
                              checkProximity();
                          }, 1000); // Retry after 1 second
                      }
                  );
              }

              // Start the continuous proximity check
              checkProximity();
          })
          .catch(error => console.error('Error fetching data:', error));
  },
  (error) => {
      console.error('Error getting user location:', error);
  }
);
