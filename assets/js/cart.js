$(document).ready(function(){
    // select all 
    $("#selectAll").on("change", function() {
        let isChecked = $(this).is(":checked");
        $(".prd__item:not(.sold__out) .form-check-input").each(function() {
            $(this).prop("checked", isChecked);
            reCalculatePrice();
        });
    });

    // delect item
    let productItem, productId;
    function deleteItem(item,itemId){
        productItem=$(item).parents(".prd__item");
        productId=itemId;
        $("#deleteConfirmModal").modal("show");
    }
    function confirmDeleteItem(){
        productItem.remove();
        // productId (for backend)
        $("#deleteConfirmModal").modal("hide");

    }
    window.deleteItem=deleteItem;
    window.confirmDeleteItem=confirmDeleteItem;


    
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
        let totalItemGroup=0;
        let totalPrice=0;
        let totalDiscountPrice=0;
        let totalItems=0;
        let detailsHtml="";
        $(".prd__item").each((ind,prdItem)=>{
            let itemSelection=$(prdItem).find('input[name="cart_items[]"]');
            let quantity=parseFloat($(prdItem).find(".quantity").val());
            let currentPrice=parseFloat($(prdItem).find("[data-current-price]").attr("data-current-price"));
            let actualPrice=parseFloat($(prdItem).find("[data-actual-price]").attr("data-actual-price"));
            
            if(itemSelection.is(":checked")){
                totalItemGroup++;
                let discountPrice=0;
                if(!Number.isNaN(actualPrice)){
                    discountPrice=actualPrice-currentPrice;
                }
                let subTotal=currentPrice*quantity;
                totalPrice+=subTotal;
                totalDiscountPrice+=(discountPrice*quantity);
                totalItems+=quantity;
                detailsHtml+=`
                    <div class="fs_12 d-flex justify-content-between mb-1">
                        <div>${$(prdItem).find(".prd__name").text()}</div>
                        <div class="fw-semibold">${subTotal}</div>
                    </div>
                `;
            }
        });

        
        $('.totalItemGroup').text(`(${totalItemGroup})`);
        $('[data-preview="totalPrice"').text(totalPrice);
        $('[data-preview="totalDiscount"').text(totalDiscountPrice);
        $('[data-preview="totalItems"').text(totalItems);
        $('#details__items').html(detailsHtml);
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
        hideBottomWarning();
    });

    // control action row
    function updateActionRow() {
        if ($('input[name="cart_items[]"]:checked').length > 0) {
            $('.act__row').addClass('active__actRow');
            hideBottomWarning();
        } else {
            $('.act__row').removeClass('active__actRow');
        }
    }
    $('input[name="cart_items[]"]').change(function() {
        updateActionRow();
        reCalculatePrice();
    });

    // control form
    $("#cartForm").submit(function(e) {
        let isValid = true;

        if ($('input[name="cart_items[]"]:checked').length === 0) {
            showBottomWarning("Please tick the voucher card.");
            isValid = false;
        }

        if (isValid && $('input[name="cart_items[]"]:checked').length > 0) {
            if ($('input[name="payment_method"]:checked').length === 0) {
                showBottomWarning("Please select a payment method");
                isValid = false;
            }
        }

        if (!isValid) {
            e.preventDefault();
        }
    });

    // bottom warning message 
    function showBottomWarning(msg){
        $("#bottom_warning").html(`<i class="fa-solid fa-circle-exclamation c_danger"></i> ${msg}`);
        $("#bottom_warning").show();
    }
    function hideBottomWarning(){
        $("#bottom_warning").hide();
    }
});