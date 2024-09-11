

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
    // Get the checkbox element for the current item

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
    // Get all checkboxes with the class 'custom-checkbox'
    const checkboxes = document.querySelectorAll('.custom-checkbox');

    // Loop through each checkbox and add an event listener
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

            let checkboxElementId = 'checkbox-' + clickedid; // Assuming the checkbox has an ID like 'checkbox-1'
            let checkboxElement = document.getElementById(checkboxElementId);
            let checkinc = 'incheck-' + clickedid; // This generates the ID you want to target

            if (checkbox.checked) {

                label.style.setProperty('--bg-color', '#4CAF50');
                label.style.setProperty('--content', '"✔"');

                if (checkboxElement && checkboxElement.checked) {
                    $(".price-content ." + checkinc).css("background-color", "grey");
                    
                    return;
                }


                /* total calc */
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



               

            } else {
                label.style.setProperty('--bg-color', '#ccc');
                label.style.setProperty('--content', '""');
                $(".price-content ." + checkinc).css("background-color", "#399918");

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





