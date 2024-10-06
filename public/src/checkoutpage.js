

function callContact() {
  window.location.href = "/contact"
}



/* LOCAL STORAGE SECTIONS */

let userID;
/* let itemID;
let userName;
let itemName;
let itemType; */


const storedItems = JSON.parse(localStorage.getItem('cartItems'));
console.log(storedItems)
if (storedItems && storedItems.length > 0) {
  storedItems.forEach(item => {
    const itemElement = $(`
      <div class="order-item">
        <img src="${item.image}" alt="${item.name}" />
        
      <div class="order-details">
        <p class="order-name">${item.item_name}</p>
        <p class="order-type">(${item.type})</p>
        <p class="order-price">Price: ${item.price}</p>
        <p class="order-price">Updated Price: ${item.updatedprice}</p>
         <p class="order-price">Quantity: ${item.updatedprice / item.price}</p>
        
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
    isOrders = true;
    $(".btn-addr").prop("disabled", true);
    $(".delivery-charge,.delivery-charge-price").css({
      "text-decoration": "line-through",
      "text-decoration-color": "#399918",
      "text-decoration-thickness": "0.189rem"
    });
    $(".address-container").css("display", "none");
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
    $(".login-credentials .icon1").css("color", "white");

  } else {
    $(".login-details").css("display", "none");
    $(".login-credentials").css({
      "background-color": "#fff",
      "color": "black",
    });
    $(".login-credentials .icon1").css("color", "#399918");
    $(".btn-addr1").css("color", "black");
  }
}

let isOrders = false;
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
let isOpened = false;
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
    $(".address1 .icon1").css("color", "white");
    $(".address1").focus();
  }
}

let isEntered = true;
function paymentDetails() {
  const isdisabled = $('.payment-sections').css("display");
  if (isdisabled === "none" && isEntered) {
    $(".payment-sections").css("display", "flex");
    $(".payment-sections").focus();
    $(".gap").css("display", "none");
  }
  else {
    $(".payment-sections").css("display", "none");
  }

}



function upi() {

  const isAbled = $(".sub-sections").css("display");
  if (isAbled === "none") {
    $(".upi-section").css({
      "background-color": "#88D66C"
    });
    $(".sub-sections").css({
      "display": "flex",
    })
  } else {
    $(".upi-section").css({
      "background-color": ""
    });
    $(".sub-sections").css({
      "display": "",
    })
  }


}

$(".upiID").focus(function () {
  $(".upi-label").css({
    "top": "1.1rem",
    "left": "1rem",
    "font-size": "0.97rem",
    "background-color": "white"
  })
})

$(".upiID").blur(function () {
  $(".upi-label").css({
    "top": "",
    "left": "",
    "font-size": "",
    "background-color": ""
  })
})

function toggleCheckbox1() {
  const isAbled1 = $("#upi").prop("checked");
  const isAbled2 = $("#upi-id").prop("checked");
  console.log("isAbled", isAbled2)
  if (isAbled1) {
    $(".access-container").css("display", "block")
  } else {
    $(".access-container").css("display", "none")
  }
  if (isAbled2) {
    $("#upi-id").prop("checked", false);
    $(".upi-container").css("display", "none")
    /*     toggleCheckbox2() */
  }
}
function toggleCheckbox2() {
  const isAbled = $("#upi-id").prop("checked");
  console.log("is", isAbled)
  if (isAbled) {
    $(".upi-container").css("display", "flex")
  } else {
    $(".upi-container").css("display", "none")
  }
  if (isAbled) {
    $("#upi").prop("checked", false)
    $(".access-container").css("display", "none")
  }

}
document.querySelector(".total-pay-btn").textContent = `Pay ₹${totalPayable}`;


let valueName;
let valueMobile;
function continueCheckout1() {
  isOpened = true;
  valueName = $(".input-name").attr("value");
  valueMobile = $(".input-mobile").attr("value");
  isRunning = false;
  console.log("values from login:", valueMobile, valueName);
  if (valueName && valueMobile) {
    $(".login-details").css("display", "none");
    $(".login-credentials .btn-valid,.login-credentials .btn-modify").css("display", "flex");
    $(".login-credentials").css({
      "background-color": "white",
      "color": "",
      "justify-content": "space-between",
    });
    $(".btn-addr1").css("color", "#697565")
    $(".login-credentials .icon1").css("color", "#399918");



    addressDetails();
  } else {
    document.querySelector(".tovalidate").textContent = "* Fill all the fields";
  }

}
let userAddress;
function continueCheckout2() {
  isOpened = false;
  isOrders = true;
  const valueDoor = $(".input-addr1").attr("value");
  const valueStreet = $(".input-addr2").attr("value");
  const valueCity = $(".input-addr3").attr("value");
  const valuePincode = $(".input-addr4").attr("value");
  userAddress = valueDoor + "," + valueStreet + "," + valueCity + "," + valuePincode;
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



/* credit card sections */


function creditCard() {

  /* canceling if upi section is there */
  const isAbledupi = $(".sub-sections").css("display");
  if (isAbledupi === "flex") {
    upi();
  }


  const isAbled = $(".credit-card-details").css("display");
  if (isAbled === "none") {
    $(".card-section").css({
      "background-color": "#88D66C"
    });
    $(".credit-card-details").css({
      "display": "flex",
    })
  } else {
    $(".card-section").css({
      "background-color": ""
    });
    $(".credit-card-details").css({
      "display": "",
    })
  }
}

/* credit - card - section  input handle changes */
$(".card-no").focus(function () {
  $(".card-no-label").css({
    "top": "1.7rem",
    "left": "1rem",
    "font-size": "0.97rem",
    "background-color": "white"
  })
})
$(".card-cvv").focus(function () {
  $(".card-cvv-label").css({
    "top": "1.7rem",
    "left": "1rem",
    "font-size": "0.97rem",
    "background-color": "white"
  })
})

$(".card-no").blur(function () {
  $(".card-no-label").css({
    "top": "",
    "left": "",
    "font-size": "",
    "background-color": ""
  })
})
$(".card-cvv").blur(function () {
  $(".card-cvv-label").css({
    "top": "",
    "left": "",
    "font-size": "",
    "background-color": ""
  })
})




/* net - banking */

function netbanking() {
  const isAbled = $(".net-banking-sections").css("display");
  if (isAbled === "none") {
    $(".net-banking").css({
      "background-color": "#88D66C"
    });
    $(".net-banking-sections").css({
      "display": "flex",
    })

    const isAbledCredit = $(".credit-card-details").css("display");
    if (isAbledCredit === "flex") {
      creditCard();
    }
  } else {
    $(".net-banking").css({
      "background-color": ""
    });
    $(".net-banking-sections").css({
      "display": "",
    })
  }
}

function cashonD() {

  const isAbled = $(".COD-section").css("display");
  if (isAbled === "none") {
    $(".cashDelivery-section").css({
      "background-color": "#88D66C"
    });
    $(".COD-section").css({
      "display": "flex",
    });

    const isAbledNetBanking = $(".net-banking-sections").css("display");
    if (isAbledNetBanking === "flex") {
      netbanking();
    }

  } else {
    $(".cashDelivery-section").css({
      "background-color": ""
    });
    $(".COD-section").css({
      "display": "",
    })
  }

}

$(".captcha-input").focus(function () {
  $(".captcha-label").css({
    "top": "1rem",
    "left": "10.5rem",
    "font-size": "0.7rem",
    "background-color": "white"
  })
})
/* 
$(".captcha-input").blur(function () {
  $(".captcha-label").css({
    "top": "",
    "left": "",
    "font-size": "",
    "background-color": ""
  })
}) */

let captcha;
let captchaValue;
function captchaGenerator() {
  let n = Math.random();
  n = n * 900;
  n = Math.floor(n) + 100;
  document.querySelector(".captcha").textContent = n;
}

captchaGenerator();

$(".refresh").click(function () {
  captchaGenerator();

})

captcha = document.querySelector(".captcha").textContent;
console.log(captcha);

$(".captcha-input").focus(function () {
  let errorChecker = document.querySelector(".error-handler").textContent;
  if (errorChecker === 'Invalid Captcha') {
    errorChecker = document.querySelector(".error-handler").textContent = '';
  }
})
$(".captcha-input").change(function (event) {
  captchaValue = event.target.value;

  if (captchaValue) {
    $(".captcha-label").css({
      "top": "1rem",
      "left": "10.5rem",
      "font-size": "0.7rem",
      "background-color": ""
    })

  } else {
    $(".captcha-label").css({
      "top": "",
      "left": "",
      "font-size": "",
      "background-color": ""
    })

  }
})
function handlerCaptcha() {
  captcha = document.querySelector(".captcha").textContent;
  $(".captcha-input").attr("value", `${captchaValue}`)
  if (captcha === captchaValue) {
    window.location.href = "/menu";




    if (storedItems && storedItems.length > 0) {
      storedItems.forEach(item => {
        userID = `${item.user_id}`;
        itemUpdatedPrice = `${item.updatedprice}`;
        itemQuantity = `${item.updatedprice / item.price}`
        console.log(userID);
        console.log(itemUpdatedPrice);
        console.log(itemQuantity);
        console.log(valueMobile);
        console.log(userAddress);
        console.log(totalPayable);

        return confirm('Are  you sure to Confirm order ? ');

      });
    }

  } else {
    $(".captcha-input").val("");
    document.querySelector(".error-handler").textContent = "Invalid Captcha";
  }

}



