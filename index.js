document.body.style.background = "black"

const placeHolder = document.getElementById("placeHolder");
const contextPlaceHolder = placeHolder.getContext("2d");

const showScore = document.getElementById("showScore");
const contextshowScore = showScore.getContext("2d");

var firstCard = document.createElement("IMG");
firstCard.src = "card1.jpg";
firstCard.width = 125;
firstCard.height = 200;
firstCard.style.margin = "75px 15px";
//document.body.appendChild(firstCard);
document.getElementById('imageDiv').appendChild(firstCard)


var secondCard = document.createElement("IMG");
secondCard.src = "card2.jpg";
secondCard.width = 125;
secondCard.height = 200;
secondCard.style.margin = "75px 15px";
//document.body.appendChild(secondCard);
document.getElementById('imageDiv').appendChild(secondCard)

var thirdCard = document.createElement("IMG");
thirdCard.src = "card3.jpg";
thirdCard.width = 125;
thirdCard.height = 200;
thirdCard.style.margin = "75px 15px";
//document.body.appendChild(thirdCard);
document.getElementById('imageDiv').appendChild(thirdCard)

var fourthCard = document.createElement("IMG");
fourthCard.src = "card4.jpg";
fourthCard.width = 125;
fourthCard.height = 200;
fourthCard.style.margin = "75px 15px";
//document.body.appendChild(fourthCard);
document.getElementById('imageDiv').appendChild(fourthCard)

let correct = new Audio();
correct.src = "right.wav";
correct.duration = "0.5";

let incorrect = new Audio();
incorrect.src = "wrong.wav";

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
  contextPlaceHolder.closePath()
}

function drawSquare(x, y, width, height) {
  contextPlaceHolder.rect(x, y, width, height);
}

function drawTriangle(x, y) {
  contextPlaceHolder.moveTo(x + 25, y);
  contextPlaceHolder.lineTo(x + 50, y + 50);
  contextPlaceHolder.lineTo(x, y + 50);
}

function drawHeart(x, y, width, height){
         let topCurveHeight = height * 0.3;
                contextPlaceHolder.moveTo(x, y + topCurveHeight);
                contextPlaceHolder.bezierCurveTo(
          x, y, 
          x - width / 2, y, 
          x - width / 2, y + topCurveHeight
        );
                
                contextPlaceHolder.bezierCurveTo(
          x - width / 2, y + (height + topCurveHeight) / 2, 
          x, y + (height + topCurveHeight) / 2, 
          x, y + height
        );
                
                 contextPlaceHolder.bezierCurveTo(
          x, y + (height + topCurveHeight) / 2, 
          x + width / 2, y + (height + topCurveHeight) / 2, 
          x + width / 2, y + topCurveHeight
        );
                
                 contextPlaceHolder.bezierCurveTo(
          x + width / 2, y, 
          x, y, 
          x, y + topCurveHeight
        );
                
 }


function randomNumber(min, max) {
  let random = Math.floor(Math.random() * (+(max + 1) - +min)) + +min;
  return random;
}

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

// create random cards
function createCard() {
  let randomColor = randomNumber(0, 3);
  let randomShape = randomNumber(0, 3);
  let randomNum = randomNumber(0, 3);
  let color = allCards[0][randomColor];
  let shape = allCards[1][randomShape];
  let number = allCards[2][randomNum];
  let distY = -10;
  let distX = -10;

  drawCard(8, 0, 130, 205, "white");

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
          drawCircle(distX + 82, distY + 50, 25, 0);
          drawCircle(distX + 82, distY + 110, 25, 0);
          drawCircle(distX + 82, distY + 170, 25, 0);
          break;
		case 4:
          drawCircle(distX + 50, distY + 45, 25, 0);
          drawCircle(distX + 115, distY + 45, 25, 0);
		  drawCircle(distX + 115, distY + 175, 25, 0);
		  drawCircle(distX + 50, distY + 175, 25, 0);
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
		case 4:
          drawSquare(distX + 28, distY + 25, 40, 40);
          drawSquare(distX + 28, distY + 160, 40, 40);
          drawSquare(distX + 97, distY + 25, 40, 40);
          drawSquare(distX + 97, distY + 160, 40, 40);
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
		case 4:
          drawTriangle(distX + 25, distY + 20);
          drawTriangle(distX + 25, distY + 140);
          drawTriangle(distX + 91, distY + 20);
		  drawTriangle(distX + 91, distY + 140);
        break;
      }
      break;
	case "heart":
      switch (number) {
        case 1:
          drawHeart(distX + 82, distY + 80, 55, 55);
          break;
        case 2:
          drawHeart(distX + 82, distY + 35, 55, 55);
          drawHeart(distX + 82, distY + 125, 55, 55);
          break;
        case 3:
          drawHeart(distX + 82, distY + 20, 55, 55);
          drawHeart(distX + 82, distY + 80, 55, 55);
		  drawHeart(distX + 82, distY + 140, 55, 55);
          break;
		case 4:
          drawHeart(distX + 53, distY + 15, 55, 55);
          drawHeart(distX + 53, distY + 145, 55, 55);
		  drawHeart(distX + 115, distY + 15, 55, 55);
		  drawHeart(distX + 115, distY + 145, 55, 55);
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
let score = 0;

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

