export class Donki {
  weatherDonki(type) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nasa.gov/DONKI/notifications?startDate=&endDate=&type=${type}&api_key=${process.env.key}`;
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
