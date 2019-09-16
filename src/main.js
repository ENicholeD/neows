import { Neows } from './neows.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $('#dateSubmitForm').submit(function(event) {
    event.preventDefault();
    const startDate = $('#inputDate').val();
    $('#inputDate').val("");
    let neowsSearch = new Neows();
    let promise = neowsSearch.getNeows(startDate);

    promise.then(function(response) {
      const body = JSON.parse(response);
      console.log(body);
      for (let i = 0; i < body.element_count; i++) {
        if (body.element_count === 0) {
          console.log("zero results found");
        } else {

          $("#neow-results").append(
            `<div id="accordion">
            <div class="card bg-light mb-3">
            <div class="card-header" id="heading${i}" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapseOne"><span id=name${i}></div>
            <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordion">
            <div class="card-body">
            <div id=name${i}></div>
            <div id=diameter${i}></div>
            <div id=speed${i}></div>
            <div id=dangerous${i}></div>
            <div id=missdistance${i}></div>
            <div id=firstdate${i}></div>
            <div id=description${i}></div>
            </div>
            </div>
            </div>
            </div>`);

            $(`#name${i}`).html(`<p class="strong">Name: ${body.near_earth_objects['2019-09-16'].name}</p>`)


          }
        }
        console.log(body.near_earth_objects['2019-09-16'].name);
      });
  });
});
