//const request = require('request');
const { nextISSTimesForMyLocation }  = require('./iss');
const moment = require('moment');
//moment().format();

/*
fetchMyIP((error, ip) => {
  if (error) return console.log("It didn't work!" , error);
  else console.log('It worked! Returned IP:' , ip);
});
*/


/*
fetchCoordsByIP((error, data) => {
  if (error) console.log(`${error}`);
  else (data) console.log(`${data.longitude}, ${data.latitude}`);
});
*/

/*
fetchISSFlyOverTimes({longitude: 123.09230, latitude: 49.26200}, (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});
*/


/*

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
*/



nextISSTimesForMyLocation((err, data) => {
  if (err) {
    console.log(err);
  } else {
    data.forEach(element => {
      console.log(`Next pass at ${moment.unix(element.risetime)} for ${element.duration} seconds.`)
    });
  }
});
