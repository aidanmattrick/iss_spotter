//const request = require('request');
//const { fetchMyIP, returnIP }  = require('./iss');
const fetchMyIP  = require('./iss');

fetchMyIP((error, ip) => {
  if (error) return console.log("It didn't work!" , error);
  console.log('It worked! Returned IP:' , ip);
});