$('#myForm').submit(function() {
  event.preventDefault();
  var usrn = $('#shopper-login').children('input[name="email"]');
  var pwd = $('#password-yui_3_17_2_1_1509249008972_105948-field').val();
  console.log(usrn);
  console.log(pwd);
            
}