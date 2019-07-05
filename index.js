//const request = require('request');
const { fetchMyIP, fetchCoordsByIP, ip }  = require('./iss');

fetchMyIP((error, ip) => {
  if (error) return console.log("It didn't work!" , error);
  console.log('It worked! Returned IP:' , ip);
});


fetchCoordsByIP((error, data) => {
  if (error) console.log(`${error}`);
  if (data) console.log(`${data.longitude}, ${data.latitude}`);
});
