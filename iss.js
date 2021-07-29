const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
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
    // if (response.statusCode !== 200) {
    //   const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    //   callback(Error(msg), null);
    //   return;
    // }
    if (response.statusCode !== 200) {
      callback(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`, null);
      return;
    }

    const coords = {
      latitude: JSON.parse(body).latitude,
      longitude: JSON.parse(body).longitude,
    };

    callback(null, coords);
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
};
