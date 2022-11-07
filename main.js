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
                    view.displayMessage("you sank my battleship");
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
    }
};

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