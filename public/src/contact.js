$(".nav-links .menus").click(function () {
    window.location.href = "/menu";
});
//cart page


function cartnav() {
    window.location.href = "/cart";
}


// hamburger-menu > icon and menus open and close
function toggleMenu() {
    const menu = document.querySelector(".hamburger-nav .menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
    var currentPadding = $("#proteinbowl").css("padding-top");
    if (currentPadding === "80px") {
        $("#proteinbowl").css("padding-top", "20px");
    } else {
        $("#proteinbowl").css("padding-top", "80px");
    }
    var currentPadding1= $(".specificnav").css("padding-top");
    if (currentPadding1 === "90px" ){ 
        $(".specificnav").css("padding-top", "20px");
    } else {
        $(".specificnav").css("padding-top", "90px");
    }

    //hamburger-menu > icon and menus open and clos (other elements)

    $(document).click(function (event) {
        if (!$(event.target).closest('.hamburger-nav .menu-links,.hamburger-icon').length) {
            $(".hamburger-nav .menu-links").removeClass("open");
            $(".hamburger-icon").removeClass("open");

        }
    });
}

//loginpathway
$(".nav-links .btnpress").click(function () {
    $(".loginway").toggleClass("hidden1");
    var currentPadding = $("#proteinbowl").css("padding-top");
   var currentPadding1= $(".specificnav").css("padding-top");
    if (currentPadding === "80px" ){ 
        $("#proteinbowl").css("padding-top", "20px");
    } else {
        $("#proteinbowl").css("padding-top", "80px");
    }
    if (currentPadding1 === "90px" ){ 
        $(".specificnav").css("padding-top", "20px");
    } else {
        $(".specificnav").css("padding-top", "90px");
    }
});

$(".loginway .cnl").click(function () {
    $(".loginway").removeClass("hidden1");
    $("#proteinbowl").css("padding-top", "20px");
});

$(".loginway .lgn1").click(function () {
    $(".nav-links .loginpopup").addClass("hiddenpopup ")
    $(".overlaylog").css("display", "inline")
    $(".loginway").removeClass("hidden1");
});
$(".loginpopup .cnllogin").click(function () {
    $(".nav-links .loginpopup").removeClass("hiddenpopup");
    $(".overlaylog").css("display", "none");
    $(".loginway").removeClass("hidden1");
});
$(".bottompop .otpbtn").click(function () {
    $(".nav-links .loginpopup").removeClass("hiddenpopup");
    $(".overlaylog").css("display", "none");
    $(".loginway").removeClass("hidden1");
}
)




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

    $(".cbtnc").click(function (){
        window.location.href ="C:/Users/MS NAMBIRAJA/Documents/Projects/GreenBowl/public/menupage.html";
    })
});



