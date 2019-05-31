// As the game does not work well with internet explorer or windows edge, a function is executed to detect IE browsers
function isIE() {
	let userAgent = navigator.userAgent;
	// MSIE used to detect old browsers and Trident used to newer ones
	let isItIe = userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1 || userAgent.indexOf("Edge") > -1;
  
	if (isItIe == true){
		alert("The WCST game is not fully supported by Internet Explorer and Microsoft Edge. Please switch browsers for a better experience.");
	}; 
}

isIE();

// Define sounds that are played if participant clicks an incorrect or correct card
let correct = new Audio();
correct.src = "src/right.wav"

let incorrect = new Audio();
incorrect.src = "src/wrong.wav"

// Function that scales the box that contains most important game graphics based on size of device screen  
// This function is executed on loading of the game, so canvas is still empty
function onLoadGame(){
    let container = document.getElementById("imageContainer"); // container is a square box that contains the graphics
	let size = 850;    // size is the size of this box (by default 850 pixels, both width and height);
	let screenWidth =  document.documentElement.clientWidth;   // screenwidth and screenheight are the clients screenwidth and screenheight.
	let screenHeight = document.documentElement.clientHeight;

    // the function checks whether the screenwidth is larger than the screenheight (e.g. landscape or portrait orientation)
	if(screenWidth > screenHeight){
		size = 0.8*screenHeight;      // in landscape position, the box is scaled to the height of the screen
		} else {
		size = 0.8*screenWidth;       // in portrait position, the box is scaled to the width of the screen
		}
	container.style.width = container.style.height = size + "px"
	
    playCard.width = (size *0.2)        // The canvas (playcard) is scaled here as well, as canvas scaling through css produces unwanted results
    playCard.height = (size *0.35)
}

// If the window is loaded, the function onLoadGame is executed
window.onload = onLoadGame();

// Function that uses the onLoadGame function to resize the screen 
// This function is executed on resizing the window during the game, so canvas already displays a card
// Therefore, this function reproduces the last canvas drawing by calling the last stored results
function onResizeGame(){
    onLoadGame();
    
    // creates a play card with the properties stored in the result variable, which is an array that contains:
    // a number representing the color (pos 1), the shape (pos 2), and the number (pos 3) of shapes
    createCard(contextPlayCard, playCard, randomColor = result[0], randomShape = result[1], randomNum = result[2]);    
}

// If the window is resized, the function onResizeGame is executed
window.onresize = onResizeGame;

// Declare the modals as global variables 
// the modals are invisible by default through css
let startModal = document.getElementById("startModal"); // startModal is the modal that is opened at the start of a game
let levelModal = document.getElementById("levelModal"); // levelModal is the modal that is opened at level up
let endModal = document.getElementById("endModal");     // endModal is the modal that is opened at the end of the game

// Function to make the modal visible (e.g. opening the modal)
openModal = function(elem) {
	elem.style.display = "block";     	// elem is the modal of interest
	if(level > 3){               		// arcade game levels >2 contain a timer that should stop if the modal is opened
        clearInterval(timer);
    }
}

// Function to make the modal invisible again (e.g. closing the modal)
closeModal = function(elem) {    	
	elem.style.display = "none";	// elem is the modal of interest
	if(level > 2){					// arcade game levels >2 contain a timer that should restart if the modal is closed
		timingFunction (timeSpan)	
	}
};

// Function to open the menu if the player clicks the menu sign
function openMenu() {
	document.getElementById("menu").style.height = "100%";
    if (level > 2){					// arcade game levels >2 contain a timer that should stop if the menu is opened
		clearInterval(timer) 		
	}
}

// Function to close the menu if the player clicks the close menu sign
function closeMenu() {
	document.getElementById("menu").style.height = "0%";
    if (level > 2){					// arcade game levels >2 contain a timer that should restart if the menu is closed
		timingFunction (timeSpan)	
	}
}

// Global variables that are declared at the start of each game
let rule = randomNumber(0, 2);  // rule is a random number between 0 and 2 (corresponding to color, shape and number)
let oldRule = [];               // oldRule is a variable to store the previous rule in 
let score = 0;                  // score contains the score of the player
let round = 0;                  // round contains the number of rounds a player has been playing / how many rules were discovered
let roundScore = [];            // roundScore is an array that contains the score per round;
let prsvrnceErrors = 0;         // prsvrnceErrors is the number of perseverance errors someone made
let errors = 0;                 // errors is the number of errors someone made
let levelErrors = 0;			// errors per level are counted in arcade games
let nTrial = 0;                 // nTrial is the number of cards that were played, either correctly or incorrectly    
let level = 0;					// By default, level is 0

// For debugging purposes, the current and previous rules can be displayed in the console
function debugInConsole(rulesOnly){
	let possibleRules = ["color", "shape", "number"]
	console.log("old rule was:" + possibleRules[oldRule])
	console.log("rule is: " + possibleRules[rule])
}

