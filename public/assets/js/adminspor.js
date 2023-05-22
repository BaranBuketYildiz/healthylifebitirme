let admin = JSON.parse(sessionStorage.admin || null);
window.onload = () => {
    if(admin == null){
        location.replace('/adminlogin')
    }
}

let editables = [...document.querySelectorAll('*[contenteditable="true"]')];

editables.map((element) => {
    let placeholder = element.getAttribute('data-placeholder');
    element.innerHTML = placeholder;
    element.addEventListener('focus', () => {
        if(element.innerHTML === placeholder){
            element.innerHTML = '';
        }
    })
    element.addEventListener('focusout', () => {
        if(!element.innerHTML.length){
            element.innerHTML = placeholder;
        }
    })
})

// image upload
let uploadInput = document.querySelector('#upload-image');
let imagePath = 'img/noImage.png'; // default image

uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    let imageUrl;

    if(file.type.includes('image')){
        // means its an image
        fetch('/s3url').then(res => res.json())
        .then(url => {
            fetch(url, {
                method: 'PUT',
                headers: new Headers({'Content-Type': 'multipart/form-data'}),
                body: file
            }). then(res => {
                imagePath = url.split("?")[0];

                let productImage = document.querySelector('.product-img');
                productImage.src = imagePath;
            })
        })
    }
})

// form submission

let omuz = document.querySelector('.omuz');
let karin = document.querySelector('.karin');
let bacak = document.querySelector('.bacak');
let kol= document.querySelector('.kol');
let vucut = document.querySelector('.vucut');
let gogus= document.querySelector('.gogus');


let loader = document.querySelector('.loader');

let sportTitle = document.querySelector('.sport-title');
let sportKas = document.querySelector('.sport-kas');
let sporVideo = document.querySelector('.sport-video');
let sporYapilis = document.querySelector('.sport-yapilis');

let tags = document.querySelector('.tags');

omuz.addEventListener('click', () => {

    // verification
    if(sportTitle.innerHTML == sportTitle.getAttribute('data-placeholder')){
        showFormError('Ürünün ismini giriniz');
    } else if(sportKas.innerHTML == sportKas.getAttribute('data-placeholder') ){
        showFormError('ürünün kalorisini giriniz');
    } else if(sporVideo.innerHTML == sporVideo.getAttribute('data-placeholder') ){
        showFormError('ürünün fiyatnı giriniz');
    } else if(sporYapilis.innerHTML == sporYapilis.getAttribute('data-placeholder')){
        showFormError('ürünün fiyatnı giriniz');
    }else if(tags.innerHTML == tags.getAttribute('data-placeholder')){
        showFormError('enter tags');
    } else{
        // submit form
        loader.style.dispaly = 'block';
        let data = productData();
        if(productId){
            data.id = productId;
        }
        sendData('/add-omuz', data)
    }
})

//karinbutonu
karin.addEventListener('click', () => {

    // verification
    if(sportTitle.innerHTML == sportTitle.getAttribute('data-placeholder')){
        showFormError('Ürünün ismini giriniz');
    } else if(sportKas.innerHTML == sportKas.getAttribute('data-placeholder') ){
        showFormError('ürünün kalorisini giriniz');
    } else if(sporVideo.innerHTML == sporVideo.getAttribute('data-placeholder') ){
        showFormError('ürünün fiyatnı giriniz');
    } else if(sporYapilis.innerHTML == sporYapilis.getAttribute('data-placeholder')){
        showFormError('ürünün fiyatnı giriniz');
    }else if(tags.innerHTML == tags.getAttribute('data-placeholder')){
        showFormError('enter tags');
    } else{
        // submit form
        loader.style.dispaly = 'block';
        let data = productData();
        if(productId){
            data.id = productId;
        }
        sendData('/add-karin', data)
    }
})

