$(document).ready(function(){
    /* ----------------- start common functionality ----------------- */
    // password toggle functionality
    $(".pwd_tglBtn").click(function() {
        const parentWrapper = $(this).parents(".pwd_inpItem");
        const inpItem = $(parentWrapper).find(".inp_password");

        if (inpItem.attr("type") == "password") {
            $(parentWrapper).addClass("show_pwd");
            $(inpItem).attr("type", "text");
        } else {
            $(parentWrapper).removeClass("show_pwd");
            $(inpItem).attr("type", "password");
        }
    });

    // Initialize Bootstrap tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();

    // Copy to Clipboard functionality
    $(document).on('click', '.copy_clipboard', function () {
        const textToCopy = $(this).attr('data-clipboard');

        const tempInput = $('<input>');
        $('body').append(tempInput);
        tempInput.val(textToCopy).select();
        document.execCommand('copy');
        tempInput.remove();

        const tooltip = bootstrap.Tooltip.getInstance(this);
        tooltip.setContent({ '.tooltip-inner': 'Copied!' }); 
        tooltip.show();

        setTimeout(() => {
            tooltip.setContent({ '.tooltip-inner': 'Click to copy' });
            tooltip.hide();
        }, 2000);
    });
    /* ----------------- end common functionality ----------------- */
})