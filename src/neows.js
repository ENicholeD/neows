export class Neows {
  getNeows(startDate) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&detailed=true&api_key=${process.env.NEOWS_KEY}`;
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
export class Sentry {
  getSentryData() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url2 = `https://api.nasa.gov/neo/rest/v1/neo/sentry?is_active=true&page=0&size=10&api_key=${process.env.NEOWS_KEY}`;
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
      const url = `https://api.nasa.gov/insight_weather/?api_key=${process.env.mwkey}&feedtype=json&ver=1.0`;
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
export class RoverImage {
  photo() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.mwkey}&camera=MAST`;
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
