$(document).ready(function() {
  $('form').attr('onsubmit', 'return true');
    $('form').submit(function(event) {
      event.preventDefault();
      var firstName_user = $('form :input[name=fname]').val();
      var lastName_user = $('form :input[name=lname]').val();
      var userName_user = $('form :input[name=email]').val();
      var password_user = $('form :input[type=password]').val();
      var password_confirm = $('form :input[id=text-yui_3_17_2_1_1509417288714_89069-field]').val();
      if(password_user == password_confirm){
        //Sign up user
        $.ajax({
                    type: "POST",
                    url: 'https://qick.co:8443/users', //Absolute route
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
                    error: function (data) {
                        if (data == undefined) {
                            alert("Error : 465");
                        }
                        else {
                            alert("Error : 466");
                        }
                    }
                });
        }else{
          alert("Passwords don't match. Try again");
        }
    });
});

function loginUser(usrn, pwd){
          $.ajax({
                      type: "POST",
                      url: 'https://qick.co:8443/auth/login',
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
}
