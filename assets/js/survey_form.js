$(document).ready(function(){
    const totalQuestions=$(".survey_questionItem").length;
    $(".survey_formInp,.survey_formImgInp").change(function () {
        var selectedFile = $(".survey_formImgInp").val()
        var checkedCount = $(".survey_formInp:checked").length;
        if(selectedFile){
            checkedCount+=1;
        }
        $("#answer_count").text(checkedCount);
        $("#answer_progressBar").css({ width: (checkedCount*100/totalQuestions)+"%" });

        if(totalQuestions===checkedCount){
            $('#error_message').addClass('d-none');
        }
    });
    $(".img__inpLabel input[type='file']").change(function(){
        var inpLabelText=$(this).parents(".img__inpLabel").find("span");
        var files = $(this).prop("files");

        if (files.length > 0) {
            var fileName = files[0].name;
            $(inpLabelText).text(fileName);
        } else {
            $(inpLabelText).text("");
        }
    });
    $(".survey_imgSlider").owlCarousel({
        items:1,
        loop:true,
        nav:false,
        dots:true,
        autoplay: true,
        autoplayTimeout: 4000
    });

    // ...... validating survey form ......
    $('#survey_submit_btn').click(function() {
        // Check if all input fields are not empty
        let allInputsFilled = true;
        $('.survey_formImgInp').each(function() {
            if (!$(this).val()) {
                allInputsFilled = false;
                return false;
            }
        });

        // Check if at least one radio button is checked in each group
        let allRadioGroupsChecked = true;
        $('.survey_questionItem').each((ind,elm)=> {
            const groupName = $(elm).find('input[type="radio"]').attr('name');
            if(groupName){
                if (!$(`input[name="${groupName}"]:checked`).length) {
                    allRadioGroupsChecked = false;
                    return false;
                }
            }
        });
        if (allInputsFilled && allRadioGroupsChecked) {
            // Submit the form
            $('#error_message').addClass('d-none');
            $('#survey_form').submit();
        } else {
            // Show an error message
            $('#error_message').removeClass('d-none');
        }
    });
    
})