function Point(x, y) {
    this.x = x || random(0, width);
    this.y = y || random(0, height);

    this.distanceTo = function(otherPoint) {
        return Math.sqrt(Math.pow(otherPoint.x - this.x, 2) + Math.pow(otherPoint.y - this.y, 2));
    }
}
