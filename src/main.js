import { Donki, Apod} from './DONKI.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function(){
  let donki = new Donki();
  let promiseDonki = donki.weatherDonki();
  promiseDonki.then(function(response) {
    const body = JSON.parse(response);
    let type;
    $('.DRreport').append(`<p>Check the space weather <a href = "${body[0].messageURL}" target="_blank"> ${body[0].messageType}</a>.</p>`);
    $('.formDR').submit(function(event){
      event.preventDefault();
      type = $(".eventSelect").val();
      $('.output').text('');
      $('.errorOutput').text('');
      for(let i = 0; i < body.length; i++){
        if(body[i].messageType != type){
          $('.errorOutput').text('End of recent events for this type.');
        }else{
          $('.output').append(`<li>View the <a href = "${body[i].messageURL}" target="_blank"> ${body[i].messageType}</a> alert for ${body[i].messageIssueTime}</li>`);
        }
      }
    });
  });
  let apod = new Apod();
  let promiseApod = apod.day();
  promiseApod.then(function(response){
    const body = JSON.parse(response);
    $('.apod').prepend(`${body.date}  ${body.title}`);
    $('.apod').append(`<img src = '${body.url}'>`);
    $('.apod').append(`${body.explanation}`);
  });
});
