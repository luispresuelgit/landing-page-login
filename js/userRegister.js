
function userRegistration(){

  var firstName_user = $("#firstName").val();
  var lastName_user = $("#lastName").val();
  var userName_user = $("#username").val();
  var password_user = $("#password").val();

  //Sign up user
  $.ajax({
              type: "POST",
              url: 'https://qick.co:8443/auth/login', //Absolute route
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
}
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
