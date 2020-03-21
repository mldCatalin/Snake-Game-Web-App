class SnakeBoard {
    BOARD_CELL_NUMBER;
    INDEXED_BOARD_SIZE;

    map;
    snakeIsAlive;

    possibleFoodLocations;
    snake;
    food;
    snakeHasEaten = false;

    foodsEaten;

    constructor() {
        this.BOARD_CELL_NUMBER = BOARD_SIZE * BOARD_SIZE;
        this.INDEXED_BOARD_SIZE = BOARD_SIZE - 1;
        this.map = createOrganicMatrix(BOARD_SIZE);
        this.snake = new Array();
        this.possibleFoodLocations = new Array();
    }   

    moveSnake(direction) {
        var newSnakeHead = this.getNextBoardPosition(direction);
        try {
            if (this.getCell(newSnakeHead) == CellType.FOOD) {
                this.setCell(newSnakeHead, CellType.SNAKE);
                this.snake[0].setPrevious(newSnakeHead);
                this.snake.unshift(newSnakeHead);
                this.generateFood();
                this.snakeHasEaten = true;
                this.foodsEaten += 1;
            } else {
                this.cutSnakeTail();
                this.snakeHasEaten = false;
                if (this.getCell(newSnakeHead) == CellType.SNAKE) {
                    this.snakeIsAlive = false;
                    return;
                }
                this.setCell(newSnakeHead, CellType.SNAKE);
                this.snake[0].setPrevious(newSnakeHead);
                this.snake.unshift(newSnakeHead);
            }
        }
        catch (e) {
            console.log("snake is dead");
            this.snakeIsAlive = false;
        }
    }

    initialize() {
        this.generateSnakeBody();
        this.snakeIsAlive = true;
        this.generateFood();
        this.foodsEaten = 0;
    }

    generateSnakeBody() {
        var x = Math.floor(Math.random() * BOARD_SIZE);
        var y = Math.floor(Math.random() * BOARD_SIZE);
        var head = new Cell(x, y);
        this.snake.push(head);
        this.map[x][y] = CellType.SNAKE;
        this.growSnakeHead();
    }

    growSnakeHead() {
        var directions = Directions.values;
        var newHead = Cell.createCell(this.getSnakeHead(), directions[random.nextInt(4)]);
        this.setCell(newHead, CellType.SNAKE);
        this.snake[this.snake.length - 1].setPrevious(newHead);
        this.snake.push(newHead);
    }

    generateFood() {
        this.possibleFoodLocations = new Array();
        this.populatePossibleFoodLocations();
        var randomInt = this.getRandomInt(0, this.possibleFoodLocations.length);
        this.food = this.possibleFoodLocations[randomInt];
        this.setCell(this.food, CellType.FOOD);
    }
  
    populatePossibleFoodLocations() {
        for (var i = 0; i < BOARD_SIZE; i++) {
            for (var j = 0; j < BOARD_SIZE; j++) {
                if (this.getCellInner(i, j) == CellType.EMPTY) {
                    this.possibleFoodLocations.push(new Cell(i, j));
                }
            }
        }
    }

    getNextBoardPosition(direction) {
        return Cell.createCell(this.getSnakeHead(), direction);
    }

    getCell(cell) {
        return this.getCellInner(cell.getX(), cell.getY());
    }

    getCellInner(x, y) {
        if (Boolean(x < 0) ||
            Boolean(x >= BOARD_SIZE) ||
            Boolean(y < 0) ||
            Boolean(y >= BOARD_SIZE)) {
            throw new Error("out of bounds");
        }
        return this.map[x][y];
    }

    setCell(cell, type) {
        this.map[cell.getX()][cell.getY()] = type;
    }

    cellIsEmpty(x, y) {
        return Boolean(this.getCellInner(x, y) == CellType.EMPTY);
    }

    getSnakeHead() {
        return this.snake[0];
    }

    resetBoard() {
        this.clearMap();
        this.snake = [];
    }

    clearMap() {
        for (var i = 0; i < BOARD_SIZE; i++) {
            for (var j = 0; j < BOARD_SIZE; j++) {
                this.map[i][j] = CellType.EMPTY;
            }
        }
    }

    cutSnakeTail() {
        this.setCell(this.snake[this.snake.length - 1], CellType.EMPTY);
        this.snake.splice(-1, 1);
    }

    getFood() {
        return this.food;
    }

    getMap() {
        return this.map;
    }

    getSnake() {
        return this.snake;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}

function createOrganicMatrix(size) {
    var rows = new Array(size);
    for (var i = 0; i < size; i++) {
        var cols = new Array(size);
        rows[i] = cols;
        for (var j = 0; j < size; j++) {
            cols[j] = CellType.EMPTY;
        }
    }
    return rows;
}