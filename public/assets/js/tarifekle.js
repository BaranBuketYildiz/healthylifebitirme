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

let addProductBtn = document.querySelector('.add-product-btn');
let loader = document.querySelector('.loader');
let summary = document.querySelector('.short-des');
let kisi = document.querySelector('.kisi');
let yapim = document.querySelector('.yapim');
let malzemeler = document.querySelector('.malzemeler');
let productName = document.querySelector('.product-title');
let shortDes = document.querySelector('.product-des');
let tags = document.querySelector('.tags');


addProductBtn.addEventListener('click', () => {

    let product = JSON.parse(localStorage.getItem('tarif'));
    // verification
    if(productName.innerHTML == productName.getAttribute('data-placeholder')){
        showFormError('Tarifin ismini giriniz');
    } else if(shortDes.innerHTML == shortDes.getAttribute('data-placeholder') || !Number(shortDes.innerHTML)){
        showFormError('Tarifin kalorisini giriniz');
    } else if(summary.innerHTML == summary.getAttribute('data-placeholder')){
        showFormError('Tarifin özetini giriniz');
    } else if(kisi.innerHTML == kisi.getAttribute('data-placeholder') ){
        showFormError('Tarifin kaç kişilik olduğunu girin');
    } else if(yapim.innerHTML == yapim.getAttribute('data-placeholder')){
        showFormError('Tarifin yapılışını girin');
    } else if(malzemeler.innerHTML == malzemeler.getAttribute('data-placeholder')){
        showFormError('Tarifin yapılışı için gerekli malzemeleri girin');
    } else if(tags.innerHTML == tags.getAttribute('data-placeholder')){
        showFormError('enter tags');
    } else{
        // submit form
        loader.style.dispaly = 'block';
        let data = productData();
        if(productId){
            data.id = productId;
        }
        sendData('/tarif', data)
    }
})

const productData = () => {
    let tagsArr = tags.innerText.split(",");
    tagsArr.forEach((item, i) => tagsArr[i].trim().toLowerCase());

    return {
        title: productName.innerText,
        shortDes: shortDes.innerText,
        summary: summary.innerText,
        kisi: kisi.innerText,
        yapim: yapim.innerText,
        malzemeler: malzemeler.innerText,
        tags: tagsArr,
        image: imagePath,
        email: JSON.parse(sessionStorage.admin).email,
        draft: false
    }
}

// draft btn
let draftBtn = document.querySelector('.draft-btn');

draftBtn.addEventListener('click', () => {
    if(!productName.innerHTML.length || productName.innerHTML == productName.getAttribute('data-placeholder')){
        showFormError('enter product name atleast');
    } else { // don't validate the form
        let data = productData();
        loader.style.dispaly = 'block';
        data.draft = true;
        if(productId){
            data.id = productId;
        }
        sendData('/tarif', data)
    }
})

// edit page

const fetchProductData = () => {
    addProductBtn.innerHTML = 'ürün güncelle';
    fetch('/get-tarifler', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: productId})
    }).then(res => res.json())
    .then(data => {
        setFormData(data)
    })
    .catch(err => console.log(err))
}

const setFormData = (data) => {
    productName.innerHTML = data.title;
    shortDes.innerHTML = data.shortDes;
    summary.innerText =data.summary,
    kisi.innerText = data.kisi,
    yapim.innerText = data.yapim,
    malzemeler.innerText =data.malzemeler,
    tags.innerHTML = data.tags;

    let productImg = document.querySelector('.product-img')
    productImg.src = imagePath = data.image;
}

let productId = null;
if(location.pathname != '/tarif'){
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}