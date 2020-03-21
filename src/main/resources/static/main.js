var random = {};
random.nextInt = function (range) {
    return Math.floor(Math.random() * range);
};


function run() {
    var board = new SnakeBoard();
    var gg = new GameEngine(board);
    document.gameEngine = gg;
    gg.startGame();
}

function restartGame() {
    var board = new SnakeBoard();
    var gg = new GameEngine(board);
    document.gameEngine = gg;
    gg.restartGame();
}
