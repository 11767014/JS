// Function to draw random number between min and max
// Returns this random number
function randomNumber(min, max) {
    let random = Math.floor(Math.random() * (+(max + 1) - +min)) + +min;
    return random;
}

// Function to compare two arrays
// FirstArray and secondArray are the arrays to be compared
// Returns true if arrays are identical, otherwise false
function compareArrays(firstArray,secondArray){
	let identical = true;
    
    // First, the length of the arrays is compared
    let firstLength = firstArray.length;
    let secondLength = secondArray.length
        
	if(firstLength != secondLength){
        // If the length is not equal, the arrays are not identical
		identical = false;
	} else {
        // If the length is equal, every position of the array is compared
		for (let i = 0; i < firstLength; i++) {
			if(firstArray[i] != secondArray[i]){
				identical = false;
			}
		}
	}
    // Return the verdict
	return identical 
};

// Function to create percentages, which are used for drawing on the canvas
// Percentage is the percentage to be calculated (e.g. 80%)
// Number is the number of which this percentage is to be calculated (e.g. 100)
// Returns the value that is percentage of number (e.g. 80)
function pc(percentage, number){
    let onePercent = number/100
    return (percentage * onePercent)
}

// Function to draw an empty card with four rounded edges, like the key cards
// Context and elem refer to the context and canvas, respectively, on which the card is drawn
// X and y are the coordinates of the drawing, color is its color
function drawCard(context, elem, x, y, color) {
    let radius = 8;
    height = elem.height;
    width = elem.width;
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width,y + height,x + width - radius,y + height );
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.fillStyle = color;
    context.fill();
}

// Function to draw a square on a prespecified canvas
// Context and elem refer to the context and canvas, respectively, on which the shape is drawn
// Xp and yp refer to the (percentual) coordinates of the drawing
// Wp and hp refer to the (percentual) width and height of the drawing
// Xp, yp, wp, and hp are entered as numbers (e.g. 80)
// In the function, the percentage of the canvas dimension of interest is calculated (e.g. 80% of the canvas width)
function drawSquare(context, elem, xp, yp, wp, hp) {
    let width = pc(wp, elem.width);
    let height = pc(hp, elem.height);;
    let y = pc(yp, elem.height);
    let x = pc(xp, elem.width);
    context.rect(x, y, width, height);
    context.closePath();
}

// Function to draw a circle on a prespecified canvas
// Context and elem refer to the context and canvas, respectively, on which the shape is drawn
// Xp and yp refer to the (percentual) coordinates of the drawing
// Radiusp refers to the (percentual) radius of the drawing
// Xp, yp, and radiusp are entered as numbers (e.g. 80)
// In the function, the percentage of the canvas dimension of interest is calculated (e.g. 80% of the canvas width)
function drawCircle(context, elem, xp, yp, radiusp) {
    let radius = pc(radiusp, elem.width)
    let y = pc(yp, elem.height);
    let x = pc(xp, elem.width);  
    context.arc(x, y, radius, 0 * Math.PI, 2 * Math.PI);
    context.closePath();
}

// Function to draw a triangle on a prespecified canvas
// Context and elem refer to the context and canvas, respectively, on which the shape is drawn
// Xp, yp and zp refer to the (percentual) coordinates of the drawing
// Xp, yp, and zp are entered as numbers (e.g. 80)
// In the function, the percentage of the canvas dimension of interest is calculated (e.g. 80% of the canvas width)
function drawTriangle(context, elem, xp, yp, zp) {
    let y = pc(yp, elem.height);
    let x = pc(xp, elem.width);
    let z = pc(zp, elem.width);
    context.moveTo(x + z, y);
    context.lineTo(x + z*2, y + z*2);
    context.lineTo(x, y + z*2);
    context.closePath();
}

// Function to draw a heart on a prespecified canvas
// Context and elem refer to the context and canvas, respectively, on which the shape is drawn
// Xp and yp refer to the (percentual) coordinates of the drawing
// Wp and hp refer to the (percentual) width and height of the drawing
// Xp, yp, wp, and hp are entered as numbers (e.g. 80)
// In the function, the percentage of the canvas dimension of interest is calculated (e.g. 80% of the canvas width)
function drawHeart(context, elem, xp, yp, wp, hp){
    let width = pc(wp, elem.width);    
    let height = pc(hp, elem.height);  
    let y = pc(yp, elem.height);        
    let x = pc(xp, elem.width);    
    let topCurveHeight = height * 0.3;
    context.moveTo(x, y + topCurveHeight);
    context.bezierCurveTo(x, y,x - width / 2, y,x - width / 2, y + topCurveHeight);
    context.bezierCurveTo(x - width / 2, y + (height + topCurveHeight) / 2, x, y + (height + topCurveHeight) / 2,x, y + height);
    context.bezierCurveTo(x, y + (height + topCurveHeight) / 2, x + width / 2, y + (height + topCurveHeight) / 2, x + width / 2, y + topCurveHeight);
    context.bezierCurveTo(x + width / 2, y, x, y,x, y + topCurveHeight);
    context.closePath();
};

