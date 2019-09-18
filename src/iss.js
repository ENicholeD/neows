// Neows
export class Neows {
  getNeows(startDate) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&detailed=true&api_key=${process.env.API_KEY}`;
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
// coordinates
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
// sentery
export class Sentry {
  getSentryData() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url2 = `https://api.nasa.gov/neo/rest/v1/neo/sentry?is_active=true&page=0&size=10&api_key=${process.env.API_KEY}`;
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
// Geocoding
export class Geocoding {
  getLocation(lat, lng) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url2 = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.API_KEY_ISS}&latlng=${lat}, ${lng}`;
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
export class MarsWeather {
  weather() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nasa.gov/insight_weather/?api_key=${process.env.API_KEY}&feedtype=json&ver=1.0`;
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
// roverImage
export class RoverImage {
  photo() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.API_KEY}&camera=MAST`;
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
//hubble
export class Hubble {
  getLatest() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://cors-anywhere.herokuapp.com/http://hubblesite.org//api/v3/news_release/last`;
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
export class HubbleArchive {
  getArchive() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://cors-anywhere.herokuapp.com/http://hubblesite.org/api/v3/news`;
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
//DONKI
export class Donki {
  weatherDonki(type) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nasa.gov/DONKI/notifications?startDate=&endDate=&type=${type}&api_key=${process.env.API_KEY}`;
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
export class Apod {
  day() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`;
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
