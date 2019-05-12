document.body.style.background = "black"

// define all cards
let allCards = [
  ["red", "green", "yellow", "blue"],
  ["circle", "square", "triangle", "heart"],
  [1, 2, 3, 4]
];

let cardOne = [1, 2, 0];
let cardTwo = [2, 1, 1];
let cardThree = [0, 0, 2];
let cardFour = [3, 3, 3];

let possibleRules = ["color", "shape", "number"];

let iteration = 0;
let results = createCard();
let rule = randomNumber(0, 2);
let score = 0;

const showScore = document.getElementById("showScore");
const contextshowScore = showScore.getContext("2d");

function showScoreNow(){
contextshowScore.clearRect(0,0,200,200);
contextshowScore.font = "40px Arial";
contextshowScore.fillStyle = "white";
contextshowScore.fillText("score: " + score, 10, 50);
}
showScoreNow();

firstCard.onclick = function() {
  if (results[rule] == cardOne[rule]) {
    correct.play();
	score++
  } else {
    incorrect.play();
  }
  results = createCard();
  iteration++;
  showScoreNow();

  if (iteration == 10) {
    alert("new rule!");
    let oldRule = rule;
    while (oldRule == rule) {
      rule = randomNumber(0, 2);
    }
    iteration = 0;
  }
};

secondCard.onclick = function() {
  if (results[rule] == cardTwo[rule]) {
    correct.play();
	score = score+1;
  } else {
    incorrect.play();
  }
  results = createCard();
  iteration++;
  showScoreNow();

  if (iteration == 10) {
    alert("new rule!");
    let oldRule = rule;
    while (oldRule == rule) {
      rule = randomNumber(0, 2);
    }
    iteration = 0;
  }
};

thirdCard.onclick = function() {
  if (results[rule] == cardThree[rule]) {
      correct.play();
	  score = score+1;
  } else {
      incorrect.play();
  }
  results = createCard();
  iteration++;
  showScoreNow();

  if (iteration == 10) {
    alert("new rule!");
    let oldRule = rule;
    while (oldRule == rule) {
      rule = randomNumber(0, 2);
    }
    iteration = 0;
  }
};

fourthCard.onclick = function() {
  if (results[rule] == cardFour[rule]) {
      correct.play();
	  score = score+1;
  } else {
      incorrect.play();
  }
  results = createCard();
  iteration++;
  showScoreNow();

  if (iteration == 10) {
    alert("new rule!");
    let oldRule = rule;
    while (oldRule == rule) {
      rule = randomNumber(0, 2);
    }
    iteration = 0;
  }
};
