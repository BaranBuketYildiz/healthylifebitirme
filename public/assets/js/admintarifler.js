let admin = JSON.parse(sessionStorage.admin || null)

if(admin == null){
    location.replace('/adminlogin');
} 

let greeting = document.querySelector('#seller-greeting');
greeting.innerHTML += admin.name;

// loader
let loader = document.querySelector('.loader');
let noProductImg = document.querySelector('.no-product');

loader.style.display = 'block';

const setupProducts = () => {
    fetch('/get-tarifler', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({email : admin.email})
    })
    .then(res => res.json())
    .then(data => {
        loader.style.display = 'none';
        console.log(data);
        if(data == 'no products'){
            noProductImg.style.display = 'block';
           
        } else{
            data.forEach(tarif => createTarifler(tarif));
        }
    })
}


setupProducts();