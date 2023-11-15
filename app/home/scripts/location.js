let loc;
let locIndex=0;
let user;
let x;
let y;
const uid = localStorage.getItem('uid')

const locationPromise = fetch('http://localhost:5000/api/v1/location')
.then(response => response.json())
.then(data => {
    loc = data.locations;
    data.locations.forEach(item => {
    console.log(item, "itemmmm");
    });
    console.log("location", loc);
})
.catch(error => console.error('Error fetching location:', error));

  // Fetch user data
const userPromise = fetch(`http://localhost:5000/api/v1/user/${uid}`)
.then(response => response.json())
.then(data => {
    user = data.result;
    console.log(user, "user");
})
.catch(error => console.error('Error fetching user:', error));

  // Wait for both promises to resolve
Promise.all([locationPromise, userPromise])
.then(() => {
    // Now both fetch requests have completed
    console.log("user level:", user.level);
    if(user.level < locIndex +1)
    {
        x = loc[locIndex].x1
        y = loc[locIndex].x2
        console.log("x y", x, y)
    }
})
.catch(error => console.error('Error:', error));