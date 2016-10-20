const mutationRate = 0.015;
const tournamentSize = 5;
const isElitism = true;

function GA() {}

GA.evolvePopulation = function(pop) {
    let newPopulation = new Population(pop.getSize(), false);

    // Keep the best individual if elitism is enabled
    let elitismOffset = 0;
    if (isElitism) {
        newPopulation.setPath(0, pop.getFittest());
        elitismOffset = 1;
    }

    // Crossover population
    for (let i = elitismOffset; i < newPopulation.getSize(); i++) {
        let parent1 = GA.tournamentSelection(pop);
        let parent2 = GA.tournamentSelection(pop);

        let child = GA.crossover(parent1, parent2);
        newPopulation.setPath(i, child);
    }

    // Mutate the new population
    for (let i = elitismOffset; i < newPopulation.getSize(); i++) {
        GA.mutate(newPopulation.getPath(i));
    }

    return newPopulation;
};

GA.crossover = function(parent1, parent2) {
    let child = new Path();

    let startPos = parseInt(Math.random() * parent1.getSize());
    let endPos = parseInt(Math.random() * parent1.getSize());

    for (let i = 0; i < child.getSize(); i++) {
        if (startPos < endPos && i > startPos && i < endPos) {
            child.setPoint(i, parent1.getPoint(i));
        } else if (startPos > endPos) {
            if (!(i < startPos && i > endPos))
            child.setPoint(i, parent1.getPoint(i));
        }
    }

    for (let i = 0; i < parent2.getSize(); i++) {
        if (!child.containsPoint(parent2.getPoint(i))) {
            for (let j = 0; j < child.getSize(); j++) {
                if (child.getPoint(j) === null) {
                    child.setPoint(j, parent2.getPoint(i));
                    break;
                }
            }
        }
    }

    return child;
};

GA.mutate = function(path) {
    for (let pathPos1 = 0; pathPos1 < path.getSize(); pathPos1++) {
        if (Math.random() >= mutationRate) {
            continue;
        }

        let pathPos2 = parseInt(path.getSize() * Math.random());

        let path1 = path.getPoint(pathPos1);
        let path2 = path.getPoint(pathPos2);

        path.setPoint(pathPos2, path1);
        path.setPoint(pathPos1, path2);
    }
};

GA.tournamentSelection = function(pop) {
    let tournamentPopulation = new Population(tournamentSize, false);
    for (let i = 0; i < tournamentSize; i++) {
        let randomId = parseInt(Math.random() * pop.getSize());
        tournamentPopulation.setPath(i, pop.getPath(randomId));
    }
    return tournamentPopulation.getFittest();
};
