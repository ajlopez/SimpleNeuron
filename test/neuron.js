
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

exports['on value when set output'] = function (test) {
    test.async();
    
    var neuron = sn.neuron();
    
    neuron.on('value', function (value) {
        test.equal(value, 1);
        test.done();
    });
    
    neuron.output(1);
};

exports['on value chained'] = function (test) {
    test.async();
    
    var input = sn.neuron();
    var neuron = sn.neuron();
        
    neuron.on('value', function (value) {
        test.equal(value, 1);
        test.done();
    });
    
    neuron.input(input);
    input.output(1);
};

exports['on value zero chained'] = function (test) {
    test.async();
    
    var input = sn.neuron();
    var neuron = sn.neuron();
        
    neuron.on('value', function (value) {
        test.equal(value, 0);
        test.done();
    });
    
    neuron.input(input);
    input.output(0.5);
};

exports['two inputs with on value chained'] = function (test) {
    test.async();
    
    var input1 = sn.neuron();
    var input2 = sn.neuron();
    var neuron = sn.neuron();
        
    neuron.on('value', function (value) {
        test.equal(value, 1);
        test.done();
    });
    
    neuron.input(input1);
    neuron.input(input2);
    input1.output(0.5);
    input2.output(0.5);
};
