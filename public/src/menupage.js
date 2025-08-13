

let ws;
let messageServer;
const clientMessage = {
}
function connect() {

    ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
        console.log('WebSocket connected');
       
    };

    ws.onmessage = (event) => {
        console.log(`Message from server: ${event.data}`);
        messageServer = event.data;


    };

    ws.onclose = () => {
        console.log('WebSocket disconnected');
    };
}


$(document).ready(function () {
    fetch("/api/user")
        .then(response => response.json())
        .then(data => {
            processLoginDetails(data.loginName)
        }).catch(function () {
            console.error('Error fetching LoginName');
        });



    function processLoginDetails(loginDetails) {
        clientMessage.id = loginDetails.id;
        clientMessage.name = loginDetails.name;
        console.log("clients details:", clientMessage.id);


    }
});


function sendMessage() {

    /* CLIENT MESSAGES  */
    const message = document.getElementById('messageInput').value;
    if (message.trim() !== "") {


        clientMessage.type = "client",
            clientMessage.action = "chat",
            clientMessage.content = message;

        ws.send(JSON.stringify(clientMessage));
        console.log(clientMessage)


        const itemElement = $(`
            <p class="client">${message}</p>
            
            `)
        $(".chat-section").append(itemElement);

        document.getElementById('messageInput').value = "";

        /* SERVER MESSAGES */

        if (messageServer) {
            const itemElement1 = $(`
            <p class="server">${messageServer}</p>
            `)
            $(".chat-section").append(itemElement1);

        }
    }
    $(".chat-section").scrollTop($(".chat-section")[0].scrollHeight);

}

connect();




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

$(document).ready(function() {
    $(".section-heading, .caret-styles").on("click", function () {         
        console.log("Section heading clicked!");
        // Get the spacecaret container
        const spacecaret = $(this).closest('.spacecaret');
        // Toggle the caret rotation
        spacecaret.find(".caret-styles").toggleClass("caret-styles-js");
        // Toggle the section container visibility
        spacecaret.next().toggleClass("section-container-js");
    });
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
    window.location.href = "/cartpage";
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
    window.location.href = "/cartpage";
}






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
    const already = urlParams.get('already');
    const warning = urlParams.get('warning');
    const info = urlParams.get('info');
    const added = urlParams.get('added');


    if (message) {
        toastr.success(decodeURIComponent(message), {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
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

        // Clear URL parameters after showing the toast
        clearUrlParams();
        const audio = new Audio("/Assets/error4.mp3");
        audio.play();
    }
    if (already) {
        toastr.error(decodeURIComponent(already), '', {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-center',
        });

        // Clear URL parameters after showing the toast
        clearUrlParams();
        const audio = new Audio("/Assets/already added.wav");
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
        const audio = new Audio("/Assets/logout.wav");
        audio.play();
    }


    if (info) {
        toastr.error(decodeURIComponent(info), '', {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-center',
        });


        clearUrlParams();
        const audio = new Audio("/Assets/error4.mp3");
        audio.play();
    }

    if (added) {
        toastr.success(decodeURIComponent(added), '', {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-center',
            toastClass: 'toast-added'
        });

        clearUrlParams();
        const audio = new Audio("/Assets/added.mp3");
        audio.play();

        setTimeout(() => {

            const latestToast = document.querySelector('.toast-added');

            if (latestToast) {
                latestToast.addEventListener('click', () => {
                    const button = document.querySelector('.btnpress1');
                    button.classList.add('icon-shake');

                    // Redirect after a short delay to allow the animation to play
                    setTimeout(() => {
                        window.location.href = '/cartpage';
                    }, 100);
                });
            }
        }, 100);
    }


});




$(document).ready(function () {
    fetch("/api/user")
        .then(response => response.json())
        .then(data => {

            loginName = data.loginName;


            console.log("Login Name is from js page:", loginName.name);
            dynamicChanges(loginName.name);

        }).catch(function () {
            console.error('Error fetching LoginName');
        });
});



function dynamicChanges(loginName) {
    console.log("function called????");
    $(".loginname").text("Hi " + loginName + " !");
    $(".loginway .lgn1").text("Log Out");

    $(".loginway .lgn1").click(function () {
        $(".nav-links .loginpopup").removeClass("hiddenpopup ")
    })
    $(".lgn1").click(() => {
        window.location.href = `/logout`;
    })
}
