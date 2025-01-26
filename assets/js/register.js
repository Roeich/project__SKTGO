$(document).ready(function(){
    /* ----------------- start register page ----------------- */
    $("#agree_privacyPolicy").click(function() {
        $(".privacy_policyInp").prop("checked", true);
        $(".privacy_policyInp").change();
    });
    $(".privacy_policyInp").change(function() {
        var elm=$(this);
        if ($(elm).prop("checked")) {
            $(elm).removeClass("error");
            $(elm).parents(".inp_item").find(".error").remove();
            // $(".register_btn").removeAttr("disabled");
        } else {
            // $(".register_btn").attr("disabled", true);
        }
    });

    // Define a custom password validation method
    $.validator.addMethod("customPassword", function(value, element) {
        // Check if the password is at least 6 characters long
        if (value.length < 6) {
            return false;
        }
        // Check if the password contains at least one alphanumeric character
        if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
            return false;
        }
        // Check if the password contains at least one unique symbol
        var symbols = /[^a-zA-Z0-9]/g;
        var uniqueSymbols = value.match(symbols);
        return uniqueSymbols && uniqueSymbols.length >= 1;
    }, "Password must be at least 6 characters with alphanumeric characters and at least one unique symbol.");

    // ...... validating register form ......
    $("#register_form").validate({
        rules: {
            fullname: {
                required: true,
                pattern: /^[A-Za-z\s]+$/ // Regular expression to allow letters and spaces
            },
            username: {
                required: true,
                pattern: /^[a-z]+$/
            },
            phone: {
                required: true,
                pattern: /^\d+$/ // Allows only digits, no "+"
            },
            email: {
                required: true,
                email: true // Use the 'email' rule to validate email addresses
            },
            password: {
                required: true,
                customPassword: true // Use the custom validation method for the password
            },
            privacyPolicy: {
                required: true // This rule makes the checkbox required
            }
        },
        messages: {
            fullname: {
                required: "Please enter your fullname.",
                pattern: "Fullname can only contain letters."
            },
            username: {
                required: "Please enter your username.",
                pattern: "Username must be a single word in lowercase with no special characters."
            },
            phone: {
                required: "Please enter your phone number.",
                pattern: "Please enter a valid phone number with digits only."
            },
            email: {
                required: "Please enter your email address.",
                email: "Please enter a valid email address."
            },
            password: {
                required: "Please enter your password."
            },
            privacyPolicy: {
                required: "You must agree to the Privacy Policy to proceed."
            }
        },
        submitHandler: function(form) {
            // This function is called when the form is successfully validated
            // You can perform your custom actions here, such as sending data to the server
            // For example, you can use jQuery's $.ajax() to send the form data to a server endpoint
            
            // Uncomment the following code to send the form data to a server (example using jQuery AJAX):
            /*
            $.ajax({
              url: "your-server-endpoint-url",
              method: "POST",
              data: $(form).serialize(), // Serialize the form data
              success: function(response) {
                // Handle the success response from the server
                console.log("Form submitted successfully.");
              },
              error: function(xhr, textStatus, errorThrown) {
                // Handle errors, if any
                console.error("Form submission failed:", errorThrown);
              }
            });
            */
        }
    });
    /* ----------------- end register page ----------------- */
})