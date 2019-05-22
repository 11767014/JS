
const newCard = document.getElementById("newCard");
const contextNewCard = newCard.getContext("2d");

let computedStyle = getComputedStyle(firstCard);
let widthCard = parseInt(computedStyle.getPropertyValue('width'), 10);
let heightCard = parseInt(computedStyle.getPropertyValue('height'), 10);
newCard.width = widthCard;
newCard.height = heightCard;

let correct = new Audio();
correct.src = "src/right.wav"

let incorrect = new Audio();
incorrect.src = "src/wrong.wav"

//function to move the card on top of the clicked card
function move(clickedCard, clickedCardWS) {
	let elem = document.getElementById("newCard");
	document.getElementById(clickedCard).style.zIndex = 2;
  
	let temporaryStyle = getComputedStyle(clickedCardWS);
	let newBottom = parseInt(temporaryStyle.getPropertyValue('bottom'), 10);
	let newSide = parseInt(temporaryStyle.getPropertyValue('right'), 10);
	
	let factorSide = (newSide/100)
	let factorBottom = (newBottom/100)
    
	let bottom = 0;
	let side = 0;

	let id = setInterval(frame, 5);

  	function moveBack(){
		elem.style.bottom = 0 + "%";
		elem.style.right = 0 + "%";
		document.getElementById(clickedCard).style.zIndex = 2;
		results = createCard(contextNewCard, newCard);
		clickable = true;		
	}
    
    function frame() {
        if (bottom < newBottom) {
          bottom = bottom + factorBottom
          side = side + factorSide
          elem.style.bottom = bottom + 'px';
          elem.style.right = side + 'px';
          clickable = false;
        } else {
	       clearInterval(id);
            moveBack();
        }
    }

 };
	
//create percentages
function pc(percentage, number){
    let onePercent = number/100
    return (percentage * onePercent)
}

// draw an empty card
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

// draw a square
function drawSquare(context, elem, xp, yp, wp, hp) {
  let width = pc(wp, elem.width);
  let height = pc(hp, elem.height);;
  let y = pc(yp, elem.height);
  let x = pc(xp, elem.width);
  context.rect(x, y, width, height);
  context.closePath();
}

// draw a circle
function drawCircle(context, elem, xp, yp, radiusp) {
  let radius = pc(radiusp, elem.width);
  let y = pc(yp, elem.height);
  let x = pc(xp, elem.width);  
//  context.beginPath();
  context.arc(x, y, radius, 0 * Math.PI, 2 * Math.PI);
  context.closePath();
}

// draw a triangle
function drawTriangle(context, elem, xp, yp, zp) {
  let y = pc(yp, elem.height);
  let x = pc(xp, elem.width);
  let z = pc(zp, elem.width);
  context.moveTo(x + z, y);
  context.lineTo(x + z*2, y + z*2);
  context.lineTo(x, y + z*2);
  context.closePath();
}

// draw a heart
function drawHeart(context, elem, xp, yp, wp, hp){
  let width = pc(wp, elem.width);
  let height = pc(hp, elem.height);;
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

// function to draw random number
function randomNumber(min, max) {
  let random = Math.floor(Math.random() * (+(max + 1) - +min)) + +min;
  return random;
}

function compareArrays(a,b){
	let compared = true;
	if (a.length != b.length){
		compared = false;
	} else {
		for (let i = 0; i < a.length; i++) {
			if(a[i] != b[i]){
				compared = false;
			}
		}
	}
	return compared
};

// create a random card
 function createCard(context, elem) {    
  // draw a random number for color, shape, number  
  	let randomColor = [];
	let randomShape = [];
	let randomNum = [];
	  	
	let cardResults = [randomColor, randomShape, randomNum];
	
	do{
	randomColor = randomNumber(0, 3);
	randomShape = randomNumber(0, 3);
	randomNum = randomNumber(0,3);
	  	
	cardResults = [randomColor, randomShape, randomNum];
	}
	while(compareArrays(cardResults,results) == true || compareArrays(cardResults,cardOne) == true || compareArrays(cardResults,cardTwo) == true || compareArrays(cardResults,cardThree) == true || compareArrays(cardResults,cardFour) == true)


  // translate the numbers in actual color, shape, number
  	let color = allCards[0][randomColor];
	let shape = allCards[1][randomShape];
	let number = allCards[2][randomNum];
   
  drawCard(context, elem, 0, 0, "white")
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
  context.closePath();
  context.fillStyle = color;
  context.fill();
  
  return cardResults;
 };

function isMobileDevice() {
        let mobile = true;
        if(ScreenOrientation.type == undefined){
            mobile = false;
            }
        return mobile
    }
	
alert(isMobileDevice())



function toggleScreen(){
    if(isMobileDevice() == true){
       screen.orientation.lock("landscape")
   }
}

