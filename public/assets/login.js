$(document).ready(function(){
    const loginForm = $('form.loginform')
    const emailInput = $('input#email-input')
    const passwordInput = $('input#password-input')
    const navbar = $('nav.navbar')

    loginForm.on('submit', function(event){
        event.preventDefault()
        console.log('Hello')
        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        }
        console.log(userData)
        if (!userData.email || !userData.password){
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
            console.log('no errors')
            localStorage.setItem('email', email)
        }).catch(function(err){
            console.log(err)
        })
    }

})