// If desired, debugInConsole can be executed
debugInConsole()

// Function to change the rule
function changeRule(){
	//store the current rule as old rule
    oldRule = rule;
	
    // and draw a new rule randomly
    do {
		rule = randomNumber(0, 2);
    }
    // keep doing this as long as the old rule and new rule are the same
    while (oldRule == rule);
	
	// if desired, display the new rule and old rule in the console
    debugInConsole()
	
	// if the level is one but not at the start of the very first round, alert the player of the new rule
	if (level == 1 && round != 0){
		document.getElementById("modalTextLevel").innerHTML = "<b>New rule!</b> </br></br> During the first level, you get an alert when the rule changes. Please try to find the new rule without making too many errors."
		openModal(levelModal, true)
	}
};

// if all functions and variables are declared, the first play card is created
createCard(contextPlayCard, playCard);

// function that defines what happens if the player clicked the correct deck
function correctDeck() {
	move();                	// the play card is moved to the clicked card position with the function move(), which also creates a new play card 
	correct.play();        	// bell sound is played
	score = score + 1;      // score goes up   
	roundScore.push(1);    	// a 1 is added to the roundScore array 
    endTrial();            	// the function endTrial is executed
}

// function that defines what happens if the player clicked the incorrect deck
function incorrectDeck() {    
	incorrect.play();      			// buzzer sound is played
    errors = errors + 1;   			// number of errors goes up    
    levelErrors = levelErrors + 1;  // number of level errors goes up    
	roundScore.push(0);				// a 0 is added to the roundScore array
        if(result[oldRule] == clickedCard[oldRule]){        // If the card was sorted according to the previous rule,
                 prsvrnceErrors = prsvrnceErrors + 1;       // a perseverence error is counted 
                }
    endTrial();             				// the function endTrial is executed
    createCard(contextPlayCard, playCard);  // a new play card is created
}

// declare a global variable that holds the properties of the card that was clicked
let clickedCard;
let clickedCardId;

// function that defines what happens if a player clicks the first card
firstCard.onclick = function() {
    clickedCardId = "firstCard"     // clickedCardId is the Id of the html element (image) that represents the clicked card 
    clickedCard = cardOne;          // clickedCard is an array with three numbers representing the properties of the clicked card (e.g. color, shape, number)
	if(clickable == true){	        // only if the card is clickable (so not during movement), the following actions are taken
		if (result[rule] == cardOne[rule]) { 	// if the properties of the play card and clicked card match
            correctDeck()          				// the function correctDeck is executed
			} else {
                incorrectDeck();    			// else, incorrectDeck() is executed
		  }
		if (level > 2){
			resetTiming(timeSpan)
		}
	}
};

// function that defines what happens if a player clicks the second card
secondCard.onclick = function() {
    clickedCardId = "secondCard"    // clickedCardId is the Id of the html element (image) that represents the clicked card
    clickedCard = cardTwo;          // clickedCard is an array with three numbers representing the properties of the clicked card (e.g. color, shape, number)
	if(clickable == true){         	// only if the card is clickable (so not during movement), the following actions are taken
		if (result[rule] == cardTwo[rule]) { 	// if the properties of the play card and clicked card match
			correctDeck();          			// the function correctDeck is executed
			} else {
    			incorrectDeck();    			// else, incorrectDeck() is executed
		  }
		if (level > 2){
			resetTiming(timeSpan)
		}
    }
};

// function that defines what happens if a player clicks the third card
thirdCard.onclick = function() {
    clickedCardId = "thirdCard"     // clickedCardId is the Id of the html element (image) that represents the clicked card
    clickedCard = cardThree;        // clickedCard is an array with three numbers representing the properties of the clicked card (e.g. color, shape, number)
	if(clickable == true){         	// only if the card is clickable (so not during movement), the following actions are taken
		if (result[rule] == cardThree[rule]) { 	// if the properties of the play card and clicked card match
			correctDeck();          			// the function correctDeck is executed
			} else {
                incorrectDeck();    			// else, incorrectDeck() is executed
			}
		if (level > 2){
			resetTiming(timeSpan)
		}
	}
};

// function that defines what happens if a player clicks the fourth card
fourthCard.onclick = function() {
    clickedCardId = "fourthCard"    // clickedCardId is the Id of the html element (image) that represents the clicked card
    clickedCard = cardFour;         // clickedCard is an array with three numbers representing the properties of the clicked card (e.g. color, shape, number)
    if(clickable == true){          // only if the card is clickable (so not during movement), the following actions are taken
		if (result[rule] == cardFour[rule]) { 	// if the properties of the play card and clicked card match 
			correctDeck();         	 			// the function correctDeck is executed
			} else {
                incorrectDeck();    			// else, incorrectDeck() is executed
			}
		if (level > 2){
			resetTiming(timeSpan)
		}
    }
};
