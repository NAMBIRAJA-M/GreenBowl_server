
/* function increment(count) {
    count++;
    console.log(count);
    console.log("function called");
}

function decrement() {
    count--;
    console.log(count);
        const count=1
    count++; 
    console.log(count) 
}
 */
const priceItem = document.getElementById('cart-data');
const priceofitem = JSON.parse(priceItem.getAttribute('data-items'));

function UpdatePrice(count) {
    let actualprice = count * priceofitem.price;
    $(".details-price").text("Rs." + actualprice);
    console.log(actualprice);
}


$(".decrement").click(() => {

    let count = parseInt($(".quantity").text(), 10); // Converting text to integer
    count--;
    if (count < 0) {

    } else {
        $(".quantity").text(count);

        UpdatePrice(count);
    }

})
$(".increment").click(() => {
    let count = parseInt($(".quantity").text(), 10);
    count++;
    $(".quantity").text(count);
    UpdatePrice(count);

});
