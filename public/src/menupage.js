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
$(".vegsandwiches .section-heading,.vegsandwiches .caret-styles").click(function () {
    $(".vegsandwiches .caret-styles").toggleClass("caret-styles-js")
    $(".vegsandwiches .section-container").toggleClass("section-container-js")
});

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


//hamburger-nav > menucard open and close
    $(".menus1").click(function () {
        const menucardhamb = document.querySelector(".menucardhamb");
        if (menucardhamb.style.display === "flex") {
            menucardhamb.style.display = "none";
            $("#proteinbowl").css("padding-top", "20px");

        } else {
            menucardhamb.style.display = "flex";
            $("#proteinbowl").css("padding-top", "300px");
        }
    });


//hamburger-nav > menucard open and close (other elements)

$(document).click(function (event) {
    if (!$(event.target).closest('.menus1').length) {
        const menucardhamb = document.querySelector(".menucardhamb");
        if (menucardhamb.style.display === "flex") {
            menucardhamb.style.display = "none";
            $("#proteinbowl").css("padding-top", "20px");
        }
    }
});





//cart page











