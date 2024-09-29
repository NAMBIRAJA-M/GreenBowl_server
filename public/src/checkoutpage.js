
/* LOCAL STORAGE SECTIONS */

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
  const btnElement = $(`<button class="commonbtn btn-login" onclick="continueCheckout3()">Continue</button>`);
  $(".orders-section").append(btnElement);
} else {
  const itemElement = $(`
    <p>'No items found in localStorage'</p>
    `);
  $(".orders-section").append(itemElement);
}

/* END..! */


/* LOGIN NAME SECTION */

document.addEventListener('DOMContentLoaded', function () {
  const valueName = $(".input-name").attr("value");
  if (valueName) {
    $("#name").css({
      "top": "-0.99rem",
      "background-color": "white",
      "font-size": "1.2rem",
      "color": "#399918",
    });
    $(".input-name").css({
      "outline": "none",
      "border": "none",
      "box-shadow": "0 0 0 0.2rem #399918"
    })

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

function handleChange1() {
  isRunning = true;
  $(".login-credentials .btn-valid,.login-credentials .btn-modify").css("display", "");
  $(".btn-addr1").css("color", "")

}
function handleChange2() {
  isOpened = true;
  $(".address1 .btn-valid,.address1 .btn-modify").css("display", "");
  $(".btn-addr").css("color", "")
}

function handleChange3() {
  isOrders = true;
  $(".summary .btn-valid,.summary .btn-modify").css("display", "");
  $(".btn-addr2").css("color", "")
}

/* CHECK BOX SECTION */

let isChecked = false;
$(".deliverymode").click(function () {
  $(".address1").toggleClass("extracss");
  const isdisabled = $('.btn-addr').prop("disabled");

  if (isdisabled) {
    isChecked = false;
    $(".btn-addr").prop("disabled", false);
    $(".delivery-charge,.delivery-charge-price").css("text-decoration", "");
    totalPayable = storedTotal + deliveryCharge + packageingPrice;
    document.querySelector(".total-payable").textContent = `Rs.${totalPayable}`;
  } else {
    isChecked = true;
    $(".btn-addr").prop("disabled", true);
    $(".delivery-charge,.delivery-charge-price").css({
      "text-decoration": "line-through",
      "text-decoration-color": "#399918",
      "text-decoration-thickness": "0.189rem"
    });
    totalPayable = storedTotal + packageingPrice;
    document.querySelector(".total-payable").textContent = `Rs.${totalPayable}`;
  }

});

/* CHECKOUT SECTIONS */

let isRunning = true;
function logincredentials() {
  const isdisabled = $('.login-details').css("display");
  if (isdisabled === "none" && isRunning) {
    $(".login-details").css("display", "flex");
    $(".login-credentials").css({
      "background-color": " #88D66C",
    });
    $(".btn-addr1").css("color", "white");
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

let isOrders=false;
function ordersSummary() {
  const isdisabled = $('.orders-section').css("display");
  if (isdisabled === "none" && isOrders) {
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
let isOpened=false;
function addressDetails() {
  const isdisabled = $('.address-container').css("display");

  if (isdisabled === "flex" && !isChecked) {
    $(".address-container").css("display", "none");
    $(".address1").css({
      "background-color": "",
      "color": "",
    });
    $(".address1 .icon1").css("color", "#399918")
  }
  else if (isdisabled === "flex" && isChecked) {
    $(".address-container").css("display", "none");
    $(".address1").css({
      "background-color": "",
      "color": "",
    });
    $(".address1 .icon1").css("color", "#399918")
  }
  else if (isdisabled === "none" && isChecked) {
    $(".address-container").css("display", "none");
    $(".address1").css({
      "background-color": "",
      "color": "",
    });
    $(".address1 .icon1").css("color", "#399918")
  }
  else if (isdisabled === "none" && isOpened) {
    $(".address-container").css("display", "flex");
    $(".address1").css({
      "background-color": " #88D66C",
      "color": "white",
    });
    $(".address1 .icon1").css("color", "white")
  }
}

function paymentDetails(){
  
}


function continueCheckout1() {
  isOpened = true;
  const valueName = $(".input-name").attr("value");
  const valueMobile = $(".input-mobile").attr("value");
  isRunning = false;
  console.log("values from login:", valueMobile, valueName);
  if (valueName && valueMobile) {
    $(".login-details").css("display", "none");
    $(".login-credentials .btn-valid,.login-credentials .btn-modify").css("display", "flex");
    $(".login-credentials").css({
      "background-color": "",
      "color": "",
      "justify-content": "space-between",
    });
    $(".btn-addr1").css("color", "#697565")
    $(".login-credentials .icon1").css("color", "#399918");

    /* address */
    $(".address-container").css("display", "flex");
    $(".address1").css({
      "background-color": " #88D66C",
      "color": "white",
    });
    $(".address1 .icon1").css("color", "white")

  } else {
    document.querySelector(".tovalidate").textContent = "* Fill all the fields";
  }

}

function continueCheckout2() {
  isOpened = false;
  isOrders = true;
  const valueDoor = $(".input-addr1").attr("value");
  const valueStreet = $(".input-addr2").attr("value");
  const valueCity = $(".input-addr3").attr("value");
  const valuePincode = $(".input-addr4").attr("value");
  isOpened = false;
  console.log("values from address:", valueDoor, ",", valueStreet, ",", valueCity, ",", valuePincode);

  if (valueDoor && valueStreet && valueCity && valuePincode) {
    $(".address1 .btn-valid,.address1 .btn-modify").css("display", "flex");
    $(".address-container").css("display", "none");
    $(".address1").css({
      "background-color": "",
      "color": "",
      "justify-content": "space-between"
    });
    $(".btn-addr").css("color", "#697565")
    $(".address1 .icon1").css("color", "#399918");

    /* summary */
    $(".orders-section").css("display", "flex");
    $(".summary").css({
      "background-color": " #88D66C",
      "color": "white",
    });
    $(".summary .icon1").css("color", "white");

  }
  else {
    document.querySelector(".address-container .tovalidate").textContent = "* Fill all the fields";
  }
}
function continueCheckout3() {
  isOrders = false;
  $(".orders-section").css("display", "none");
  $(".summary .btn-valid,.summary .btn-modify").css("display", "flex");
  $(".summary").css({
    "background-color": "",
    "color": "",
    "justify-content": "space-between"
  });
  $(".btn-addr2").css("color", "#697565")
  $(".summary .icon1").css("color", "#399918")
}








/* INPUT - LABEL FORM */


const label = $("#name");
$(".forms-container input,.forms-container textarea").focus(function (event) {
  const id = event.target.id;
  $("#" + id).css({
    "top": "-0.99rem",
    "background-color": "white",
    "font-size": "1.2rem",
    "color": "#399918"
  });
});
/*  */

$(".forms-container input,.forms-container textarea").change(function (event) {
  const inputvalue = event.target.value;
  const id = event.target.id;
  console.log("input value:", inputvalue)
  console.log("id:", id)
  if (id === "mobile") {
    $(".input-mobile").attr("value", `${inputvalue}`);
    $(".input-mobile").css({
      "outline": "none",
      "border": "none",
      "box-shadow": "0 0 0 0.2rem #399918"
    })
  } else if (id === "name") {
    $(".input-name").attr("value", `${inputvalue}`)
    $(".input-name").css({
      "outline": "none",
      "border": "none",
      "box-shadow": "0 0 0 0.2rem #399918"
    })
  }
  else if (id === "doorno") {
    $(".input-addr1").attr("value", `${inputvalue}`)
    $(".input-addr1").css({
      "outline": "none",
      "border": "none",
      "box-shadow": "0 0 0 0.2rem #399918"
    })
  } else if (id === "Street") {
    $(".input-addr2").attr("value", `${inputvalue}`)
    $(".input-addr2").css({
      "outline": "none",
      "border": "none",
      "box-shadow": "0 0 0 0.2rem #399918"
    })
  } else if (id === "city") {
    $(".input-addr3").attr("value", `${inputvalue}`)
    $(".input-addr3").css({
      "outline": "none",
      "border": "none",
      "box-shadow": "0 0 0 0.2rem #399918"
    })
  } else if (id === "pincode") {
    $(".input-addr4").attr("value", `${inputvalue}`)
    $(".input-addr4").css({
      "outline": "none",
      "border": "none",
      "box-shadow": "0 0 0 0.2rem #399918"
    })
  }/*  */

  if (!inputvalue) {
    $("#" + id).css({
      "top": "0.8rem",
      "background-color": "transparent",
      "font-size": " ",
      "color": " ",
    });
  }
  else {
    $("#" + id).css({
      "top": "-0.99rem",
      "background-color": "white",
      "font-size": "1.2rem",
      "color": "#399918",
    });
  }

});




