$(document).ready(function(){
    // card slider (voucher card slider)
    let cardSlider=$(".card_slider").owlCarousel({
        items: 1,
        dots: true,
        nav: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000
    });
    console.log(cardSlider);

    // layout toggle
    function toggleLayout(){
        let isGrid=localStorage.getItem("isGrid");
        if(isGrid==="true"){
            localStorage.setItem("isGrid","false");
            $("body").removeClass("gird__layout");
            cardSlider.trigger('refresh.owl.carousel');
        }else{
            localStorage.setItem("isGrid","true");
            $("body").addClass("gird__layout");
            cardSlider.trigger('refresh.owl.carousel');
        }
    }
    function checkLayout(){
        let isGrid=localStorage.getItem("isGrid");
        if(isGrid==="true"){
            $("body").addClass("gird__layout");
            cardSlider.trigger('refresh.owl.carousel');
        }
    }
    checkLayout();
    $(".layout_tglBtn").click(function(){
        toggleLayout();
    });
})