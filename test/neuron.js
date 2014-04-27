
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