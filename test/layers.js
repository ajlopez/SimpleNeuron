
var sn = require('..');

exports['create layer with one dimension'] = function (test) {
    var layer = sn.layer(4);
    
    test.ok(layer);
    test.equal(typeof layer, 'object');
    
    test.equal(layer.size(), 4);
    test.deepEqual(layer.shape(), [ 4 ]);
};

exports['get layer neurons having relu'] = function (test) {
    var layer = sn.layer(4);
    
    for (var k = 0; k < 4; k++) {
        var neuron = layer.neuron(k);
        
        test.ok(neuron);
        test.equal(neuron.output(-1), 0);
        test.equal(neuron.output(0), 0);
        test.equal(neuron.output(1), 1);
        test.equal(neuron.output(2), 2);
    }
};

