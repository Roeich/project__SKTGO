$(document).ready(function(){
    // payment countdown
    $("#payment_countdown").countdown($("#payment_countdown").attr("data-date"), function(event) {
        var $this = $(this).html(event.strftime(''
            + '<span>%d</span>d '
            + '<span>%H</span>:'
            + '<span>%M</span>:'
            + '<span>%S</span>')
        );
    });

    // custom modal inner tab
    $("[data-modal-tab]").click(function(){
        let parentModal=$(this).parents(".modal");
        let targetTabArea=$(this).attr("data-modal-tab");
        $(parentModal).find(`[data-modal-tab]`).removeClass("active");
        $(this).addClass("active");
        $(parentModal).find(`[data-modal-tabarea]`).hide();
        $(parentModal).find(`[data-modal-tabarea="${targetTabArea}"]`).show();
    });
})