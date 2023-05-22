window.onload = () => {
    if(sessionStorage.admin){
        admin = JSON.parse(sessionStorage.admin);
        if(admin.email){
            location.replace('/tarif');
        }
    }

}

// form
let formBtn = document.querySelector('.btn');
let loader = document.querySelector('.loader');

formBtn.addEventListener('click', () => {
    let fullname = document.querySelector('#name') || null;
    let sirketname = document.querySelector('#sirketname') 
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
   

    if(fullname != null){// singup page
        // form validation
        if(fullname.value.length < 3){
            showFormError('isim giriniz');
        } else if(!email.value.length){
            showFormError('email giriniz');
        } else if(password.value.length < 3){
            showFormError('şifre 8 karakterden uzun olmalı');
        }  else if(sirketname.value.lengt<3){
            showFormError('sirket ismi giriniz');
        } else{
            // submit form
            loader.style.display = 'block';
            sendData('/adminlogin', {
                name: fullname.value,
                email: email.value,
                password: password.value,
                sirketname:sirketname.value
            })
        }
    } 
})