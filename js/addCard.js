$(document).ready(function() {
  $.getScript("https://rawgit.com/luispresuelgit/landing-page-login/master/js/global_variables.js")
    .done(function( script, textStatus ) {
      getCardsFromServer();
      console.log( textStatus );
    })
    .fail(function( jqxhr, settings, exception ) {
      console.log("Missing globlal variables")
  });
});

function errorMessage(){
  swal(
  'Oops...',
  'Something went wrong!',
  'error'
  );
}

function getCardsFromServer(){

  var sessionToken = JSON.parse(Cookies.get('token'));
  $.ajax({
    type: "GET",
    url: QCS+'/cards',
    headers: {
      Authorization: 'Bearer '+sessionToken['token']
    },

    success: function (data) {
        if (data == undefined) {
            alert("Error : 219");
        }
        else {
            Cookies.set('cards',data);
            postCardsToPage();
        }
    },
    error: function (data) {
        if (data == undefined) {
            alert("Error : 465");
        }
        else {
            alert("Error : 466");
            console.log(data);

        }
    }

  });
}

function openCardForm(){
  location.href = "/add-cards";
}


function postCardsToPage(){

  var cardsObj = JSON.parse(Cookies.get('cards'));

  if(jQuery.isEmptyObject(cardsObj)){
    $(".loader").hide();
    $("#cards-display-tmp").html("No cards added yet");
  }

    $.templates({cardsTmp: "#cards-display-tmp"});
    cards = {cardsObj};
    var html;
    html = $.templates.cardsTmp.render(cards);
    $(".loader").hide();
    $("#cards").show();
    $("#cards").html(html);

}

function setDefault(card_id_div){
  $("#cards").hide();
  $(".loader").show();
  var sessionToken = JSON.parse(Cookies.get('token'));
  card_id = card_id_div.getAttribute('id');

    $.ajax({
      type: "PATCH",
      url: 'https://qick.co:8443/cards/'+card_id,
      headers: {
        Authorization: 'Bearer '+sessionToken['token'],
      },
      data:{"default":"true"},
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
          if (data == undefined) {
              alert("Error : 219");
          }
          else {
              getCardsFromServer();
          }
      },
      error: function (data) {
          if (data == undefined) {
            errorMessage();
          }
          else {
              errorMessage();
          }
      }
    });
}
function cardDeleteAlert(card_id_div){
  console.log("Preparando para borrar en el servidor");
  console.log(card_id_div);
  swal({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      swal(
        'Deleted!',
        'Your card has been deleted.',
        'success'
      ),
        cardDelete(card_id_div)
    }
  });
}

function cardDelete(card_id_div){
  $("#cards").hide();
  $(".loader").show();
  var sessionToken = JSON.parse(Cookies.get('token'));
  card_id = card_id_div.getAttribute('id');
    $.ajax({
      type: "DELETE",
      url: 'https://qick.co:8443/cards/'+card_id,
      headers: {
        Authorization: 'Bearer '+sessionToken['token'],
      },
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
          if (data == undefined) {
              alert("Error : 219");
          }
          else {
              getCardsFromServer();
          }
      },
      error: function (data) {
          if (data == undefined) {
            errorMessage();
          }
          else{
                  errorMessage();
              }
          }
        });
}
