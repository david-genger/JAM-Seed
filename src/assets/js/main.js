require("jquery");
require("turbolinks");
require("./libraries/owl.carousel.js");
import slick from "slick-carousel";
require("slick-carousel/slick/slick.scss");
require("slick-carousel/slick/slick-theme.scss");
require("jquery-modal/jquery.modal.min.js");
require("jquery-modal/jquery.modal.min.css");
require("./libraries/jquery.lettering.js");
require("./libraries/modernizr-custom-es6Number.js");
Turbolinks.start();

$(document).on("turbolinks:load", function() {


  $(".footer-column_feedback").click(function(e) {
    $("#feedback-form").modal({
      fadeDuration: 300
    });
  });
});

require("./libraries/sticky-header.js");
require("./quality-report.js");

require("../scss/style.scss");
