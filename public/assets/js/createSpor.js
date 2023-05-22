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

const setupOmuz = () => {
    fetch('/get-omuz', {
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
            data.forEach(omuz => createOmuz(omuz));
        }
    })
}

setupOmuz();
const createOmuz = (data) => {
    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += `
    <div class="product-card">
        <button class="btn delete-btn" onclick="deleteOmuz('${data.id}')"><img src="image/delete.png" alt=""></button>
        <img src="${data.image}" class="product-img" alt="">
        <p class="product-name">${data.tags[0]} →</p>
    </div>
    `;
}

const deleteOmuz= (id) => {
    fetch('/delete-omuz', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: id})
    }).then(res => res.json())
    .then(data => {
        // process data
        if(data == 'success'){
            location.reload();
        } else{
            showAlert('some error occured');
        }
    })
}



//KARİN

const setupkarin = () => {
    fetch('/get-karin', {
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
            data.forEach(karin => createkarin(karin));
        }
    })
}

setupkarin();
const createkarin = (data) => {
    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += `
    <div class="product-card">
       
        <button class="btn delete-btn" onclick="deletekarin('${data.id}')"><img src="image/delete.png" alt=""></button>
        <img src="${data.image}" class="product-img" alt="">
        <p class="product-name">${data.tags[0]} →</p>
    </div>
    `;
}

const deletekarin= (id) => {
    fetch('/delete-karin', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: id})
    }).then(res => res.json())
    .then(data => {
        // process data
        if(data == 'success'){
            location.reload();
        } else{
            showAlert('some error occured');
        }
    })
}

//BACAK

const setupbacak = () => {
    fetch('/get-bacak', {
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
            data.forEach(bacak => createbacak(bacak));
        }
    })
}

setupbacak();
const createbacak = (data) => {
    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += `
    <div class="product-card">
     
        <button class="btn delete-btn" onclick="deletebacak('${data.id}')"><img src="image/delete.png" alt=""></button>
        <img src="${data.image}" class="product-img" alt="">
        <p class="product-name">${data.tags[0]} →</p>
    </div>
    `;
}

const deletebacak= (id) => {
    fetch('/delete-bacak', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: id})
    }).then(res => res.json())
    .then(data => {
        // process data
        if(data == 'success'){
            location.reload();
        } else{
            showAlert('some error occured');
        }
    })
}


//KOL
const setupkol = () => {
    fetch('/get-kol', {
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
            data.forEach(kol => createkol(kol));
        }
    })
}

setupkol();
const createkol = (data) => {
    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += `
    <div class="product-card">
    
        <button class="btn delete-btn" onclick="deletekol('${data.id}')"><img src="image/delete.png" alt=""></button>
        <img src="${data.image}" class="product-img" alt="">
        <p class="product-name">${data.tags[0]} →</p>
    </div>
    `;
}

const deletekol= (id) => {
    fetch('/delete-kol', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: id})
    }).then(res => res.json())
    .then(data => {
        // process data
        if(data == 'success'){
            location.reload();
        } else{
            showAlert('some error occured');
        }
    })
}

//VÜCUT
const setupVücut = () => {
    fetch('/get-vucut', {
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
            data.forEach(kol => createVücut(kol));
        }
    })
}

setupVücut();
const createVücut = (data) => {
    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += `
    <div class="product-card">
       
        <button class="btn delete-btn" onclick="deleteVücut('${data.id}')"><img src="image/delete.png" alt=""></button>
        <img src="${data.image}" class="product-img" alt="">
        <p class="product-name">${data.tags[0]} →</p>
    </div>
    `;
}

const deleteVücut= (id) => {
    fetch('/delete-vücut', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: id})
    }).then(res => res.json())
    .then(data => {
        // process data
        if(data == 'success'){
            location.reload();
        } else{
            showAlert('some error occured');
        }
    })
}


//GÖGÜS
const setupGögüs = () => {
    fetch('/get-gogus', {
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
            data.forEach(kol => createGögüs(kol));
        }
    })
}

setupGögüs();
const createGögüs = (data) => {
    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += `
    <div class="product-card">
      
        <button class="btn delete-btn" onclick="deleteGögüs('${data.id}')"><img src="image/delete.png" alt=""></button>
        <img src="${data.image}" class="product-img" alt="">
        <p class="product-name">${data.tags[0]} →</p>
    </div>
    `;
}

const deleteGögüs= (id) => {
    fetch('/delete-gogus', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: id})
    }).then(res => res.json())
    .then(data => {
        // process data
        if(data == 'success'){
            location.reload();
        } else{
            showAlert('some error occured');
        }
    })
}