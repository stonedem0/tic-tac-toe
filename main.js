
var boxes = document.getElementsByClassName("box");
var startGameButton = document.getElementById("startGame");

var enumerateElements = function (elements, func) {
    Array.prototype.forEach.call(elements, func);
};

var restartGame = function () {
    startGameButton.value = "RESTART";
    enumerateElements(boxes, function (element) {
        element.innerHTML = null;
    });
};

startGameButton.onclick = function () {
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