//bacak
bacak.addEventListener('click', () => {

    // verification
    if(sportTitle.innerHTML == sportTitle.getAttribute('data-placeholder')){
        showFormError('Ürünün ismini giriniz');
    } else if(sportKas.innerHTML == sportKas.getAttribute('data-placeholder') ){
        showFormError('ürünün kalorisini giriniz');
    } else if(sporVideo.innerHTML == sporVideo.getAttribute('data-placeholder') ){
        showFormError('ürünün fiyatnı giriniz');
    } else if(sporYapilis.innerHTML == sporYapilis.getAttribute('data-placeholder')){
        showFormError('ürünün fiyatnı giriniz');
    }else if(tags.innerHTML == tags.getAttribute('data-placeholder')){
        showFormError('enter tags');
    } else{
        // submit form
        loader.style.dispaly = 'block';
        let data = productData();
        if(productId){
            data.id = productId;
        }
        sendData('/add-bacak', data)
    }
})

//kol
kol.addEventListener('click', () => {

    // verification
    if(sportTitle.innerHTML == sportTitle.getAttribute('data-placeholder')){
        showFormError('Ürünün ismini giriniz');
    } else if(sportKas.innerHTML == sportKas.getAttribute('data-placeholder') ){
        showFormError('ürünün kalorisini giriniz');
    } else if(sporVideo.innerHTML == sporVideo.getAttribute('data-placeholder') ){
        showFormError('ürünün fiyatnı giriniz');
    } else if(sporYapilis.innerHTML == sporYapilis.getAttribute('data-placeholder')){
        showFormError('ürünün fiyatnı giriniz');
    }else if(tags.innerHTML == tags.getAttribute('data-placeholder')){
        showFormError('enter tags');
    } else{
        // submit form
        loader.style.dispaly = 'block';
        let data = productData();
        if(productId){
            data.id = productId;
        }
        sendData('/add-kol', data)
    }
})


//vucut
vucut.addEventListener('click', () => {

    // verification
    if(sportTitle.innerHTML == sportTitle.getAttribute('data-placeholder')){
        showFormError('Ürünün ismini giriniz');
    } else if(sportKas.innerHTML == sportKas.getAttribute('data-placeholder') ){
        showFormError('ürünün kalorisini giriniz');
    } else if(sporVideo.innerHTML == sporVideo.getAttribute('data-placeholder') ){
        showFormError('ürünün fiyatnı giriniz');
    } else if(sporYapilis.innerHTML == sporYapilis.getAttribute('data-placeholder')){
        showFormError('ürünün fiyatnı giriniz');
    }else if(tags.innerHTML == tags.getAttribute('data-placeholder')){
        showFormError('enter tags');
    } else{
        // submit form
        loader.style.dispaly = 'block';
        let data = productData();
        if(productId){
            data.id = productId;
        }
        sendData('/add-vucut', data)
    }
})


//gogus
gogus.addEventListener('click', () => {

    // verification
    if(sportTitle.innerHTML == sportTitle.getAttribute('data-placeholder')){
        showFormError('Ürünün ismini giriniz');
    } else if(sportKas.innerHTML == sportKas.getAttribute('data-placeholder') ){
        showFormError('ürünün kalorisini giriniz');
    } else if(sporVideo.innerHTML == sporVideo.getAttribute('data-placeholder') ){
        showFormError('ürünün fiyatnı giriniz');
    } else if(sporYapilis.innerHTML == sporYapilis.getAttribute('data-placeholder')){
        showFormError('ürünün fiyatnı giriniz');
    }else if(tags.innerHTML == tags.getAttribute('data-placeholder')){
        showFormError('enter tags');
    } else{
        // submit form
        loader.style.dispaly = 'block';
        let data = productData();
        if(productId){
            data.id = productId;
        }
        sendData('/add-gogus', data)
    }
})


const productData = () => {
    let tagsArr = tags.innerText.split(",");
    tagsArr.forEach((item, i) => tagsArr[i].trim().toLowerCase());

    return {
        title: sportTitle.innerText,
        sportKas: sportKas.innerText,
        sporVideo: sporVideo.innerText,
        sporYapilis: sporYapilis.innerText,
        tags: tagsArr,
        image: imagePath,
        email: JSON.parse(sessionStorage.admin).email,
        draft: false
    }
}


let productId = null;


