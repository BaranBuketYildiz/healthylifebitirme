let kullanici = JSON.parse(sessionStorage.user || null)

if(kullanici == null){
    location.replace('/login');
} 


const setupProducts = (tag) => {
    fetch('/get-tarif', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({tag: tag})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.forEach(profil => createTarif(profil));

    })
}

setupProducts();

const createTarif = (data) => {
    console.log(data)
    let productContainer = document.querySelector('.menu_box');
    productContainer.innerHTML += `
    <div class="menu_card">

    <div class="menu_image">
        <img src="${data.image}">
    </div>

    <div class="small_card">
        <i class="fa-solid fa-heart"></i>
    </div>

    <div class="menu_info">
        <h2>${data.title}</h2>
        <p>kalorisi: ${data.shortDes}</p>
        <h3>${data.summary}</h3>
        <input type="button" class="menu_btn" onclick="add_product_to_tarif('${data.title}',
         '${data.image}','${data.kisi}','${data.malzemeler}','${data.shortDes}','${data.summary}',
         '${data.yapim}'); if (true) {location.href='/tarifler'}" value="Tarif" />
        </div>
        </div> 
    </div>
    
         `
   
}


function add_product_to_tarif(title,image,kisi,malzemeler,shortDes,summary,yapim){
    let tarif = JSON.parse(localStorage.getItem('tarif'));
console.log("bok")
    if(tarif == null){
        tarif = []
    }

    product = {  
        item: 1,
        title: title,
        kisi:kisi,
        malzemeler:malzemeler,
        shortDes:shortDes,
        summary:summary,
        yapim:yapim,
        image: image
    }
    tarif.push(product);
    localStorage.setItem('tarif', JSON.stringify(tarif));
    updateNavCartCounter();
    console.log(product);
    return 'added';
}


// product page setting
