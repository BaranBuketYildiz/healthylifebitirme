let answer1 = '';
let answer2 = '';
let answer3 = '';

function calculate() {
  let diet = '';
  if (answer1 === 'evet' && answer2 === 'hayır' && answer3 === 'hayır') {
    diet = 'keto';
  } else if (answer1 === 'evet' && answer2 === 'hayır' && answer3 === 'evet') {
    diet = 'paleo';
  } else if (answer1 === 'hayır' && answer2 === 'hayır' && answer3 === 'hayır') {
    diet = 'vegan';
  } else if (answer1 === 'evet' && answer2 === 'evet' && answer3 === 'hayır') {
    diet = 'dash';
  } else if (answer1 === 'hayır' && answer2 === 'hayır' && answer3 === 'evet') {
    diet = 'gluten free';
  } else if (answer1 === 'evet' && answer2 === 'hayır' && answer3 === 'hayır') {
    diet = 'intermitted';
  } else if (answer1 === 'evet' && answer2 === 'evet' && answer3 === 'evet') {
    diet = 'clean eating';
  } else if (answer1 === 'hayır' && answer2 === 'evet' && answer3 === 'hayır') {
    diet = 'summer body';
  } else if (answer1 === 'evet' && answer2 === 'evet' && answer3 === 'hayır') {
    diet = 'muscle builder';
  } else if (answer1 === 'hayır' && answer2 === 'evet' && answer3 === 'evet') {
    diet = 'heart strong';
  } else {
    document.getElementById('result').innerHTML = 'Geçerli cevaplar sadece "evet" ve "hayır" olmalıdır.';
    return;
  }

  document.getElementById('result').innerHTML = 'Size en uygun diyet: ' + diet;
}

document.getElementById('answer1-yes').addEventListener('click', function() {
  answer1 = 'evet';
});

document.getElementById('answer1-no').addEventListener('click', function() {
  answer1 = 'hayır';
});

document.getElementById('answer2-yes').addEventListener('click', function() {
  answer2 = 'evet';
});

document.getElementById('answer2-no').addEventListener('click', function() {
  answer2 = 'hayır';
});

document.getElementById('answer3-yes').addEventListener('click', function() {
  answer3 = 'evet';
});

document.getElementById('answer3-no').addEventListener('click', function() {
  answer3 = 'hayır';
});

document.getElementById('calculate').addEventListener('click', calculate);
