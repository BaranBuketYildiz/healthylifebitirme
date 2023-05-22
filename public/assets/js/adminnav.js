const createNavbar = () => {
    let navbar = document.querySelector('.navbar-collapse');

    navbar.innerHTML += `
    <ul class="navbar-nav">
  
    <li class="nav-item">
      <a class="nav-link " href="/user">
        <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
          <i class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
        </div>
        <span class="nav-link-text ms-1">Kullanıcılar</span>
      </a>
    </li>
    <li class="nav-item">
        <a class="nav-link " href="/tarif">
          <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
            <i class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
          </div>
          <span class="nav-link-text ms-1">Tarif Ekle</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link " href="/admintarifler">
          <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
            <i class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
          </div>
          <span class="nav-link-text ms-1">Tarifleri Düzenle</span>
        </a>
      </li>
    <li class="nav-item">
      <a class="nav-link " href="/adminspor">
        <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
          <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
        </div>
        <span class="nav-link-text ms-1">Spor Ekle</span>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link " href="/adminsporlar">
        <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
          <i class="ni ni-app text-info text-sm opacity-10"></i>
        </div>
        <span class="nav-link-text ms-1">Sporları Düzenle</span>
      </a>
    </li>
    <li class="nav-item">
    <a class="nav-link " href="/adminyonetici">
      <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
        <i class="ni ni-app text-info text-sm opacity-10"></i>
      </div>
      <span class="nav-link-text ms-1">Yönetici Ekle</span>
    </a>
  </li>
  <li class="nav-item">
  <a class="nav-link active" href="/yemeksirketkullanici">
    <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
      <i class="ni ni-app text-info text-sm opacity-10"></i>
    </div>
    <span class="nav-link-text ms-1">Yemek Şirketi Ekle</span>
  </a>
</li>

    <li class="nav-item">
     
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

