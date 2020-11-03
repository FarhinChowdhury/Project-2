$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $('form.signupform');
    var firstInput = $('input#first-input');
    var lastInput = $('input#last-input');
    var emailInput = $('input#email-input');
    var passwordInput = $('input#password-input');

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on('submit', function(event) {
        console.log('Adding User ...')
        event.preventDefault();
        var userData = {
            first_name: firstInput.val().trim(),
            last_name: lastInput.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.first_name || !userData.last_name || !userData.email || !userData.password) {
            console.log('oopsie not all fields are completed')
            return;
        }
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.first_name, userData.last_name, userData.email, userData.password);
        firstInput.val('');
        lastInput.val('');
        emailInput.val('');
        passwordInput.val('');
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(first_name, last_name, email, password) {
        console.log('reached [signUpUser] function ...')
        $.post('/api/signup', {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        })
            .then(function(data) {
                window.location.replace('/posts');
                console.log('Switching to login page')
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        console.log('Error', err.name)
        $('#alert .msg').text(JSON.stringify(err.responseJSON));
        $('#alert').fadeIn(500);
    }
});