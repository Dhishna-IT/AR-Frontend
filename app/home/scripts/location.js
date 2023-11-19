// Function to calculate distance between two points given their latitude and longitude
let locIndex1=0;

function calcDistance(lat1,lon1,lat2,lon2)
{
    console.log(lat1,lon1,lat2,lon2,"calc distance")
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;


    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));

    let r = 6371;
    distance = c*r;
    return distance
}

// Function to check if the user is near a location within a given threshold
function isUserNearLocation(userLatt, userLong, locationLatt, locationLong, threshold) {
    console.log(userLatt,userLong,"user location isnear")
  const distance = calcDistance(userLatt, userLong, locationLatt, locationLong);
  console.log(distance,"distance")
  return distance <= threshold;
}

// Fetch user's real-time location using Geolocation API
navigator.geolocation.getCurrentPosition(
  (position) => {
      let userLatt = position.coords.latitude;
      let userLong = position.coords.longitude;
      console.log(userLatt,userLong,"user location")

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
            // console.log(loc)
              const loc = locationData.locations;
              console.log(loc,"location from firebase")
              const user = userData.result;
              console.log(user.level,)

              // Function to continuously check user proximity
              function checkProximity() {
                  // Check if the user's level is below a certain threshold
                  if (user.level < locIndex1 + 1) {
                      const thresholdDistance = 10;
                      console.log("type",typeof(parseInt(loc[locIndex1].x1))) // Set your desired threshold distance

                      const isNearLocation = isUserNearLocation(
                          parseFloat(userLatt),
                          parseFloat(userLong),
                          parseFloat(loc[locIndex1].x1),
                          parseFloat(loc[locIndex1].x2),
                          thresholdDistance
                      );
                    console.log(isNearLocation,"islocation near")
                      if (isNearLocation) {
                          // Code to make the model visible
                          const newLatitude = loc[locIndex1] ? String(loc[locIndex1].x1) : '10.046942288501658';
                          const newLongitude = loc[locIndex1] ? String(loc[locIndex1].x2) : '76.33519972545754';
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
