
var sn = require('..');

exports['create neuron'] = function (test) {
    var neuron = sn.neuron();
    
    test.ok(neuron);
    test.equal(typeof neuron, 'object');
    
    test.deepEqual(neuron.weights(), []);
    test.deepEqual(neuron.inputs(), []);
};

exports['set neuron weights'] = function (test) {
    var weights = [ 1, 2, 3 ];
    var neuron = sn.neuron();
    
    neuron.weights(weights);

    test.deepEqual(neuron.weights(), weights);
};

exports['set neuron inputs'] = function (test) {
    var inputs = [ sn.neuron(), sn.neuron(), sn.neuron() ];
    var neuron = sn.neuron();
    
    neuron.inputs(inputs);

    test.deepEqual(neuron.inputs(), inputs);
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

exports['set two inputs and get output'] = function (test) {
    var input1 = sn.neuron();
    var input2 = sn.neuron();
    var neuron = sn.neuron();
    
    neuron.inputs([ input1, input2 ]);
    neuron.weights([ 1, 1 ]);

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
    test.equal(neuron.bias(), 2);
};

exports['set bias'] = function (test) {
    var neuron = sn.neuron();
    
    test.equal(neuron.bias(), 0);
    test.equal(neuron.bias(1), 1);
    test.equal(neuron.bias(), 1);
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

exports['create neuron with logistic function'] = function (test) {
    var neuron = sn.neuron({ fn: 'logistic' });
    var input = sn.neuron({ fn: 'direct' });
    
    neuron.input(input);
    input.value(0);
    
    test.equal(input.value(), 0);
    test.equal(neuron.value(), 0);
    test.equal(neuron.output(), 0.5);
    test.equal(neuron.derivative(), 1 / 4);

    input.value(-1);
    neuron.reset();
    
    test.equal(input.value(), -1);
    test.equal(input.output(), -1);
    test.equal(neuron.value(), -1);
    test.equal(neuron.output(), 1 / (1 + Math.exp(1)));
    test.equal(neuron.derivative(), (1 / (1 + Math.exp(1))) * (1 - 1 / (1 + Math.exp(1))));

    input.value(1);
    neuron.reset();
    
    test.equal(input.value(), 1);
    test.equal(input.output(), 1);
    test.equal(neuron.value(), 1);
    test.equal(neuron.output(), 1 / (1 + Math.exp(-1)));
    test.equal(neuron.derivative(), (1 / (1 + Math.exp(-1))) * (1 - 1 / (1 + Math.exp(-1))));
};

