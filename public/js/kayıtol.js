window.onload = () => {
    if(sessionStorage.user){
        user = JSON.parse(sessionStorage.user);
        if(user.email){
            location.replace('/anasayfa');
        }
    }
}

// form
let formBtn = document.querySelector('.submit-btn');
let loader = document.querySelector('.loader');

formBtn.addEventListener('click', () => {
    let fullname = document.querySelector('#name') || null;
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let tac = document.querySelector('#tc') || null;

    if(fullname != null){// singup page
        // form validation
        if(fullname.value.length < 3){
            showFormError('isim giriniz');
        } else if(!email.value.length){
            showFormError('email giriniz');
        } else if(password.value.length < 8){
            showFormError('şifre 8 karakterden uzun olmalı');
        }  else if(!tac.checked){
            showFormError('you must agree to our terms and condition');
        } else{
            // submit form
            loader.style.display = 'block';
            sendData('/signup', {
                name: fullname.value,
                email: email.value,
                password: password.value,
                tac: tac.checked
            })
        }
    } else{// login page
        if(!email.value.length || !password.value.length){
            showFormError('fill all the inputs')
        } else{
            // submit form
            loader.style.display = 'block';
            sendData('/login', {
                email: email.value,
                password: password.value
            })
        }
    }
})