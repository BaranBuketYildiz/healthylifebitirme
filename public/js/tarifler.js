
let kullanici = JSON.parse(sessionStorage.user || null)

if(kullanici == null){
    location.replace('/login');
} 

window.onload = function(){
    document.querySelector('.cont_modal').className = "cont_modal";    
    }
    var c = 0;
    function open_close(){
      if(c % 2 == 0){    
    document.querySelector('.cont_modal').className = "cont_modal cont_modal_active";  
    c++;
      }else {
    document.querySelector('.cont_modal').className = "cont_modal";  
    c++;    
      }  
    } 
     




    
  
  const createTarifİcerik = (data) => {
      let productContainer = document.querySelector('.cont_modal ');
      productContainer.innerHTML += `
      
      <div class="cont_photo">
    <div class="cont_img_back">
        <img src="${data.image}" alt="" />
        </div>
    <div class="cont_mins">
      <div class="cont_icon_right">
    <a href="#">  <i class="material-icons">&#xE8E7;</i></a>
      </div>
        </div>

    <div class="cont_detalles">
        <h3>${data.title}</h3>
    <p>${data.summary}</p>
    <p>1 porsiyon için ${data.shortDes} kalori</p>
  </div>
        </div>
    <div class="cont_text_ingredients">
    <div class="cont_over_hidden">

      <div class="cont_tabs">
      <ul>
        <li><a href="#"><h4>${data.kisi}</h4></a></li>
    <li><a href="#"><h4>TARİF</h4></a></li>
    
    
      </ul>  
      </div>
       
      <div class="cont_text_det_preparation">
      <div class="cont_title_preparation">
        <p>MALZEMELER</p>
        </div>
      <div class="cont_info_preparation">
        <p>${data.malzemeler}</p>
        

        
        </div>  
      <div class="cont_text_det_preparation">
    
      <div class="cont_title_preparation">
        <p>YAPILIŞI</p>
        </div>
      <div class="cont_info_preparation">
        <p>${data.yapim} </p>
   
        </div> 
      
      </div>
    </div>  
      <div class="cont_btn_mas_dets">
      <a href="#"><i class="material-icons">&#xE313;</i></a>
      </div>
  
      </div>
      <div class="cont_btn_open_dets">
      <a href="#e" onclick="open_close()"><i class="material-icons">&#xE314;</i></a>
      </div>
    
        </div>
       </div>
      
           `
     
  }
  

  const setCartProducts = () => {
    const tarifContainer = document.querySelector('.cont_modal')

    let tarif = JSON.parse(localStorage.getItem('tarif'));
    console.log(tarif)
    if(tarif == null || !tarif.length){
        tarifContainer.innerHTML += `<img src="image/empty-cart.png" class="empty-img" alt="">`
    } else{
      createTarifİcerik(tarif[tarif.length-1]);
    }
   
}

setCartProducts();

 
