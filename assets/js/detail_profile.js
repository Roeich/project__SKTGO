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
    /* ---------------- end detail profile form ---------------- */

    /* ---------------- start change phone form ---------------- */
    $("#changePhoneNumberBtn").click(function(){
        // send otp

        // show modal
        $("#changePhoneNumberModal").modal("show");
    });
    // otp and phone validate form
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
    /* ---------------- end change phone form ---------------- */

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