const moment = require('moment');
const { fetchMyIP, fetchCoordsByIP, ip, fetchISSFlyOverTimes }  = require('./issPromises');

// const nextISSTimesForMyLocation = (callback) => {
//   fetchMyIP((error, ip) => {
//     if (error) return callback(error);
//     fetchCoordsByIP(ip, (error2, data) => {
//       if (error2) return callback(error2);
//       fetchISSFlyOverTimes(data, (error3, data2) => {
//         if (error3) return callback(error3);
//         callback(null, data2);
//       });
//     });
//   });

// };


// const nextStep = (ip) => {
//   return fetchCoordsByIP(ip);
// };

// const nextStep2 = (ip) => {
//   return nextStep(ip);
// }

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP()
    .then(ip => fetchCoordsByIP(ip))
    .then(coords =>  fetchISSFlyOverTimes(coords))
    .then(result => callback(null, result))
    .catch(err => callback(err));

};

nextISSTimesForMyLocation((err, data) => {
  if (err) {
    console.log(err);
  } else {
    data.forEach(element => {
      console.log(`Next pass at ${moment.unix(element.risetime)} for ${element.duration} seconds.`);
    });
  }
});

