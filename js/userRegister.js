$(document).ready(function() {
  $.getScript("https://rawgit.com/luispresuelgit/landing-page-login/master/js/global_variables.js")
    .done(function( script, textStatus ) {
      console.log( textStatus );
    })
    .fail(function( jqxhr, settings, exception ) {
      console.log("Missing globlal variables")
  });

  $('form').attr('onsubmit', 'return true');
    $('form').submit(function(event) {
      event.preventDefault();
      var firstName_user = $('form :input[name=fname]').val();
      var lastName_user = $('form :input[name=lname]').val();
      var userName_user = $('form :input[name=email]').val();
      var password_user = $('form :input[type=password]').val();
      var password_confirm = $('form :input[id=password-yui_3_17_2_1_1513569220138_17934-field]').val();
      if(password_user == password_confirm){
        //Sign up user
        $.ajax({
                    type: "POST",
                    url: QCS+'/users', //Absolute route
                    data: JSON.stringify({
                      firstname:firstName_user,
                      lastname:lastName_user,
                      username:userName_user,
                      password:password_user
                    }),
                    dataType: "json",
                    contentType: "application/json",

                    success: function (data) {
                        if (data == undefined) {
                            alert("Error : 219");
                        }
                        else{
                            loginUser(data['username'], password_user);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                      var catchedError = JSON.parse(jqXHR.responseText);

                      try{
                        if(catchedError.error.details[0].code === "username_taken"){
                          swal(
                                'Something went wrong',
                                'Username or Email is already used',
                                'error'
                              );
                        }
                        else {
                          swal(
                                'Oops',
                                'There was an error processing your request, please try again later',
                                'error'
                              );
                        }
                      }
                      catch(err){
                        if(catchedError.error.details[0].code === "username_taken"){
                          alert("Username or Email is already used");
                        }
                        else {
                          alert("There was an error processing your request, please try again later");
                        }
                      }

                  }
                });
        }else{
          alert("Passwords don't match. Try again");
        }
    });
});

function loginUser(usrn, pwd){
          user_type = "MERCHANT"
          $.ajax({
                      type: "POST",
                      url: QCS+'/auth/login?user_type='+user_type,,
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
}
