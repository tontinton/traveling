function Path(points) {
    this.path = points || [];
    this.fitness = 0;
    this.distance = 0;

    if (!points) {
        for (let i = 0; i < PathManager.points.length; i++) {
            this.path.push(null);
        }
    }

    this.getSize = function() {
        return this.path.length;
    };

    this.getPoint = function(pos) {
        return this.path[pos];
    };

    this.setPoint = function(pos, point) {
        this.path[pos] = point;
        this.fitness = 0;
        this.distance = 0;
    };

    this.containsPoint = function(point) {
        let index = this.path.indexOf(point);
        return index !== -1;
    };

    this.generateIndividual = function() {
        for (let i = 0; i < PathManager.points.length; i++) {
            this.setPoint(i, PathManager.points[i]);
        }

        PathManager.shuffle(this.path);
    };

    this.getFitness = function() {
        if (this.fitness === 0) {
            this.fitness = 1 / this.getDistance();
        }
        return this.fitness;
    };

    this.getDistance = function() {
        if (this.distance === 0) {
            let pathDistance = 0;

            for (let i = 0; i < this.getSize(); i++) {
                let fromPoint = this.getPoint(i);
                let toPoint;

                if (i < this.getSize() - 1) {
                    toPoint = this.getPoint(i + 1);
                } else {
                    toPoint = this.getPoint(0);
                }

                pathDistance += fromPoint.distanceTo(toPoint);
            }
            this.distance = pathDistance;
        }
        return this.distance;
    }
}
