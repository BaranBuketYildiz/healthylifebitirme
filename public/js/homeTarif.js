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


