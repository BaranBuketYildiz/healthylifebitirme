import express from "express";
import bcrypt from "bcrypt";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, setDoc, getDoc, updateDoc, getDocs, query, where, deleteDoc, limit } from "firebase/firestore";
import stripe from 'stripe';
// Your web app's Firebase configuration
const firebaseConfig = {
   
        apiKey: "AIzaSyB_9mJ9rkNz3Gze8910MV0aTt7jiCXzQMM",
        authDomain: "healthylife-cb163.firebaseapp.com",
        projectId: "healthylife-cb163",
        storageBucket: "healthylife-cb163.appspot.com",
        messagingSenderId: "795354122572",
        appId: "1:795354122572:web:4409a09e32991bea5d27e9",
        measurementId: "G-ZEC0JZPGCT"
     
  };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();
// init server
const app = express();

// middlewares
app.use(express.static("public"));
app.use(express.json()) // enables form sharing

import aws from "aws-sdk";
import 'dotenv/config';

//aws setup
const region ="eu-north-1";
const bucketName="healthylife-494";
const accessKeyId= process.env.AWS_ACCESS_KEY;
const secretAccessKey= process.env.AWS_SECRET_KEY;



aws.config.update({
    region,
    accessKeyId,
    secretAccessKey
})


// init s3
const s3 = new aws.S3();

// generate image url
async function generateURL(){
    let date = new Date();

    const imageName = `${date.getTime()}.jpeg`;

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Expires: 300, // 300 ms
        ContentType: "image/jpeg"
    }

    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    return uploadURL;
}


app.get('/s3url', (req, res) => {
    generateURL().then(url => res.json(url));
})




let stripeGateway=stripe(process.env.stripe_key);

