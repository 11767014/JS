// Try the code on this page for errors
try {

// if the window is loaded, a modal with instructions opens
window.onload = openModal(startModal, false);
document.getElementById("startModalText").innerHTML = "<b>CLASSICAL GAME</b> </br></br> During a classical game, you are asked to organize cards according to a hidden rule. You assign the cards that appear at the bottom of your screen to one of the four decks at the top of your screen by clicking the right deck. </br></br> Each card belongs to just one deck. You have to choose the one that fits the current rule. You can learn the rule by paying attention to the feedback that you get from the computer. If you sort a card right, you will hear a bell and your score goes up. If you sort a card wrong, you hear a buzzer and your score stays the same. </br></br> After several rounds, the rule changes. Your task is to find the new rule as quickly as you can, and sort the following cards according to this new rule."

// function that defines what happens at the end of each trial
function endTrial(){
    // count the trial
    nTrial = nTrial + 1;
    // after 64 trials, the game is ended
    if(nTrial == 64){
        gameOver();
    }
    
    // store the length of the round score in nIter for convenience
    let nIter = roundScore.length;    
    if (nIter > 9) {
        // check whether the last 10 trials were correct
        let lastTen = (roundScore.slice((nIter - 10),nIter))
            if (compareArrays(lastTen, [1,1,1,1,1,1,1,1,1,1]) == true){
 				// if so, change the rule
				changeRule(); 
                // count another round, reset the round score and the nIter
                round = round + 1;
                roundScore = [];
                nIter = 0;
				
            }
    }
};

// Function that defines what happens at game over in a classic game
// Displays score and perseverance errors in a modal
function gameOver() {
    openModal(endModal, false);
    document.getElementById("endModalText").innerHTML = "<b>END OF THE GAME</b> </br></br> This is the end of your game. Your score was " + score + ". You made " + errors + " errors, " + prsvrnceErrors + " of which were perseverance errors. You discovered a total of " + round + " hidden rules. </br></br> Well done! Do you want to try again?"
};

// Catch all errors in a general error message
} catch (err){
	// alert("You encountered the following error: " + err.stack + ". Sorry for the inconvenience! Please report the issue at https://github.com/11767014/JS/issues")
	alert("You encountered the following error: \"" + err + "\". Sorry for the inconvenience! Please report the issue to Eline")
}
