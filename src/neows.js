export class MarsWeather {
  weather() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nasa.gov/insight_weather/?api_key=${process.env.mwkey}2Oyd&feedtype=json&ver=1.0`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
  // convert(temp){
  //   (temp * 9/5) + 32).toFixed(3);
  // }
}
