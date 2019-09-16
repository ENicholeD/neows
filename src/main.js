import { MarsWeather, RoverImage } from './neows.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  let marsWeather= new MarsWeather();
  let promiseMW = marsWeather.weather();
  promiseMW.then(function(response) {
    const body = JSON.parse(response);
    console.log(body);
    for(let i = 0; i < body.sol_keys.length; i++){
      let sol = body.sol_keys[i];
      $('#date').text(`Date: ${(body[sol].Last_UTC).slice(0,10)}`);
      $('#date').append(`<br>Sol: ${sol}`);
      $('.minC').text(`Min: ${(body[sol].AT.mn).toFixed(1)}C`);
      $('.maxC').text(`Max: ${(body[sol].AT.mx).toFixed(1)}C`);
      $('.avgC').text(`Average: ${(body[sol].AT.av).toFixed(1)}C`);
      $('.minF').text(`Min: ${((body[sol].AT.mn * 9/5) + 32).toFixed(1)}F`);
      $('.maxF').text(`Max: ${((body[sol].AT.mx * 9/5) + 32).toFixed(1)}F`);
      $('.avgF').text(`Average: ${((body[sol].AT.av * 9/5) + 32).toFixed(1)}F`);
    }
  });
  let roverImage = new RoverImage();
  let promiseImg = roverImage.photo();
  promiseImg.then(function(response){
    const body = JSON.parse(response);


    setInterval(() => {
      let count = Math.floor(Math.random() * 838);
      console.log(count);
      $(".space").html(`<img class="mySlides w3-animate-fading" id="imageR" src=${body.photos[count].img_src}>`);
      console.log(body.photos.length)
    }, 5000);
  });
});
