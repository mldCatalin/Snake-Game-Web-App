class Cell {
    previous;
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.previous = null;
    }

    static createCell(referenceCell, direction) {
        return new Cell(referenceCell.getX() + direction.getDeltaX(), referenceCell.getY() + direction.getDeltaY());
    }
    
    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
    
    getPrevious() {
        return this.previous;
    }
    
    setPrevious(previous) {
        this.previous = previous;
    }
}
