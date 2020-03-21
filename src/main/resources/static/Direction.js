class Direction {
    deltaX;
    deltaY;

    constructor(dx, dy) {
        this.deltaX = dx;
        this.deltaY = dy;
    }

    getDeltaX() {
        return this.deltaX;
    }

    getDeltaY() {
        return this.deltaY;
    }

    
}

const Directions = { UP: new Direction(-1, 0), DOWN: new Direction(1, 0), LEFT: new Direction(0, -1), RIGHT: new Direction(0, 1) };
Directions.values = [Directions.UP, Directions.DOWN, Directions.LEFT, Directions.RIGHT];