$(document).ready(function(){
    /* ---------------------------- start home page ---------------------------- */
    $(".banner_slider").owlCarousel({
        items: 1,
        dots: true,
        nav: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000
    });

    $("#payment_countdown").countdown($("#payment_countdown").attr("data-date"), function(event) {
        $(this).text(event.strftime('%D d %H:%M:%S'));
    });
    /* ---------------------------- end home page ---------------------------- */
})