$(document).ready(function(){
    /* ---------------------------- start reset password page ---------------------------- */
    $("#reset_passwordform").validate({
        rules: {
            newPassword: {
                required: true,
                customPassword: true // Use the custom validation method for the password
            },
            confirmPassword: {
                required: true,
                equalTo: "#newPassword", // Make sure it's equal to the "password" field
                customPassword: true // Use the custom validation method for the password
            }
        },
        messages: {
            newPassword: {
                required: "Please enter new password."
            },
            confirmPassword: {
                required: "Please enter confirm password."
            }
        },
        submitHandler: function(form) {
            // do the same way like register page
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
    /* ---------------------------- end reset password page ---------------------------- */
})