let firstCard = document.createElement("IMG");
firstCard.src = "card1.jpg";
firstCard.width = 125;
firstCard.height = 200;
firstCard.style.margin = "30px 15px";
document.getElementById('imageDiv').appendChild(firstCard)

let secondCard = document.createElement("IMG");
secondCard.src = "card2.jpg";
secondCard.width = 125;
secondCard.height = 200;
secondCard.style.margin = "30px 15px";
document.getElementById('imageDiv').appendChild(secondCard)

let thirdCard = document.createElement("IMG");
thirdCard.src = "card3.jpg";
thirdCard.width = 125;
thirdCard.height = 200;
thirdCard.style.margin = "30px 15px";
document.getElementById('imageDiv').appendChild(thirdCard)

let fourthCard = document.createElement("IMG");
fourthCard.src = "card4.jpg";
fourthCard.width = 125;
fourthCard.height = 200;
fourthCard.style.margin = "30px 15px";
document.getElementById('imageDiv').appendChild(fourthCard)

let correct = new Audio();
correct.src = "right.wav";
correct.duration = "0.5";

let incorrect = new Audio();
incorrect.src = "wrong.wav";
