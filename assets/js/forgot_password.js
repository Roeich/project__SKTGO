$(document).ready(function(){
    /* ---------------------------- start forgot password page ---------------------------- */
    $("#forgot_passwordForm").validate({
        rules: {
            email: {
                required: true,
                email: true 
            }
        },
        messages: {
            email: {
                required: "Please enter your email address.",
                email: "Please enter a valid email address."
            }
        },
        submitHandler: function(form) {

            form.submit(); 
        }
    });
    /* ---------------------------- end forgot password page ---------------------------- */
})