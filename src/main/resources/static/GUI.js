class GUI {
    constructor(snakeBoard, gameEngine) {
        this.gameEngine = gameEngine;
        this.snakeBoard = snakeBoard;
        this.map = snakeBoard.getMap();
        this.content = document.getElementById("content");
    }

    drawGameFrame() {
        this.content.innerHTML = "";
        for(var i = 0; i< this.snakeBoard.snake.length; i++)
        {
            createBlock(this.snakeBoard.snake[i], this.snakeBoard.getCell(this.snakeBoard.snake[i]));
        }

        createBlock(this.snakeBoard.food, CellType.FOOD);
    }
}

function addSnakeBlock(cell) {
    content.appendChild(createBlock(cell));
}

function createBlock(cell, char) { 
    appendCoordinates(cell);
    var div = document.createElement("div");
    div.style.width = BLOCKSIZE + "px";
    div.style.height = BLOCKSIZE + "px";
    switch (char) {
        case CellType.SNAKE:
            div.style.background = "green";
            break;
        case CellType.FOOD:
            div.style.background = "yellow";
            break;
    }

    div.style.position = "absolute";
    div.style.top = cell.pixelX + "px";
    div.style.left = cell.pixelY + "px";
    this.content.appendChild(div);
}

function appendCoordinates(cell) {
    cell.pixelX = cell.getX() * BLOCKSIZE;
    cell.pixelY = cell.getY() * BLOCKSIZE;
}