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

$("#proteinbowl .section-heading,#proteinbowl .caret-styles").click(function () {
    $("#proteinbowl .caret-styles").toggleClass("caret-styles-js");
    $("#proteinbowl .section-container").toggleClass("section-container-js");
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
    var currentPadding = $(".caropic").css("padding-top");
    var currentPadding1 = $(".specificnav").css("padding-top");
    if (currentPadding === "120px") {
        $(".caropic").css("padding-top", "10px");
    } else {
        $(".caropic").css("padding-top", "120px");
    }
    if (currentPadding1 === "90px") {
        $(".specificnav").css("padding-top", "20px");
    } else {
        $(".specificnav").css("padding-top", "90px");
    }
});

$(".loginway .cnl").click(function () {
    $(".loginway").removeClass("hidden1");
    $(".caropic").css("padding-top", "20px");
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
    $(".caropic").css("padding-top", "20px");

});
$(".bottompop .otpbtn").click(function () {
    $(".nav-links .loginpopup").removeClass("hiddenpopup");
    $(".overlaylog").css("display", "none");
    $(".loginway").removeClass("hidden1");
}
)
$(".signuppopup .cnllogin").click(function () {
    $(".nav-links .signuppopup").removeClass("hiddenpopup");
    $(".overlaylog").css("display", "none");
    $(".loginway").removeClass("hidden1");
    $(".caropic").css("padding-top", "40px");

});


$(".loginway .signupbtn").click(function () {
    $(".nav-links .signuppopup").addClass("hiddenpopup ")
    $(".loginway").removeClass("hidden1");
});


function submitSign() {
    window.location.href = "/cart";
}



/* // cart pathway

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

   //     window.location.href ="C:/Users/MS NAMBIRAJA/Documents/Projects/GreenBowl/public/menupage.html";
    
});
 */




// hamburger-menu > icon and menus open and close

function toggleMenu() {
    const menu = document.querySelector(".hamburger-nav .menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
    var currentPadding = $(".caropic").css("padding-top");
    if (currentPadding === "100px") {
        $(".caropic").css("padding-top", "20px");
    } else {
        $(".caropic").css("padding-top", "100px");
    }
    var currentPadding1 = $(".specificnav").css("padding-top");
    if (currentPadding1 === "90px") {
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
        $(".caropic").css("padding-top", "20px");

    } else {
        menucardhamb.style.display = "flex";
        $(".caropic").css("padding-top", "300px");
    }
});


//hamburger-nav > menucard open and close (other elements)

$(document).click(function (event) {
    if (!$(event.target).closest('.menus1').length) {
        const menucardhamb = document.querySelector(".menucardhamb");
        if (menucardhamb.style.display === "flex") {
            menucardhamb.style.display = "none";
            $(".caropic").css("padding-top", "20px");
        }
    }
});





//cart page


function cartnav() {
    window.location.href = "/cart";
}






/* LOGIN MESSAGE */
// Function to clear URL parameters
function clearUrlParams() {
    const url = new URL(window.location.href);
    url.search = ''; // Clear search parameters
    window.history.replaceState({}, document.title, url.toString()); // Update the URL
}

// Call this function after showing the toast
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    const name = urlParams.get('name');
    const error = urlParams.get('error');
    const warning = urlParams.get('warning');

    if (message) {
        toastr.success(decodeURIComponent(message),`${name}`, {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-center',
        });

        const audio = new Audio("/Assets/success3.mp3");
        audio.play();
        console.log(name);
        $(".loginname").text("Hi "+name+" !");
        $(".lgn1").text("Log Out");

        $(".loginway .lgn1").click(function () {
            $(".nav-links .loginpopup").removeClass("hiddenpopup ")
        })


        $(".lgn1").click(()=>{

            window.location.href=`/logout`;

        })

        clearUrlParams();
    }

    if (error) {
        toastr.error(decodeURIComponent(error), '', {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-center',
        });

        // Clear URL parameters after showing the toast
        clearUrlParams();
        const audio = new Audio("/Assets/error4.mp3");
        audio.play();
    }
    if (warning) {
        toastr.warning(decodeURIComponent(warning), '', {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-center',
        });

        // Clear URL parameters after showing the toast
        clearUrlParams();
        const audio = new Audio("/Assets/error4.mp3");
        audio.play();
    }
});
