const request = require("request");

const fetchMyIP = function (callback) {
  const lookupUrl = "https://api.ipify.org?format=json";
  request(lookupUrl, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;

    callback(null, ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  const lookupUrl = `https://freegeoip.app/json/${ip}`;
  request(lookupUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(
        `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`,
        null
      );
      return;
    }

    const coords = {
      latitude: JSON.parse(body).latitude,
      longitude: JSON.parse(body).longitude,
    };

    callback(null, coords);
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  const lookupUrl = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(lookupUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(
        `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`,
        null
      );
      return;
    }
    const view = JSON.parse(body).response;

    callback(null, view);
  });
};
/////
const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.log("It did not work!", error);
        return;
      }

      fetchISSFlyOverTimes(coords, (error, nextPasses) => {
        if (error) {
          console.log("It didn't work!", error);
          return;
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation,
};
