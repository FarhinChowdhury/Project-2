$(document).ready(function(){
    const loginForm = $('form.loginform')
    const emailInput = $('input#email-input')
    const passwordInput = $('input#password-input')

    loginForm.on('submit', function(event){
        event.preventDefault()
        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        }
        if (!userDate.email || !userData.password){
            return
        }
        loginUser(userData.email, userData.password)
        emailInput.val('')
        passwordInput.val('')
    })

    function loginUser(email, password){
        $.post('/api/login', {
            email: email,
            password: password
        }).then(function(){
            window.location.replace('/bids')
        }).catch(function(err){
            console.log(err)
        })
    }

})