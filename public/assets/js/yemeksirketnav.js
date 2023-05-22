const createNavbar = () => {
    let navbar = document.querySelector('.navbar-collapse');

    navbar.innerHTML += `
    <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link active" href="/yemeksirket-ekle">
        <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
          <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
        </div>
        <span class="nav-link-text ms-1">Yemek Ekle</span>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link active" href="/yemeksirketyemekler">
        <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
          <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
        </div>
        <span class="nav-link-text ms-1">Yemekleri Düzenle</span>
      </a>
    </li>
   
    <li class="nav-item">
      <a class="nav-link active" href="/yemeksirketsiparisler">
        <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
          <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
        </div>
        <span class="nav-link-text ms-1">Siparişler</span>
      </a>
    </li>
    </li>
   
 
    <li class="nav-item">
      <a class="nav-link " href="/anasayfa" onclick="logout()">
        <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
          <i class="ni ni-collection text-info text-sm opacity-10"></i>
        </div>
        <span class="nav-link-text ms-1" >Çıkış</span>
      </a>
    </li>
  </ul>

  

    `
}

createNavbar();


const logout = () => {
  sessionStorage.clear()
  location.reload();
}

