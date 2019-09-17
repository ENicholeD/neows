import { Coordinates, Geocoding } from './iss.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {

    let coordinates = new Coordinates();
    let promise = coordinates.getCoordinates();

    promise.then(function(response) {
      const body = JSON.parse(response);
      let lat = body.latitude.toFixed(2);
      let lng = body.longitude.toFixed(2);
      let alt = body.altitude.toFixed(2);
      let velo = body.velocity.toFixed(2);
      let vis = body.visibility;

      let geoCode = new Geocoding();
      let promise2 = geoCode.getLocation(lat, lng);

      promise2.then(function(response) {
        const body2 = JSON.parse(response);
      let issCurrentLocation = body2.results[0].formatted_address;
        console.log(body2);
        console.log(body2.results[0].formatted_address);

        $(".location").html(`The International Space Station's Current Location: ${issCurrentLocation}`);
        $(".latLng").html(`Coordinates: ${lat}°, ${lng}°`);
        $(".altitude").html(`Altitude: ${alt}km`);
        $(".velocity").html(`Velocity: ${velo}km/h`);
        $(".visibility").html(`Visibility: ${vis.charAt(0).toUpperCase() + vis.substring(1)}`)

        });

      });

    });
