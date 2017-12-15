$(document).ready(function() {
    $('#shopper-login').submit(function(event) {
        event.preventDefault();
        var usrn = $('#shopper-login :input[name=email]').val();
        var pwd = $('#shopper-login :input[type=password]').val();

        $.ajax({
                    type: "POST",
                    url: 'https://qick.co:8443/auth/login', //ruta absoluta
                    data: JSON.stringify({username:usrn,password:pwd}),
                    dataType: "json",
                    contentType: "application/json",

                    success: function (data) {
                        if (data == undefined) {
                            alert("Error : 219");
                        }
                        else{
                            Cookies.set('token', data);
                            Cookies.set('username',usrn);
                            location.href = "/cards";

                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {

                          var catchedError = JSON.parse(jqXHR.responseText);

                          //If sweet alert is loaded, try
                          try {
                              if(catchedError.error.details[0].code === "username_or_password_not_found"){
                                swal(
                                      'Please, try again',
                                      'You need to provide both email and password',
                                      'error'
                                    );
                              }
                              else if(catchedError.error.details[0].code === "username_or_passsword_is_incorrect"){
                                swal(
                                      'Please, try again',
                                      'Email not found or password is incorrect',
                                      'error'
                                    );
                              }
                              else if(catchedError.error.details[0].code === "user_type_does_not_allow_login"){
                                swal(
                                      'Something went wrong',
                                      'The current provided user is not allowed to login',
                                      'error'
                                    );
                              }
                              else if(catchedError.error.details[0].code === "incomplete_user_trying_to_login"){
                                swal(
                                      'Something went wrong',
                                      'Current user is invalid"',
                                      'error'
                                    );
                              }
                              else{
                                swal(
                                      'Oops...',
                                      'There was an error processing your request, please try again later',
                                      'error'
                                    );
                              }
                            }
                            //else, use normal alert
                          catch(err){
                            if(catchedError.error.details[0].code === "username_or_password_not_found"){
                                  alert("You need to provide both email and password");
                            }
                            else if(catchedError.error.details[0].code === "username_or_passsword_is_incorrect"){
                                  alert("Email not found or password is incorrect");
                            }
                            else if(catchedError.error.details[0].code === "user_type_does_not_allow_login"){
                                  alert("The current provided user is not allowed to login");
                            }
                            else if(catchedError.error.details[0].code === "incomplete_user_trying_to_login"){
                              alert("Current user is invalid");
                            }
                            else{
                                alert("There was an error processing your request, please try again later");
                            }

                          }

                        }
        });
    });

    $("a.sqs-block-button-element--medium.sqs-block-button-element").click(function(event){
      event.preventDefault();
      location.href = "https://www.google.com";
      }
    );
});
