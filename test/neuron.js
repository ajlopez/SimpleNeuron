
const sn = require('..');

exports['create neuron'] = function (test) {
    const neuron = sn.neuron();
    
    test.ok(neuron);
    test.equal(typeof neuron, 'object');
    
    test.deepEqual(neuron.weights(), []);
    test.deepEqual(neuron.inputs(), []);
};

exports['set neuron weights'] = function (test) {
    const weights = [ 1, 2, 3 ];
    const neuron = sn.neuron();
    
    neuron.weights(weights);

    test.deepEqual(neuron.weights(), weights);
};

exports['set neuron inputs'] = function (test) {
    const inputs = [ sn.neuron(), sn.neuron(), sn.neuron() ];
    const neuron = sn.neuron();
    
    neuron.inputs(inputs);

    test.deepEqual(neuron.inputs(), inputs);
};

exports['get output'] = function (test) {
    const neuron = sn.neuron();
    
    test.equal(neuron.output(), 0);
};

exports['set input and get output'] = function (test) {
    const neuron = sn.neuron();
    const input = sn.neuron();
    
    neuron.inputs([input]);
    neuron.weights([1]);
    input.value(1);
    
    test.equal(neuron.output(), 1);
};

exports['two inputs'] = function (test) {
    const input1 = sn.neuron();
    const input2 = sn.neuron();
    const neuron = sn.neuron();
    
    neuron.inputs([input1, input2]);
    neuron.weights([1, 1]);
    input1.value(0.5);
    input2.value(0.5);
    test.equal(neuron.output(), 1);
};

exports['set two inputs and get output'] = function (test) {
    const input1 = sn.neuron();
    const input2 = sn.neuron();
    const neuron = sn.neuron();
    
    neuron.inputs([ input1, input2 ]);
    neuron.weights([ 1, 1 ]);

    input1.value(0.5);
    input2.value(0.5);

    test.equal(neuron.output(), 1);
};

exports['two inputs with bias'] = function (test) {
    const input1 = sn.neuron();
    const input2 = sn.neuron();
    const neuron = sn.neuron({ bias: 2 });
    
    neuron.inputs([input1, input2]);
    neuron.weights([1, 1]);
    input1.value(0.5);
    input2.value(0.5);
    test.equal(neuron.output(), 3);
    test.equal(neuron.bias(), 2);
};

exports['set bias'] = function (test) {
    const neuron = sn.neuron();
    
    test.equal(neuron.bias(), 0);
    test.equal(neuron.bias(1), 1);
    test.equal(neuron.bias(), 1);
};

exports['two inputs with weights'] = function (test) {
    const input1 = sn.neuron();
    const input2 = sn.neuron();
    const neuron = sn.neuron();
    
    neuron.inputs([input1, input2]);
    neuron.weights([ 0.5, -0.5]);

    input1.value(1);
    input2.value(1);
    test.equal(neuron.output(), 0);
};

exports['create neuron with default function'] = function (test) {
    const neuron = sn.neuron();
    const input = sn.neuron({ fn: 'direct' });
    
    neuron.inputs([input]);
    neuron.weights([1]);
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
    const neuron = sn.neuron({ fn: 'direct' });
    const input = sn.neuron({ fn: 'direct' });
    
    neuron.inputs([input]);
    neuron.weights([1]);
    input.value(1);
    
    test.equal(neuron.value(), 1);
    test.equal(neuron.output(), 1);
    
    input.value(-1);
    neuron.reset();
    
    test.equal(neuron.value(), -1);
    test.equal(neuron.output(), -1);
};

exports['create neuron with logistic function'] = function (test) {
    const neuron = sn.neuron({ fn: 'logistic' });
    const input = sn.neuron({ fn: 'direct' });
    
    neuron.inputs([input]);
    neuron.weights([1]);
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

