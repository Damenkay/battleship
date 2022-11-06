var view = {
    displayMessage:function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML=msg;
    },
    displayMiss:function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayHit:function(location) {
        var cell = document.getElementById(location)
        cell.setAttribute("class","miss")
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
    
        
    }
}


iiiuy

// view.displayHit("00")
// view.displayMiss("34")
// view.displayHit("55")
// view.displayMiss("12")
// view.displayHit("25")
// view.displayMiss("26")
// view.displayMessage("Wake up this is not a drill")