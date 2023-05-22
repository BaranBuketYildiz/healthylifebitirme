let admins = JSON.parse(sessionStorage.admin || null)

if(admins == null){
    location.replace('/adminlogin');
} 
let loader = document.querySelector('.loader');
let noProductImg = document.querySelector('.no-product');

const setupProducts = () => {
    fetch('/get-users', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({email : admins.email})
    })
    .then(res => res.json())
    .then(data => {
        loader.style.display = 'none';
        console.log(data);

        if(data == 'no products'){
            noProductImg.style.display = 'block';
        } else{
            data.forEach(profil => createUser(profil));
        }
    })
}

setupProducts();

