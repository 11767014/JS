document.body.style.background = "black"

const placeHolder = document.getElementById("placeHolder");
const contextPlaceHolder = placeHolder.getContext("2d");

const deckHolder = document.getElementById("deckHolder");
const contextDeckHolder = deckHolder.getContext("2d");

var firstCard = document.createElement("IMG");
firstCard.src = "card1.jpg";
firstCard.width = 125;
firstCard.height = 200;
firstCard.style.margin = "5px 10px";
//document.body.appendChild(firstCard);
firstCard.onload = function() {
  contextDeckHolder.drawImage(firstCard, 0, 0, 125, 200); // FILL THE CANVAS WITH THE IMAGE.
};


var secondCard = document.createElement("IMG");
secondCard.src = "card2.jpg";
secondCard.width = 125;
secondCard.height = 200;
secondCard.style.margin = "5px 10px";
//document.body.appendChild(secondCard);
secondCard.onload = function() {
  contextDeckHolder.drawImage(secondCard, 140, 0, 125, 200); // FILL THE CANVAS WITH THE IMAGE.
};

var thirdCard = document.createElement("IMG");
thirdCard.src = "card3.jpg";
thirdCard.width = 125;
thirdCard.height = 200;
thirdCard.style.margin = "5px 10px";
//document.body.appendChild(thirdCard);
thirdCard.onload = function() {
  contextDeckHolder.drawImage(thirdCard, 280, 0, 125, 200); // FILL THE CANVAS WITH THE IMAGE.
};


let correct = new Audio();
correct.src = "right.wav";
correct.duration = "0.5";

let incorrect = new Audio();
incorrect.src = "wrong.wav";
/*
let changeCard = document.createElement("IMG");
changeCard.src = "src/card.png";
changeCard.width = 125;
changeCard.height = 200;
changeCard.onload = function() {
  contextPlaceHolder.drawImage(changeCard, 11, 0, 125, 200); // FILL THE CANVAS WITH THE IMAGE.
};

function blancCard() {
  contextPlaceHolder.rect(11, 0, 125, 200);
  contextPlaceHolder.fillStyle = "white";
  contextPlaceHolder.fill();
}
*/

function drawCard(x, y, width, height, color) {
  let radius = 8;

  contextPlaceHolder.beginPath();
  contextPlaceHolder.moveTo(x + radius, y);
  contextPlaceHolder.lineTo(x + width - radius, y);
  contextPlaceHolder.quadraticCurveTo(x + width, y, x + width, y + radius);
  contextPlaceHolder.lineTo(x + width, y + height - radius);
  contextPlaceHolder.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );
  contextPlaceHolder.lineTo(x + radius, y + height);
  contextPlaceHolder.quadraticCurveTo(x, y + height, x, y + height - radius);
  contextPlaceHolder.lineTo(x, y + radius);
  contextPlaceHolder.quadraticCurveTo(x, y, x + radius, y);
  contextPlaceHolder.closePath();
  contextPlaceHolder.fillStyle = color;
  contextPlaceHolder.fill();
}

function drawCircle(x, y, width, height) {
  let radius = 2;
  contextPlaceHolder.arc(x, y, width, height, radius * Math.PI);
}

function drawSquare(x, y, width, height) {
  contextPlaceHolder.rect(x, y, width, height);
}

function drawTriangle(x, y) {
  contextPlaceHolder.moveTo(x + 25, y);
  contextPlaceHolder.lineTo(x + 50, y + 50);
  contextPlaceHolder.lineTo(x, y + 50);
}

function randomNumber(min, max) {
  let random = Math.floor(Math.random() * (+(max + 1) - +min)) + +min;
  return random;
}

// define all cards
let allCards = [
  ["red", "green", "yellow"],
  ["circle", "square", "triangle"],
  [1, 2, 3]
];

let cardOne = [1, 2, 0];
let cardTwo = [2, 1, 1];
let cardThree = [0, 0, 2];

let possibleRules = ["color", "shape", "number"];

// create random cards
function createCard() {
  let randomColor = randomNumber(0, 2);
  let randomShape = randomNumber(0, 2);
  let randomNum = randomNumber(0, 2);

  let color = allCards[0][randomColor];
  let shape = allCards[1][randomShape];
  let number = allCards[2][randomNum];
  let distY = -10;
  let distX = -10;

  drawCard(11, 0, 125, 200, "white");

  contextPlaceHolder.beginPath();
  switch (shape) {
    case "circle":
      switch (number) {
        case 1:
          drawCircle(distX + 82, distY + 110, 25, 0);
          break;
        case 2:
          drawCircle(distX + 82, distY + 70, 25, 0);
          drawCircle(distX + 82, distY + 140, 25, 0);
          break;
        case 3:
          drawCircle(distX + 82, distY + 55, 25, 0);
          drawCircle(distX + 82, distY + 110, 25, 0);
          drawCircle(distX + 82, distY + 165, 25, 0);
          break;
      }
      break;
    case "square":
      switch (number) {
        case 1:
          drawSquare(distX + 65, distY + 95, 40, 40);
          break;
        case 2:
          drawSquare(distX + 65, distY + 50, 40, 40);
          drawSquare(distX + 65, distY + 120, 40, 40);
          break;
        case 3:
          drawSquare(distX + 65, distY + 35, 40, 40);
          drawSquare(distX + 65, distY + 90, 40, 40);
          drawSquare(distX + 65, distY + 150, 40, 40);
          break;
      }
      break;
    case "triangle":
      switch (number) {
        case 1:
          drawTriangle(distX + 55, distY + 70);
          break;
        case 2:
          drawTriangle(distX + 55, distY + 40);
          drawTriangle(distX + 55, distY + 120);
          break;
        case 3:
          drawTriangle(distX + 55, distY + 20);
          drawTriangle(distX + 55, distY + 80);
          drawTriangle(distX + 55, distY + 140);
          break;
      }
      break;
  }
  contextPlaceHolder.closePath();
  contextPlaceHolder.fillStyle = color;
  contextPlaceHolder.fill();

  let results = [randomColor, randomShape, randomNum];
  return results;
}

let iteration = 0;
let results = createCard();
let rule = randomNumber(0, 2);
let startTime = Date.now();

firstCard.onclick = function() {
  if (results[rule] == cardOne[rule]) {
    correct.play();
  } else {
    incorrect.play();
  }
  results = createCard();
  iteration++;

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
  } else {
    incorrect.play();
  }
  results = createCard();
  iteration++;

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
  } else {
      incorrect.play();
  }
  results = createCard();
  iteration++;

  if (iteration == 10) {
    alert("new rule!");
    let oldRule = rule;
    while (oldRule == rule) {
      rule = randomNumber(0, 2);
    }
    iteration = 0;
  }
};

/*
function showBrief(img) {
  let start = Date.now(); // remember start time
  if((Date.now() - start) == 5){

  }
}

*/
