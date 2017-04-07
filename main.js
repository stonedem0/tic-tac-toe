var XSymbol = "X";
var OSymbol = "O";
var boxes = document.getElementsByClassName("box");
var restartGameButton = document.getElementById("startGame");
var game = document.getElementById("game");
var startGameButton = document.getElementById("startGameButton");
var player1TurnCallToAction = document.getElementById("turn1");
var player2TurnCallToAction = document.getElementById("turn2");

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
};

restartGameButton.onclick = restartGame;

function checkSymbolinLines(symbol)
{
    var f11 = document.getElementById("1x1");
    var f12 = document.getElementById("1x2");
    var f13 = document.getElementById("1x3");
    var f21 = document.getElementById("2x1");
    var f22 = document.getElementById("2x2");
    var f23 = document.getElementById("2x3");
    var f31 = document.getElementById("3x1");
    var f32 = document.getElementById("3x2");
    var f33 = document.getElementById("3x3");

    var winLinesCombination = [
        [f11, f12, f13],
        [f21, f22, f23],
        [f31, f32, f33],
        [f11, f21, f31],
        [f12, f22, f32],
        [f13, f23, f33],
        [f11, f22, f33],
        [f13, f22, f31]
    ];
    for (var i = 0; i<winLinesCombination.length; i++)
    {
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


var isLastX = false;
function step(event) {
    var element = event.srcElement;
    if (element.innerHTML.length == 0)
    {
        element.innerHTML = isLastX ? OSymbol : XSymbol;

        if (isLastX)
        {
            player1TurnCallToAction.classList.remove("hidden");
            player2TurnCallToAction.classList.add("hidden");
        }
        else
        {
            player2TurnCallToAction.classList.remove("hidden");
            player1TurnCallToAction.classList.add("hidden");
        }

        isLastX = !isLastX;
    }

    var winnerX = checkSymbolinLines(XSymbol);
    var winnerO = checkSymbolinLines(OSymbol);
    if (winnerX)
    {
        alert("PLAYER 1 WINS!");
        restartGame()
    }

    if (winnerO)
    {
        alert("PLAYER 2 WINS");
        restartGame()
    }

    var isGameFinished = true;

    for (var i = 0; i < boxes.length; i++)
    {
        var box = boxes[i];
        if (box.innerHTML.length == 0)
        {
            isGameFinished = false;
            break;
        }

    }

    if (winnerO == false && winnerX == false && isGameFinished){
        alert("TIE!");
        restartGame()
    }
}

enumerateElements(boxes, function (element) {
    element.onclick = step;
});
