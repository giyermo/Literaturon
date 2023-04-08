let flashcards = [];
let currentCard = 0;

function loadFlashcards() {
  fetch('LITERATURON.json')
    .then(response => response.json())
    .then(data => {
      flashcards = data;
      displayFlashcard(currentCard);
    });
}

function displayFlashcard(index) {
  const front = document.querySelector('.front');
  const back = document.querySelector('.back');
  const randomIndex = Math.floor(Math.random() * flashcards.length);

  const card = flashcards[randomIndex];
  const frontKey = Object.keys(card)[0]; // get the first key of the object
  const backValues = Object.values(card).slice(1); // get the other three values

  front.textContent = card[frontKey];
  back.innerHTML = `
    <div>${backValues[0]}</div>
    <div>${backValues[1]}</div>
    <div>${backValues[2]}</div>
  `;

  currentCard = randomIndex;
}

document.addEventListener('DOMContentLoaded', () => {
  loadFlashcards();
  const nextBtn = document.querySelector('.next');
  const flipBtn = document.querySelector('.card');
  const cardContainer = document.querySelector('.card-container')

  nextBtn.addEventListener('click', () => {
    flipBtn.classList.remove('flip');
    displayFlashcard(currentCard);
  });

  flipBtn.addEventListener('click', () => {
    flipBtn.classList.toggle('flip');
  });

  function adjustCardSize() {
    const windowHeight = window.innerHeight;
    const cardHeight = cardContainer.offsetHeight;
    const margin = (windowHeight - cardHeight) / 2;
    cardContainer.style.marginTop = `${margin}px`;
  }

  window.addEventListener('resize', () => {
    adjustCardSize();
  });

  adjustCardSize();
});

function showCard() {
  const card = document.querySelector('.card');
  const currentCard = flashcards[currentIndex];
  card.querySelector('.front').textContent = currentCard.term;
  card.querySelector('.back').innerHTML = `
    <div>${currentCard.definition}</div>
    <div>${currentCard.example}</div>
    <div>${currentCard.notes}</div>
  `;
  card.classList.add('flip');
}

function nextCard() {
  currentCard++;
  if (currentCard > flashcards.length - 1) {
    currentCard = 0;
  }
  flipBtn.classList.remove('flip');
  showCard();
}