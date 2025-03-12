$(document).ready(function(){
    // see more functionality
    const seeMore = (elm) => {
        $(elm).parents(".seeMore_wrapper").addClass("show_all")
    }
    const seeLess = (elm) => {
        $(elm).parents(".seeMore_wrapper").removeClass("show_all")
    }
    window.seeMore = seeMore;
    window.seeLess = seeLess;

    // address required form
    $(".survey_item.address__required .survey__btn").click(function(e){
        console.log(e);
        event.preventDefault;
    })
})