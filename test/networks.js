
var sn = require('..');

exports['create network'] = function (test) {
    var network = sn.network([4, 6, 5]);
    
    test.ok(network);
    test.equal(typeof network, 'object');
    
    test.equal(network.nlayers(), 3);
    test.equal(network.size(0), 4);
    test.equal(network.size(1), 6);
    test.equal(network.size(2), 5);
    
    for (var k = 0; k < 4; k++)
        for (var j = 0; j < 6; j++) {
            test.ok(network.neuron(1, j).weights()[k] <= 1);
            test.ok(network.neuron(1, j).weights()[k] >= -1);
        }
    
    for (var k = 0; k < 6; k++)
        for (var j = 0; j < 5; j++) {
            test.ok(network.neuron(2, j).weights()[k] <= 1);
            test.ok(network.neuron(2, j).weights()[k] >= -1);
        }
};

exports['create network first layer are direct neurons'] = function (test) {
    var network = sn.network([4, 6, 5]);
    
    test.ok(network);
    test.equal(typeof network, 'object');
  
    for (var k = 0; k < 4; k++) {
        var neuron = network.neuron(0, k);
        neuron.value(-1);
        test.equal(neuron.output(), -1);
        neuron.value(0.5);
        test.equal(neuron.output(), 0.5);
    }
};

exports['create and evaluate network'] = function (test) {
    var network = sn.network([4, 6, 5]);
    
    var outputs = network.process([1, 1, 1, 1]);
    
    test.ok(outputs);
    test.ok(Array.isArray(outputs));
    test.equal(outputs.length, 5);
    
    for (var k = 0; k < 5; k++)
        test.equal(network.neuron(2, k).output(), outputs[k]);
};

exports['create and train network'] = function (test) {
    var network = sn.network([4, 10, 2]);
    
    var outputs = network.process([1, 1, 1, 1]);
    console.dir(outputs);
    
    for (var k = 0; k < 20; k++) {
        network.train([1, 1, 1, 1], [1, 0], 0.1);
        var newoutputs = network.process([1, 1, 1, 1]);
    
        console.dir(newoutputs);
    }
};

exports['create and train network xor function'] = function (test) {
    var network = sn.network([2, 4, 1]);
    
    for (var k = 0; k < 100; k++) {
        network.train([1, 1], [0], 0.3);
        network.train([0, 1], [1], 0.3);
        network.train([1, 0], [1], 0.3);
        network.train([0, 0], [0], 0.3);
        
        if (k % 10 == 9) {
            console.log();
            var newoutputs = network.process([0, 0]);
            console.dir(newoutputs);
            var newoutputs = network.process([0, 1]);
            console.dir(newoutputs);
            var newoutputs = network.process([1, 0]);
            console.dir(newoutputs);
            var newoutputs = network.process([1, 1]);
            console.dir(newoutputs);
        }
    }
};

exports['create and train network 2'] = function (test) {
    var network = sn.network([6, 10, 3]);
    
    var outputs = network.process([0, 0, 1, 1, 0, 0]);
    console.dir(outputs);
    
    for (var k = 0; k < 20; k++) {
        network.train([0, 0, 1, 1, 0, 0], [0, 1, 0], 0.1);
        var newoutputs = network.process([0, 0, 1, 1, 0, 0]);
    
        console.dir(newoutputs);
    }
};

exports['create simple network with direct function'] = function (test) {
    var network = sn.network([1, 1], { fn: 'direct' });
    
    test.deepEqual(network.process([ 1 ]), [ 1 * network.neuron(1, 0).weights()[0] ]);
};

exports['create simple network with logistic function'] = function (test) {
    var network = sn.network([1, 1], { fn: 'logistic' });
    
    test.deepEqual(network.process([ 0 ]), [ 0.5 ]);
};
