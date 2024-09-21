
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


function addressDetails(){
  $(".btn-addr").click(function(){
    $(".address-container").toggleClass("open")
  })
}


/* INPUT - LABEL FORM */
const inputlabelid= $

const label=$("#name");
$(".forms-container input,.forms-container textarea").focus(function (event){
  const id=event.target.id;
  console.log(id);
  $("#"+id).css({
    "top": "-0.99rem",
    "background-color": "white",
    "font-size": "1.2rem"
});
});
$(".forms-container input,.forms-container textarea").blur(function (event){
  const id=event.target.id;
  console.log(id);
  $("#"+id).css({
    "top": "0.8rem",
    "background-color": "transparent",
    "font-size": " "
});
})