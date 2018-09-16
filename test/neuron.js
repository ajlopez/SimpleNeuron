
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
    input.value(1);
    
    test.equal(neuron.output(), 1);
};

exports['two inputs'] = function (test) {
    var input1 = sn.neuron();
    var input2 = sn.neuron();
    var neuron = sn.neuron();
    
    neuron.input(input1);
    neuron.input(input2);
    input1.value(0.5);
    input2.value(0.5);
    test.equal(neuron.output(), 1);
};

exports['two inputs with bias'] = function (test) {
    var input1 = sn.neuron();
    var input2 = sn.neuron();
    var neuron = sn.neuron({ bias: 2 });
    
    neuron.input(input1);
    neuron.input(input2);
    input1.value(0.5);
    input2.value(0.5);
    test.equal(neuron.output(), 3);
};

exports['two inputs with weights'] = function (test) {
    var input1 = sn.neuron();
    var input2 = sn.neuron();
    var neuron = sn.neuron();
    
    neuron.input(input1, 0.5);
    neuron.input(input2, -0.5);
    input1.value(1);
    input2.value(1);
    test.equal(neuron.output(), 0);
};

exports['create neuron with default function'] = function (test) {
    var neuron = sn.neuron();
    var input = sn.neuron({ fn: 'direct' });
    
    neuron.input(input);
    input.value(1);
    
    test.equal(input.value(), 1);
    test.equal(neuron.value(), 1);
    test.equal(neuron.output(), 1);
    
    input.value(-1);
    neuron.reset();
    
    test.equal(input.value(), -1);
    test.equal(neuron.value(), -1);
    test.equal(neuron.output(), 0);
};

exports['create neuron with direct function'] = function (test) {
    var neuron = sn.neuron({ fn: 'direct' });
    var input = sn.neuron({ fn: 'direct' });
    
    neuron.input(input);
    input.value(1);
    
    test.equal(neuron.value(), 1);
    test.equal(neuron.output(), 1);
    
    input.value(-1);
    neuron.reset();
    
    test.equal(neuron.value(), -1);
    test.equal(neuron.output(), -1);
};
