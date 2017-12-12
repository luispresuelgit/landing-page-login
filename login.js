$(document).ready(function() {
    $('#shopper-login').submit(function() {
        event.preventDefault();
        var usrn = $('#loginForm').children('input[name="username"]').val();
        var pwd = $('#loginForm').children('input[type="password"]').val();

        $.ajax({
                    type: "POST",
                    url: 'http://qick.co:8081/auth/login', //ruta absoluta
                    data: JSON.stringify({username:usrn,password:pwd}),
                    dataType: "json",
                    contentType: "application/json",

                    success: function (data) {
                        if (data == undefined) {
                            alert("Error : 219");
                        }
                        else{
                          alert("Login successful");
                            Cookies.set('token', data);
                            Cookies.set('username',usrn);

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
    });
});
