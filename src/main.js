import { Hubble, HubbleArchive } from './hubble.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {

    let hubble = new Hubble();
    let promise = hubble.getLatest();

    promise.then(function(response) {
      const body = JSON.parse(response);
      $(".title").html(`${body.name}`);
      $(".body").html(` ${body.abstract}`);
      $("#image").html(`<img src="${body.thumbnail}" alt="">`);
      });
      let hubbleArchive = new HubbleArchive();
      let promise2 = hubbleArchive.getArchive();

      promise2.then(function(response) {
        const body2 = JSON.parse(response);
        console.log(body2[0].name);
        for (var i = 0; i < body2.length; i++) {
          $(".archive").append(`<div class= "card"><div class="title${i}"></div><div class="url${i}"></div></div>`)

           $(`.title${i}`).html(`<h5>${body2[i].name}</h5>`)
           $(`.url${i}`).html(`<a href="${body2[i].url}">${body2[i].url}</a>`)
        }
        });
    });
