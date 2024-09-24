

function navmenu() {
    window.location.href = "/menu";
}
function callCheckout() {
    window.location.href = "/deliveryService";
}


let orderCount = 0;
let clickedItems = [];
console.log("type", typeof clickedItems, "checking", Array.isArray(clickedItems));

function addOrder() {
    orderCount++;
    document.querySelector('.orders-count').textContent = `Your Orders (${orderCount})`;
    localStorage.setItem('orders',orderCount)
}


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

}
let items;
document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const label = document.querySelector(`label[for='${checkbox.id}']`);
            /*     console.log("label;", label); */
            const number = checkbox.id;
            const clickedid = parseInt(number.match(/\d+/)[0], 10);

            const cartDataDiv = document.getElementById('cart-data-' + clickedid);
            const itemsJson = cartDataDiv.getAttribute('data-items');
            items = JSON.parse(itemsJson);
            /*   console.log("data",items); */
            clickedItems.push(items);
            console.log("dataArray", clickedItems);
            const clickedDishes = [];
            clickedDishes.push(items);
            localStorage.setItem('cartItems', JSON.stringify(clickedItems));

            console.log('Data stored in localStorage');

            let checkboxElementId = 'checkbox-' + clickedid;
            let checkboxElement = document.getElementById(checkboxElementId);
            let checkinc = 'incheck-' + clickedid;

            let priceElement = document.getElementById('details-price-' + clickedid).textContent.trim().replace('Rs.', '');
            let price = parseInt(priceElement);
            /*        console.log("PRICE ::", price); */

            if (checkbox.checked) {

                label.style.setProperty('--bg-color', '#4CAF50');
                label.style.setProperty('--content', '"✔"');

                if (checkboxElement && checkboxElement.checked) {

                    $('.checkboxbtn .cart-section-' + clickedid).css('box-shadow', '0px 2px 5px 5px #4CAF50');
                    $(".price-content ." + checkinc).css("background-color", "grey");

                    let totalElement = document.querySelector('.totalprice');
                    let totalele = parseInt(totalElement.textContent.trim());
                    total = totalele + price;
                    document.querySelectorAll('.totalprice').forEach(function (element) {
                        element.textContent = total;
                    });
                    const AnnualTotal = total;
                    localStorage.setItem('FinalTotal', AnnualTotal);
                    addOrder();
                    /*                 console.log("total price", total); */
                    return;
                }
            } else {
                label.style.setProperty('--bg-color', '#ccc');
                label.style.setProperty('--content', '""');
                $(".price-content ." + checkinc).css("background-color", "#399918");
                $('.checkboxbtn .cart-section-' + clickedid).css('box-shadow', 'none');
                totalAmt = [];
                let totalElement = document.querySelector('.totalprice');
                let total = parseInt(totalElement.textContent.trim());
                /*  console.log("total sub", total); */
                if (total >= price) {
                    finaltotal = total - price;
                    console.log("FinalTotal", finaltotal);
                    document.querySelectorAll('.totalprice').forEach(function (element) {
                        element.textContent = finaltotal;
                    });
                    const AnnualTotal = finaltotal;
                    localStorage.setItem('FinalTotal', AnnualTotal);
                }
                else {
                    console.log('error from total')
                }
            }
        });
    });
});

/* 
function getCartItems(items) {
    return items;
} */
/* export const getCartItems = (items) => {
    return items;
  };
   */
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
