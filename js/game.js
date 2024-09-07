// script.js

const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const homeButton = document.getElementById("home");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

const items = [
  { name: "img1", image: "images/game/art-1.png" },
  { name: "img2", image: "images/game/art-2.png" },
  { name: "img3", image: "images/game/art-3.png" },
  { name: "img4", image: "images/game/art-4.png" },
  { name: "img5", image: "images/game/art-5.png" },
  { name: "img6", image: "images/game/art-6.png" },
  { name: "img7", image: "images/game/art-7.png" },
  { name: "img8", image: "images/game/art-8.png" },
  { name: "img9", image: "images/game/art-9.png" },
  { name: "img10", image: "images/game/art-10.png" },
  { name: "img11", image: "images/game/art-11.png" },
  { name: "img12", image: "images/game/art-12.png" },
];

let seconds = 0,
  minutes = 0;
let movesCount = 0,
  winCount = 0;

const timerGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
      <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
          <img src="${cardValues[i].image}" class="image" />
        </div>
      </div>
    `;
  }
  gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;
  cards = document.querySelectorAll(".card-container");
};

const showAllCards = () => {
  cards.forEach(card => {
    card.classList.add("flipped");
  });
};

const hideAllCards = () => {
  cards.forEach(card => {
    card.classList.remove("flipped");
  });
};

const startGameWithDelay = () => {
  showAllCards();
  setTimeout(() => {
    hideAllCards();
    enableCardClicks();
    interval = setInterval(timerGenerator, 1000);
  }, 2000); 
};

const enableCardClicks = () => {
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched") && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
            if (winCount == Math.floor(cards.length / 2)) {
              showWinMessage();
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

const showWinMessage = () => {
  result.innerHTML = `<h2>You Won!</h2>`;
  hideGameElements();
  clearInterval(interval);
  
  stopButton.innerHTML = "You Won!";
  stopButton.classList.remove("hide");
  stopButton.disabled = true; 

  showHomeButton(); 
};

const hideGameElements = () => {
  document.querySelector(".game-title").classList.add("hide");
  gameContainer.classList.add("hide");
  startButton.classList.add("hide");
};

const showHomeButton = () => {
  homeButton.classList.remove("hide");
  homeButton.style.display = "block"; 
};

const hideHomeButton = () => {
  homeButton.classList.add("hide");
};

const initializer = () => {
  result.innerHTML = "";
  winCount = 0;
  movesCount = 0;
  timeValue.innerHTML = `<span>Time:</span>00:00`;
  moves.innerHTML = `<span>Moves:</span>0`;
  clearInterval(interval);
  let cardValues = generateRandom();
  matrixGenerator(cardValues);
  startButton.classList.add("hide");
  stopButton.classList.remove("hide");
  controls.classList.add("hide");
  document.querySelector(".game-title").classList.add("hide");
  gameContainer.classList.remove("hide");
  startGameWithDelay();
};

startButton.addEventListener("click", initializer);
stopButton.addEventListener("click", () => {
  clearInterval(interval);
  initializer();
});

homeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
