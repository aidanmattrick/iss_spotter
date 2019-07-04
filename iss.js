const request = require('request');

const fetchMyIP = function(callback) {
  const url = "https://api.ipify.org?format=json";
  let address;
  request(url, (err, response, data) => {
    if (!err) {
      address = JSON.parse(data);
    }
    callback(err, address.ip);
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

module.exports = fetchMyIP;

//module.exports = { fetchMyIP, returnIP };
