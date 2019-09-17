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
