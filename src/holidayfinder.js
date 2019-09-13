//EXAMPLE CODE, REPLACE. RENAME FILE

export class HolidayFinder {
  getHoliday(date) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://calendarific.com/api/v2/holidays?api_key=eb5739fed30c70385e224d1727c4dc3fa060c16f&country=US&year=2019`;
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
}
