$(document).ready(function(){
    
    /* ---------------- start detail profile form ---------------- */
    // date picker
    $("#dob").flatpickr({
        enableTime: false,    
        defaultDate:$("#dob").val(), 
        dateFormat: "d-m-Y", 
        altInput: true,
        altFormat: "d F Y",
        onChange: function (selectedDates, dateStr, instance) {
            // console.log("Selected Date:", dateStr);
        }
    });
    // select2js 
    $(".select2default").select2({
        minimumResultsForSearch: Infinity
    });

    // profile edit validate form
    $("#profileEditForm").validate({
        ignore: [],  
        rules: {
            username: {
                required: true,
                minlength: 3
            },
            fullname: {
                required: true,
                minlength: 3
            },
            dob: {
                required: true,
                date: false, // Disable jQuery date validation (since we are using a custom format)
                pattern: /^\d{2}-\d{2}-\d{4}$/ // Custom regex for DD-MM-YYYY format
            },
            domicile: {
                required: true
            },
            gender: {
                required: true
            }
        },

        messages: {
            username: {
                required: "Please enter a username",
                minlength: "Username must be at least 3 characters"
            },
            fullname: {
                required: "Please enter your full name",
                minlength: "Full name must be at least 3 characters"
            },
            dob: {
                required: "Please enter your date of birth",
                pattern: "Date must be in DD-MM-YYYY format"
            },
            domicile: {
                required: "Please enter your domicile"
            },
            gender: {
                required: "Please select your gender"
            }
        },
        errorElement: "div",
        errorPlacement: function (error, element) {
            if (element.attr("name") === "gender") {
                $("#gender_err").html(error); 
            } else {
                error.addClass("text-danger");
                element.closest("div").append(error); 
            }
        },
        submitHandler: function (form) {
            console.log(form);
            $("#formSuccessModal").modal("show");
        }
    });

    // domicile search offcanvas
    var domicileOffCanvas = new bootstrap.Offcanvas($("#domicileOffCanvas")[0]);
    $("#domicile").on("focus",function(){
        domicileOffCanvas.show();
        setTimeout(()=>{
            $("#domicile__searchInput").focus();
        },300);
    });
    // domicile search input and select result
    $("#domicile__searchInput").on("input",function(){
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

        $("#domicile__searchResult").html(resultHtml);
    });
    $("#domicile__searchResult").on("click",".search_item",function(){
        var searchValue=$(this).text().trim();
        $("#domicile").val(searchValue);
        domicileOffCanvas.hide();
    });
    
    /* ---------------- end detail profile form ---------------- */

    /* ---------------- start change phone form ---------------- */
    $("#changePhoneNumberBtn").click(function(){
        // send phone otp
        
        // show modal
        $("#phoneOtpInputStep").show();
        $("#phoneInputStep").hide();
        $("#changePhoneNumberModal").modal("show");
        startPhoneOtpResendCountdown();
    });

    function startPhoneOtpResendCountdown() {
        let endTime = new Date().getTime() + 60000; 
        $("#changePhoneNumberModal").addClass("show__countdown");
        $("#phoneOtpResendCountdown").countdown(endTime, function(event) {
            $(this).html(event.strftime('<span>%M</span>:<span>%S</span>'));
        }).on('finish.countdown', function() {
            $("#changePhoneNumberModal").removeClass("show__countdown");
        });
    }
    
    // phone otp check
    $("#phoneOtp").pincodeInput({
        hidedigits: false, 
        inputs: 5,
        complete: function (value, e, errorElement) {
            if(value==="12345"){
                $("#phoneOtpInputStep").removeClass("disable__btns");
                $("#phoneOtpInputStep").hide();
                $("#phoneInputStep").show();
                $("#phoneOtp_err").html("");
            }else{
                $("#phoneOtpInputStep").addClass("disable__btns");
                $("#phoneOtp_err").html("OTP doesn't Match");
            }
        }
    });

    // otp and phone validate form
    $("#changePhoneNumberForm").validate({
        ignore: [],
        rules: {
            phone: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 15
            },
            phoneOtp: {
                required: function () {
                    return $("#phoneOtpInputStep").is(":visible"); 
                },
                digits: true,
                minlength: 5
            }
        },
        messages: {
            phone: {
                required: "Please enter your phone number",
                digits: "Only numbers are allowed",
                minlength: "Phone number must be at least 10 digits",
                maxlength: "Phone number cannot exceed 15 digits"
            },
            phoneOtp: {
                required: "Please enter the OTP",
                digits: "Only numbers are allowed",
                minlength: "OTP must be 5 digits"
            }
        },
        errorElement: "div",
        errorPlacement: function (error, element) {
            if (element.attr("name") === "phoneOtp") {
                $("#phoneOtp_err").html(error); 
            } else {
                error.addClass("text-danger");
                element.closest("div").append(error);
            }
        },
        submitHandler: function (form) {
            // send backend

            //
            $("#phoneNumberPreview").html(form.phone.value);
            $("#changePhoneNumberModal").modal("hide");
        }
    });

    // Handle "Next" Button Click
    $("#changePhoneNumberForm .next_step").click(function () {
        let currentStep = $(this).closest(".modal-body").find("div:visible");

        if (currentStep.attr("id") === "phoneOtpInputStep") {
            if ($("#phoneOtp").valid()) {
                $("#phoneOtpInputStep").hide();
                $("#phoneInputStep").show();
            }
        } else if (currentStep.attr("id") === "phoneInputStep") {
            if ($("input[name='phone']").valid()) {
                $("#changePhoneNumberForm").submit();
            }
        }
    });
    // OTP Resend 
    $("#resendPhoneOtpBtn").click(function () {
        
    });
    
    /* ---------------- end change phone form ---------------- */
    
    /* ---------------- start change email form ---------------- */
    $("#changeEmailBtn").click(function(){
        // send phone otp
        
        // show modal
        $("#emailOtpInputStep").show();
        $("#emailInputStep").hide();
        $("#changeEmailFormModal").modal("show");
        startEmailOtpResendCountdown();
    });

    function startEmailOtpResendCountdown() {
        let endTime = new Date().getTime() + 60000; 
        $("#changeEmailFormModal").addClass("show__countdown");
        $("#emailOtpResendCountdown").countdown(endTime, function(event) {
            $(this).html(event.strftime('<span>%M</span>:<span>%S</span>'));
        }).on('finish.countdown', function() {
            $("#changeEmailFormModal").removeClass("show__countdown");
        });
    }

    // email otp check
    $("#emailOtp").pincodeInput({
        hidedigits: false, 
        inputs: 5,
        complete: function (value, e, errorElement) {
            if(value==="12345"){
                $("#emailOtpInputStep").removeClass("disable__btns");
                $("#emailOtpInputStep").hide();
                $("#emailInputStep").show();
                $("#emailOtp_err").html("");
            }else{
                $("#emailOtpInputStep").addClass("disable__btns");
                $("#emailOtp_err").html("OTP doesn't Match");
            }
        }
    });

    // otp and email validate form
    $("#changeEmailForm").validate({
        ignore: [],  
        rules: {
            email: {
                required: true,
                email: true
            },
            emailOtp: {
                required: function () {
                    return $("#emailOtpInputStep").is(":visible");  
                },
                digits: true,
                minlength: 5
            }
        },
        messages: {
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            emailOtp: {
                required: "Please enter the OTP",
                digits: "Only numbers are allowed",
                minlength: "OTP must be 5 digits"
            }
        },
        errorElement: "div",
        errorPlacement: function (error, element) {
            if (element.attr("name") === "emailOtp") {
                $("#emailOtp_err").html(error); 
            } else {
                error.addClass("text-danger");
                element.closest("div").append(error); 
            }
        },
        submitHandler: function (form) {
            $("#emailPreview").html(form.email.value);
            $("#changeEmailFormModal").modal("hide"); 
        }
    });
    

    // Handle "Next" Button Click
    $("#changeEmailForm .next_step").click(function () {
        let currentStep = $(this).closest(".modal-body").find("div:visible");

        if (currentStep.attr("id") === "emailOtpInputStep") {
            if ($("#emilOtp").valid()) {
                $("#emilOtpInputStep").hide();
                $("#emilInputStep").show();
            }
        } else if (currentStep.attr("id") === "emailInputStep") {
            if ($("input[name='email']").valid()) {
                $("#changeEmailForm").submit();
            }
        }
    });
    // OTP Resend 
    $("#resendEmailOtpBtn").click(function () {
        
    });
    
    /* ---------------- end change email form ---------------- */

    /* ---------------- start add address form ---------------- */
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

            // if success
            let previewAddressHtml=`
                ${form.label.value} <br>
                <span class="fw-normal">
                ${form.inp__cityAndDistricts.value} (${form.postalCode.value}) , ${form.address.value}
                </span>
            `;
            $("#addressPreview").html(previewAddressHtml);
            $("#addAddressModal").modal("hide");
        }
    });

    // city search offcanvas
    var citySearchOffCanvas = new bootstrap.Offcanvas($("#citySearchOffCanvas")[0]);
    $("#inp__cityAndDistricts").on("focus",function(){
        console.log("demo");
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
    });

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

    /* ---------------- end add address form ---------------- */
    
    
})