


    function hesapla(){
      console.log("****")
         sayi1=document.getElementById("height").value;
         sayi2=document.getElementById("neck").value;
         sayi3=document.getElementById("bel").value;
         sayi4=document.getElementById("kalca").value;
       console.log(sayi1,sayi2,sayi3,sayi4);

       if(document.getElementById("male").checked){

        document.getElementById("sonuc").innerHTML = ((495/((1.0324) - (0.19077*Math.log10(sayi3-sayi2) )+ (0.15456*Math.log10(sayi1))))-450).toFixed(0);
    }

      else if(document.getElementById("female").checked){

        document.getElementById("sonuc").innerHTML = ((495/((1.29579) - (0.35004*Math.log10(sayi4+sayi3-sayi2) )+ (0.22100*Math.log10(sayi1))))-450).toFixed(0);
    }





}


function kalorihesapla(){
  
  // Kilo, boy ve yaş bilgilerini al
  var kilo = document.getElementById('weight').value;
  var boy = document.getElementById('boy').value;
  var yas = document.getElementById('yas').value;
  console.log(kilo,boy,yas)
  // Aktivite seviyesi bilgisini al
 
   // Kalori hesaplama işlemini yap
   var bmr;
   if (document.getElementById("male").checked) {
     bmr = 66.5 + (13.75 * kilo) + (5 * boy) - (6.77 * yas);
   } else {
     bmr = 655.1 + (9.56 * kilo) + (1.85 * boy) - (4.67 * yas);
   }
   
   var kalori;
   if (document.getElementById("act1").checked) {
     kalori = bmr * 1.2;
   } else if (document.getElementById("act2").checked) {
     kalori = bmr * 1.3;
   } else if (document.getElementById("act3").checked) {
     kalori = bmr * 1.4;
   } else if (document.getElementById("act4").checked) {
     kalori = bmr * 1.5;
   }
   
   // Sonucu ekrana yazdır
   document.getElementById('sonuckalori').innerHTML = kalori.toFixed(0);
}


