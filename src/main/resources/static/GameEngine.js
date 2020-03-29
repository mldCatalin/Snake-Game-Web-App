class GameEngine {
    snakeBoard;
    gui;

    currentDirection;
    nextDirection;

    interval;
    playerScore;
    

    xDown = null;
    yDown = null;

    constructor(snakeBoard) {
        this.snakeBoard = snakeBoard;
        this.gui = new GUI(snakeBoard, this);
        var directions = Directions.values;
        this.currentDirection = directions[random.nextInt(directions.length)];
        this.nextDirection = this.currentDirection;
        document.onkeydown = this.updateDirection;
        //document.addEventListener('touchstart', handleTouchStart, false);        
        //document.addEventListener('touchmove', handleTouchMove, false);
    }

    startGame() {
        this.snakeBoard.initialize();
        this.interval = setInterval(this.handleMoveSnake(), DIFFICULTY);
    }

    restartGame() {
        var gameOverMessage = document.getElementById('gameOverPanel');
        gameOverMessage.style.visibility = 'hidden';
        var highscores = document.getElementById('highscores');
        highscores.style.visibility = 'hidden';
        var scoreContainer = document.getElementById('scoreContainer');
        scoreContainer.style.backgroundColor = "white";
        this.snakeBoard.resetBoard();
        this.startGame();
    }

    handleMoveSnake() {
        return () => {
            this.snakeBoard.moveSnake(this.nextDirection);
            if (this.snakeBoard.snakeIsAlive) {
                this.currentDirection = this.nextDirection;
                this.gui.drawGameFrame();
                var div = document.getElementById('playerScore');
                this.playerScore = this.snakeBoard.foodsEaten * this.snakeBoard.snake.length;
                div.innerHTML = 
                    'Your Score: ' + this.playerScore;
            }
            else {
                clearInterval(document.gameEngine.interval);
                var gameOverMessage = document.getElementById('gameOverPanel');
                gameOverMessage.style.visibility = 'visible';
                var scoreContainer = document.getElementById('scoreContainer');
                scoreContainer.style.backgroundColor = "gray";
                saveScore(this.playerScore)
            }
        }
    }

    updateDirection(e) {
        e = e || window.event;

        if (directionIsValid(e.keyCode)) {

            if (e.keyCode == '38') {
                document.gameEngine.nextDirection = Directions.UP;
            }
            else if (e.keyCode == '40') {
                document.gameEngine.nextDirection = Directions.DOWN;
            }
            else if (e.keyCode == '37') {
                document.gameEngine.nextDirection = Directions.LEFT;
            }
            else if (e.keyCode == '39') {
                document.gameEngine.nextDirection = Directions.RIGHT;
            }
        }
    }

}

function saveScore(score){
    if(!score){
        console.log('score is not found');
        return;
    }

    var postScoreRequestParams = httpRequestParams;
    postScoreRequestParams.data = JSON.stringify({"score": score})
    postScoreRequestParams.success = displayTopScores();
    
    ajaxCall(postScoreRequestParams);
}

function displayTopScores(){
    callTopScoresAPI();
    callPlayerTopScoreAPI();
}

function callTopScoresAPI(){
    fetch(httpRequestParams.url + "top?limit=3")
    .then(res => res.json())
    .then(res => handleTopScoresAPIResponse(res));
}

function callPlayerTopScoreAPI(){
    fetch(httpRequestParams.url + "personalTop")
    .then(res => res.json())
    .then(res => handlePlayerTopScoreAPIResponse(res))
}

function handleTopScoresAPIResponse(response) {

    console.log("o intrat in handle response")
    var highScoresList = response;
    var highscores = document.getElementById('highscores');
    highscores.style.visibility = 'visible';
    
    var bestScore = parseInt(highScoresList[0].score);
    var firstHighScore = document.getElementById('firstHighScore');
    firstHighScore.innerHTML = 'Best score : ' + bestScore;
    var secondScore = parseInt(highScoresList[1].score);
    var secondHighScore = document.getElementById('secondHighScore');
    secondHighScore.innerHTML = 'Second score : ' + secondScore;
    var thirdScore = parseInt(response[2].score);
    var thirdHighScore = document.getElementById('thirdHighScore');
    thirdHighScore.innerHTML = 'third score : ' + thirdScore;
}

function handlePlayerTopScoreAPIResponse(response){
    var bestScore = parseInt(response.score);
    var playerBestScore = document.getElementById('playerBestScore');
    playerBestScore.innerHTML = 'Your best score : ' + bestScore;
}

function directionIsValid(userInputDirection) {
    console.log("direction is valid checkup");
    console.log("userInputDirection " + userInputDirection);
    switch (userInputDirection) {
        case UserInputDirection.UP:
            return Boolean(document.gameEngine.currentDirection != Directions.DOWN);
        case UserInputDirection.DOWN:
            return Boolean(document.gameEngine.currentDirection != Directions.UP);
        case UserInputDirection.LEFT:
            return Boolean(document.gameEngine.currentDirection != Directions.RIGHT);
        case UserInputDirection.RIGHT:
            return Boolean(document.gameEngine.currentDirection != Directions.LEFT);
    }
};
