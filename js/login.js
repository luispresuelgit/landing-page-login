$(document).ready(function() {
    $('#shopper-login').submit(function(event) {
        event.preventDefault();
        var usrn = $('#shopper-login :input[name=email]').val();
        var pwd = $('#shopper-login :input[type=password]').val();
        var type="CUSTOMER";
        loginUser(usrn,pwd,type);
    });

    $('#seller-login').submit(function(event) {
        event.preventDefault();
        var usrn = $('#seller-login :input[name=email]').val();
        var pwd = $('#seller-login :input[type=password]').val();
        var type="MERCHANT";
        loginUser(usrn,pwd,type);
    });

    $("a.sqs-block-button-element--medium.sqs-block-button-element").click(function(event){
      event.preventDefault();
      location.href = "https://www.google.com";
      }
    );
});

function loginUser(usrn, pwd, user_type){
            //Loggearse y almacenar el token en una Cookie
            $.ajax({
                        type: "POST",
                        url: 'https://qick.co:8443/auth/login?user_type='+user_type, //ruta absoluta
                        data: JSON.stringify({username:usrn,password:pwd}),
                        dataType: "json",
                        contentType: "application/json",

                        success: function (data) {
                            if (data == undefined) {
                                alert("Error : 219");
                            }
                            else{
                              if(user_type === "CUSTOMER"){
                                Cookies.set('token', data);
                                Cookies.set('username',usrn);
                                Cookies.set('user_type',user_type);
                                location.href = "/cards";
                              }else{
                                $('<form action="http://qick.co:3000/set-token" method="POST">' +
                                    '<input type="hidden" name="token" value="'+data.token+'">' +
                                    '</form>')
                                    .appendTo($(document.body))
                                    .submit();
                              }
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown) {

                          var catchedError = JSON.parse(jqXHR.responseText);

                          //If sweet alert is loaded, try
                          try {
                              if(catchedError.error.details[0].code === "username_or_password_not_found"){
                                swal(
                                      'Please, try again',
                                      'Username or password not found',
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
                                      'Current user is invalid',
                                      'error'
                                    );
                              }
                              else if(catchedError.error.details[0].code === "invalid_user_type"){
                                swal(
                                      'Invalid profile type',
                                      'Your user is not a '+(user_type==="CUSTOMER" ? "shopper":"seller"),
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
                            else if(catchedError.error.details[0].code === "invalid_user_type"){
                              alert("Your user is not a "+(user_type==="CUSTOMER" ? "shopper":"seller"));
                            }
                            else{
                                alert("There was an error processing your request, please try again later");
                            }

                          }

                        }

            });
    }
