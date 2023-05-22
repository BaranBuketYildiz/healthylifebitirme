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
                headers: new Headers({'Content-Type': 'image/jpeg'}),
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
function turkishToEnglish(text) {
    var chars = {
      'ğ': 'g',
      'ü': 'u',
      'ş': 's',
      'ı': 'i',
      'ö': 'o',
      'ç': 'c',
      'Ğ': 'G',
      'Ü': 'U',
      'Ş': 'S',
      'İ': 'I',
      'Ö': 'O',
      'Ç': 'C'
    };
    return text.replace(/[ğüşıöçĞÜŞİÖÇ]/g, function(match) {
      return chars[match];
    });
  }
let addProductBtn = document.querySelector('.add-product-btn');
let loader = document.querySelector('.loader');

let productName = document.querySelector('.product-title');
let shortDes = document.querySelector('.product-des');
let price = document.querySelector('.price');
let tags = document.querySelector('.tags');

addProductBtn.addEventListener('click', () => {

    // verification
    if(productName.innerHTML == productName.getAttribute('data-placeholder')){
        showFormError('Ürünün ismini giriniz');
    } else if(shortDes.innerHTML == shortDes.getAttribute('data-placeholder') || !Number(price.innerHTML)){
        showFormError('ürünün kalorisini giriniz');
    } else if(price.innerHTML == price.getAttribute('data-placeholder') || !Number(price.innerHTML)){
        showFormError('ürünün fiyatnı giriniz');
    }  else if(tags.innerHTML == tags.getAttribute('data-placeholder')){
        showFormError('enter tags');
    } else{
        // submit form
        loader.style.dispaly = 'block';
        let data = turkishToEnglish(productData());
        if(productId){
            data.id = productId;
        }
        sendData('/add-product', data)
    }
})

const productData = () => {
    let tagsArr = tags.innerText.split(",");
    tagsArr.forEach((item, i) => tagsArr[i].trim().toLowerCase());

    return {
        title: productName.innerText,
        shortDes: shortDes.innerText,
        price: price.innerText,
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
        sendData('/add-product', data)
    }
})

// edit page

const fetchProductData = () => {
    addProductBtn.innerHTML = 'ürünü güncelle';
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: productId})
    }).then(res => res.json())
    .then(data => {
        console.log(data)
        setFormData(data)
    })
    .catch(err => console.log(err))
}

const setFormData = (data) => {
    productName.innerHTML = data.title;
    shortDes.innerHTML = data.shortDes;
    price.innerHTML = data.price;
    tags.innerHTML = data.tags;

    let productImg = document.querySelector('.product-img')
    productImg.src = imagePath = data.image;
}

let productId = null;
if(location.pathname != '/add-product'){
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}