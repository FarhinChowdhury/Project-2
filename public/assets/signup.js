$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $('form.signupform');
    var firstInput = $('input#first-input');
    var lastInput = $('input#last-input');
    var emailInput = $('input#email-input');
    var passwordInput = $('input#password-input');

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on('submit', function(event) {
        event.preventDefault();
        var userData = {
            firstName: firstInput.val().trim(),
            lastName: lastInput.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.firstName, userData.lastName, userData.email, userData.password);
        firstInput.val('');
        lastInput.val('');
        emailInput.val('');
        passwordInput.val('');
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(firstName, lastName, email, password) {
        $.post('/api/signup', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        })
            .then(function(data) {
                window.location.replace('/posts');
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $('#alert .msg').text(err.responseJSON);
        $('#alert').fadeIn(500);
    }
});