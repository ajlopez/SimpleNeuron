
var sn = require('..');

exports['create network'] = function (test) {
    var network = sn.network([4, 6, 5]);
    
    test.ok(network);
    test.equal(typeof network, 'object');
    
    test.equal(network.layers(), 3);
    test.equal(network.neurons(), 4 + 6 + 5);
    test.equal(network.neurons(0), 4);
    test.equal(network.neurons(1), 6);
    test.equal(network.neurons(2), 5);
    
    for (var k = 0; k < 4; k++)
        for (var j = 4; j < 10; j++) {
            test.ok(network.weight(k, j) <= 1);
            test.ok(network.weight(k, j) >= -1);
        }
    
    for (var k = 4; k < 10; k++)
        for (var j = 10; j < 15; j++) {
            test.ok(network.weight(k, j) <= 1);
            test.ok(network.weight(k, j) >= -1);
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
    
    var outputs = network.outputs([1, 1, 1, 1]);
    
    test.ok(outputs);
    test.ok(Array.isArray(outputs));
    test.equal(outputs.length, 5);
    
    for (var k = 0; k < 5; k++)
        test.equal(network.neuron(2, k).output(), outputs[k]);
};

exports['create and train network'] = function (test) {
    var network = sn.network([4, 10, 2]);
    
    var outputs = network.outputs([1, 1, 1, 1]);
    console.dir(outputs);
    
    for (var k = 0; k < 20; k++) {
        network.train([1, 1, 1, 1], [1, 0], 0.1);
        var newoutputs = network.outputs([1, 1, 1, 1]);
    
        console.dir(newoutputs);
    }
};

exports['create and train network 2'] = function (test) {
    var network = sn.network([6, 10, 3]);
    
    var outputs = network.outputs([0, 0, 1, 1, 0, 0]);
    console.dir(outputs);
    
    for (var k = 0; k < 20; k++) {
        network.train([0, 0, 1, 1, 0, 0], [0, 1, 0], 0.1);
        var newoutputs = network.outputs([0, 0, 1, 1, 0, 0]);
    
        console.dir(newoutputs);
    }
};
