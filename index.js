const { fetchMyIP, fetchCoordsByIP } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });
const ip = '174.116.44.184';

fetchCoordsByIP(ip, (error, data) => {
  if (error){

    console.log('It did not work!', error);
    return;
  }

  console.log('Returned coords: ', data)

});