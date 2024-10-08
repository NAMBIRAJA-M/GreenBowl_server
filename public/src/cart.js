

function navmenu() {
    window.location.href = "/menu";
}
function callCheckout() {
    if (orderCount>0){
    window.location.href = "/deliveryService";
    }else{

    }
}


let orderCount = 0;
let clickedItems = [];
console.log("type", typeof clickedItems, "checking", Array.isArray(clickedItems));

function addOrder() {
    orderCount++;
    document.querySelector('.orders-count').textContent = `Your Orders (${orderCount})`;
    localStorage.setItem('orders', orderCount)
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
            console.log("clicked id", clickedid)

            const cartDataDiv = document.getElementById('cart-data-' + clickedid);
            const itemsJson = cartDataDiv.getAttribute('data-items');
            console.log(typeof itemsJson);
            items = JSON.parse(itemsJson);




            let checkboxElementId = 'checkbox-' + clickedid;
            let checkboxElement = document.getElementById(checkboxElementId);
            let checkinc = 'incheck-' + clickedid;

            let priceElement = document.getElementById('details-price-' + clickedid).textContent.trim().replace('Rs.', '');
            let price = parseInt(priceElement);  /* incremented price */
          

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

                    clickedItems.push(items);
                    const itemIndex = clickedItems.findIndex(item => item.item_id === clickedid);
                    if (itemIndex !== -1) {
                        clickedItems[itemIndex].updatedprice = price;
                    }
                    console.log("dataArray", clickedItems);
                    /* pushing data to local storage */
        
                    localStorage.setItem('cartItems', JSON.stringify(clickedItems));
        
                    console.log('Data stored in localStorage');

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

                console.log("removing id", clickedid);
            
                let myArray = JSON.parse(localStorage.getItem('cartItems'));
                console.log("myarray",myArray);


                let updatedArray = myArray.filter(item => item.item_id !== clickedid);
                localStorage.removeItem('cartItems');
                localStorage.setItem('cartItems', JSON.stringify(updatedArray));


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
        toastr.success(decodeURIComponent(message), '', { 
            timeOut: 2000,
            positionClass: 'toast-top-center',
        });

        const audio = new Audio("/Assets/success3.mp3");
        audio.play();
        clearUrlParams();
    }

    if (error) {
        toastr.error(decodeURIComponent(error), '', { 
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
