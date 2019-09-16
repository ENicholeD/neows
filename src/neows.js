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
