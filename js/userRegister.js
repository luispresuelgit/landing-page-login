
function userRegistration(){

  var firstName_user = $("#firstName").val();
  var lastName_user = $("#lastName").val();
  var userName_user = $("#username").val();
  var password_user = $("#password").val();

  //Sign up user
  $.ajax({
              type: "POST",
              url: 'http://qick.co:8081/users', //Absolute route
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
                      console.log("Se registro, falta autenticarlo");
                      console.log(data['username'],data['password']);
                      //setTimeout(loginUser(data['username'], password_user), 3000);
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
          //Loggearse y almacenar el token en una Cookie
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
                              location.href = "Addedcards.html";
                          }
                      },
                      error: function (data) {
                          if (data == undefined) {
                              alert("Error : 465");
                          }
                          else {
                              $("#alert-box").show();
                          }
                      }
          });
}
