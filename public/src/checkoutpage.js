const storedItems = JSON.parse(localStorage.getItem('cartItems'));

if (storedItems && storedItems.length > 0) {
  storedItems.forEach(item => {
    const itemElement = $(`
      <div class="order-item">
        <img src="${item.image}" alt="${item.name}" />
        
      <div class="order-details">
        <p class="order-name">${item.item_name}</p>
        <p class="order-type">(${item.type})</p>
        <p class="order-price">Price: ${item.price}</p>
        </div>
      </div>
    `);


    $(".orders-section").append(itemElement);

    $(".input-name").attr("value", `${item.name}`)


  });
} else {
  const itemElement = $(`
    <p>'No items found in localStorage'</p>
    `);
  $(".orders-section").append(itemElement);
}


document.addEventListener('DOMContentLoaded', function () {
  const valueName = $(".input-name").attr("value");
  const valueMobile = $(".input-name").attr("value");
  if (valueName) {
    $("#name").css({
      "top": "-0.99rem",
      "background-color": "white",
      "font-size": "1.2rem"
    });
  } else {
    $("#name").css({
      "top": "0.8rem",
      "background-color": "transparent",
      "font-size": " "
    });
  }
});



/* PRICE DETAILS */
const packageingPrice = 30;
const deliveryCharge = 40;

const storedTotal = Number(localStorage.getItem('FinalTotal'));
console.log(storedTotal);
const storedOrders = Number(localStorage.getItem('orders'))
document.querySelector(".Total-price").textContent = `Rs.${storedTotal}`;
document.querySelector(".price-orders").textContent = `Price(${storedOrders} item)`;

let totalPayable;
totalPayable = storedTotal + deliveryCharge + packageingPrice;
document.querySelector(".total-payable").textContent = `Rs.${totalPayable}`;


$(".deliverymode").click(function () {
  $(".address1").toggleClass("extracss");
  const isdisabled = $('.btn-addr').prop("disabled")

  if (isdisabled) {
    $(".btn-addr").prop("disabled", false);
    $(".delivery-charge,.delivery-charge-price").css("text-decoration", "");
    totalPayable = storedTotal + deliveryCharge + packageingPrice;
    document.querySelector(".total-payable").textContent = `Rs.${totalPayable}`;
  } else {
    $(".btn-addr").prop("disabled", true);
    $(".address-container").removeClass("open")
    $(".delivery-charge,.delivery-charge-price").css({
      "text-decoration": "line-through",
      "text-decoration-color": "#399918",
      "text-decoration-thickness": "0.189rem"
    });
    totalPayable = storedTotal + packageingPrice;
    document.querySelector(".total-payable").textContent = `Rs.${totalPayable}`;


  }

});
let isRunning = true;
function logincredentials() {
  const isdisabled = $('.login-details').css("display");
  if (isdisabled === "none" && isRunning) {
    $(".login-details").css("display", "flex");
    $(".login-credentials").css({
      "background-color": " #88D66C",
      "color": "white",
    });
    $(".login-credentials .icon1").css("color", "white")
  } else {
    $(".login-details").css("display", "none");
    $(".login-credentials").css({
      "background-color": "",
      "color": "",
    });
    $(".login-credentials .icon1").css("color", "#399918")
  }
}
function ordersSummary() {
  const isdisabled = $('.orders-section').css("display");
  if (isdisabled === "none") {
    $(".orders-section").css("display", "flex");
    $(".summary").css({
      "background-color": " #88D66C",
      "color": "white",
    });
    $(".summary .icon1").css("color", "white")
  }
  else {
    $(".orders-section").css("display", "none");
    $(".summary").css({
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
    $(".address1").css({
      "background-color": " #88D66C",
      "color": "white",
    });
    $(".address1 .icon1").css("color", "white")
  }
  else {
    $(".address-container").css("display", "none");
    $(".address1").css({
      "background-color": "",
      "color": "",
    });
    $(".address1 .icon1").css("color", "#399918")
  }
}

function handleChange() {

}

function continueCheckout1() {
  const valueName = $(".input-name").attr("value");
  const valueMobile = $(".input-mobile").attr("value");
  isRunning = false;
  console.log("values from login:", valueMobile, valueName);
  if(valueName && valueMobile){
  $(".login-details").css("display", "none");
  $(".login-credentials .btn-valid,.btn-modify").css("display", "flex");
  $(".login-credentials").css({
    "background-color": " #E3E1D9",
    "color": "#939185",
  });
  $(".login-credentials .icon1").css("color", "#399918");

}else{
  document.querySelector(".tovalidate").textContent="* Fill all the fields";
}


}
/* INPUT - LABEL FORM */
/* const inputlabelid = $ */

const label = $("#name");
$(".forms-container input,.forms-container textarea").focus(function (event) {
  const id = event.target.id;
  console.log(id);
  $("#" + id).css({
    "top": "-0.99rem",
    "background-color": "white",
    "font-size": "1.2rem",
    "color":"#399918"
  });
});
/*  */

$(".forms-container input,.forms-container textarea").change(function (event) {
  const inputvalue = event.target.value;
  const id = event.target.id;
  console.log(id);
   if(id === "mobile"){
  $(".input-mobile").attr("value", `${inputvalue}`);
  const valueMobile = $(".input-mobile").attr("value");
  console.log(valueMobile);
   }else{
    $(".input-name").attr("value", `${inputvalue}`)
    const valueName = $(".input-name").attr("value");
    console.log(valueName);
   }

  if (!inputvalue) {
    $("#" + id).css({
      "top": "0.8rem",
      "background-color": "transparent",
      "font-size": " ",
      "color":" ",
    });
  }
  else {
    $("#" + id).css({
      "top": "-0.99rem",
      "background-color": "white",
      "font-size": "1.2rem",
      "color":"#399918"
  
    });
  }
/*   if (!inputvalue) {
    console.log("excecuting")
    $("#" + id).css({
      "top": "0.8rem",
      "background-color": "transparent",
      "font-size": " "
    });
  }
 */
});


/* const isdisabled = $('.btn-addr').prop("disabled");
if (isdisabled) {
  totalPayable = storedTotal + packageingPrice;
} else {
 
} */




