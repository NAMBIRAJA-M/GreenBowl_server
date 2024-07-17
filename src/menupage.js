//MENUCARD
$(".nav-links .menus").click(function () {
    $(".nav-links .menucard").toggleClass("menucard-js");
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

//menucardlist