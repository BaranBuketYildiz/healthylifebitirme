const sendData = (path, data) => {
    fetch(path, {
        method: 'post',
        headers:new Headers( {'Content-Type': 'application/json'}),
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => processData(data));

}
const processData = (data) => {
    loader.style.display = null;
    if(data.alert){
        showFormError(data.alert);
    } else if(data.email){
        sessionStorage.admin = JSON.stringify(data);
        if(location.search.includes('after')){
            let pageId = location.search.split('=')[1];
            location.replace(`/products/${pageId}`);
        } else{
            location.replace('/tarif');
        }
    } else if(data.seller){
        let admin = JSON.parse(sessionStorage.admin);
        admin.seller = true;
        sessionStorage.admin = JSON.stringify(admin);
        location.replace('/dashboard');
    } else if(data.product){///ürün eklendikten sonra hangi sayfaya gitmesini istediğimizi yazıyoruz
        location.replace('/admintarifler');
    } 
    else if(data == 'review'){
        location.reload();
    }
}

const showFormError = (err) => {
    let errorEle = document.querySelector('.error');
    errorEle.innerHTML = err;
    errorEle.classList.add('show')

    setTimeout(() => {
        errorEle.classList.remove('show')
    }, 2000)
}