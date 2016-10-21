const NUMBER_OF_POINTS = 50;
const RADIUS = 10;
const NUMBER_OF_GENERATIONS = 10;

let canvas;
let pop;
let fittest;
let generation = 0;

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);

    if (PathManager.points.length < NUMBER_OF_POINTS) {
        for (let i = 0; i < NUMBER_OF_POINTS; i++) {
            PathManager.points.push(new Point());
        }
    }

    pop = new Population(50, true);
}

window.onresize = function () {
    generation = 0;
    PathManager.points = [];
    setup();
};

function update() {
    for (let i = 0; i < NUMBER_OF_GENERATIONS; i++) {
        pop = GA.evolvePopulation(pop);
        generation++;
    }
    fittest = pop.getFittest();
}

function draw() {
    update();
    background(51);

    // Lines
    strokeWeight(4);
    stroke(11, 179, 83); // rgb(11, 179, 83)
    for (let i = 1; i < fittest.getSize(); i++) {
        let previousPoint = fittest.getPoint(i - 1);
        let currentPoint = fittest.getPoint(i);
        line(previousPoint.x, previousPoint.y, currentPoint.x, currentPoint.y);
    }
    let firstPoint = fittest.getPoint(0);
    let lastPoint = fittest.getPoint(fittest.getSize() - 1);
    line(lastPoint.x, lastPoint.y, firstPoint.x, firstPoint.y);

    // Points
    noStroke();
    fill(101, 203, 237); // rgb(101, 203, 237)
    for (let i = 0; i < PathManager.points.length; i++) {
        let point = PathManager.points[i];
        ellipse(point.x, point.y, RADIUS, RADIUS);
    }

    // Text
    noStroke();
    fill(255, 0, 100); // rgb(255, 0, 100)
    textSize(width / 80);
    text("TSP solving by Genetic Algorithm, Made by Tony Solomonik", width / 150, height / 30);
    text('Generation: ' + generation + ", Distance: " + pop.getFittest().getDistance(), width / 150, height - height / 30);
}
