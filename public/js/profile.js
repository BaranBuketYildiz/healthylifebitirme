window.onload = () => {
  let user = JSON.parse(sessionStorage.user || null);
  
  if(user == null){
      location.replace('/login');
  } else if(user.seller){
      location.replace('/dashboard');
  }
}

let loader = document.querySelector('.loader');
let applyBtn = document.querySelector('.apply-btn');

applyBtn.addEventListener('click', () => {
  let height = document.querySelector('#height').value;
  let weight = document.querySelector('#weight').value;
  let neckMeasurement = document.querySelector('#neckMeasurement').value;
  let hipMeasurement = document.querySelector('#hipMeasurement').value;
  let waistMeasurement = document.querySelector('#waistMeasurement').value;
  let age = document.querySelector('#age').value;
  let activityLevel = document.querySelector('#activity').value;
  let activityCinsiyet= document.querySelector('#cinsiyet').value;


  if (
    !Number(height.length) ||
    !Number(weight.length) ||
    !Number(neckMeasurement.length) ||
    !Number(hipMeasurement) ||
    !Number(waistMeasurement) ||
    !Number(age)
  ) {
    showFormError('Bazı bilgiler yanlış');
  } else {
    // send data
    loader.style.display = 'block';
    sendData('/seller', {
      height: height,
      weight: weight,
      neckMeasurement: neckMeasurement,
      hipMeasurement: hipMeasurement,
      waistMeasurement: waistMeasurement,
      age: age,
      activityLevel: activityLevel,
      activityCinsiyet: activityCinsiyet, // Cinsiyet değerini de gönderiyoruz
      email: JSON.parse(sessionStorage.user).email,
    });
  }
});