let DOMAIN =process.env.DOMAIN;
/*app.post('/stipe-checkout', async (req, res) => {
    const lineItems = [];
    const linePrices = [];
    req.body.items.forEach(item => {
      const lineTitle = {
        name: item.title
      };
      lineItems.push(lineTitle);
      const linePrice = item.price;
      linePrices.push(linePrice);
      const lineImage = item.image;
      linePrices.push(linePrice);
    });
  
    const lineItemsData = lineItems.map((item, index) => {
      return {
        price_data: {
          currency: 'eur',
          product_data: item,
          unit_amount: linePrices[index],
        },
        quantity: 1,
      };
    });
  
    const session = await stripeGateway.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItemsData,
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });
    console.log(session.url)
  });

*/
  app.post('/stipe-checkout', async(req, res) => {
    const lineItems = [];
    const linePrices = [];
    const lineImages = [];
    const lineQuantity =[];
    req.body.items.forEach(item => {
      lineItems.push({name: item.title});
      linePrices.push(item.price);
      lineImages.push({url: item.image});
      lineQuantity.push({quantity:(item.item)});
    });
  
    const lineItemsData = lineItems.map((item, index) => {
      return {
        price_data: {
          currency: 'try',
          product_data: {
            name: item.name,
            images: [lineImages[index].url],
          },
          unit_amount: linePrices[index]*100,
        },
        quantity: lineQuantity[index].quantity,
      };
    });
  
 

const session = await stripeGateway.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: lineItemsData,
  mode: 'payment',
  success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}&order=${JSON.stringify(req.body)}`,
  cancel_url: 'http://localhost:3000/basarili',
  customer_creation: "always",
});


    res.json(session.url)
  });
  
  app.get('/success', async (req, res) => {
    console.log(req.id)
    let { order, session_id } = req.query;
     console.log(session_id)
     console.log(order);
     try {
        const session = await stripeGateway.checkout.sessions.retrieve(session_id);
        const customer = await stripeGateway.customers.retrieve(session.customer);
        console.log(customer);
        let date = new Date();

        let orders_collection = collection(db, "orders");
        let docName = `${customer.email}-order-${date.getTime()}`;

        setDoc(doc(orders_collection, docName), JSON.parse(order))
        .then(data => {
            res.redirect('/basarili?payment=done')
        })
    console.log(customer)
    } catch(error) {
        console.log(error);
        res.redirect("/404")
    }     
})
// routes
// home route
app.get('/anasayfa', (req, res) => {
    res.sendFile("Anasayfa.html", { root : "public" })
})
app.get('/spor', (req, res) => {
    res.sendFile("spor.html", { root : "public" })
})

app.get('/sporomuz', (req, res) => {
    res.sendFile("sporomuz.html", { root : "public" })
})
app.get('/sporbacak', (req, res) => {
    res.sendFile("sporbacak.html", { root : "public" })
})

app.get('/sporkol', (req, res) => {
    res.sendFile("sporkol.html", { root : "public" })
})

app.get('/sporkarin', (req, res) => {
    res.sendFile("sporkarin.html", { root : "public" })
})
app.get('/sporvucut', (req, res) => {
    res.sendFile("sporvücut.html", { root : "public" })
})

app.get('/sporgogus', (req, res) => {
    res.sendFile("sporgögüs.html", { root : "public" })
})
app.get('/basarili', (req, res) => {
    res.sendFile("basarili.html", { root : "public" })
})




app.get('/diyet', (req, res) => {
    res.sendFile("diyet.html", { root : "public" })
})
app.get('/clean_eating', (req, res) => {
    res.sendFile("clean_eating.html", { root : "public" })
})

app.get('/dash', (req, res) => {
    res.sendFile("dash.html", { root : "public" })
})
app.get('/gluten_Free', (req, res) => {
    res.sendFile("gluten_Free.html", { root : "public" })
})

app.get('/glutenFree', (req, res) => {
    res.sendFile("glutenFree.html", { root : "public" })
})

app.get('/heartStrong', (req, res) => {
    res.sendFile("heartStrong.html", { root : "public" })
})
app.get('/intermitted', (req, res) => {
    res.sendFile("intermitted.html", { root : "public" })
})

app.get('/keto', (req, res) => {
    res.sendFile("keto.html", { root : "public" })
})
app.get('/muscle_builder', (req, res) => {
    res.sendFile("muscle_builder.html", { root : "public" })
})
app.get('/paleo', (req, res) => {
    res.sendFile("paleo.html", { root : "public" })
})
app.get('/summer_body', (req, res) => {
    res.sendFile("summer_body.html", { root : "public" })
})
app.get('/vegan', (req, res) => {
    res.sendFile("vegan.html", { root : "public" })
})








app.get('/email', (req, res) => {
    res.sendFile("index.html", { root : "public" })
})
app.get('/randomtarif', (req, res) => {
    res.sendFile("randomtarif.html", { root : "public" })
})


app.get('/beslenme', (req, res) => {
    res.sendFile("Beslenme.html", { root : "public" })
})
app.get('/yemekservis', (req, res) => {
    res.sendFile("YemekServisi.html", { root : "public" })
})
app.get('/tarifler', (req, res) => {
    res.sendFile("Tarifler.html", { root : "public" })
})

// signup
app.get('/signup', (req, res) => {
    res.sendFile("kayıtol.html", { root : "public" })
})
app.post('/signup', (req, res) => {
    const { name, email, password, tac } = req.body;

    // form validations
    if(name.length < 3){
        res.json({ 'alert' : 'isim giriniz'});
    } else if(!email.length){
        res.json({ 'alert' : 'email giriniz'});
    } else if(password.length < 8){
        res.json({ 'alert' : 'şifre 8 karakterden uzun olmalı'});
    }  else if(!tac){
        res.json({ 'alert' : 'you must agree to our terms and condition'});
    } else{
        // store the data in db
        
        const users = collection(db, "users");

        getDoc(doc(users, email)).then(user => {
            if(user.exists()){
                return res.json({ 'alert' : 'bu email adresinde kayıtlı hesap bulunuyor' })
            } else{
                // encrypt the password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        req.body.seller = false;

                        // set the doc
                        setDoc(doc(users, email), req.body).then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                seller: req.body.seller,
                            })
                        })
                    })
                })
            }
        })
    }
})

app.get('/login', (req, res) => {
    res.sendFile("giris.html", { root : "public" })
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;

    if(!email.length || !password.length){
        return res.json({ 'alert' : 'boş alan bırakmamalısın' })
    } 

    const users = collection(db, "users");

    getDoc(doc(users, email))
    .then(user => {
        if(!user.exists()){
            return res.json({'alert': 'kayıtlı email adresi bulunamadı '});
        } else{
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result) {
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller
                    })
                } else{
                    return res.json({ 'alert' : 'sifre yanlış'})
                }
            })
        }
    })
})

// seller route
app.get('/seller', (req, res) => {
    res.sendFile('profil.html', { root : "public" })
})
app.get('/dashboard', (req, res) => {
    res.sendFile('dashboard.html', { root : "public" })
})

app.post('/seller', (req, res) => {
    let {  height,weight,neckMeasurement,hipMeasurement,waistMeasurement,age,email, activityLevel,
         activityCinsiyet} = req.body;

    if(( !Number(height.length) || !Number(weight.length) || !Number(neckMeasurement.length) 
    || !Number(hipMeasurement)  || !Number(waistMeasurement)  || !Number(age) ) ){
        return res.json({ 'alert' : 'some information(s) is/are incorrect' });
    } else{
        // update the seller status
        const sellers = collection(db, "profilbilgileri");
        setDoc(doc(sellers, email), req.body)
        .then(profil=> {
            const users = collection(db, "users");
            updateDoc(doc(users, email), {
                seller: true
            })
            .then(profil => {
                res.json({ 'seller' : true })
            })
        })
    }
})



// add product
// add product




app.post('/get-profil', (req, res) => {
    let { email } = req.body
    
    let products = collection(db, "profilbilgileri");
    let docRef;

 
        docRef = getDocs(query(products, where("email", "==", email)))
  

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
            products.forEach(item => {
                let data = item.data();
                data.email = item.email;
                productArr.push(data);
            })    
        res.json(productArr);
    })
})
//kalori


//FOOD
app.post('/get-yemek', (req, res) => {
    let { email,id,tag  } = req.body
   
    
    let products = collection(db, "food");
    let docRef;

 
        docRef = getDocs(query(products))
  

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        
            products.forEach(item => {
                let data = item.data();
                data.email = item.email;
                productArr.push(data);
            })    
            
        res.json(productArr);
    })

});

app.post('/get-tarif', (req, res) => {
    let { email,id,tag  } = req.body
   
    
    let products = collection(db, "recipe");
    let docRef;

 
        docRef = getDocs(query(products))
  

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        
            products.forEach(item => {
                let data = item.data();
                data.email = item.email;
                productArr.push(data);
            })    
            
        res.json(productArr);
    })

});
 

//SPOR KULLANICI
//OMUZ

app.post('/get-kullaniciOmuz', (req, res) => {
    let { email,id,tag  } = req.body
   
    
    let products = collection(db, "sporomuz");
    let docRef;

 
        docRef = getDocs(query(products))
  

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        
            products.forEach(item => {
                let data = item.data();
                data.email = item.email;
                productArr.push(data);
            })    
            
        res.json(productArr);
    })

});
//BACAK
app.post('/get-kullaniciBacak', (req, res) => {
    let { email,id,tag  } = req.body
   
    
    let products = collection(db, "sporbacak");
    let docRef;

 
        docRef = getDocs(query(products))
  

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        
            products.forEach(item => {
                let data = item.data();
                data.email = item.email;
                productArr.push(data);
            })    
            
        res.json(productArr);
    })

});
//KARİN
app.post('/get-kullaniciKarin', (req, res) => {
    let { email,id,tag  } = req.body
   
    
    let products = collection(db, "sporkarin");
    let docRef;

 
        docRef = getDocs(query(products))
  

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        
            products.forEach(item => {
                let data = item.data();
                data.email = item.email;
                productArr.push(data);
            })    
            
        res.json(productArr);
    })

});
//KOL
app.post('/get-kullaniciKol', (req, res) => {
    let { email,id,tag  } = req.body
   
    
    let products = collection(db, "sporkol");
    let docRef;

 
        docRef = getDocs(query(products))
  

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        
            products.forEach(item => {
                let data = item.data();
                data.email = item.email;
                productArr.push(data);
            })    
            
        res.json(productArr);
    })

});
//VUCÜT
app.post('/get-kullanicivucut', (req, res) => {
    let { email,id,tag  } = req.body
   
    
    let products = collection(db, "sporvucut");
    let docRef;

 
        docRef = getDocs(query(products))
  

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        
            products.forEach(item => {
                let data = item.data();
                data.email = item.email;
                productArr.push(data);
            })    
            
        res.json(productArr);
    })

});
//GÖGÜS
app.post('/get-kullaniciGogus', (req, res) => {
    let { email,id,tag  } = req.body
   
    
    let products = collection(db, "sporgögüs");
    let docRef;

 
        docRef = getDocs(query(products))
  

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        
            products.forEach(item => {
                let data = item.data();
                data.email = item.email;
                productArr.push(data);
            })    
            
        res.json(productArr);
    })

});


// review routes
app.post('/add-review', (req, res) => {
    let { headline, review, email } = req.body;
    
    // form validations
    if(!headline.length || !review.length  || email == null ){
        return res.json({'alert':'Fill all the inputs'});
    }

    // storing in Firestore
    let reviews = collection(db, "reviews");
    let docName = `review-${email}-${headline}`;

    setDoc(doc(reviews, docName), req.body)
    .then(data => {
        return res.json('review')
    }).catch(err => {
        console.log(err)
        res.json({'alert': 'some err occured'})
    });
})

app.post('/get-reviews', (req, res) => {
    let { email } = req.body;

    let products = collection(db, "reviews");
    let docRef;
        
    docRef = getDocs(query(products),email)
    docRef.then(products => {
    
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
            products.forEach(item => {
                let data = item.data();
                productArr.push(data);
            })    
        res.json(productArr);
    })
})




app.get('/cart', (req, res) => {
    res.sendFile("cart.html", { root : "public" })
})

app.get('/checkout', (req, res) => {
    res.sendFile("checkout.html", { root : "public" })
})




//
//stripe payment
/*let stripeGateway=stripe(process.env.stripe_key);

let DOMAIN =process.env.DOMAIN;
app.post('/stipe-checkout', async(req,res)=>{
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: 'payment',
       success_url: `${DOMAIN}/success`,
        cancel_url: `${DOMAIN}/checkout`,
        line_items: req.body.items.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                        product_data:{
                        title: item.title,
                        images: [item.image],
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.item
            }
        })   
    })
    res.json(session.url)
})
*/

//admin sayfalari
//admin kullanici silme sayfasi   

// dashboard
app.get('/adminyemekler', (req, res) => {
    res.sendFile('/adminyemekler.html', { root: "public" });
})
app.get('/admintarifler', (req, res) => {
    res.sendFile('admintarifler.html', { root: "public" });
})
app.get('/adminspor', (req, res) => {
    res.sendFile('adminspor.html', { root: "public" });
})
app.get('/adminsporlar', (req, res) => {
    res.sendFile("adminsporlar.html", { root : "public" })
})
app.get('/adminsporlar/:id', (req, res) => {
    res.sendFile("adminsporlar.html", { root : "public" })
})

app.get('/adminlogin', (req, res) => {
    res.sendFile("adminlogin.html", { root : "public" })
})
app.get('/yemeksirketlogin', (req, res) => {
    res.sendFile("yemeksirketlogin.html", { root : "public" })
})
app.get('/user', (req, res) => {
    res.sendFile("tables.html", { root : "public" })
})

//tarifler router
// add product
app.get('/tarif', (req, res) => {
    res.sendFile('admintarif.html', { root: "public" });
})

app.get('/tarif/:id', (req, res) => {
    res.sendFile('admintarif.html', { root: "public" });
})

// add product
app.get('/add-product', (req, res) => {
    res.sendFile('adminyemek.html', { root: "public" });
})

app.get('/add-product/:id', (req, res) => {
    res.sendFile('adminyemek.html', { root: "public" });
})
app.get('/yemeksirket-ekle', (req, res) => {
    res.sendFile('yemeksirketyemek.html', { root: "public" });
})

app.get('/yemeksirket-ekle/:id', (req, res) => {
    res.sendFile('yemeksirketyemek.html', { root: "public" });
})

app.get('/yemeksirketyemekler', (req, res) => {
    res.sendFile('yemeksirketyemekler.html', { root: "public" });
})
app.get('/yemeksirketkullanici', (req, res) => {
    res.sendFile('yemeksirketyönetici.html', { root: "public" });
})
app.get('/adminyonetici', (req, res) => {
    res.sendFile('adminyönetici.html', { root: "public" });
})
app.get('/yemeksirketsiparisler', (req, res) => {
    res.sendFile('yemeksirketsiparisler.html', { root: "public" });
})
//yemeksirketpanel
app.post('/yemeksirket-ekle', (req, res) => {
    let { title, shortDes, price, image, tags, email, draft, id ,sirketName} = req.body;

    if(!draft){
        if(!title.length){
            res.json({'alert' : 'should enter product name'});
        } else if(!shortDes.length ){
            res.json({'alert' : 'short des must be 80 letters long'});
        } else if(!price.length || !Number(price)){
            res.json({'alert' : 'enter valid price'});
          
        } 
        else if(!sirketName.length ){
            res.json({'alert' : 'short des must be 80 letters long'});
        }  else if(!tags.length){
            res.json({'alert' : 'enter tags'});
        }
    }

    // add-product

    let docName = id == undefined ? `${title.toLowerCase()}-${Math.floor(Math.random() * 50000)}` : id;

    let products = collection(db, "food");
    setDoc(doc(products, docName), req.body)
    .then(data => {
        res.json({'product': title})
    })
    .catch(err => {
        res.json({'alert': 'some error occured.'})
    })
})



//admin panel
app.post('/add-product', (req, res) => {
    let { title, shortDes, price, image, tags, email, draft, id } = req.body;

    if(!draft){
        if(!title.length){
            res.json({'alert' : 'should enter product name'});
        } else if(!shortDes.length ){
            res.json({'alert' : 'short des must be 80 letters long'});
        } else if(!price.length || !Number(price)){
            res.json({'alert' : 'enter valid price'});
        }  else if(!tags.length){
            res.json({'alert' : 'enter tags'});
        }
    }

    // add-product

    let docName = id == undefined ? `${title.toLowerCase()}-${Math.floor(Math.random() * 50000)}` : id;

    let products = collection(db, "food");
    setDoc(doc(products, docName), req.body)
    .then(data => {
        res.json({'product': title})
    })
    .catch(err => {
        res.json({'alert': 'some error occured.'})
    })
})

app.post('/get-products', (req, res) => {
    let { email, id, tag } = req.body
    
    let products = collection(db, "food");
    let docRef;

    if(id){
        docRef = getDoc(doc(products, id));
    } else if(tag){
        docRef = getDocs(query(products, where("tags", "array-contains", tag)))
    } else{
        docRef = getDocs(query(products, where("email", "==", email)))
    }

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        
        if(id){
            return res.json(products.data());
        } else{
            products.forEach(item => {
                let data = item.data();
                data.id = item.id;
                productArr.push(data);
            })    
        }

        res.json(productArr);
    })
})

app.post('/delete-product', (req, res) => {
    let { id } = req.body;

    deleteDoc(doc(collection(db, "food"), id))
    .then(data => {
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})


//tariflerin admin tarafınndan eklendiği kısım


app.post('/tarif', (req, res) => {
    let { title, shortDes,summary,kisi,yapim, malzemeler,price, image, tags, email, draft, id } = req.body;


    if(!draft){
        if(!title.length){
            res.json({'alert' : 'Tarifin ismini giriniz'});
        } else if(!shortDes.length ){
            res.json({'alert' : 'Tarifin kalorisini giriniz'});
        } else if(!summary.length ){
            res.json({'alert' : 'Tarifin özetini giriniz'});
        }else if(!kisi.length ){
            res.json({'alert' : 'Tarifin kaç kişilik olduğunu girin'});
        }else if(!yapim.length ){
            res.json({'alert' : 'Tarifin yapılışını girin'});
        }else if(!malzemeler.length ){
            res.json({'alert' : 'Tarifin yapılışı için gerekli malzemeleri girin'});
        }  else if(!tags.length){
            res.json({'alert' : 'enter tags'});
        }
    }

    // add-product

    let docName = id == undefined ? `${title.toLowerCase()}-${Math.floor(Math.random() * 50000)}` : id;

    let products = collection(db, "recipe");
    setDoc(doc(products, docName), req.body)
    .then(data => {
        res.json({'product': title})
    })
    .catch(err => {
        res.json({'alert': 'some error occured.'})
    })
})

app.post('/get-tarifler', (req, res) => {
    let { email, id, tag } = req.body
    
    let products = collection(db, "recipe");
    let docRef;

    if(id){
        docRef = getDoc(doc(products, id));
    } else if(tag){
        docRef = getDocs(query(products, where("tags", "array-contains", tag)))
    } else{
        docRef = getDocs(query(products, where("email", "==", email)))
    }

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        
        if(id){
            return res.json(products.data());
        } else{
            products.forEach(item => {
                let data = item.data();
                data.id = item.id;
                productArr.push(data);
            })    
        }

        res.json(productArr);
    })
})

app.post('/delete-tarif', (req, res) => {
    let { id } = req.body;

    deleteDoc(doc(collection(db, "recipe"), id))
    .then(data => {
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})




app.post('/adminlogin', (req, res) => {
    let { email, password,sirketname, name } = req.body;
    if(name.length < 3){
        res.json({ 'alert' : 'isim giriniz'});
    } else if(!email.length){
        res.json({ 'alert' : 'email giriniz'});
    } else if(password.length < 3){
        res.json({ 'alert' : 'şifre 8 karakterden uzun olmalı'});
    }  else if(sirketname.length < 3){
        res.json({ 'alert' : 'you must agree to our terms and condition'});
    } else{
       
    const users = collection(db, "admin");
    getDoc(doc(users, email))
    .then(user => {
        if(!user.exists()){
            return res.json({'alert': 'kayıtlı email adresi bulunamadı '});
        } else{
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result) {
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        sirketname:data.sirketname,
                        password:data.password
                    })
                } else{
                    return res.json({ 'alert' : 'sifre yanlış'})
                }
            })
        }
    })
  
}

})

app.post('/yemeksirketlogin', (req, res) => {
    let { email, password,sirketname, name } = req.body;
    if(name.length < 3){
        res.json({ 'alert' : 'isim giriniz'});
    } else if(!email.length){
        res.json({ 'alert' : 'email giriniz'});
    } else if(password.length < 3){
        res.json({ 'alert' : 'şifre 8 karakterden uzun olmalı'});
    }  else if(sirketname.length < 3){
        res.json({ 'alert' : 'you must agree to our terms and condition'});
    } else{
       
    const users = collection(db, "yemeksirketi");
    getDoc(doc(users, email))
    .then(user => {
        if(!user.exists()){
            return res.json({'alert': 'kayıtlı email adresi bulunamadı '});
        } else{
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result) {
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        sirketname:data.sirketname,
                        password:data.password
                    })
                } else{
                    return res.json({ 'alert' : 'sifre yanlış'})
                }
            })
        }
    })
  
}
  
})
app.post('/yemeksirketeklelogin', (req, res) => {
    const { name, email, password, sirketname } = req.body;

    // form validations
    if(name.length < 3){
        res.json({ 'alert' : 'isim giriniz'});
    } else if(!email.length){
        res.json({ 'alert' : 'email giriniz'});
    } else if(password.length < 8){
        res.json({ 'alert' : 'şifre 8 karakterden uzun olmalı'});
    }  else if(sirketname.length < 3){
        res.json({ 'alert' : 'you must agree to our terms and condition'});
    } else{
        // store the data in db
        
        const users = collection(db, "yemeksirketi");

        getDoc(doc(users, email)).then(user => {
            if(user.exists()){
                return res.json({ 'alert' : 'bu email adresinde kayıtlı hesap bulunuyor' })
            } else{
                // encrypt the password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                      

                        // set the doc
                        setDoc(doc(users, email), req.body).then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                     
                            })
                        })
                    })
                })
            }
        })
    }
   
   
        })

app.post('/get-yonetici', (req, res) => {
    let { email } = req.body
    
    let products = collection(db, "yemeksirketi");
    let docRef;
        
    docRef = getDocs(query(products),email)
    docRef.then(products => {
    
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
            products.forEach(item => {
                let data = item.data();
                productArr.push(data);
            })    
        res.json(productArr);
    })
})

app.post('/delete-yonetici', (req, res) => {
    let { email} = req.body;

    deleteDoc(doc(collection(db, "yemeksirketi"), email))
    .then(data => {
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})


///ADMİN YÖNETİCİ EKLEME
app.post('/admineklelogin', (req, res) => {
          const { name, email, password, sirketname } = req.body;

             // form validations
             if(name.length < 3){
                 res.json({ 'alert' : 'isim giriniz'});
             } else if(!email.length){
                 res.json({ 'alert' : 'email giriniz'});
             } else if(password.length < 8){
                 res.json({ 'alert' : 'şifre 8 karakterden uzun olmalı'});
             }  else if(sirketname.length < 3){
                 res.json({ 'alert' : 'you must agree to our terms and condition'});
             } else{
                 // store the data in db
                 
                 const users = collection(db, "admin");
         
                 getDoc(doc(users, email)).then(user => {
                     if(user.exists()){
                         return res.json({ 'alert' : 'bu email adresinde kayıtlı hesap bulunuyor' })
                     } else{
                         // encrypt the password
                         bcrypt.genSalt(10, (err, salt) => {
                             bcrypt.hash(password, salt, (err, hash) => {
                                 req.body.password = hash;
                               
         
                                 // set the doc
                                 setDoc(doc(users, email), req.body).then(data => {
                                     res.json({
                                         name: req.body.name,
                                         email: req.body.email,
                              
                                     })
                                 })
                             })
                         })
                     }
                 })
             }
        })

///ADMİN YÖNETİCİ GETİR
app.post('/get-adminyonetici', (req, res) => {
    let { email } = req.body
    
    let products = collection(db, "admin");
    let docRef;
        
    docRef = getDocs(query(products),email)
    docRef.then(products => {
    
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
            products.forEach(item => {
                let data = item.data();
                productArr.push(data);
            })    
        res.json(productArr);
    })
})

//ADMİN YÖNETİCİ SİL
app.post('/delete-adminyonetici', (req, res) => {
    let { email} = req.body;

    deleteDoc(doc(collection(db, "admin"), email))
    .then(data => {
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})


app.post('/get-users', (req, res) => {
    let { email } = req.body
    
    let products = collection(db, "users");
    let docRef;
        
    docRef = getDocs(query(products),email)
    docRef.then(products => {
    
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
            products.forEach(item => {
                let data = item.data();
                productArr.push(data);
            })    
        res.json(productArr);
    })
})

app.post('/delete-users', (req, res) => {
    let { email} = req.body;

    deleteDoc(doc(collection(db, "users"), email))
    .then(data => {
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})

app.post('/get-order', (req, res) => {
    let { email } = req.body
    
    let products = collection(db, "orders");
    let docRef;
        
    docRef = getDocs(query(products),email)
    docRef.then(products => {
    
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
            products.forEach(item => {
                let data = item.data();
                productArr.push(data);
            })    
        res.json(productArr);
    })
})


//SPOR


//OMUZ
app.post('/add-omuz', (req, res) => {
    let { title, sportKas,sporVideo,sporYapilis, image, tags, email, draft, id } = req.body;


    if(!draft){
        if(!title.length){
            res.json({'alert' : 'Tarifin ismini giriniz'});
        } else if(!sportKas.length ){
            res.json({'alert' : 'Tarifin kalorisini giriniz'});
        } else if(!sporVideo.length ){
            res.json({'alert' : 'Tarifin özetini giriniz'});
        }else if(!sporYapilis.length ){
            res.json({'alert' : 'Tarifin kaç kişilik olduğunu girin'});
        } else if(!tags.length){
            res.json({'alert' : 'enter tags'});
        }
    }


    let docName = id == undefined ? `${title.toLowerCase()}-${Math.floor(Math.random() * 50000)}` : id;

    let products = collection(db, "sporomuz");
    setDoc(doc(products, docName), req.body)
    .then(data => {
        res.json({'product': title})
    })
    .catch(err => {
        res.json({'alert': 'some error occured.'})
    })
})

app.post('/get-omuz', (req, res) => {
    let { email, id, tag } = req.body
    
    let products = collection(db, "sporomuz");
    let docRef;

    if(id){
        docRef = getDoc(doc(products, id));
    } else if(tag){
        docRef = getDocs(query(products, where("tags", "array-contains", tag)))
    } else{
        docRef = getDocs(query(products, where("email", "==", email)))
    }

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        
        if(id){
            return res.json(products.data());
        } else{
            products.forEach(item => {
                let data = item.data();
                data.id = item.id;
                productArr.push(data);
            })    
        }

        res.json(productArr);
    })
})
app.post('/delete-omuz', (req, res) => {
    let { id } = req.body;

    deleteDoc(doc(collection(db, "sporomuz"), id))
    .then(data => {
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})



//KOL
app.post('/add-kol', (req, res) => {
    let { title, sportKas,sporVideo,sporYapilis, image, tags, email, draft, id } = req.body;


    if(!draft){
        if(!title.length){
            res.json({'alert' : 'Tarifin ismini giriniz'});
        } else if(!sportKas.length ){
            res.json({'alert' : 'Tarifin kalorisini giriniz'});
        } else if(!sporVideo.length ){
            res.json({'alert' : 'Tarifin özetini giriniz'});
        }else if(!sporYapilis.length ){
            res.json({'alert' : 'Tarifin kaç kişilik olduğunu girin'});
        } else if(!tags.length){
            res.json({'alert' : 'enter tags'});
        }
    }

    // add-product

    let docName = id == undefined ? `${title.toLowerCase()}-${Math.floor(Math.random() * 50000)}` : id;

    let products = collection(db, "sporkol");
    setDoc(doc(products, docName), req.body)
    .then(data => {
        res.json({'product': title})
    })
    .catch(err => {
        res.json({'alert': 'some error occured.'})
    })
})

app.post('/get-kol', (req, res) => {
    let { email, id, tag } = req.body
    
    let products = collection(db, "sporkol");
    let docRef;

    if(id){
        docRef = getDoc(doc(products, id));
    } else if(tag){
        docRef = getDocs(query(products, where("tags", "array-contains", tag)))
    } else{
        docRef = getDocs(query(products, where("email", "==", email)))
    }

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        
        if(id){
            return res.json(products.data());
        } else{
            products.forEach(item => {
                let data = item.data();
                data.id = item.id;
                productArr.push(data);
            })    
        }

        res.json(productArr);
    })
})
app.post('/delete-kol', (req, res) => {
    let { id } = req.body;

    deleteDoc(doc(collection(db, "sporkol"), id))
    .then(data => {
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})

//BACAK
app.post('/add-bacak', (req, res) => {
    let { title, sportKas,sporVideo,sporYapilis, image, tags, email, draft, id } = req.body;


    if(!draft){
        if(!title.length){
            res.json({'alert' : 'Tarifin ismini giriniz'});
        } else if(!sportKas.length ){
            res.json({'alert' : 'Tarifin kalorisini giriniz'});
        } else if(!sporVideo.length ){
            res.json({'alert' : 'Tarifin özetini giriniz'});
        }else if(!sporYapilis.length ){
            res.json({'alert' : 'Tarifin kaç kişilik olduğunu girin'});
        } else if(!tags.length){
            res.json({'alert' : 'enter tags'});
        }
    }

    // add-product

    let docName = id == undefined ? `${title.toLowerCase()}-${Math.floor(Math.random() * 50000)}` : id;

    let products = collection(db, "sporbacak");
    setDoc(doc(products, docName), req.body)
    .then(data => {
        res.json({'product': title})
    })
    .catch(err => {
        res.json({'alert': 'some error occured.'})
    })
})
app.post('/get-bacak', (req, res) => {
    let { email, id, tag } = req.body
    
    let products = collection(db, "sporbacak");
    let docRef;

    if(id){
        docRef = getDoc(doc(products, id));
    } else if(tag){
        docRef = getDocs(query(products, where("tags", "array-contains", tag)))
    } else{
        docRef = getDocs(query(products, where("email", "==", email)))
    }

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        
        if(id){
            return res.json(products.data());
        } else{
            products.forEach(item => {
                let data = item.data();
                data.id = item.id;
                productArr.push(data);
            })    
        }

        res.json(productArr);
    })
})
app.post('/delete-bacak', (req, res) => {
    let { id } = req.body;

    deleteDoc(doc(collection(db, "sporbacak"), id))
    .then(data => {
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})

//KARIN
app.post('/add-karin', (req, res) => {
    let { title, sportKas,sporVideo,sporYapilis, image, tags, email, draft, id } = req.body;


    if(!draft){
        if(!title.length){
            res.json({'alert' : 'Tarifin ismini giriniz'});
        } else if(!sportKas.length ){
            res.json({'alert' : 'Tarifin kalorisini giriniz'});
        } else if(!sporVideo.length ){
            res.json({'alert' : 'Tarifin özetini giriniz'});
        }else if(!sporYapilis.length ){
            res.json({'alert' : 'Tarifin kaç kişilik olduğunu girin'});
        } else if(!tags.length){
            res.json({'alert' : 'enter tags'});
        }
    }

    // add-product

    let docName = id == undefined ? `${title.toLowerCase()}-${Math.floor(Math.random() * 50000)}` : id;

    let products = collection(db, "sporkarin");
    setDoc(doc(products, docName), req.body)
    .then(data => {
        res.json({'product': title})
    })
    .catch(err => {
        res.json({'alert': 'some error occured.'})
    })
})
app.post('/get-karin', (req, res) => {
    let { email, id, tag } = req.body
    
    let products = collection(db, "sporkarin");
    let docRef;

    if(id){
        docRef = getDoc(doc(products, id));
    } else if(tag){
        docRef = getDocs(query(products, where("tags", "array-contains", tag)))
    } else{
        docRef = getDocs(query(products, where("email", "==", email)))
    }

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        
        if(id){
            return res.json(products.data());
        } else{
            products.forEach(item => {
                let data = item.data();
                data.id = item.id;
                productArr.push(data);
            })    
        }

        res.json(productArr);
    })
})
app.post('/delete-karin', (req, res) => {
    let { id } = req.body;

    deleteDoc(doc(collection(db, "sporkarin"), id))
    .then(data => {
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})

//vucut
app.post('/add-vucut', (req, res) => {
    let { title, sportKas,sporVideo,sporYapilis, image, tags, email, draft, id } = req.body;


    if(!draft){
        if(!title.length){
            res.json({'alert' : 'Tarifin ismini giriniz'});
        } else if(!sportKas.length ){
            res.json({'alert' : 'Tarifin kalorisini giriniz'});
        } else if(!sporVideo.length ){
            res.json({'alert' : 'Tarifin özetini giriniz'});
        }else if(!sporYapilis.length ){
            res.json({'alert' : 'Tarifin kaç kişilik olduğunu girin'});
        } else if(!tags.length){
            res.json({'alert' : 'enter tags'});
        }
    }

    // add-product

    let docName = id == undefined ? `${title.toLowerCase()}-${Math.floor(Math.random() * 50000)}` : id;

    let products = collection(db, "sporvucut");
    setDoc(doc(products, docName), req.body)
    .then(data => {
        res.json({'product': title})
    })
    .catch(err => {
        res.json({'alert': 'some error occured.'})
    })
})
app.post('/get-vucut', (req, res) => {
    let { email, id, tag } = req.body
    
    let products = collection(db, "sporvucut");
    let docRef;

    if(id){
        docRef = getDoc(doc(products, id));
    } else if(tag){
        docRef = getDocs(query(products, where("tags", "array-contains", tag)))
    } else{
        docRef = getDocs(query(products, where("email", "==", email)))
    }

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        
        if(id){
            return res.json(products.data());
        } else{
            products.forEach(item => {
                let data = item.data();
                data.id = item.id;
                productArr.push(data);
            })    
        }

        res.json(productArr);
    })
})
app.post('/delete-vucut', (req, res) => {
    let { id } = req.body;

    deleteDoc(doc(collection(db, "sporvucut"), id))
    .then(data => {
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})


//vucut
app.post('/add-gogus', (req, res) => {
    let { title, sportKas,sporVideo,sporYapilis, image, tags, email, draft, id } = req.body;


    if(!draft){
        if(!title.length){
            res.json({'alert' : 'Tarifin ismini giriniz'});
        } else if(!sportKas.length ){
            res.json({'alert' : 'Tarifin kalorisini giriniz'});
        } else if(!sporVideo.length ){
            res.json({'alert' : 'Tarifin özetini giriniz'});
        }else if(!sporYapilis.length ){
            res.json({'alert' : 'Tarifin kaç kişilik olduğunu girin'});
        } else if(!tags.length){
            res.json({'alert' : 'enter tags'});
        }
    }

    // add-product

    let docName = id == undefined ? `${title.toLowerCase()}-${Math.floor(Math.random() * 50000)}` : id;

    let products = collection(db, "sporgögüs");
    setDoc(doc(products, docName), req.body)
    .then(data => {
        res.json({'product': title})
    })
    .catch(err => {
        res.json({'alert': 'some error occured.'})
    })
})
app.post('/get-gogus', (req, res) => {
    let { email, id, tag } = req.body
    
    let products = collection(db, "sporgögüs");
    let docRef;

    if(id){
        docRef = getDoc(doc(products, id));
    } else if(tag){
        docRef = getDocs(query(products, where("tags", "array-contains", tag)))
    } else{
        docRef = getDocs(query(products, where("email", "==", email)))
    }

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        
        if(id){
            return res.json(products.data());
        } else{
            products.forEach(item => {
                let data = item.data();
                data.id = item.id;
                productArr.push(data);
            })    
        }

        res.json(productArr);
    })
})
app.post('/delete-gogus', (req, res) => {
    let { id } = req.body;

    deleteDoc(doc(collection(db, "sporgögüs"), id))
    .then(data => {
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})


// 404 route
app.get('/404', (req, res) => {
    res.sendFile("404.html", { root : "public" })
})

app.use((req, res) => {
    res.redirect('/404')
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})




































































