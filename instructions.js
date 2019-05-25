document.getElementById("instructionsTitle").innerHTML = "Instructions"

document.getElementById("instructionsText1").innerHTML = "The Wisconsin Card Sorting Task is a cognitive </br> task. By practicing regularly, you can train your </br> executive functions."

document.getElementById("instructionsText2").innerHTML = "During the classic game, a card will appear at the bottom of your </br> screen. You are asked to sort this card according to a hidden </br> rule. You sort a card by clicking one of the decks on top of </br> the screen. Each card belongs to just one deck. You have </br> to choose the one that fits the current rule." 

document.getElementById("instructionsText3").innerHTML = "You can learn the rule by paying attention to the feedback </br> that you get from the computer. If you sort a card right, you </br> will hear a bell and your score goes up. If you sort a card wrong, </br> you hear a buzzer and your score stays the same."

document.getElementById("instructionsText4").innerHTML = "After several rounds, the rule changes. Your task is to find </br> the new rule as quickly as you can, and sort the following </br> cards according to this new rule."

createCard(contextNewCard, newCard);

document.onscroll = function() {
        if (window.innerHeight + window.scrollY > document.body.clientHeight) {
            document.getElementById("arrow").style.display='none';
        }
}