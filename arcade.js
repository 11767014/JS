function showScoreNow(){
document.getElementById("showScore").innerHTML = "score: " + score + " </br> errors: " + errors + " </br> level: " + level;
}

function showTimingNow(){
document.getElementById("showTiming").innerHTML = "time: " + roundDec(secs, 0);
}


//window.onload = openModal();
document.getElementById("modalText").innerHTML = "The Wisconsin Card Sorting Task is a cognitive task. By practicing regularly, you can train your executive functions. </br> </br> During the classic game, a card will appear at the bottom of your screen. You are asked to sort this card according to a hidden rule. You sort a card by clicking one of the decks on top of the screen. </br></br> Each card belongs to just one deck. You have to choose the one that fits the current rule. You can learn the rule by paying attention to the feedback that you get from the computer. If you sort a card right, you will hear a bell and your score goes up. If you sort a card wrong, you hear a buzzer and your score stays the same. </br></br> After several rounds, the rule changes. Your task is to find the new rule as quickly as you can, and sort the following cards according to this new rule."

// start of the game
let secs = 0;
let rule = randomNumber(0, 2);
let maxIteration = 5;
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


levelUp();


showScoreNow();

function newLevel(){
 if (round%2 == 0) {
    level = level + 1;
    errors = 0;
  levelUp();
  }
};

function onRound(){
 if (roundScore.length == maxIteration) {
    oldRule = rule;
    do {
      rule = randomNumber(0, 2);
    } while (oldRule == rule);
    maxIteration = 5;
    round++;
    roundScore = [];
    newLevel();
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

function gameOver() {
    alert("Game over! Your score was " + score + ". You made " + prsvrnceErrors + " perseverance errors.")
    location.reload() 
};

function roundDec(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function levelUp(){
    switch(level){
        case 1:
            maxErrors = 5;
            if (roundScore.length == maxIteration){
            alert("new rule!")}
            break;
        case 2:
            maxErrors = 5;
            break;
        case 3:
            showTimingNow();
            maxErrors = 5;
            timeSpan = 5500;
            timingFunction(timeSpan);
            break;
        case 4:
            showTimingNow();
            maxErrors = 5;
            timeSpan = 3500;
            timingFunction(timeSpan);
            break;
        case 5:
            showTimingNow();
            maxErrors = 5;
            timeSpan = 2500;
            timingFunction(timeSpan);
            break;
        }
};        


function resetTiming(timeSpan){
    endDate = (new Date().getTime()) + timeSpan;
}

function timingFunction (timeSpan){
    let now = new Date().getTime(); 
    endDate = (new Date().getTime()) + timeSpan;    
    let t = endDate - now;
    secs = t / 1000;
    
    let timer = setInterval(function() {
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