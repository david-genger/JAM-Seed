require("jquery");
require("turbolinks");
require("jquery-modal/jquery.modal.min.js");
require("jquery-modal/jquery.modal.min.css");
Turbolinks.start();

$(document).on("turbolinks:load", function() {


  $(".footer-column_feedback").click(function(e) {
    $("#feedback-form").modal({
      fadeDuration: 300
    });
  });
});

require("./libraries/sticky-header.js");

require("../scss/style.scss");