// Define an array that contains all possible properties of cards
// The rows describe color, shape, and number, respectively
let allCards = [
	["red","green","gold","blue"],
	["circle", "square","triangle","heart"],
	[1,2,3,4]
];

// Define an array per key card that that contains the properties of this specific card
// The first entry corresponds to the first row of the allCards array,color
// The second entry corresponds to the second row of the allCards array,shape
// The third entry corresponds to the third row of the allCards array,number
let cardOne     = [1, 2, 0];
let cardTwo     = [2, 1, 1];
let cardThree   = [0, 0, 2];
let cardFour    = [3, 3, 3];

// Dclare a global variable results to store the properties of the current play card in
let result = [];

// Declare a variable that represents the canvas of the play card
// Declare a variable that represents the context of the canvas of the play card
const playCard = document.getElementById("playCard");
const contextPlayCard = playCard.getContext("2d");

// Function to create the play card and draw it on the prespecified canvas
// Context and elem refer to the context and canvas, respectively, on which the card is drawn
// RandomColor, randomShape and randomNumber refer to the color, shape and number of the card, respectively
// Color, shape and number can be specified to preduce a specific card, otherwise they will be random 
// RandomColor must be a number that corresponds to the position of the desired value of the first row allCards array (e.g. red is 0)
// RandomShape must be a number that corresponds to the position of the desired value of the second row allCards array (e.g. circle is 0)
// RandomNumber must be a number that corresponds to the position of the desired value of the third row allCards array (e.g. 1 is 0)
// The function updates the array result, which contains the properties of the play card that is drawn
function createCard(context, elem, randomColor, randomShape, randomNum) {    
        
        // Declare a variable that temporarily stores the properties of the new play card
    let cardResults = [randomColor, randomShape, randomNum];

        // If the play card properties are not prespecified, draw them randomly by drawing random numbers
    if(randomColor == null && randomShape == null && randomNum == null){
        do{
            randomColor = randomNumber(0, 3);
            randomShape = randomNumber(0, 3);
            randomNum = randomNumber(0, 3);

            cardResults = [randomColor, randomShape, randomNum];
        }
            // Keep doing this for as long as the properties of this new card match the properties of the previous card or one of the key cards
            while(compareArrays(cardResults,result) == true || compareArrays(cardResults,cardOne) == true || compareArrays(cardResults,cardTwo) == true || compareArrays(cardResults,cardThree) == true || compareArrays(cardResults,cardFour) == true);;
    }

    // Translate the numbers in the matching color, shape, number from the allCards array
    let color = allCards[0][randomColor];
    let shape = allCards[1][randomShape];
    let number = allCards[2][randomNum];
           
    // Draw a blank card
    drawCard(context, elem, 0, 0, "white")
        
    // Draw the shape that is chosen, in the chosen quantity
    // First check shape, than number
    context.beginPath();
    switch (shape) {
        case "circle":
            switch (number) {
                case 1:
                    drawCircle(context, elem, 50,50,15);
                    break;
                case 2:
                    drawCircle(context, elem, 50,25,15);
                    drawCircle(context, elem, 50,70,15);
                    break;
                case 3:
                    drawCircle(context, elem, 75,25,15);
                    drawCircle(context, elem, 50,50,15);
                    drawCircle(context, elem, 25,75,15);
                    break;
                case 4:
                    drawCircle(context, elem, 25,20,15);
                    drawCircle(context, elem, 25,80,15);
                    drawCircle(context, elem, 75,80,15);
                    drawCircle(context, elem, 75,20,15);
                    break;
            } 
            break;
            
        case "square":
            switch (number) {
                case 1:
                    drawSquare(context, elem, 36,38,26,23);
                    break;
                case 2:
                    drawSquare(context, elem, 36,15,26,23);
                    drawSquare(context, elem, 36,65,26,23);
                    break;
                case 3:
                    drawSquare(context, elem, 65,10,26,23);
                    drawSquare(context, elem, 36,40,26,23);
                    drawSquare(context, elem, 10,70,26,23);
                    break;
                case 4:
                    drawSquare(context, elem, 10,10,26,23);
                    drawSquare(context, elem, 65,10,26,23);
                    drawSquare(context, elem, 10,70,26,23);
                    drawSquare(context, elem, 65,70,26,23);
                    break;
                } 
                break;
                
        case "triangle":
            switch (number) {
                case 1:
                    drawTriangle(context, elem, 30, 32, 18);
                    break;
                case 2:
                    drawTriangle(context, elem, 30, 10, 18);
                    drawTriangle(context, elem, 30, 60, 18);
                    break;
                case 3:
                    drawTriangle(context, elem, 60, 8, 18);
                    drawTriangle(context, elem, 32, 35, 18);
                    drawTriangle(context, elem, 5, 62, 18);
                    break;
                case 4:
                    drawTriangle(context, elem, 5, 5, 18);
                    drawTriangle(context, elem, 58, 5, 18);
                    drawTriangle(context, elem, 5, 65, 18);
                    drawTriangle(context, elem, 58, 65, 18);
                    break;
                }
            break;

        case "heart":
            switch (number) {
                case 1:
                    drawHeart(context, elem, 48, 38, 32, 27)
                    break;
                case 2:
                    drawHeart(context, elem, 48, 15, 32, 27)
                    drawHeart(context, elem, 48, 60, 32, 27)
                    break;
                case 3:
                    drawHeart(context, elem, 75, 10, 32, 27)
                    drawHeart(context, elem, 48, 36, 32, 27)
                    drawHeart(context, elem, 25, 65, 32, 27)
                    break;
                case 4:
                    drawHeart(context, elem, 22, 10, 32, 27)
                    drawHeart(context, elem, 75, 10, 32, 27)
                    drawHeart(context, elem, 22, 65, 32, 27)
                    drawHeart(context, elem, 75, 65, 32, 27)
                    break;
                }
            break;
        }
        
    // Fill the drawing with the prespecified color
    context.closePath();
    context.fillStyle = color;
    context.fill();
    
    // Store the properties of the new play card in the results variable
    result = cardResults;
};

