Stripe.setPublishableKey('pk_test_ElMbs9EL5CvGpQL2a3Vv0Twk');

var $form = $('form');

$form.submit(function(event) {
    $('.error').addClass('hide');
    // Disable the submit button to prevent repeated clicks:
    $form.find('.submit').prop('disabled', true);

    // Request a token from Stripe:
    Stripe.card.createToken({
        number: $('#cardnumber').val(),
        cvc: $('#cvc').val(),
        exp_month: $('#month').val(),
        exp_year: $('#year').val(),
        name: $('#name').val()
    }, stripeResponseHandler);

    // Prevent the form from being submitted:
    return false;
  });

function stripeResponseHandler(status, response) {

  if (response.error) { // Problem!

    // Show the errors on the form:
    $('.payment-errors').text(response.error.message);
    $('.error').removeClass('hide');
    $form.find('.submit').prop('disabled', false); // Re-enable submission

  } else { // Token was created!

    // Get the token ID:
    var token = response.id;

    // Insert the token ID into the form so it gets submitted to the server:
    $form.append($('<input type="hidden" name="stripeToken">').val(token));

    // Submit the form:
    $form.get(0).submit();
  }
};