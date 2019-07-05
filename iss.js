const request = require('request');


const fetchMyIP = function(callback) {
  let address;
  const url = "https://api.ipify.org?format=json";
  request(url, (err, response, data) => {
    if (!err) {
      address = JSON.parse(data);
    }
    callback(err, address.ip);
    //return;
  });
};


const fetchCoordsByIP = function(callback) {
  let location;
  //const url = "https://ipvigilante.com/${IP}";
  const url = "https://ipvigilante.com/162.245.144.188";
  request(url, (err, response, data) => {
    if (!err) {
      location = JSON.parse(data);
      location = {
        latitude: location.data.latitude,
        longitude: location.data.longitude,
      };
      //console.log(location.latitude, location.longitude);
    }
    callback(err, location);
    //return;
  });
};



/*
const returnIP = function(success) {
  if (typeof success.ip === "undefined") return console.log("Not valid IP address");
  // if(typeof success.ip === "string") console.log("yes");
  console.log(success.ip);
  //return;
};
*/

module.exports = { fetchMyIP, fetchCoordsByIP };

