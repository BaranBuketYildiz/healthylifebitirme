let kullanici = JSON.parse(sessionStorage.user || null)

if(kullanici == null){
    location.replace('/login');
} 


const setupProducts = () => {
    fetch('/get-yemek', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({email : kullanici.email})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.forEach(profil => createYemek(profil));

    })
}

setupProducts();