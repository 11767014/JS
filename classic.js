// define all cards
let allCards = [
	["red","green","gold","blue"],
	["circle", "square","triangle","heart"],
	[1,2,3,4]
];

// define specific cards
let cardOne = [1, 2, 0];
let cardTwo = [2, 1, 1];
let cardThree = [0, 0, 2];
let cardFour = [3, 3, 3];

// show possible and specific rules
let rule = randomNumber(0, 2);
let possibleRules = ["color", "shape", "number"];

// show score
const showScore = document.getElementById("showScore");
const contextshowScore = showScore.getContext("2d");

function showScoreNow(){
contextshowScore.clearRect(0,0,200,200);
contextshowScore.font = "40px Arial";
contextshowScore.fillStyle = "white";
contextshowScore.fillText("score: " + score, 10, 50);
}

// start of the game
let maxIteration = randomNumber(9,11)
let results = [];
results = createCard(contextNewCard, newCard);
let score = 0;
let level = 0;
let round = 0;
let lastThree = 0;
let roundScore = [];
let clickable = true;
showScoreNow();

function onRound(){
 if (roundScore.length == maxIteration) {
	lastThree = roundScore.slice((maxIteration-3),maxIteration)
    //alert(lastThree);
    let oldRule = rule;
    while (oldRule == rule) {
      rule = randomNumber(0, 2);
    }
    maxIteration = randomNumber(9,11);
    round++;
    roundScore = [];
	
//	alert("new round!")
  }
};

function correctDeck(factor, clickedCard) {
	move(factor, clickedCard);
	correct.play();
	score = score+1;
	roundScore.push(1);
}

function incorrectDeck() {
	incorrect.play();
	roundScore.push(0);
	resultsDeckIncorrect = createCard(contextNewCard, newCard);
	return resultsDeckIncorrect;
}

firstCard.onclick = function(callback) {
	if(clickable == true){	
		if (results[rule] == cardOne[rule]) {
			correctDeck("firstCard", firstCard);
			} else {
			results = incorrectDeck();
		  }
		  showScoreNow();
		  callback = onRound();
		  }
};


secondCard.onclick = function() {
	if(clickable == true){
		if (results[rule] == cardTwo[rule]) {
			correctDeck("secondCard", secondCard);
			} else {
			results = incorrectDeck();
		  }
		  showScoreNow();
		  callback = onRound();
	}
};

thirdCard.onclick = function() {
	if(clickable == true){
		if (results[rule] == cardThree[rule]) {
			correctDeck("thirdCard", thirdCard);
			} else {
			results = incorrectDeck();
		  }
		  showScoreNow();
		  callback = onRound();
	}
};

fourthCard.onclick = function() {
	if(clickable == true){
		if (results[rule] == cardFour[rule]) {
			correctDeck("fourthCard", fourthCard);
			} else {
			results = incorrectDeck();
		  }
		  showScoreNow();
		  callback = onRound();
	}
};
