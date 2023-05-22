window.onload = () => {
    if(!sessionStorage.user){
        location.replace('/login');

    }
   
  }
//place order butonuna basınca
  

const placeOrderBtn = document.querySelector('.place-order-btn');

placeOrderBtn.addEventListener('click', () => {
    event.preventDefault()
    let address = getAddress();
    console.log(address);

    fetch('/stipe-checkout',{
        method:'post',
        headers:new Headers({'Content-Type': 'application/json'}),
        body:JSON.stringify({
            items:JSON.parse(localStorage.getItem('cart')),
            address:address,
            email:JSON.parse(sessionStorage.user).email
        })
    })
    .then(res => res.json())
    .then(url =>{
       location.href=url;
      
    })
   
})
function turkishToEnglish(text) {
    var chars = {
      'ğ': 'g',
      'ü': 'u',
      'ş': 's',
      'ı': 'i',
      'ö': 'o',
      'ç': 'c',
      'Ğ': 'G',
      'Ü': 'U',
      'Ş': 'S',
      'İ': 'I',
      'Ö': 'O',
      'Ç': 'C'
    };
    return text.replace(/[ğüşıöçĞÜŞİÖÇ]/g, function(match) {
      return chars[match];
    });
  }
  

const getAddress = () => {
    let location = map.getCenter();
    let lat = location.lat();
    let lng = location.lng();
    let address = document.querySelector('#address').value;
    let street = document.querySelector('#street').value;
    let city = document.querySelector('#city').value;
    let state = document.querySelector('#state').value;
    let pincode = document.querySelector('#pincode').value;
    let landmark = document.querySelector('#landmark').value;
    let number= document.querySelector('#number').value;

    if (!address.length || !street.length || !city.length || !state.length || !pincode.length || !landmark.length || !number) {
        return showFormError("Fill all the fields");
    }
    else{
        return { 
            address: turkishToEnglish(address), 
            street: turkishToEnglish(street), 
            city: turkishToEnglish(city), 
            state: turkishToEnglish(state), 
            pincode: turkishToEnglish(pincode), 
            landmark: turkishToEnglish(landmark), 
            number: turkishToEnglish(number), 
            lat: lat,
            lng: lng
        };    
    }
}


var map;
var marker;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.92077, lng: 32.85411},
        zoom: 11
    });
    map.addListener('click', function(event) {
        placeMarker(event.latLng);
        getAddressAndLatLng(event.latLng);
    });
}
function placeMarker(location) {
    if (marker) {
        marker.setPosition(location);
    } else {
        marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }
}

function getAddressAndLatLng(location) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': location }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                document.getElementById("address").value = results[0].formatted_address;
                var lat = location.lat();
                var lng = location.lng();
                console.log(lat);
                console.log(lng);
                // burada lat ve lng değerlerini kullanabilirsiniz
            }
        } else {
            console.log('Geocoder Hatası: ' + status);
        }
    });
}