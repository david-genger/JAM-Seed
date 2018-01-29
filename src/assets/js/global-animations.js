const ScrollMagic = require("ScrollMagic");
const TimelineMax = require("TimelineMax");

$(document).on("turbolinks:load", function() {
  var controller = new ScrollMagic.Controller();
  var width = $(window).width();
  if ($(window).width() > 1024) {
    var parallaxContainer = $(".paralexing");
    if (parallaxContainer.length) {
      var parallaxBlack = parallaxContainer.find(".loaded-bg");
      var parallaxImage = parallaxContainer.find(".paralexing_image");
      var parallaxTween = new TimelineMax().add([
        TweenMax.fromTo(
          parallaxImage,
          1,
          {
            y: 150
          },
          {
            y: -200,
            ease: Linear.easeNone
          }
        )
      ]);

      var parallaxScene = new ScrollMagic.Scene({
        triggerElement: ".paralexing",
        duration: $(window).height() + 500,
        triggerHook: "onEnter"
      })
        .setTween(parallaxTween)
        .addTo(controller);

      var parallaxBackgroundTween = new TimelineMax().add(
        [
          TweenMax.from(parallaxBlack, 0.28, {
            width: 0,
            ease: Linear.easeInOut
          })
        ],
        0.2
      );

      var parallaxBackgroundScene = new ScrollMagic.Scene({
        triggerElement: ".paralexing",
        triggerHook: "onEnter",
        offset: "200px"
      })
        .setTween(parallaxBackgroundTween)
        .reverse(false)
        .addTo(controller);
    }
  }
});
