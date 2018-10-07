
var simpleneuron = require('../..');

var trainset = [
    [0, 0], [0],
    [1, 0], [1],
    [0, 1], [1],
    [1, 1], [0],
];

var network = simpleneuron.network([2, 8, 1]);

function train(network, lr) {
    for (var k = 0; k < trainset.length; k += 2)
        network.train(trainset[k], trainset[k + 1], lr);
}

function dump(network) {
    console.log();
    
    for (var k = 0; k < trainset.length; k += 2) {
        console.dir(trainset[k]);
        console.dir(network.process(trainset[k]));
    }
}

function cost(network) {
    var total = 0;
    
    for (var k = 0; k < trainset.length; k += 2) {
        var result = network.process(trainset[k]);
        
        for (var j = 0; j < result.length; j++) {
            var error = result[j] - trainset[k + 1][j];
            total += error * error;
        }
    }
    
    return total / trainset.length;
}

var c = cost(network);

while (c > 0.01) {
    console.log('cost', c);
    
    for (var k = 0; k < 100; k++)
        train(network, 0.3);
    
    c = cost(network);
}

dump(network);
console.log('cost', c);

