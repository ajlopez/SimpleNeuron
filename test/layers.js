
const sn = require('..');

exports['create layer with one dimension'] = function (test) {
    const layer = sn.layer(4);
    
    test.ok(layer);
    test.equal(typeof layer, 'object');
    
    test.equal(layer.size(), 4);
    test.deepEqual(layer.shape(), [ 4 ]);
};

exports['get layer neurons having relu'] = function (test) {
    const layer = sn.layer(4);
    
    for (let k = 0; k < 4; k++) {
        const neuron = layer.neuron(k);
        
        test.ok(neuron);
        test.equal(neuron.output(-1), 0);
        test.equal(neuron.output(0), 0);
        test.equal(neuron.output(1), 1);
        test.equal(neuron.output(2), 2);
    }
};

exports['connecting two layers'] = function (test) {
    const layer1 = sn.layer(2);
    const layer2 = sn.layer(4);
    
    layer2.over(layer1);

    const neurons1 = layer1.neurons();
    const neurons2 = layer2.neurons();
    
    test.ok(neurons1);
    test.equal(neurons1.length, 2);
    test.equal(neurons2.length, 4);
    
    for (let k = 0; k < 4; k++) {
        const inputs = neurons2[k].inputs();
        
        test.ok(inputs),
        test.equal(inputs, neurons1);
        
        const weights = neurons2[k].weights();
        
        test.ok(weights);
        test.equal(weights.length, neurons1.length);
    }
};

exports['get layer neurons having direct'] = function (test) {
    const layer = sn.layer(4, { fn: 'direct' });
    
    for (let k = 0; k < 4; k++) {
        var neuron = layer.neuron(k);
        
        test.ok(neuron);
        test.equal(neuron.output(-1), -1);
        test.equal(neuron.output(0), 0);
        test.equal(neuron.output(1), 1);
        test.equal(neuron.output(2), 2);
    }
};


