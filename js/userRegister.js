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
                      error: function (data) {
                          if (data == undefined) {
                              alert("Error : 465");
                          }
                          else {
                              alert("Either your password or username are wrong");
                          }
                      }
          });
}
