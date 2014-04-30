
var sn = require('..');

exports['create neuron'] = function (test) {
    var neuron = sn.neuron();
    
    test.ok(neuron);
    test.equal(typeof neuron, 'object');
};

exports['get output'] = function (test) {
    var neuron = sn.neuron();
    
    test.equal(neuron.output(), 0);
};

exports['set input and get output'] = function (test) {
    var neuron = sn.neuron();
    var input = sn.neuron();
    
    neuron.input(input);
    input.output(1);
    
    test.equal(neuron.output(), 1);
};

exports['two inputs with on value chained'] = function (test) {
    var input1 = sn.neuron();
    var input2 = sn.neuron();
    var neuron = sn.neuron();
    
    neuron.input(input1);
    neuron.input(input2);
    input1.output(0.5);
    input2.output(0.5);
    test.equal(neuron.output(), 1);
};
