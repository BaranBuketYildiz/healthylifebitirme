const createProfil = (data) => {
    let productContainer = document.querySelector('.card-container');
    productContainer.innerHTML += `
       
    
  
        <p class="textname" id="name"></p>
        <p class="textt" id="height">Boyunuz:   ${data.height} cm</p>
        <p class="textt" id="weight">Kilonuz:   ${data.weight} kg</p>
        <p class="textt" id="neckMeasurement">Boyun Çevreniz:  ${data.neckMeasurement}cm</p>
        <p class="textt" id="hipMeasurement">Kalça Çevreniz:   ${data.hipMeasurement}cm </p>
        <p class="textt" id="waistMeasurement">Bel Çevreniz:   ${data.waistMeasurement}cm </p>
        <p class="textt" id="age">Yaşınız:  ${data.age}</p>
        
        <div class="skills">
            <h6>Yağ Oranınız</h6>
            <h7>%${
              (data.activityCinsiyet === "erkek")
              ? ((495/((1.0324) - (0.19077*Math.log10(data.waistMeasurement-data.neckMeasurement) )+ (0.15456*Math.log10(data.height))))-450).toFixed(0)
              : ((495/((1.29579) - (0.35004*Math.log10(data.hipMeasurement+data.waistMeasurement-data.neckMeasurement) )+ (0.22100*Math.log10(data.height))))-450).toFixed(0)
          }</h7>        
        </div>



        <div class="skills">
            <h6>Günlük Kalori İhtiyacınız</h6>
            <h7>
            ${(() => {
              let bmr, kalori;
              if (data.activityCinsiyet === "erkek") {
                bmr = 66.5 + (13.75 * data.weight) + (5 * data.height) - (6.77 * data.age);
              } else {
                bmr = 655.1 + (9.56 * data.weight) + (1.85 * data.height) - (4.67 * data.age);
              }
          
              if (data.activityLevel === "act1") {
                kalori = (bmr * 1.2).toFixed(0);
              } else if (data.activityLevel === "act2") {
                kalori = (bmr * 1.3).toFixed(0);
              } else if (data.activityLevel === "act3") {
                kalori = (bmr * 1.4).toFixed(0);
              } else if (data.activityLevel === "act4") {
                kalori = (bmr * 1.5).toFixed(0);
              }
          
              return kalori;
            })()}
          </h7>
     
         `
   
}

