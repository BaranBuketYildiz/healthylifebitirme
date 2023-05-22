let ratingStarInput = [...document.querySelectorAll('.rating-star')];
let rate = 0;

ratingStarInput.map((star, index) => {
    star.addEventListener('click', () => {
        rate = `${index + 1}.0`;
        for(let i = 0; i < 5; i++){
            if(i <= index){
                ratingStarInput[i].src = `../image/fill star.png`;
            } else{
                ratingStarInput[i].src = `../image/no fill star.png`;
            }
        }
    })
})
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
    if(data.alert){
        showFormError(data.alert);
    } else if(data.email){
        sessionStorage.user = JSON.stringify(data);
        if(location.search.includes('after')){
            let pageId = location.search.split('=')[1];
            location.replace(`/products/${pageId}`);
        } else{
            location.replace('/');
        }
    } else if(data.seller){
        let user = JSON.parse(sessionStorage.user);
        user.seller = true;
        sessionStorage.user = JSON.stringify(user);
        location.replace('/dashboard');
    } else if(data.product){
        location.replace('/dashboard');
    } else if(data == 'review'){
        location.reload();
    }
}
// add review form

let reviewHeadline = document.querySelector('.review-headline');
let review = document.querySelector('.review-field');

let addReviewBtn = document.querySelector('.add-review-btn');

addReviewBtn.addEventListener('click', () => {
    // form validation
    if(user.email == undefined){ // user is not logged in
        location.href = `/login`
    } else{
        if(!reviewHeadline.value.length || !review.value.length || rate == 0){
            showFormError('Fill all the inputs');
        }  else{
            // send the data to backend
            sendData('/add-review', {
                headline: reviewHeadline.value,
                review: review.value,
                rate: rate,
                email: user.email,
            })
        }
    }
})



const getReviews = () => {
    if(user == null){
        user = {
            email: undefined
        }
    }

    fetch('/get-reviews', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            email: user.email
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.length){
            createReviewSection(data)
        }
    })
}

const createReviewSection = (data) => {
    let section = document.querySelector('.review-section');

    section.innerHTML += `
        <h1 class="section-title" alt=""  style="font-size:25px ">Yorumlar</h1>
        <div class="review-container">
            ${createReviewCard(data)}
        </div>
    `
}

const createReviewCard = data => {
    let cards = '';

    for(let i = 0; i < 1000; i++){
        if(data[i]){
            let stars = '';
            for(let j = 0; j < data[i].rate; j++){
                stars += '<img src="../image/fill star.png" class="rating-star" alt=""  style="width: 20px; height: 20px; ">';
            }
            for(let j = data[i].rate; j < 5; j++){
                stars += '<img src="../image/no fill star.png" class="rating-star" alt="" style="width: 20px; height: 20px;">';
            }
            cards += `
            <div class="review-card">
                <h2 class="review-title">${data[i].headline}</h2>
                <p class="review">${data[i].review}</p>
                <div class="star-container" style="margin-left:20px ">
                    ${stars}
                </div>
            </div>
            `;
            
        }
    }

    return cards;
}
 
getReviews();
