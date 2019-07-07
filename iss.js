const request = require('request');


const fetchMyIP = function(callback) {
  let address;
  const url = "https://api.ipify.org?format=json";
  request(url, (err, response, data) => {
    if (!err) {
      address = JSON.parse(data);
      callback(err, address.ip);
    } else callback(err, null);
    //return;
  });
};

//ADD IN IP AS A ARGUMENT
const fetchCoordsByIP = function(IP, callback) {
  let location;
  const url = `https://ipvigilante.com/${IP}`;
  //const url = "https://ipvigilante.com/162.245.144.188";
  request(url, (err, response, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      location = JSON.parse(data);
      location = {
        latitude: location.data.latitude,
        longitude: location.data.longitude,
      };
      //console.log(response.statusCode);
      //console.log(location.latitude, location.longitude);
    }
    callback(err, location);
    //return;
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (err, response, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${response.body}`;
      callback(Error(msg), null);
      return;
    } else {
      const times = JSON.parse(data).response;
      callback(err, times);
    }
  });

};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) return callback(error);
    fetchCoordsByIP(ip, (error2, data) => {
      if (error2) return callback(error2);
      fetchISSFlyOverTimes(data, (error3, data2) => {
        if (error3) return callback(error3);
        callback(null, data2);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

//http://api.open-notify.org/iss-pass.json?lat=49.26200&lon=123.09230
//123.09230, 49.26200