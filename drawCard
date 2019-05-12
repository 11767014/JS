const placeHolder = document.getElementById("placeHolder");
const contextPlaceHolder = placeHolder.getContext("2d");

// draw an empty card
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

// draw a circle
function drawCircle(x, y, width, height) {
  let radius = 2;
  contextPlaceHolder.arc(x, y, width, height, radius * Math.PI);
  contextPlaceHolder.closePath()
}


// draw a square
function drawSquare(x, y, width, height) {
  contextPlaceHolder.rect(x, y, width, height);
}

// draw a triangle
function drawTriangle(x, y) {
  contextPlaceHolder.moveTo(x + 25, y);
  contextPlaceHolder.lineTo(x + 50, y + 50);
  contextPlaceHolder.lineTo(x, y + 50);
}

// draw a heart
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

// function to draw random number
function randomNumber(min, max) {
  let random = Math.floor(Math.random() * (+(max + 1) - +min)) + +min;
  return random;
}

// create a random card
function createCard() {    
  // draw a random number for color, shape, number  
  let randomColor = randomNumber(0, 3);
  let randomShape = randomNumber(0, 3);
  let randomNum = randomNumber(0, 3);
  // save these numbers to know which card was drawn
  let results = [randomColor, randomShape, randomNum];
  // translate the numbers in actual color, shape, number
  let color = allCards[0][randomColor];
  let shape = allCards[1][randomShape];
  let number = allCards[2][randomNum];
  // define the x and y distance of figures on card
  let distY = -10;
  let distX = -10;
  // draw an empty card
  drawCard(8, 0, 130, 205, "white");
  // draw the shape(s) on card
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
  return results;
}
