function showScoreNow(){
document.getElementById("showScore").innerHTML = "score: " + score;
}

//window.onload = openModal();
document.getElementById("modalText").innerHTML = "The Wisconsin Card Sorting Task is a cognitive task. By practicing regularly, you can train your executive functions. </br> </br> During the classic game, a card will appear at the bottom of your screen. You are asked to sort this card according to a hidden rule. You sort a card by clicking one of the decks on top of the screen. </br></br> Each card belongs to just one deck. You have to choose the one that fits the current rule. You can learn the rule by paying attention to the feedback that you get from the computer. If you sort a card right, you will hear a bell and your score goes up. If you sort a card wrong, you hear a buzzer and your score stays the same. </br></br> After several rounds, the rule changes. Your task is to find the new rule as quickly as you can, and sort the following cards according to this new rule."

// start of the game
let rule = randomNumber(0, 2);
let maxIteration = randomNumber(9,11)
let oldRule = rule;
let score = 0;
let level = 0;
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