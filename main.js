
var boxes = document.getElementsByClassName("box");
var restartGameButton = document.getElementById("startGame");
var game = document.getElementById("game");
var startGameButton = document.getElementById("startGameButton");

var startGame = function () {
    startGameButton.classList.add("hidden");

};
var gameLoad = function () {
    game.classList.remove("hidden")
};
startGameButton.onclick = function () {
    startGame();
    gameLoad();
};

var enumerateElements = function (elements, func) {
    Array.prototype.forEach.call(elements, func);
};

var restartGame = function () {
    restartGameButton.value = "RESTART";
    enumerateElements(boxes, function (element) {
        element.innerHTML = null;
    });
};

restartGameButton.onclick = function () {
    restartGame();
};

var isLastX = false;

function step(event) {
    var element = event.srcElement;
    element.innerHTML = isLastX ? "O" : "X";
    isLastX = !isLastX;
}

Array.prototype.forEach.call(boxes, function (element) {
    element.onclick = step;
});
