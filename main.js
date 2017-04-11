var XSymbol = "X";
var OSymbol = "O";
var middle = document.getElementById("2x2");
var boxes = document.getElementsByClassName("box");
var restartGameButton = document.getElementById("startGame");
var game = document.getElementById("game");
var startGameButton = document.getElementById("startGameButton");
var isGameFinished = false;
var whoWins = document.getElementById("whoWins");

function showWhoWins(text) {
    whoWins.innerHTML = text;
}

var startGame = function () {
    startGameButton.classList.add("hidden");
    game.classList.remove("hidden")
};

startGameButton.onclick = startGame;

var enumerateElements = function (elements, func) {
    Array.prototype.forEach.call(elements, func);
};

var restartGame = function () {
    restartGameButton.value = "RESTART";
    enumerateElements(boxes, function (element) {
        element.innerHTML = null;
    });
    isGameFinished = false;
    showWhoWins(null);
};

restartGameButton.onclick = restartGame;

var f11 = document.getElementById("1x1");
var f12 = document.getElementById("1x2");
var f13 = document.getElementById("1x3");
var f21 = document.getElementById("2x1");
var f23 = document.getElementById("2x3");
var f31 = document.getElementById("3x1");
var f32 = document.getElementById("3x2");
var f33 = document.getElementById("3x3");

var winLinesCombination = [
    [f11, f12, f13],
    [f21, middle, f23],
    [f31, f32, f33],
    [f11, f21, f31],
    [f12, middle, f32],
    [f13, f23, f33],
    [f11, middle, f33],
    [f13, middle, f31]
];

function checkSymbolinLines(symbol) {
    for (var i = 0; i<winLinesCombination.length; i++) {
        var symbolCount  = 0;
        var line = winLinesCombination[i];
        for (var k = 0; k < line.length; k++)
        {
            if(line[k].innerHTML == symbol)
            {
                symbolCount++;
            }
        }
        if (symbolCount == 3) {
            return true;
        }
    }
    return false;
}

function step(event) {
    var element = event.srcElement;
    if (element.innerHTML.length == 0 && isGameFinished == false) {
        element.innerHTML = XSymbol;
        chooseWinner();
        if (isGameFinished == false) {
            AIchoiceFunk();
            chooseWinner();
        }

    }
}

function chooseWinner() {
    var winnerX = checkSymbolinLines(XSymbol);
    var winnerO = checkSymbolinLines(OSymbol);
    if (winnerX) {
        isGameFinished = true;
        showWhoWins("YOU WIN!");
    }

    if (winnerO) {
        isGameFinished = true;
        showWhoWins("COMPUTER WINS");
    }
    var isTie = true;
    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
       if(box.innerHTML.length == 0){
         isTie = false;
           break;
       }
    }

    if (isTie) {
        isGameFinished = true;
        showWhoWins("TIE")
    }
}
enumerateElements(boxes, function (element) {
    element.onclick = step;
});

function AIchoiceFunk() {
    // rule1: set center cell as the most valuable
    if (middle.innerHTML.length == 0) {
        middle.innerHTML = OSymbol;
        return;
    }

    function separateCellsByContent(cellsArray) {
        var XCells = [];
        var OCells = [];
        var EmptyCells = [];

        for (var j = 0; j < cellsArray.length; j++) {
            var elementContent = cellsArray[j].innerHTML;

            if (elementContent == XSymbol) {
                XCells.push(cellsArray[j]);
            }
            if (elementContent == OSymbol) {
                OCells.push(cellsArray[j]);
            }
            if (elementContent.length == 0) {
                EmptyCells.push(cellsArray[j])
            }
        }

        return {
            xCells: XCells,
            oCells: OCells,
            emptyCells: EmptyCells
        };
    }

    // rule2: if 2 of the elements of the winning combination = O
    for (var cIndex = 0; cIndex < winLinesCombination.length; cIndex++) {
        var cells = separateCellsByContent(winLinesCombination[cIndex]);

        if (cells.oCells.length == 2 && cells.emptyCells.length == 1) {
            cells.emptyCells[0].innerHTML = OSymbol;
            return;
        }
    }

    //rule 3: if 2 of the elements of the winning combination = X
    for (var k = 0; k < winLinesCombination.length; k++) {
        var cells = separateCellsByContent(winLinesCombination[k]);

        if (cells.xCells.length == 2 && cells.emptyCells.length == 1) {
            cells.emptyCells[0].innerHTML = OSymbol;
            return;
        }
    }

    //rule 4: if 2 of the elements of the winning combination = X
    for (var k = 0; k < winLinesCombination.length; k++) {
        var cells = separateCellsByContent(winLinesCombination[k]);

        if (cells.oCells.length == 1 && cells.emptyCells.length == 2) {
            cells.emptyCells[0].innerHTML = OSymbol;
            return;
        }
    }

    // rule5: just pick first empty cell
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].innerHTML == 0) {
            boxes[i].innerHTML = OSymbol;
            return;
        }
    }
}
