
function getStripePublicKey(){
  event.preventDefault();
  var sessionToken = JSON.parse(Cookies.get('token'));

  //Getting PublicKey from Stripe.com

  $.ajax({
              type: "GET",
              url: 'https://qick.co:8443/configurations/payment/public',
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
              error: function (data) {
                  if (data == undefined) {
                      alert("Error : 465");
                  }
                  else {
                    alert("Error : 466");

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
                error: function (data) {
                    if (data == undefined) {
                        alert("Error : 465");
                    }
                    else {
                        alert("Error : 466");
                    }
                }
              });
          }

          function addCardToServer(){

            var sessionToken = JSON.parse(Cookies.get('token'));
            var cardToken = JSON.parse(Cookies.get('stripeToken'));

            $.ajax({
              type: "POST",
              url: 'http://qick.co:8081/cards?token_id='+cardToken['id'],
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
              error: function (data) {
                  if (data == undefined) {
                      alert("Error : 465");
                  }
                  else {
                      alert("Error : 466");
                  }
              }
            });
          }