// Declare a global variable that indicates whether a key card is clickable or not
let clickable = true;

// Function to move the card on top of the clicked card
function move() {
    
    let elem = playCard;    // Elem is the canvas element of the play card
    
    let bottom = 0;     // Bottom and side are the base position of the play card, so in the right corner of the screen
	let side = 0;
        
    // Elem (representing the play card) must move to the position of the clicked card
    // In order to do so, the style of the clicked card is saved in temporaryStyle    
	let temporaryStyle = window.getComputedStyle(document.getElementById(clickedCardId));
    
    // NewBottom and newSide are the bottom and side positions of the clicked card
	let newBottom = parseInt(temporaryStyle.getPropertyValue('bottom'), 10); 
	let newSide = parseInt(temporaryStyle.getPropertyValue('right'), 10);
    
    // FactorSide and factorBottom are the factors by which the play card must move up and left to reach the clicked card in 100 steps
	let factorSide = (newSide/100)
	let factorBottom = (newBottom/100)

    // The z-index of all key cards is set to 0 in css
    // The z-index of the play card is set to 1 in css, to make it flow OVER the key cards
    // The z-index of the clicked card is temporarily set to 2 during the movement so that the play card disappears IN the deck
    document.getElementById(clickedCardId).style.zIndex = 2;
    
    // Id is a setinterval function that executes the function frame every 5 miliseconds
	let id = setInterval(frame, 5);
    
    // Frame adds one factor to the bottom and side until the position of the play card is not anymore lower than the clicked card
    // In that case, the interval is cleared, and the function moveBack is executed
    function frame() {
        if (bottom < newBottom) {
            bottom = bottom + factorBottom
            side = side + factorSide
            elem.style.bottom = bottom + 'px';
            elem.style.right = side + 'px';
            clickable = false;       // During the move, clickable is false so no card can be clicked during the movement
        } else {
	        clearInterval(id);
            moveBack();
        }
    }
    
        // MoveBack sets the position of the play card back to the bottom right corner of the screen
      	function moveBack(){
		elem.style.bottom = 0 + "%";
		elem.style.right = 0 + "%";
        document.getElementById(clickedCardId).style.zIndex = 0; 	// The key card is set back to it's initial z-value
		createCard(contextPlayCard, playCard);    					// A new play card is created and displayed on the canvas
		clickable = true;     										// Clickable is set to true, so that a new card can be clicked	
	}
    
 };
	
