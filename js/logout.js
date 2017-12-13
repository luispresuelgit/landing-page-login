$(document).ready(function(){
  $("#logoutButton").click(function(){
      Cookies.remove("token");
      Cookies.remove("cards");
      Cookies.remove("username");
      location.href = "/home";
    }
  );
});
