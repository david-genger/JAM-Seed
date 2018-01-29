require("jquery-validation");
require("jquery-validation/dist/additional-methods.js");

jQuery.validator.addMethod(
  "zipcode",
  function(value, element) {
    return (
      this.optional(element) ||
      /^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] ?\d[A-Z]\d)$/.test(value)
    );
  },
  "Please provide a valid zipcode."
);

$(document).on("turbolinks:load", function(e) {
  var form = $("form").not(".rendered");
  var hasRendered = form.not(".rendered");
  if (hasRendered.length) {
    $("form")
      .not("[name=Feedback-form]")
      .validate({
        rules: {
          Phone: {
            required: true,
            phoneUS: true
          },
          "Company Phone": {
            required: true,
            phoneUS: true
          },
          "Phone Number": {
            required: true,
            phoneUS: true
          },
          "CompanyPhone": {
            phoneUS: true
          },
          "Refrence Phone": {
            required: true,
            phoneUS: true
          },
          "Employer Phone": {
            required: true,
            phoneUS: true
          },
          "Zip Code": {
            zipcode: true
          },
          "Zipcode": {
            zipcode: true
          },
          zip: {
            zipcode: true
          }
        },
        errorClass: "form-field_error",
        errorElement: "span",
        submitHandler: function(form, e) {
          submitForm(form, e);
        }
      });

    $("form[name=Feedback-form]").validate({
      errorClass: "form-field_error",
      errorElement: "span",
      submitHandler: function(form, e) {
        submitFeedbackForm(form, e);
      }
    });

    $("form [required]")
      .prev("label")
      .addClass("form-field_label--required");
    var addableClicker = $(".form-field_plus");
    if (addableClicker.length) {
      addableClicker.each(function(i, el) {
        var fields = $(this)
          .siblings("div")
          .children("input");
        var clonedFields = fields.clone();
        var container = $(this).siblings(".form-field_addable-container");
        var setAmount = 1;
        el.addEventListener("click", function() {
          if (setAmount == 3) {
            $(el).hide();
          }
          if (setAmount == 4) {
            return;
          }

          var cloning = clonedFields.clone();
          cloning.each(function(i, el) {
            el.name = el.name.replace(/\d+$/, "") + (setAmount + 1);
          });
          container.append(cloning);
          setAmount++;
        });
      });
    }

    var inputsGroup = $(".form-group");
    if (inputsGroup.length) {
      inputsGroup.each(function(i, el) {
        var formFields = $(this).children(".form-field");
        $(formFields[1]).css({
          display: "none",
          opacity: 0
        });

        var radio = $(this).find("input:radio");
        radio.change(function() {
          if (this.value == "true") {
            $(formFields[1]).css({
              display: "block",
              opacity: 1
            });
          } else if (this.value == "false") {
            $(formFields[1]).css({
              display: "none",
              opacity: 0
            });
          }
        });
      });
    }

    var copyable = $(".form-field--copyable");
    if (copyable.length) {
      copyable.each(function(i, el) {
        var copyButton = $(this).siblings(".form-field_copy");
        copyButton.click(function(e) {
          var cloned = $(el).clone();
          var clonedLabel = cloned.find("label");
          var clonedInputs = cloned.find("input");

          clonedLabel.each(function(i, el) {
            $(el).text($(el).text() + "2");
          });
          cloned.insertAfter(el);
        });
      });
    }

    var salesRepCareer = $('form[name="Sales-Rep-Careers"]');
    if(salesRepCareer.length){
      var salesGroupRadio = $("[name='Are you part of a sales group']");
      var radioContainer = salesGroupRadio.first().parents('.form-field');
      var AmountGroupSelect = $('#group');
      var groupAmount = $('#group').parent('.form-field');
      groupAmount.hide();
      salesGroupRadio.on('change', function(){
          if($("[name='Are you part of a sales group']:checked").val() == 'true'){
            radioContainer.removeClass('form-field--100');
            groupAmount.show();
          } else {
            radioContainer.addClass('form-field--100');
            groupAmount.hide();
            AmountGroupSelect.val(null);
          }
      });

      var currentlyInSalesRadio = $("[name='Are you currently a sales rep']");
      var repTypeSelect = $('#RepType');
      var selectContainer =  repTypeSelect.parent('.form-field');
      selectContainer.hide();

      currentlyInSalesRadio.on('change', function(){
        if($("[name='Are you currently a sales rep']:checked").val() == 'true'){
          selectContainer.show();
          repTypeSelect.attr("required", true);
        } else {
          repTypeSelect.removeAttr('required');
          selectContainer.hide();
          repTypeSelect.val(null);
        }
      })
    }
    

    var careersForm = $('form[name="Careers-form"]');
    if (careersForm.length) {
      var submitButton = $(".button[type=submit]").first();
      var agreed = false;
      var authorized = $("#legally-authorized");
      var eighteen = $("#18-years");
      var counter = 2;

      submitButton.addClass("inactive").attr("disabled", "disabled");
      authorized.on("change", function(e) {
        toggleAvailable(e, this);
      });
      eighteen.on("change", function(e) {
        toggleAvailable(e, this);
      });

      function toggleAvailable(e, el) {
        if ($(el).is(":checked")) {
          counter -= 1;
        } else {
          counter += 1;
        }
        if (!counter) {
          agreed = true;
          submitButton.removeClass("inactive").prop("disabled", false);
        } else {
          submitButton.addClass("inactive").attr("disabled", "disabled");
        }
      }
    }
    form.addClass("rendered");
  }
});

function submitForm(form, e) {
  e.preventDefault();
  if (typeof grecaptcha !== "undefined" && !grecaptcha.getResponse()) {
    $(".g-recaptcha").append(
      '<span class="form-field_error">Please complete Recaptcha</span>'
    );
  } else {
    var form = $(form);
    $.post(form.attr("action"), form.serialize()).then(function() {
      var thankYouDiv = $(".form-page_thankyou-message");
      $(".form-page_form .form-section").addClass("closed");
      var contactUsForm = $("form[name=Contact-Us] .form-section");
      if (contactUsForm.length) {
        contactUsForm.addClass("closed");
      }
      thankYouDiv.addClass("open");

      $("html,body").animate({
        scrollTop: thankYouDiv.offset().top - 100
      });
    });
  }
}

// function submitFeedbackForm(form, e) {
//   e.preventDefault();
//   var form = $(form);
//   if (typeof grecaptcha !== "undefined" && !grecaptcha.getResponse()) {
//     form.find(".g-recaptcha").append(
//       '<span class="form-field_error">Please complete Recaptcha</span>'
//     );
//   } else {
    
//     $.post(form.attr("action"), form.serialize()).then(function() {
//       var thankYouDiv = $(".feedback_thankyou");
//       $("form[name=Feedback-form]").addClass("closed");
//       thankYouDiv.addClass("open");
//     });
//   }
// }

function submitFeedbackForm(form, e) {
  e.preventDefault();
  var form = $(form);

  $.post(form.attr("action"), form.serialize()).then(function() {
    var thankYouDiv = $(".feedback_thankyou");
    $("form[name=Feedback-form]").addClass("closed");
    thankYouDiv.addClass("open");
  });
}

var removeError = function() {
  var test = $(".g-recaptcha").siblings(".form-field_error");
  test.remove(
    '<span class="form-field_error">Please complete the recaptcha</span>'
  );
};
