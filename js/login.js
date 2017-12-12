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
