 // Firebase yapılandırması
 var firebaseConfig = {
    apiKey: "AIzaSyD1VPQ_8-V_DsheiKWIgf06kD9Eu2mDIug",
    authDomain: "webproje-1cc1d.firebaseapp.com",
    databaseURL: "https://webproje-1cc1d-default-rtdb.firebaseio.com",
    projectId: "webproje-1cc1d",
    storageBucket: "webproje-1cc1d.appspot.com",
    messagingSenderId: "617678317296",
    appId: "1:617678317296:web:488994cc85569d8ab30435",
    measurementId: "G-6PVBJNELEW"
};

// Firebase öğelerini başlatma
firebase.initializeApp(firebaseConfig);

// Firebase Realtime Database örneğini alın
var database = firebase.database();

function sendOTP() {
    const email = document.getElementById('email');
    const otpverify = document.getElementsByClassName('otpverify')[0];

    // E-posta adresini Firebase Realtime Database'de kontrol et
    database.ref('/users').orderByChild('email').equalTo(email.value).once('value', snapshot => {
        if (snapshot.exists()) {
            alert("Bu mail adresi zaten onaylı.");
        } else {
            let otp_val = Math.floor(Math.random() * 10000);

            let emailbody = `
                <h1>Merhaba yeni üye</h1> <br>
                <h2>Email onay kodun: </h2>${otp_val}
            `;

            Email.send({
                SecureToken: "6a88a17f-2e77-4716-9859-90d0ac802b07",
                To: email.value,
                From: "bulutklfzd999@gmail.com",
                Subject: "testing email",
                Body: emailbody
            }).then(message => {
                if (message === "OK") {
                    alert("Doğrulama kodunuz  " + email.value +" adresine gönderildi.");

                    // now making otp input visible
                    otpverify.style.display = "block";
                    const otp_inp = document.getElementById('otp_inp');
                    const otp_btn = document.getElementById('otp-btn');

                    otp_btn.addEventListener('click', () => {
                        // now check whether sent email is valid
                        if (otp_inp.value == otp_val) {
                            alert("Mail onaylandı...");

                            // E-posta ve onay kodunu Firebase Realtime Database'e ekleyin
                            database.ref('/users').push({
                                email: email.value,
                                otp: otp_val
                            }).then(() => {
                                console.log("E-posta ve onay kodu başarıyla Firebase'e eklendi.");
                            }).catch(error => {
                                console.error("Firebase'e ekleme hatası:", error);
                            });
                        } else {
                            alert("Hatalı kod");
                        }
                    });
                }
            });
        }
    });
}



