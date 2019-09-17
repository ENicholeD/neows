export class Coordinates {
  getCoordinates() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.wheretheiss.at/v1/satellites/25544`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}


export class Geocoding {
  getLocation(lat, lng) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url2 = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.API_KEY}&latlng=${lat}, ${lng}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url2, true);
      request.send();
    });
  }
}
