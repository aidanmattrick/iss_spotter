const request = require('request');


const fetchMyIP = function() {
  return new Promise((resolve, reject) => {
    let address;
    const url = "https://api.ipify.org?format=json";
    request(url, (err, response, data) => {
      if (err) return reject(err);
      address = JSON.parse(data);
      resolve(address.ip);
    });
  });
};

//ADD IN IP AS A ARGUMENT
const fetchCoordsByIP = function(ip) {
  return new Promise((resolve, reject) => {
    let location;
    //const url = "https://ipvigilante.com/${IP}";
    const url = "https://ipvigilante.com/162.245.144.188";
    request(url, (err, response, data) => {
      if (err) return reject(err);
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
        reject(Error(msg), null);
      }
      
      location = JSON.parse(data);
      location = {
        latitude: location.data.latitude,
        longitude: location.data.longitude,
      };
      //console.log(response.statusCode);
      //console.log(location.latitude, location.longitude);
      resolve(location);
      //return;
    });
  });
};

const fetchISSFlyOverTimes = function(coords) {
  return new Promise((resolve, reject) => {
    const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
    request(url, (err, response, data) => {
      if (err) return reject(err);
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
        return reject(Error(msg));
      }
      resolve(JSON.parse(data).response);
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

//http://api.open-notify.org/iss-pass.json?lat=49.26200&lon=123.09230
//123.09230, 49.26200