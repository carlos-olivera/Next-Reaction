import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";


if (Meteor.isClient) {

  require('slick-carousel');

  Template.carousel.rendered = function() {
    $('#carousel').slick({
      dots: true,
      arrows: true,
      infinite: false,
      lazyLoad: 'ondemand',
      autoplay: true,
      autoplaySpeed: 3500,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      ]
    });
  }
}