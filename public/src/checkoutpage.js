$(".deliverymode").click(function () {
    const isdisabled = $('.address').prop("disabled")

    if (isdisabled) {
        $(".address").prop("disabled", false);
    } else {
        $(".address").prop("disabled", true);
    }

});


function addressDetails(){
  $(".address1").click(function(){
    $(".address-container").toggleClass("open")
  })
}