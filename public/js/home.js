// image collage

const collageImages = [...document.querySelectorAll('.collage-img')]

collageImages.map((item, i) => {
    item.addEventListener('mouseover', () => {
        collageImages.map((image, index) => {
            if(index != i){
                image.style.filter = `blur(10px)`;
                item.style.zIndex = 2;
            }
        })
    })

    item.addEventListener('mouseleave', () => {
        collageImages.map((image, index) => {
            image.style = null;
        })
    })
})

// get product functions
productId = null;
const getProducts = (tag) => {
    return fetch('/get-yemek', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({tag: tag})
    })
    .then(res => res.json())
    .then(data => {
        return data
    })
}

const createProductCards = (data, title, ele) => {
    if(data.length){
        let container = document.querySelector(ele);
        container.innerHTML += `
            <h1 class="section-title">${title}</h1>
            <div class="product-container">
                ${createCards(data)}
            </div>
        `;
    }
}

const createCards = data => {
    let cards = '';

    data.forEach(item => {
        if(item.id != productId){
            cards += `
            <div class="product-card">
                <img src="${item.image}" onclick="location.href = '/products/${item.id}'" class="product-img" alt="">
                <p class="product-name">${item.name} →</p>
            </div>
        `
        }
    })

    return cards;
}

// cart function
function add_product_to_cart(title, price, img){
    let cart = JSON.parse(localStorage.getItem('cart'));

    if(cart == null){
        cart = []
    }

    product = {  
        item: 1,
        title: title,
        price: price,
        img: img
    }

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateNavCartCounter();
    console.log(product);
    return 'added';
}

