var view ={
	displayMessage: function(msg){
		var messageArea = document.getElementById('messageArea');
		messageArea.innerHTML = msg;
	},
	displayHit: function(location){
		var cell = document.getElementById(location);
		cell.setAttribute('class','hit');
	},
	displayMiss: function(location){
		var cell = document.getElementById(location);
		cell.setAttribute('class','miss');
	}
};

function init(){
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = fireButtonHandler;
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleGuessInput;
}

function handleGuessInput(e){
	var fireButton = document.getElementById("fireButton");
		if(e.keyCode === 13){
			fireButton.click();
			return false;
		}
}

function fireButtonHandler(){
 var guessInput = document.getElementById("guessInput");
 var guess = guessInput.value;
 controller.processGuess(guess.toUpperCase());
 guessInput.value = "";
}
window.onload = init;

var model= {

	boardSize: 7,
	numShips: 3,
	shiplength: 3,
	shipsSunk: 0,

	ships: [
	 	{
	 		locations:['06','16','26'], 
	 		hits: ['','','']
	 	},
	 	{
	 		locations:['24','34','44'], 
	 		hits: ['','','']
	 	},
	 	{
	 		locations:['10','11','12'], 
	 		hits: ['','','']
	 	}
 	],

 	fire: function(guess){
 		for(var i = 0;i<this.numShips;i++){
 			var ship = this.ships[i];
 			var index = ship.locations.indexOf(guess);
 			if(index>=0){
 				ship.hits[index] = "hit";
 				view.displayHit(guess);
 				view.displayMessage("HIT!");
 				if(this.isSunk(ship)){
 					
 					view.displayMessage("You sank my batte ship!");
 					this.shipsSunk++;

 				}
 			return true;
 			}

 		}
 		view.displayMiss(guess);
 		view.displayMessage("You missed!");
 		return false;
 	},

 	isSunk: function(ship){
 		for (var i = 0; i <this.shiplength; i++) {
 			if(ship.hits[i] !== "hit"){
 				return false;
 			}
 		}
 		return true
 	}


};




var controller = {
	guesses: 0,
	processGuess: function(guess){
		var location = this.parseGuess(guess);
		if(location){
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage(`You sank all my battleShips, in ${this.guesses} guesses`)
			}
		}

	},
	parseGuess: function(guess){

	var alphabet = ["A","B","C","D","E","F","G"];
		if(guess === null || guess.length !== 2){
			alert("Ooops! please enter a valid number");
		}else{
			firstChar = guess.charAt(0);
			var row = alphabet.indexOf(firstChar);
			var column = guess.charAt(1);

			if (isNaN(row)||isNaN(column)) {
				alert("Ooops!, that isn't on the board!");

			}else if(row<0||row>=model.boardSize||column<0||column>=model.boardSize){
				alert("Ooops! that's off the board!");
			}else{
				return row + column;
			}
		
		}
		return null;
	}




};


