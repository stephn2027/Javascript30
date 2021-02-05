



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

var model= {

	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,

	ships: [
	 	{locations:[0,0,0], hits: ['','','']},
	 	{locations:[0,0,0], hits: ['','','']},
	 	{locations:[0,0,0], hits: ['','','']}
 	],

 	fire: function(guess){
 		for(var i = 0;i<this.numShips;i++){
 			var ship = this.ships[i];
 			var index = ship.locations.indexOf(guess);
 			if(ship.hits[index]==="hit"){
 				view.displayMessage("Ooops, you already hit that location!");
 				return true;
 			}else if(index>=0){
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
 		for (var i = 0; i <this.shipLength; i++) {
 			if(ship.hits[i] !== "hit"){
 				return false;
 			}
 		}
 		return true
 	},

 	generateShipLocations: function(){
 		var locations;
 		for (var i = 0; i < this.numShips; i++) {
 			do{
 				locations = this.generateShip();
 			}while(this.collision(locations)){
 				this.ships[i].locations = locations;
 			}
 		}
 		console.log("Ships array: ");
		console.log(this.ships[0].locations,this.ships[1].locations,'\n', this.ships[2].locations);
 	},

 	generateShip: function (){
 		var direction = Math.floor(Math.random()*2);
 		var row,col;

 		if(direction === 1){
 				row = Math.floor(Math.random()*this.boardSize);
 				col = Math.floor(Math.random()*(this.boardSize-this.shipLength+1));
 			}else {
 				row = Math.floor(Math.random()*(this.boardSize-this.shipLength+1));
 				col = Math.floor(Math.random()*this.boardSize);
 			}
 		
 			
 		
 		var newShipLocation = [];
 		
 		for (var i = 0; i < this.shipLength; i++) {
 			
 			if(direction === 1){
 				newShipLocation.push(row +""+(col+i));
 			}else {
 				newShipLocation.push((row+i)+""+col);	
 			}
 			
 		}
 		return newShipLocation;

 	},

 	collision: function (locations){
 		for (var i = 0; i < this.numShips; i++) {
 			var ship = this.ships[i];
 			for (var j = 0; j < locations.length; j++) {
 				if(ship.locations.indexOf(locations[j])>=0){
 					return true;
 				}
 			}

 		}
 		return false;
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
				view.displayMessage(`You sank all my battleShips, in ${this.guesses} guesses`);
				setTimeout(reloadButton, 4000);
					function reloadButton(){
						if(confirm("Would you like to play again?")){
						window.location.reload();
						}else {
						view.displayMessage("GAMEOVER");
						}
					}

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

function init(){
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = fireButtonHandler;
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleGuessInput;
	model.generateShipLocations();
}

function handleGuessInput(e){
	var fireButton = document.getElementById("fireButton");
		e = e || window.event;
		if(e.keyCode === 13){
			fireButton.click();
			return false;
		}
}
window.onload = init;

function fireButtonHandler(){
 var guessInput = document.getElementById("guessInput");
 var guess = guessInput.value;
 controller.processGuess(guess.toUpperCase());
 guessInput.value = "";

 
}



