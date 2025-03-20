$(document).ready(function(){
    /* ----------------- start checkout page ----------------- */
    // increase and decrease input number 
    $('.increase').click(function() {
        var input = $(this).siblings('.num_inp');
        var currentValue = parseInt(input.val());
        input.val(currentValue + 1);
        reCalculatePrice();
    });
    $('.decrease').click(function() {
        var input = $(this).siblings('.num_inp');
        var currentValue = parseInt(input.val());
        if (currentValue > 1) {
            input.val(currentValue - 1);
            reCalculatePrice();
        }
    });

    function reCalculatePrice(){
        let totalPrice=0;
        let totalDiscountPrice=0;
        let totalItems=0;

        $(".prd__item").each((ind,prdItem)=>{
            let quantity=parseFloat($(prdItem).find(".quantity").val());
            let currentPrice=parseFloat($(prdItem).find("[data-current-price]").attr("data-current-price"));
            let actualPrice=parseFloat($(prdItem).find("[data-actual-price]").attr("data-actual-price"));
            
            let discountPrice=0;

            if(!Number.isNaN(actualPrice)){
                discountPrice=actualPrice-currentPrice;
            }
            
            totalPrice+=(currentPrice*quantity);
            totalDiscountPrice+=(discountPrice*quantity);
            totalItems+=quantity;
        });

        
        $('[data-preview="totalPrice"').text(totalPrice);
        $('[data-preview="totalDiscount"').text(totalDiscountPrice);
        $('[data-preview="totalItems"').text(totalItems);
    }

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