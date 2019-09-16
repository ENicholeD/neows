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
    $('#neow-results').text("")
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
            <div id=missDistance${i}></div>
            <div id=firstDate${i}></div>
            <div id=description${i}></div>
            </div>
            </div>
            </div>
            </div>`);
            let dangerous
            if (body.near_earth_objects[`${startDate}`][i].is_potentially_hazardous_asteroid === "true") {
              dangerous = "Yes";
            } else {
              dangerous = "No";
            }
            $(`#name${i}`).html(`<p class="strong">Name: ${body.near_earth_objects[`${startDate}`][i].name}</p>`);
            $(`#diameter${i}`).html(`<p class="strong">Max Diameter: ${body.near_earth_objects[`${startDate}`][i].estimated_diameter.feet.estimated_diameter_max.toFixed(0)} ft</p>`);
            $(`#speed${i}`).html(`<p class="strong">Velocity: ${Math.round(body.near_earth_objects[`${startDate}`][i].close_approach_data[0].relative_velocity.miles_per_hour)} mph</p>`);
            $(`#dangerous${i}`).html(`<p class="strong">Potentially Hazardous: ${dangerous}</p>`);
            $(`#missDistance${i}`).html(`<p class="strong">Missed Earth By: ${Math.round(body.near_earth_objects[`${startDate}`][i].close_approach_data[0].miss_distance.miles)} miles</p>`);
            $(`#firstDate${i}`).html(`<p class="strong">Observed First On: ${body.near_earth_objects[`${startDate}`][i].orbital_data.first_observation_date}</p>`);
            $(`#description${i}`).html(`<p class="strong">Description: ${body.near_earth_objects[`${startDate}`][i].orbital_data.orbit_class.orbit_class_description}.</p>`);



          }
        }

        console.log(body.near_earth_objects[`${startDate}`][0].name);
      });
  });
});
