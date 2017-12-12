var logged = Cookies.get('token');
if(logged == null){
  location.href = "/home";
}
