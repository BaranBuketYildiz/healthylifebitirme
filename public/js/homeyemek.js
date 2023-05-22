const createYemek= (data) => {
    let productContainer = document.querySelector('.box-container');
    productContainer.innerHTML += `
       
    <div class="box">
    <a href="#" class="fas fa-heart"></a>
    <a href="#" class="fas fa-eye"></a>
    <img src="${data.image}" class="product-image" alt="">
    <h3 class="product-title">${data.title}</h3>
    <span class="price" >${data.price} ₺ </span>
    <br><span class="price" >Yemek Şirketi:${data.sirketName}  </span></br>

    <br></br>
    <button class="btn" onclick="add_product_to_cart('${data.title}', ${data.price}, '${data.image}','${data.sirketName}')">sipariş ver</button>


</div>

    `;
}


function add_product_to_cart(title, price, image, sirketName){
    let cart = JSON.parse(localStorage.getItem('cart'));

    if(cart == null){
        cart = []
    }

    product = {  
        item: 1,
        title: title,
        price: price,
        image: image,
        sirketName:sirketName
    }

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateNavCartCounter();
    console.log(product);
    return 'added';
}



