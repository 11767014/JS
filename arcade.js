function showScoreNow(){
document.getElementById("showScore").innerHTML = "score: " + score + " </br> errors: " + errors + " </br> level: " + level;
}

function showTimingNow(){
document.getElementById("showTiming").innerHTML = "time: " + roundDec(secs, 0);
}

window.onload = openStartModal();
document.getElementById("modalText").innerHTML = "<b>ARCADE GAME</b> </br></br> Like a classical game, in an arcade game you are asked to organize cards according to a hidden rule. You assign the cards that appear at the bottom of your screen to one of the four decks at the top of your screen by clicking the right deck. </br></br> Each card belongs to just one deck. You have to choose the one that fits the current rule. You can learn the rule by paying attention to the feedback that you get from the computer. If you sort a card right, you will hear a bell and your score goes up. If you sort a card wrong, you hear a buzzer and your score stays the same. </br></br> After several rounds, the rule changes. Your task is to find the new rule as quickly as you can, and sort the following cards according to this new rule. </br></br> However, in an arcade game you follow several levels. Each level is a bit more difficult than the last."

// start of the game
let secs = 0;
let rule = randomNumber(0, 2);
let maxIteration = randomNumber(4, 6);
let oldRule = rule;
let score = 0;
let level = 1;
let round = 0;
let errors = 0;
let lastThree = 0;
let roundScore = [];
let clickable = true;
let prsvrnceErrors = 0;
let maxErrors = Infinity;
let timeSpan = 0;
let endDate = (new Date().getTime()); 
let pause = false;

levelUp();
showScoreNow();

function newLevel(){
 if (round%2 == 0) {
    level = level + 1;
    errors = 0;
	levelUp();
	openLevelModal();
  }
};

function onRound(){
 if (roundScore.length == maxIteration) {
    oldRule = rule;
    do {
      rule = randomNumber(0, 2);
    } while (oldRule == rule);
    maxIteration = randomNumber(4, 6);
    round++;
    roundScore = [];
    newLevel();
	if(level == 1){
		document.getElementById("modalTextLevel").innerHTML = "<b>New rule!</b> </br></br> During the first level, you get an alert when the rule changes. Please try to find the new rule without making too many errors."
		openLevelModal();
	}
  }
};

function correctDeck(factor, clickedCard) {
	move(factor, clickedCard);
	correct.play();
	score = score+1;
	roundScore.push(1);
    resetTiming(timeSpan);
}

function checkErrors(){
    if(maxErrors < errors){
    gameOver();
    errors = 0;
    }
}

function incorrectDeck(clickedCard) {
	incorrect.play();    
	roundScore.push(0);
	results = createCard(contextNewCard, newCard);
    errors = errors + 1;
    checkErrors();
    resetTiming(timeSpan);

    if(results[oldRule] == clickedCard[oldRule]){
                 prsvrnceErrors = prsvrnceErrors + 1;
                }
    showScoreNow()
}

function roundDec(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function levelUp(){
    switch(level){
        case 1:
            break;
        case 2:
            maxErrors = 5;
			document.getElementById("modalTextLevel").innerHTML = "<b>Level up!</b> </br></br> The second level is like a classical game. Try to find the hidden rule, but beware not to make more than 5 errors."
            break;
        case 3:
			document.getElementById("modalTextLevel").innerHTML = "<b>Level up!</b> </br></br> In the third level, your time is limited. Try to find the hidden rule, but beware not to make more than 5 errors. If you take more than 5 seconds, the card will automatically count as an error."
			timeSpan = 5500;
            break;
        case 4:
			document.getElementById("modalTextLevel").innerHTML = "<b>Level up!</b> </br></br> Well done so far! Again, try to find the hidden rule, but beware not to make more than 5 errors. If you take more than 3 seconds, the card will automatically count as an error."
            timeSpan = 3500;
            break;
        case 5:
			document.getElementById("modalTextLevel").innerHTML = "<b>Level up!</b> </br></br> This is the final level. Try to find the hidden rule, but beware not to make more than 5 errors. If you take more than 2 seconds, the card will automatically count as an error."
            timeSpan = 2500;
            break;
        }
};        

function onCloseModal (){
showTimingNow();
maxErrors = 5;
timingFunction(timeSpan);
}

function resetTiming(timeSpan){
    endDate = (new Date().getTime()) + timeSpan;
}

let timer = 0;

function timingFunction (timeSpan, pause){
    let now = new Date().getTime(); 
    endDate = (new Date().getTime()) + timeSpan;    
    let t = endDate - now;
    secs = t / 1000;
	showTimingNow()
    
    timer = setInterval(function() {
        now = new Date().getTime(); 
        t = endDate - now; 
        secs = t / 1000;

        if (t >= 0){
        showTimingNow()
        } else {
        showTimingNow()
        resetTiming(timeSpan);
        incorrectDeck(false)
        }
    }, 100)
	
	if(pause == true){
		clearInterval(timer)
	}
}


firstCard.onclick = function() {
	if(clickable == true){	
		if (results[rule] == cardOne[rule]) {
			correctDeck("firstCard", firstCard);
			} else {
			incorrectDeck(cardOne);
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
			incorrectDeck(cardTwo);
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
			incorrectDeck(cardThree);
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
			incorrectDeck(cardFour);
		  }
		  onRound();
		  showScoreNow();
    }
};
