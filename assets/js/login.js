$(document).ready(function(){
    /* ---------------------------- start login page ---------------------------- */
    $("#login_form").validate({
        rules: {
            username: {
                required: true, 
                minlength: 1,
                notOnlySpaces: true
            },
            password: {
                required: true,
                minlength: 1, 
                notOnlySpaces: true 
            }
        },
        messages: {
            username: {
                required: "Please enter your username.",
                notOnlySpaces: "Username cannot be empty."
            },
            password: {
                required: "Please enter your password.",
                notOnlySpaces: "Password cannot be empty."
            }
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") === "password") {
                error.appendTo($('.pwd_inpErr')[0]);
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function(form) {
            form.submit(); 
        }
    });
    
    $.validator.addMethod("notOnlySpaces", function(value, element) {
        return value.trim().length > 0; 
    }, "This field cannot be empty.");
    /* ---------------------------- end login page ---------------------------- */
})