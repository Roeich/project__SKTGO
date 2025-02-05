$(document).ready(function(){
    /* ----------------- start voucher details page ----------------- */
    // flash sale countdown
    $("#flash_sale_countdown").countdown($("#flash_sale_countdown").attr("data-date"), function(event) {
        var $this = $(this).html(event.strftime(''
            + '<span>%d</span>d '
            + '<span>%H</span>:'
            + '<span>%M</span>:'
            + '<span>%S</span>')
        );
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

    function show_top_toast(msg){
        var toastElement = $('#topToast');
        $(toastElement).text(msg);
        var toast = new bootstrap.Toast(toastElement);
        toast.show(); 
    }

    // add cart button
    $(".main:not(.soldout__main) .add_cart").click(function(){
        if($(this).hasClass("added_cart")){
            $(this).removeClass("added_cart");
            // show_bottom_toast("Removed from Cart");
        }else{
            $(this).addClass("added_cart");
            show_bottom_toast("Added to Cart");
        }
    });

    function show_bottom_toast(msg){
        var toastElement = $('#bottomToast');
        $(toastElement).text(msg);
        var toast = new bootstrap.Toast(toastElement);
        toast.show(); 
    }

    // sold out action prevent
    $(".soldout__main .voucher_actRow .btn").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(".voucher_actRow .err_msg").addClass("d-block");
        setTimeout(() => {
            $(".voucher_actRow .err_msg").removeClass("d-block");
        }, 2500);
    });
    /* ----------------- end voucher details page ----------------- */
})