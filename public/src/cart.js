

function navmenu() {
    window.location.href = "/menu";
}

function UpdatePrice(id, count, priceofitem) {
    let actualprice = count * priceofitem;
    /* window.location.href = `/cart/price/${actualprice}/${id}`; */
    let priceElementId = 'details-price-' + id;
    let priceElement = document.getElementById(priceElementId);
    priceElement.textContent = "Rs." + actualprice;
}
function pricecalc(value, price) {
    return price + value;
}
function decrement(id, price) {
    let quantityElementId = 'quantity-' + id;
    let quantityElement = document.getElementById(quantityElementId);
    let count = parseInt(quantityElement.textContent);
    count--;
    if (count > 0) {
        quantityElement.textContent = count;
    } else {
        count = 1;
        quantityElement.textContent = count;
    }
    let priceofitem = parseInt(price);
    console.log(typeof priceofitem);
    UpdatePrice(id, count, priceofitem);
}


function increment(id, price) {
    let quantityElementId = 'quantity-' + id;
    let quantityElement = document.getElementById(quantityElementId);
    let count = parseInt(quantityElement.textContent);
    count++;
    quantityElement.textContent = count;
    let priceofitem = parseInt(price);
    console.log(typeof priceofitem);
    UpdatePrice(id, count, priceofitem);
    /*   totalprice(id, priceofitem) */
}

let originalprice;
function handleclick(price) {
    originalprice = price;
}



document.addEventListener('DOMContentLoaded', function () {
    // Get all checkboxes with the class 'custom-checkbox'
    const checkboxes = document.querySelectorAll('.custom-checkbox');

    // Loop through each checkbox and add an event listener
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const label = document.querySelector(`label[for='${checkbox.id}']`);
            const number = checkbox.id;
            const clickedid = parseInt(number.match(/\d+/)[0], 10);


            const cartDataDiv = document.getElementById('cart-data-' + clickedid);
            const itemsJson = cartDataDiv.getAttribute('data-items');
            const items = JSON.parse(itemsJson);

            if (checkbox.checked) {

                label.style.setProperty('--bg-color', '#4CAF50'); 
                label.style.setProperty('--content', '"✔"');


                /* total calc */

                price = items.price;
                let value = 0;
                const fnprice = pricecalc(value, price);
                value = price;
                console.log("value:", value)
                document.querySelectorAll('.totalprice').forEach(function (element) {
                    element.textContent = fnprice;
                });

            } else {
                label.style.setProperty('--bg-color', '#ccc'); 
                label.style.setProperty('--content', '""'); 

                      /* total calc */
                      
                /*   document.querySelectorAll('.totalprice').forEach(function (element) {
                      element.textContent =0;
                  }); */
            }
        });
    });
});




/* LOGIN MESSAGE */

function clearUrlParams() {
    const url = new URL(window.location.href);
    url.search = ''; 
    window.history.replaceState({}, document.title, url.toString()); 
}


document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    const error = urlParams.get('error');

    if (message) {
        toastr.success(decodeURIComponent(message),{
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-center',
        });

        const audio = new Audio("/Assets/success3.mp3");
        audio.play();
        clearUrlParams();
    }

    if (error) {
        toastr.error(decodeURIComponent(error),  {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-center',
        });
        clearUrlParams();
        const audio = new Audio("/Assets/error4.mp3");
        audio.play();
    }
});





