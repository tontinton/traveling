function Population(size, isInit) {
    this.paths = [];

    if (isInit) {
        for (let i = 0; i < size; i++) {
            let newPath = new Path();
            newPath.generateIndividual();
            this.paths.push(newPath);
        }
    } else {
        for (let i = 0; i < size; i++) {
            this.paths.push(null);
        }
    }

    this.getSize = function() {
        return this.paths.length;
    };

    this.getPath = function(pos) {
        return this.paths[pos];
    };

    this.setPath = function(pos, path) {
        this.paths[pos] = path;
    };

    this.getFittest = function() {
        let fittest = this.getPath(0);

        for (let i = 1; i < this.getSize(); i++) {
            let path = this.getPath(i);
            if (fittest.getFitness() <= path.getFitness()) {
                fittest = path;
            }
        }

        return fittest;
    };
}
