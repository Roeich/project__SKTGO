$(document).ready(function(){
    // control survey form
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

    // validating survey form 
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
            $('#formSuccessModal').modal("show");
            // $('#survey_form').submit();
        } else {
            // Show an error message
            $('#error_message').removeClass('d-none');
        }
    });


    /* ---------------- inner address add ----------------- */
    // address form validation
    $('#addAddressForm').validate({
        rules: {
            label: {
                required: true,
                minlength: 2
            },
            cityAndDistricts: {
                required: true
            },
            postalCode: {
                required: true,
                digits: true,
                minlength: 5,
                maxlength: 5
            },
            address: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            label: {
                required: "Please enter a label.",
                minlength: "The label must be at least 2 characters."
            },
            cityAndDistricts: {
                required: "Please enter City & Districts."
            },
            postalCode: {
                required: "Please enter a postal code.",
                digits: "The postal code must be numeric.",
                minlength: "The postal code must be exactly 5 digits.",
                maxlength: "The postal code must be exactly 5 digits."
            },
            address: {
                required: "Please enter a complete address.",
                minlength: "The address must be at least 5 characters."
            }
        },
        errorElement: 'div',
        submitHandler: function (form) {
            /*
                $.ajax({
                    url: "your-server-endpoint-url",
                    method: "POST",
                    data: $(form).serialize(), // Serialize the form data
                    success: function(response) {
                    console.log("Form submitted successfully.");
                    },
                    error: function(xhr, textStatus, errorThrown) {
                    console.error("Form submission failed:", errorThrown);
                    }
                });
                form.submit();
            */
            $("#addAddressForm").modal("hide");
            window.location.href=tempLink;
        }
    });

    // city search offcanvas
    var citySearchOffCanvas = new bootstrap.Offcanvas($("#citySearchOffCanvas")[0]);
    $("#inp__cityAndDistricts").on("focus",function(){
        $("#addAddressModal").modal("hide");
        citySearchOffCanvas.show();
        setTimeout(()=>{
            $("#city__searchInput").focus();
        },300);
    });

    // city search input and select result
    $("#city__searchInput").on("input",function(){
        let searchInput=$(this).val().trim();
        let searchResult=[
            "Kota Surabaya, Asemrowo",
            "Kota Surabaya, Dukuh Pakis",
            "Kota Surabaya, Bulak",
            "Kota Surabaya, Gubeng"
        ];

        // generate html code
        let resultHtml="";
        for(let resultItem of searchResult){
            resultHtml+=`
                <li class="search_item">
                    ${resultItem}
                </li>
            `;
        }

        $("#city__searchResult").html(resultHtml);
    });
    $("#city__searchResult").on("click",".search_item",function(){
        var searchValue=$(this).text().trim();
        $("#inp__cityAndDistricts").val(searchValue);
        citySearchOffCanvas.hide();
        $("#addAddressModal").modal("show");
    })


    // search reset button
    function toggleResetButton(input) {
        let resetBtn = input.siblings(".search_resetBtn");
        input.val().trim().length > 0 ? resetBtn.show() : resetBtn.hide();
    }
    $(".search_inpWrap .form-control").each(function() {
        toggleResetButton($(this));
    });
    $(document).on("input", ".search_inpWrap .form-control", function() {
        toggleResetButton($(this));
    });
    $(document).on("click", ".search_resetBtn", function() {
        let input = $(this).siblings(".form-control");
        input.val("").trigger("input"); 
        $(".search_result").html("");
        $(this).hide();
    });
    
})