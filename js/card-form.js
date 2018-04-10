$(document).ready(function() {
  $.getScript("https://rawgit.com/luispresuelgit/landing-page-login/master/js/global_variables.js")
    .done(function( script, textStatus ) {
      console.log( textStatus );
    })
    .fail(function( jqxhr, settings, exception ) {
      console.log("Missing globlal variables")
  });
});

function redirectToCards(){
  location.href="/cards.html";
}

function getStripePublicKey(){
  event.preventDefault();
  var sessionToken = JSON.parse(Cookies.get('token'));

  //Getting PublicKey from Stripe.com

  $.ajax({
              type: "GET",
              url: QCS+'/configurations/payment/public',
              headers: {
                Authorization: 'Bearer '+sessionToken['token']
              },
              success: function (data) {
                  if (data == undefined) {
                      alert("Error : 219");
                  }
                  else {
                      Cookies.set('stripePublicKey', data);
                      tokenzingCard();

                  }
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  var catchedError = JSON.parse(jqXHR.responseText);

                    try{
                      if(catchedError.error.details[0].code === "token_not_found"){
                        swal(
                              'Something went wrong',
                              'Required session Token was not found on request. Please, try again later',
                              'error'
                            );
                      }
                      else if(catchedError.error.details[0].code === "invalid_authorization_header"){
                        swal(
                              'Something went wrong',
                              'Invalid Authorization header found. Please, try again later',
                              'error'
                            );
                      }
                      else if(catchedError.error.details[0].code === "invalid_token_found"){
                        swal(
                              'Something wnet wrong',
                              'Signature varification failed. Please, try again later',
                              'error'
                            );
                      }else {
                        swal(
                              'Oops',
                              'There was an error processing your request. Please try again later',
                              'error'
                            );
                      }
                    }
                    catch(err){
                      if(catchedError.error.details[0].code === "token_not_found"){
                        alert("Required session Token was not found on request");
                      }
                      else if(catchedError.error.details[0].code === "invalid_authorization_header"){
                        alert("Invalid Authorization header found");
                      }
                      else if(catchedError.error.details[0].code === "invalid_token_found"){
                        alert("Signature varification failed");
                      }else {
                        alert("There was an error processing your request. Please try again later");
                      }
                    }
              }
    });

}


          function tokenzingCard(){
          var stripe_public_key = JSON.parse(Cookies.get('stripePublicKey'));
          var spNum = $("#CreditCardNumber").val();
          var spCVC = $("#SecurityCode").val();
          var spMonth = $("#ExpiryDateMonth").val();
          var spLast2Year= $("#ExpiryDateYear").val();
          var spYear = "20"+spLast2Year;

              $.ajax({
                type: "POST",
                url: 'https://api.stripe.com/v1/tokens',
                headers: {
                  Authorization: 'Bearer '+stripe_public_key['public']
                },
                data:'card[number]='+spNum+'&card[exp_month]='+spMonth+'&card[exp_year]='+spYear+'&card[cvc]='+spCVC,
                dataType: "json",

                success: function (data) {
                    if (data == undefined) {
                        alert("Error : 219");
                    }
                    else {
                        Cookies.set('stripeToken',data);
                        addCardToServer();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {

                      var catchedError = JSON.parse(jqXHR.responseText);
                      //catchedError.error.code or catchedError.error.type
                      try{
                          if(catchedError.error.code === "incorrect_number"){
                            swal(
                                  'Invalid card number',
                                  'Card number entered is invalid. Please, try again using a valid card number',
                                  'error'
                                );
                          }
                          else if(catchedError.error.code === "invalid_expiry_month"){
                            swal(
                                  'Invalid expiry month',
                                  'Either invalid month entry or credit card have already expired',
                                  'error'
                                );

                          }
                          else if(catchedError.error.code === "invalid_expiry_year"){
                            swal(
                                  'Invalid expiry year',
                                  'Either invalid year entry or credit card have already expired',
                                  'error'
                                );

                          }else if(catchedError.error.code === "invalid_cvc"){
                            swal(
                                  'Invalid cvc',
                                  'Your card\'s security code is invalid',
                                  'error'
                                );

                          }else if(catchedError.error.type === "invalid_request_error"){
                            swal(
                                  'Oops, something went wrong',
                                  'There was an error processing your request, please try again later',
                                  'error'
                                );

                          }else {
                            swal(
                                  'Oops, something went wrong',
                                  'There was an error processing your request, please try again later',
                                  'error'
                                );
                              }
                        }
                        catch(err){
                          if(catchedError.error.code === "incorrect_number"){

                                  alert('Card number entered is invalid. Please, try again using a valid card number');

                          }
                          else if(catchedError.error.code === "invalid_expiry_month"){

                                  alert('Either invalid month entry or credit card have already expired');

                          }
                          else if(catchedError.error.code === "invalid_expiry_year"){

                                  alert('Either invalid year entry or credit card have already expired');


                          }else if(catchedError.error.code === "invalid_cvc"){

                                alert('Your card\'s security code is invalid');

                          }else if(catchedError.error.type === "invalid_request_error"){

                                  alert('There was an error processing your request, please try again later');

                          }else {
                                  alert('There was an error processing your request, please try again later');

                          }
                        }

                    }
              });
          }

          function addCardToServer(){

            var sessionToken = JSON.parse(Cookies.get('token'));
            var cardToken = JSON.parse(Cookies.get('stripeToken'));

            $.ajax({
              type: "POST",
              url: 'https://qick.co:8443/cards?token_id='+cardToken['id'],
              headers: {
                Authorization: 'Bearer '+sessionToken['token']
              },
              dataType: "json",
              contentType: "application/json",
              success: function (data) {
                  if (data == undefined) {
                      alert("Error : 219");
                  }
                  else {
                      location.href="/cards";
                  }
              },
              error: function(jqXHR, textStatus, errorThrown) {

                var catchedError = JSON.parse(jqXHR.responseText);
                try{
                  if(catchedError.error.details[0].code === "token_not_found"){
                    swal(
                          'Something went wrong',
                          'Required session Token was not found on request. Please, try again later',
                          'error'
                        );
                  }
                  else if(catchedError.error.details[0].code === "invalid_authorization_header"){
                    swal(
                          'Something went wrong',
                          'Invalid Authorization header found. Please, try again later',
                          'error'
                        );
                  }
                  else if(catchedError.error.details[0].code === "invalid_token_found"){
                    swal(
                          '',
                          'Signature varification failed. Please, try again later',
                          'error'
                        );
                  }else {
                    swal(
                          'Oops',
                          'There was an error processing your request, please try again later',
                          'error'
                        );
                  }
                }
                catch(err){
                  if(catchedError.error.details[0].code === "token_not_found"){
                    alert("Required session Token was not found on request");
                  }
                  else if(catchedError.error.details[0].code === "invalid_authorization_header"){
                    alert("Invalid Authorization header found");
                  }
                  else if(catchedError.error.details[0].code === "invalid_token_found"){
                    alert("Signature varification failed");
                  }else {
                    alert("There was an error processing your request, please try again later");
                  }
                }
              }
            });
          }
