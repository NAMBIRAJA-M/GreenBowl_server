//MENUCARD
$(".nav-links .menus").click(function () {
    $(".nav-links .menucard").toggleClass("menucard-js");
});

$(document).click(function (event) {
    if (!$(event.target).closest('.menus').length) {
        $(".nav-links .menucard").removeClass("menucard-js");
    }
});

//caret up and down

$(".proteinbowl .section-heading,.proteinbowl .caret-styles").click(function () {
    $(".proteinbowl .caret-styles").toggleClass("caret-styles-js");
    $(".proteinbowl .section-container").toggleClass("section-container-js");
});
$(".vegsalads .section-heading,.vegsalads .caret-styles").click(function () {
    $(".vegsalads .caret-styles").toggleClass("caret-styles-js")
    $(".vegsalads .section-container").toggleClass("section-container-js")
});
$(".nonvegsalads .section-heading,.nonvegsalads .caret-styles").click(function () {
    $(".nonvegsalads .caret-styles").toggleClass("caret-styles-js")
    $(".nonvegsalads .section-container").toggleClass("section-container-js")
});

//loginpathway
$(".nav-links .btnpress").click(function () {
    $(".loginway").toggleClass("hidden1");
});

$(".loginway .cnl").click(function () {
    $(".loginway").removeClass("hidden1");
});

$(".loginway .lgn1").click(function () {
    $(".nav-links .loginpopup").css("display", "block");
    $(".loginway .overlaylog").css("display", "block");
});
$(".loginpopup .cnllogin").click(function () {
    $(".nav-links .loginpopup").css("display", "none");
    $(".loginway .overlaylog").css("display", "none");
    $(".loginway").removeClass("hidden1");
});


// cart pathway
$(document).ready(function () {
    $(".nav-links .btnpress1").click(function (e) {
        e.stopPropagation(); // Prevent click event from bubbling up to the document
        $('.cart').show();
        $(".nav-links .overlay").css("display", "block");
        $('body').css('overflow', 'hidden');
    });
    $(document).click(function (event) {
        if (!$(event.target).closest('.cart').length) {
            $('.cart').hide();
            $(".nav-links .overlay").css("display", "none");
            $('body').css('overflow', 'auto');

        }
    });
});





// hamburger-menu > icon and menus open and close
function toggleMenu() {
    const menu = document.querySelector(".hamburger-nav .menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}



//hamburger-nav > menucard open and close

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".menus1").addEventListener("click", function () {
        const menucardhamb = document.querySelector(".menucardhamb");
        if (menucardhamb.style.display === "flex") {
            menucardhamb.style.display = "none";
        } else {
            menucardhamb.style.display = "flex";
        }
    });
});

//hamburger-nav > menucard open and close (other elements)

$(document).click(function (event) {
    if (!$(event.target).closest('.menus1').length) {
        const menucardhamb = document.querySelector(".menucardhamb");
        if (menucardhamb.style.display === "flex") {
            menucardhamb.style.display = "none";
        }
     
    }
});




