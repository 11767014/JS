function showScoreNow(){
document.getElementById("showScore").innerHTML = "score: " + score;
}

window.onload = openStartModal();
document.getElementById("modalText").innerHTML = "<b>CLASSICAL GAME</b> </br></br> During a classical game, you are asked to organize cards according to a hidden rule. You assign the cards that appear at the bottom of your screen to one of the four decks at the top of your screen by clicking the right deck. </br></br> Each card belongs to just one deck. You have to choose the one that fits the current rule. You can learn the rule by paying attention to the feedback that you get from the computer. If you sort a card right, you will hear a bell and your score goes up. If you sort a card wrong, you hear a buzzer and your score stays the same. </br></br> After several rounds, the rule changes. Your task is to find the new rule as quickly as you can, and sort the following cards according to this new rule."

// start of the game
let rule = randomNumber(0, 2);
let maxIteration = randomNumber(9,11)
let oldRule = rule;
let score = 0;
let round = 0;
let lastThree = 0;
let roundScore = [];
let clickable = true;
let prsvrnceErrors = 0;

results = createCard(contextNewCard, newCard);
showScoreNow();

function onRound(){
 if (maxIteration < roundScore.length) {
    oldRule = rule;
	lastThree = roundScore.slice((maxIteration-3),maxIteration)
    if(compareArrays(lastThree, [1,1,1]) == false){
        gameOver();
        }
    while (oldRule == rule) {
      rule = randomNumber(0, 2);
    }
    maxIteration = 4;
    round++;
    roundScore = [];
  }
};

function correctDeck(factor, clickedCard) {
	move(factor, clickedCard);
	correct.play();
	score = score+1;
	roundScore.push(1);
}

function incorrectDeck(clickedCard) {
	incorrect.play();    
	roundScore.push(0);
	resultsDeckIncorrect = createCard(contextNewCard, newCard);
    if(results[oldRule] == clickedCard[oldRule]){
                 prsvrnceErrors = prsvrnceErrors + 1;
                }
	return resultsDeckIncorrect;
}

function gameOver() {
    alert("Game over! Your score was " + score + ". You made " + prsvrnceErrors + " perseverance errors.")
}


firstCard.onclick = function() {
	if(clickable == true){	
		if (results[rule] == cardOne[rule]) {
			correctDeck("firstCard", firstCard);
			} else {
			results = incorrectDeck(cardOne);
		  }
		  onRound();
          showScoreNow();
		  }
};


secondCard.onclick = function() {
	if(clickable == true){
		if (results[rule] == cardTwo[rule]) {
			correctDeck("secondCard", secondCard);
			} else {
			results = incorrectDeck(cardTwo);
		  }
		  onRound();
		  showScoreNow();
    }
};

thirdCard.onclick = function() {
	if(clickable == true){
		if (results[rule] == cardThree[rule]) {
			correctDeck("thirdCard", thirdCard);
			} else {
			results = incorrectDeck(cardThree);
		  }
		  onRound();
		  showScoreNow();
	}
};

fourthCard.onclick = function() {
	if(clickable == true){
		if (results[rule] == cardFour[rule]) {
			correctDeck("fourthCard", fourthCard);
			} else {
			results = incorrectDeck(cardFour);
		  }
		  onRound();
		  showScoreNow();
    }
};
