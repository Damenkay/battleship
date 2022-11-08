var view = {
    displayMessage:function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML=msg;
    },
    displayMiss:function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    },
    displayHit:function(location) {
        var cell = document.getElementById(location)
        cell.setAttribute("class","hit")
    }
}
var model = {
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,
    ships: [{ locations: ["06", "16", "26"], hits: ["", "", ""] },
            { locations: ["24", "34", "44"], hits: ["", "", ""] },
            { locations: ["10", "11", "12"], hits: ["", "", ""] }],
    fire: function (guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index>=0) {
                ship.hits[index] = "hit";
                view.displayHit(guess)
                view.displayMessage("HIT!!!")
                if (this.isSunk(ship)) {
                    // view.displayMessage("You sank my battleship");
                    this.shipsSunk++;
                }
                return true;
            }
            
        }
        view.displayMiss(guess)
        view.displayMessage("You Missed!!!")
        return false;
        
    },
    isSunk:function (ship) {
        for (var i = 0; i< this.shipLength; i++) {
            if (ship.hits !== "hit" ) {
                return false;
            }
            
        }
        return true;
    },
    generateShipLocations:function() {
        var locations;
        for (var i = 0; i< this.numShips; i++) {
           do {
            locations=this.generateShip();
           } while (this.collision(locations));
            this.ships[i].locations=locations;
        }
    },
    generateShip:function() {
        var direction = Math.floor(Math.random()*2)
        var row,col;
        if (direction===1) {
            row = Math.floor(Math.random()*this.boardSize);
            col = Math.floor(Math.random()*this.boardSize - this.shipLength)
        }else{
            row = Math.floor(Math.random()*this.boardSize - this.shipLength);
            col = Math.floor(Math.random()*this.boardSize )
        }
        var newShipLocations = [];
        for (var i = 0; i < this.shipLength; i++) {
            if (direction===1) {
                newShipLocations.push(row+""+(col + i));
            }else{
                newShipLocations.push((row+i)+""+col);
            }
            
        }
        return newShipLocations;
    }
};

var controller = {
	guesses: 0,

	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
					view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
			}
		}
	}
}

function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= model.boardSize ||
		           column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
}
function init(){
    var fireButton = document.getElementById("fireButton")
    fireButton.onclick=handleFireButton;
    var guessInput=document.getElementById("guessInput")
    guessInput.onkeypress=handleKeyPress
}

function handleFireButton(){
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);

    guessInput.value = "";

}

function handleKeyPress (e) {
    var fireButton = document.getElementById("fireButton")
    if (e.keyCode ===13) {
        fireButton.click();
        return false;
    }
}

window.onload=init


// function parseGuess(guess) {
//     var alph = ["A","B","C","D","E","F","G"]
//     if (guess === null || guess.length !== 2) {
//         alert("Oops! enter a letter and number on the board")
//     }else{
//         var firstChar = guess.charAt(0)
//         var row = alph.indexOf(firstChar)
//         var column = guess.charAt(1)

//         if (isNaN(row)||isNaN(column)) {
//             alert("The value entered is not on the board")
            
//         }else if (row<0||row>=model.boardSize||column<0||column>=model.boardSize) {
//             alert("Oops, thats off the board!!")
//         }else{
//             return row + column
//         }
//     }
//    return null; 
// }


// controller.processGuess("A0")
// controller.processGuess("A6")
// controller.processGuess("B6")
// controller.processGuess("C6")

// controller.processGuess("C4")
// controller.processGuess("D4")
// controller.processGuess("E4")

// controller.processGuess("B0")
// controller.processGuess("B2")
// controller.processGuess("B1")








// model.fire("53"); // miss
// model.fire("05"); // miss
// model.fire("15"); // miss
// model.fire("20"); // miss
// model.fire("45"); // miss
// model.fire("30"); // miss





// model.fire("06"); // hit
// model.fire("16"); // hit
// model.fire("26"); // hit

// model.fire("34"); // hit
// model.fire("24"); // hit
// model.fire("44"); // hit

// model.fire("12"); // hit
// model.fire("11"); // hit
// model.fire("10"); //

// view.displayHit("00")
// view.displayMiss("34")
// view.displayHit("55")
// view.displayMiss("12")
// view.displayHit("25")
// view.displayMiss("26")
// view.displayMessage("Wake up this is not a drill")