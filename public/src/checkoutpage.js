

$(".deliverymode").click(function () {
  $(".btn-addr").toggleClass("extracss");


  const isdisabled = $('.btn-addr').prop("disabled")

  if (isdisabled) {
    $(".btn-addr").prop("disabled", false);
  } else {
    $(".btn-addr").prop("disabled", true);
    $(".address-container").removeClass("open")
  }

});

function logincredentials() {
  const isdisabled = $('.login-container').css("display");
  if (isdisabled === "none") {
    $(".login-container").css("display", "block");
    $(".btn-addr1").css({
      "background-color": " #88D66C",
      "color": "white",
    });
    $(".login-credentials .icon1").css("color", "white")
  } else {
    $(".login-container").css("display","none");
    $(".btn-addr1").css({
      "background-color": "",
      "color": "",
    });
    $(".login-credentials .icon1").css("color", "#399918")
  }
}
function ordersSummary() {
  const isdisabled = $('.orders-section').css("display");
  if (isdisabled === "none") {
    $(".orders-section").css("display", "block");
    $(".btn-addr2").css({
      "background-color": " #88D66C",
      "color": "white",
    });
    $(".summary .icon1").css("color", "white")
  }
  else {
    $(".orders-section").css("display", "none");
    $(".btn-addr2").css({
      "background-color": "",
      "color": "",
    });
    $(".summary .icon1").css("color", "#399918")
  }
}
function addressDetails() {
  const isdisabled = $('.address-container').css("display");
  if (isdisabled === "none") {
    $(".address-container").css("display", "flex");
    $(".btn-addr").css({
      "background-color": " #88D66C",
      "color": "white",
    });
    $(".address1 .icon1").css("color", "white")
  }
  else {
    $(".address-container").css("display", "none");
    $(".btn-addr").css({
      "background-color": "",
      "color": "",
    });
    $(".address1 .icon1").css("color", "#399918")
  }
}


/* INPUT - LABEL FORM */
const inputlabelid = $

const label = $("#name");
$(".forms-container input,.forms-container textarea").focus(function (event) {
  const id = event.target.id;
  console.log(id);
  $("#" + id).css({
    "top": "-0.99rem",
    "background-color": "white",
    "font-size": "1.2rem"
  });
});
/*  */

$(".forms-container input,.forms-container textarea").change(function (event) {
  const inputvalue = event.target.value;
  const id = event.target.id;
  console.log(id);
  console.log(inputvalue)

  if (!inputvalue) {
    $("#" + id).css({
      "top": "0.8rem",
      "background-color": "transparent",
      "font-size": " "
    });
  }
  else {
    $("#" + id).css({
      "top": "-0.99rem",
      "background-color": "white",
      "font-size": "1.2rem"
    });
  }
  if (!inputvalue) {
    console.log("excecuting")
    $("#" + id).css({
      "top": "0.8rem",
      "background-color": "transparent",
      "font-size": " "
    });
  }

});



