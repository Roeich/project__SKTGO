$(document).ready(function(){
    /* ----------------- start checkout page ----------------- */
    // control payment method modal
    $(".payment_method input").each((ind, elm) => {
        if ($(elm).is(':checked')) {
            const methodBox=$(elm).parents(".payment_method").find(".payment_methodBox");
            $(".paymentMethod_btn").html($(methodBox).html());
            $(".payment_with").html(`- Pay with <b>${$(methodBox).text()}</b>`);
        }
    })
    $(".payment_method").click(function () {
        const methodBox=$(this).find(".payment_methodBox");
        $(".paymentMethod_btn").html($(methodBox).html());
        $(".payment_with").html(`- Pay with <b>${$(methodBox).text()}</b>`);
        $("#paymentMethod_modal").modal("hide");
    });
    /* ----------------- end checkout page ----------------- */
});