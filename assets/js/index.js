$(document).ready(function(){
    /* ----------------- start home page ----------------- */
    
    // search input
    $(".top_searchBtn").click(function(){
        setTimeout(()=>{
            $(".top_serachBox").focus();
        },600);
    });

    // banner slider
    $(".banner_slider").owlCarousel({
        items: 1,
        dots: true,
        nav: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000
    });

    // flash sale countdown
    $("#flash_sale_countdown").countdown($("#flash_sale_countdown").attr("data-date"), function(event) {
        var $this = $(this).html(event.strftime(''
            + '<span>%d</span>d '
            + '<span>%H</span>:'
            + '<span>%M</span>:'
            + '<span>%S</span>')
        );
    });

    // card slider (voucher card slider)
    $(".card_slider").owlCarousel({
        items: 1,
        dots: true,
        nav: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000
    });

    // add wishlist button
    $(".add_wishlist").click(function(){
        if($(this).hasClass("added_wishlist")){
            $(this).removeClass("added_wishlist");
            // show_bottom_toast("Removed from Cart");
        }else{
            $(this).addClass("added_wishlist");
            show_top_toast("Added to Wishlist");
        }
    });

    // announce modal open
    $("#announceModal").modal("show");

    /* ----------------- end home page ----------------- */
})