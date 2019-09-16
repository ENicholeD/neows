import { MarsWeather } from './neows.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  let marsWeather= new MarsWeather();
  let promiseMW = marsWeather.weather();
  // let convert = marsWeather.convert(temp);

  promiseMW.then(function(response) {
    const body = JSON.parse(response);
    console.log(body);
    for(let i = 0; i < body.sol_keys.length; i++){
      let sol = body.sol_keys[i];
      $('.minC').text(`Min: ${body[sol].AT.mn}C`);
      $('#date').text(body[sol].First_UTC);
      $('.maxC').text(`Max: ${body[sol].AT.mx}C`);
      $('.avgC').text(`Average: ${body[sol].AT.av}C`);
      // console.log(marsWeather.convert(body[sol].AT.mn));

      $('.minF').text(`Min: ${(body[sol].AT.mn * 9/5) + 32}F`);

      $('.maxF').text(`Max: ${(body[sol].AT.mx * 9/5) + 32}F`);
      $('.avgF').text(`Average: ${(body[sol].AT.av * 9/5) + 32}F`);
    }
  });
});
