function PathManager() {}

PathManager.points = [];

PathManager.shuffle = function(a) {
    for (let i = a.length; i; i--) {
        let j = parseInt(Math.random() * i, 10);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
};
