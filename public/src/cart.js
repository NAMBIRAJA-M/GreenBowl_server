

function navmenu() {
    window.location.href = "/menu";
}

let originalAmt = [];
let totalAmt = [];
let temptotal = [];
let ele = 0;
let sampleprice = 0;

function increment(id, price) {
    let checkboxElement = document.getElementById('checkbox-' + id);
    if (checkboxElement && checkboxElement.checked) {
        console.log("Checkbox is checked, increment function will not run.");
        return;
    }
    let quantityElement = document.getElementById('quantity-' + id);
    let count = parseInt(quantityElement.textContent);
    count++;
    quantityElement.textContent = count;
    let priceofitem = parseInt(price);
    UpdatePrice(id, count, priceofitem);
}

function decrement(id, price) {
    let quantityElement = document.getElementById('quantity-' + id);
    let count = parseInt(quantityElement.textContent);
    count--;
    if (count > 0) {
        quantityElement.textContent = count;
    } else {
        count = 1;
        quantityElement.textContent = count;
    }
    let priceofitem = parseInt(price);
    UpdatePrice(id, count, priceofitem);
}

function UpdatePrice(id, count, priceofitem) {
    let actualprice = count * priceofitem;
    let priceElement = document.getElementById('details-price-' + id);
    priceElement.textContent = "Rs." + actualprice;
    /*  originalAmt.push(actualprice); */
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

            let priceElement = document.getElementById('details-price-' + clickedid).textContent.trim().replace('Rs.', '');
            let price = parseInt(priceElement);
            console.log("PRICE ::", price);
            console.log("temporary total", temptotal[0]);

            if (checkbox.checked) {

                label.style.setProperty('--bg-color', '#4CAF50');
                label.style.setProperty('--content', '"✔"');

                if (checkboxElement && checkboxElement.checked) {
                    $('.checkboxbtn .cart-section-' + clickedid).css('box-shadow', '0px 2px 5px 5px #4CAF50');
                    $(".price-content ." + checkinc).css("background-color", "grey");

                    let totalElement=document.querySelector('.totalprice');
                    let totalele = parseInt(totalElement.textContent.trim());
                    console.log("total content",totalele);


                    total = totalele+price;

                   /*  originalAmt.push(price);
                    const lastElement = originalAmt[originalAmt.length - 1];

                    console.log("amt:", originalAmt);
                    originalAmt = [];
                    console.log("lastelement:", lastElement)
                    totalAmt.push(lastElement);
                    console.log("totalAmt:", totalAmt);
 */
                  /*   let total = totalAmt.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                    console.log("element:", total)
                    temptotal.push(total);
 */


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
                totalAmt = [];
                let totalElement=document.querySelector('.totalprice');
                let total = parseInt(totalElement.textContent.trim());
                console.log("total sub", total);
                if (total >= price) {
                    finaltotal = total - price;
                    console.log("FinalTotal", finaltotal);

                    document.querySelectorAll('.totalprice').forEach(function (element) {
                        element.textContent = finaltotal;
                    });
                }
                else{
                    console.log('error from total')
                }
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





