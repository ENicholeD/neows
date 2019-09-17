import { Neows, Sentry } from './iss.js';
import { MarsWeather, RoverImage } from './iss.js';
import { Coordinates, Geocoding } from './iss.js';

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  // coordinates start here
  let coordinates = new Coordinates();
  let promise = coordinates.getCoordinates();

  promise.then(function(response) {
    const body = JSON.parse(response);
    let lat = body.latitude.toFixed(2);
    let lng = body.longitude.toFixed(2);
    let alt = body.altitude.toFixed(2);
    let velo = body.velocity.toFixed(2);
    let vis = body.visibility;
    // Geocoding starts here
    let geoCode = new Geocoding();
    let promise2 = geoCode.getLocation(lat, lng);

    promise2.then(function(response) {
      const body2 = JSON.parse(response);
      let issCurrentLocation = body2.results[0].formatted_address;

      $(".location").html(`<span class="strong">Current Location:</span> ${issCurrentLocation}`);
      $(".latLng").html(`<span class="strong">Coordinates:</span> ${lat}°, ${lng}°`);
      $(".altitude").html(`<span class="strong">Altitude:</span> ${alt}km`);
      $(".velocity").html(`<span class="strong">Velocity:</span> ${velo}km/h`);
      $(".visibility").html(`<span class="strong">Visibility:</span> ${vis.charAt(0).toUpperCase() + vis.substring(1)}`);

    });

  });
  // Neows starts here
  $('#dateSubmitForm').submit(function(event) {
    event.preventDefault();
    const startDate = $('#inputDate').val();
    $('#inputDate').val("");
    $('#neow-results').text("");

    let neowsSearch = new Neows();
    let promise = neowsSearch.getNeows(startDate);
    promise.then(function(response) {
      const body = JSON.parse(response);
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
            let dangerous;
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

      });
    });
    // sentry starts here
    $("#sentryButton").click(function(event){

      let sentrySearch = new Sentry();
      let promise2 = sentrySearch.getSentryData();

      promise2.then(function(response) {
        const body2 = JSON.parse(response);
        for (let i = 0; i < 10; i++) {
          $("#sentry-results").append(
            `<div id="accordion">
            <div class="card bg-light mb-3">
            <div class="card-header" id="sentryheading${i}" data-toggle="collapse" data-target="#sentrycollapse${i}" aria-expanded="true" aria-controls="collapseOne"><span id=sentryname${i}></div>
            <div id="sentrycollapse${i}" class="collapse show" aria-labelledby="sentryheading${i}" data-parent="#accordion">
            <div class="card-body">
            <div id=name${i}></div>
            <div id=range${i}></div>
            <div id=impacts${i}></div>
            <div id=probability${i}></div>
            <div id=diameter${i}></div>
            <div id=distance${i}></div>
            <div id=palermo${i}></div>
            </div>
            </div>
            </div>
            </div>`);

            $(`#name${i}`).html(`<p class="strong">Name: ${body2.sentry_objects[i].fullname}</p>`);
            $(`#range${i}`).html(`<p class="strong">Possible Impact Range: ${body2.sentry_objects[i].year_range_min} - ${body2.sentry_objects[i].year_range_max}</p>`);
            $(`#impacts${i}`).html(`<p class="strong"># of Potential Impacts: ${body2.sentry_objects[i].potential_impacts}</p>`);
            $(`#probability${i}`).html(`<p class="strong">Impact Probability: ${Number(body2.sentry_objects[i].impact_probability)}%</p>`);
            $(`#diameter${i}`).html(`<p class="strong">Diameter: ${body2.sentry_objects[i].estimated_diameter} miles</p>`);
            $(`#distance${i}`).html(`<p class="strong">Distance: ${(body2.sentry_objects[i].average_lunar_distance).toFixed(2)} Astronomical Units</p>`);
            $(`#palermo${i}`).html(`<p class="strong"> <a href="https://cneos.jpl.nasa.gov/sentry/palermo_scale.html">Palermo Scale:</a> ${body2.sentry_objects[i].palermo_scale_ave}</p>`);
          }
        });
      });
      // marsWeather starts here
      let marsWeather= new MarsWeather();
      let promiseMW = marsWeather.weather();
      promiseMW.then(function(response) {
        const body = JSON.parse(response);
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
      // roverImage starts here
      let roverImage = new RoverImage();
      let promiseImg = roverImage.photo();
      promiseImg.then(function(response){
        const body = JSON.parse(response);


        setInterval(() => {
          let count = Math.floor(Math.random() * 838);
          $(".space").html(`<img class="mySlides w3-animate-fading" id="imageR" src=${body.photos[count].img_src}>`);
        }, 5000);
      });
    });
