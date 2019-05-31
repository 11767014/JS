// if the window is loaded, a modal with instructions opens
//window.onload = openModal(startModal, false);
document.getElementById("startModalText").innerHTML = "<b>ARCADE GAME</b> </br></br> Like a classical game, in an arcade game you are asked to organize cards according to a hidden rule. You assign the cards that appear at the bottom of your screen to one of the four decks at the top of your screen by clicking the right deck. </br></br> Each card belongs to just one deck. You have to choose the one that fits the current rule. You can learn the rule by paying attention to the feedback that you get from the computer. If you sort a card right, you will hear a bell and your score goes up. If you sort a card wrong, you hear a buzzer and your score stays the same. </br></br> After several rounds, the rule changes. Your task is to find the new rule as quickly as you can, and sort the following cards according to this new rule. </br></br> However, in an arcade game you follow several levels. Each level is a bit more difficult than the last."

// Global variables that are declared at the start of each Arcade game
let maxErrors							// on levels > 1, maxErrors reflects the maximum number of errors to be made per level
let timeSpan;							// on levels > 2, timespan reflects the maximum number of miliseconds to sort a card
let levelRound = 1;             		// levelRound contains the number of rounds a player has been playing in the current level

// Function that defines what happens at game over in an arcade game
// Displays score,level and perseverance errors in a modal
function gameOver() {
    openModal(endModal, true);
    document.getElementById("endModalText").innerHTML = "<b>GAME OVER</b> </br></br> This is the end of your game. Your score was " + score + " and you made " + errors + ", of which " + prsvrnceErrors + " were perseverance errors. You reached level " + level + " and discovered " + round + " rules. </br></br> Well done! Do you want to try again?"
};

// Function to show the current score, number of errors and level
function showScoreNow(){
	document.getElementById("showScore").innerHTML = "score: " + score + " </br> errors: " + levelErrors + " </br> level: " + level;
}

// Function that specifies what happens at the start of each trial
function startTrial(){
	
	// show scores, errors, and level
	showScoreNow();
	
	// Function to set level-specific rules
	function checkLevel (){
		switch(level){
			// if level is 1, the maxmimum number of errors is infinite.
			case 1:
				maxErrors = Infinity;
				document.getElementById("modalTextLevel").innerHTML = "<b>First level!</b> </br></br> In the first level, you receive a warning when the rule changes. Try to find the new hidden rule and try not to make too many errors."
				break;

			// if level is 2, the maxmimum number of errors is 5.
			case 2:
				document.getElementById("modalTextLevel").innerHTML = "<b>Level up!</b> </br></br> The second level is like a classical game. Try to find the hidden rule, but beware not to make more than 5 errors."
				maxErrors = 5;
				break;

			// if level is 3, the maxmimum number of errors is 5 and the time to sort a card is 5.5 seconds
			case 3:
				document.getElementById("modalTextLevel").innerHTML = "<b>Level up!</b> </br></br> In the third level, your time is limited. Try to find the hidden rule, but beware not to make more than 5 errors. If you take more than 5 seconds, the card will automatically count as an error."
				timeSpan = 5500;
				maxErrors = 5;
				break;
				
			// if level is 4, the maxmimum number of errors is 4 and the time to sort a card is 4 seconds
			case 4:
				document.getElementById("modalTextLevel").innerHTML = "<b>Level up!</b> </br></br> Well done so far! Again, try to find the hidden rule, but beware not to make more than 4 errors. If you take more than 3 seconds, the card will automatically count as an error."
				timeSpan = 3500;
				maxErrors = 4;   
				break;
				
			// if level is 5, the maximum number of errors is 3 and the time to sort a card is 2.5 seconds
			case 5:
				document.getElementById("modalTextLevel").innerHTML = "<b>Level up!</b> </br></br> This is the final level. Try to find the hidden rule, but beware not to make more than 3 errors. If you take more than 2 seconds, the card will automatically count as an error."
				timeSpan = 2500;
				maxErrors = 3;   
				break;
		}
	}
	
	// Check whether it is time for a level up (which is every fourth round)
	if (level == 0 || levelRound == 4) {	// at level 0 (start of game) & at every fourth round, the following happens:
		if (level == 5){					// if level is 5, this is the end of the game
			gameOver();							
		} else {							// otherwise level goes up, errors are reset, rule is changed, and level-specific actions are undertaken
			level = level + 1;
			levelErrors = 0;		
			levelRound = 0;
			checkLevel();			
			
			openModal(levelModal, true);	// show level specific instructions
			showScoreNow();					// score, erors and level are updated
		}
	} 
};      

// Function that defines what happens at the end of each trial
function endTrial(){
	// Check whether the maximum number of errors has been made
	if (maxErrors == levelErrors){
		// if so, execute game over
		gameOver();
	} else {
		// store the length of the round score in nIter for convenience
		let nIter = roundScore.length;
		// if nIter is larger than a random number between 3 and 5 (to make new rule somewhat more unexpected)
		if (nIter > randomNumber(3, 5)){
			// check whether the last 4 trials were correct
			let lastFour = (roundScore.slice((nIter - 4),nIter))
            if (compareArrays(lastFour, [1,1,1,1]) == true){
				// if so, count another round, reset the round score, the nIter and the maximum number of trials for the new round
				levelRound = levelRound + 1;
				round = round + 1;
				roundScore = [];
				nIter = 0;
			
				// also, change the rule
				changeRule(); 
			}
		}
	startTrial();	
	}
};

// Declare two global variables to enable the countdown
let timer = 0;		// timer is used to store a setInterval function; by making it a global variable, it can be reset
let timeUp;    		// timeUp stores the moment that at which time is up

// Function to update the timeUp value so that the countdown can start again
// timeSpan is a global variable that holds the time (milliseconds) that are to be counted down
function resetTiming(timeSpan){
    timeUp = (new Date().getTime()) + timeSpan;
}

// Function to set and display a countdown in levels >2 
// timeSpan is a global variable that holds the time (milliseconds) that are to be counted down
function timingFunction (timeSpan){
	
	//when the function is executed, timeUp is updated
	resetTiming(timeSpan)
    
	// second, a setInterval function is created, named timer
	// the function is executed every 100 miliseconds
    timer = setInterval(function() {
		
		// every interval the present time is stored in now
        let now = new Date().getTime(); 
		// then, the time left until time up is stored in timeLeft
        let timeLeft = timeUp - now; 
		// as timeLeft contains milliseconds, the seconds are stored in secs
        let secs = timeLeft / 1000;
		
		// To show the time left, a function is created
		function showTimingNow(){
			
			// To round the seconds, a function is created
			// Value is the value to be rounded
			// Decimals is the desired number of decimals
			// Returns the rounded value
			function roundDec(value, decimals) {
				return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
			}
			
			// The seconds are rounded to 0 decimals and displayed in the "showTiming" element
			document.getElementById("showTiming").innerHTML = "time: " + roundDec(secs, 0);
		}
		
		// every inteval the function checks whether there is still time left 
        if (timeLeft >= 0){
			// if so, the updated countdown is showed
			showTimingNow()
        } else {
			// if not, the countdown is reset
			resetTiming(timeSpan)
			
			// the card is counted as an incorrectly sorted card; no card was clicked, so a card with non-existing properties is given to clickedCard
			clickedCard = [4,4,4];
			incorrectDeck()
        }
    }, 100)
}

// At the start of the game, startTrial is executed
startTrial();



