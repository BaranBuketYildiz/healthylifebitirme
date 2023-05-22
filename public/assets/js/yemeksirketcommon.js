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
        sessionStorage.yemeksirket = JSON.stringify(data);
        if(location.search.includes('after')){
            let pageId = location.search.split('=')[1];
            location.replace(`/products/${pageId}`);
        } else{
            location.replace('/yemeksirket-ekle');
        }
    } else if(data.seller){
        let yemeksirket = JSON.parse(sessionStorage.yemeksirket);
        yemeksirket.seller = true;
        sessionStorage.yemeksirket = JSON.stringify(yemeksirket);
        location.replace('/dashboard');
    } else if(data.product){///ürün eklendikten sonra hangi sayfaya gitmesini istediğimizi yazıyoruz
        location.replace('/yemeksirketyemekler');
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