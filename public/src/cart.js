

function navmenu() {
    window.location.href = "/menu";
}
let originalAmt = [];
let totalAmt = [];
let ele = 0;
let sampleprice = 0;
function UpdatePrice(id, count, priceofitem) {
    let actualprice = count * priceofitem;
    let priceElementId = 'details-price-' + id;
    let priceElement = document.getElementById(priceElementId);
    priceElement.textContent = "Rs." + actualprice;
    originalAmt.push(actualprice);
    /*  sampleprice = actualprice; */
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
   
    let checkboxElementId = 'checkbox-' + id; 
    let checkboxElement = document.getElementById(checkboxElementId);

    if (checkboxElement && checkboxElement.checked) {
        console.log("Checkbox is checked, increment function will not run.");
        return;
    }

    console.log("id:", id);
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
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const label = document.querySelector(`label[for='${checkbox.id}']`);
            console.log("label;", label);
            const number = checkbox.id;
            const clickedid = parseInt(number.match(/\d+/)[0], 10);


            const cartDataDiv = document.getElementById('cart-data-' + clickedid);
            const itemsJson = cartDataDiv.getAttribute('data-items');
            const items = JSON.parse(itemsJson);
            console.log(items)

            let checkboxElementId = 'checkbox-' + clickedid;
            let checkboxElement = document.getElementById(checkboxElementId);
            let checkinc = 'incheck-' + clickedid; 

            if (checkbox.checked) {

                label.style.setProperty('--bg-color', '#4CAF50');
                label.style.setProperty('--content', '"✔"');

                if (checkboxElement && checkboxElement.checked) {
                   $('.checkboxbtn .cart-section-'+clickedid).css('box-shadow','0px 2px 5px 5px #4CAF50');
                    $(".price-content ." + checkinc).css("background-color", "grey");

                    price = items.price;
                    let value = 0;
                    if (originalAmt.length === 0) {
                        console.log("empty");
                        originalAmt.push(price);
                    }
                    const lastElement = originalAmt[originalAmt.length - 1];
                    value = price;
                    console.log("value:", value)
                    console.log("amt:", originalAmt)
                    originalAmt = [];
                    console.log("lastelement:", lastElement)
                    totalAmt.push(lastElement);
                    console.log("totalAmt:", totalAmt);


                    let total = totalAmt.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                    console.log("element:", total)
                    document.querySelectorAll('.totalprice').forEach(function (element) {
                        element.textContent = total;
                    });
                    console.log(originalAmt);


                    return;
                }


                /* total calc */





            } else {
                label.style.setProperty('--bg-color', '#ccc');
                label.style.setProperty('--content', '""');
                $(".price-content ." + checkinc).css("background-color", "#399918");
                $('.checkboxbtn .cart-section-' + clickedid).css('box-shadow', 'none');
              

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
        toastr.success(decodeURIComponent(message), {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top',
        });

        const audio = new Audio("/Assets/success3.mp3");
        audio.play();
        clearUrlParams();
    }

    if (error) {
        toastr.error(decodeURIComponent(error), {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top',
        });
        clearUrlParams();
        const audio = new Audio("/Assets/error4.mp3");
        audio.play();
    }
});





