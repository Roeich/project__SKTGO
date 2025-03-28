$(document).ready(function(){
    // payment countdown
    $("#payment_countdown").countdown($("#payment_countdown").attr("data-date"), function (event) {
        $(this).html(event.strftime(
            '<span>%D</span>d ' +  // Use %D for total days across months
            '<span>%H</span>:' +
            '<span>%M</span>:' +
            '<span>%S</span>'
        ));
    });

})