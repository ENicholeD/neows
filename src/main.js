import { Donki} from './DONKI.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function(){
  let donki = new Donki();
  let promiseDonki = donki.weatherDonki();

  promiseDonki.then(function(response) {
    const body = JSON.parse(response);
    console.log(body);
    let type;
    $('.output').text('');
    $('.errorOutput').text('');

    $('.DRreport').append(`<p>Check recent solar weather with the most recent DONKI weather<a href = "${body[0].messageURL}" target="_blank"> ${body[0].messageType}</a></p>`);

    $('.formDR').submit(function(event){
      event.preventDefault();
      type = $(".eventSelect").val();

      for(let i = 0; i < body.length; i++){
        if(body[i].messageType === type){
          $('.output').append(`<li>View the <a href = "${body[i].messageURL}" target="_blank"> ${body[i].messageType}</a> alert for ${body[i].messageIssueTime}</li>`);
        }else if (body[i].messageType != type){
          $('.output').text('');
          $('.errorOutput').text('');
          $('.errorOutput').text(`There were no events of that type reported recently.`)
        }
      }
    });
  });
});
