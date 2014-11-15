
function Network(layers) {
    var size = 0;
    var outputoffset = 0;
    var neurons = [];
    
    for (var n in layers)
        size += layers[n];
        
    outputoffset = size - layers[layers.length - 1];
        
    for (var k = 0; k < size; k++)
        if (k < layers[0])
            neurons[k] = createNeuron({ fn: 'direct' });
        else
            neurons[k] = createNeuron();
        
    for (var k = 1; k < layers.length; k++)
        connectLayers(k - 1, k);
        
    this.neurons = function (nlayer) {
        if (nlayer == null)
            return neurons.length;
            
        return layers[nlayer];
    }
    
    this.neuron = function (nlayer, nneuron) {
        var pos = 0;
        
        for (var k = 0; k < nlayer; k++)
            pos += layers[k];
            
        pos += nneuron;
        
        return neurons[pos];
    }
    
    this.layers = function () {
        return layers.length;
    }
    
    this.weight = function (from, to) {
        return neurons[to].weight(neurons[from]);
    }
    
    this.outputs = function (inputs) {
        for (var k = 0; k < size; k++)
            neurons[k].reset();
            
        for (var k = 0; k < layers[0]; k++)
            neurons[k].value(inputs[k]);
            
        outputs = [];
        
        for (var k = 0; k < size; k++) {
            var output = neurons[k].output();
            
            if (k >= outputoffset)
                outputs.push(output);
        }
        
        return outputs;
    }
    
    this.train = function (inputs, expected, learningrate) {
        var outputs = this.outputs(inputs);
        
        var errors = [];
        
        for (var nl = layers.length; nl-- > 0;) {
            var from = getLayerOffset(nl);
            var to = from + layers[nl];
            
            for (var k = from; k < to; k++)
                if (nl == layers.length - 1)
                    errors[k] = (expected[k - from] - outputs[k - from]);//* neurons[k].dfn(neurons[k].value());
                else {
                    var error = 0;
                    var to2 = to + layers[nl + 1];
                    
                    for (var j = to; j < to2; j++) {
                        var weight = neurons[j].weight(neurons[k]);
                        //console.log('weight', k, j, weight);
                        error += errors[j] * weight;
                    }
                        
                    errors[k] = error * neurons[k].dfn(neurons[k].value());
                }
        }

        //console.dir(errors);
        
        for (var nl = 0; nl < layers.length - 1; nl++) {
            var from = getLayerOffset(nl);
            var to = from + layers[nl];
            var to2 = to + layers[nl + 1];
            
            for (var k = from; k < to; k++)
                for (var j = to; j < to2; j++) {
                    var weight = neurons[j].weight(neurons[k]);
                    var output = neurons[k].output();
                    var error = errors[j];
                    var dweight = output * error * (learningrate);
                    neurons[j].input(neurons[k], weight + dweight);
                    
                    //console.log('dweight', k, j, weight, dweight, output, error);
                }
        }
    }
    
    function connectLayers(n, m) {
        var k0 = getLayerOffset(n);
        var j0 = getLayerOffset(m);
        
        for (var k = 0; k < layers[n]; k++)
            for (var j = 0; j < layers[m]; j++)
                neurons[j + j0].input(neurons[k + k0], Math.random() * 2 - 1);
    }
    
    function getLayerOffset(n) {
        var offset = 0;
        
        for (var k = 0; k < n; k++)
            offset += layers[k];
            
        return offset;
    }
}

function createNetwork(layers)
{
    return new Network(layers);
}

function Neuron(options) {
    var value;
    var hasvalue = false;
    var inputs = [];
    var weights = [];
    var fns = { };
    
    options = options || {};
    
    if (!options.fn || options.fn == 'relu') {
        this.fn = function (val) {
            return val >= 0 ? val : 0;
        }
        this.dfn = function (val) {
            return val >= 0 ? 1 : 0;
        }
    }
    else if (options.fn == 'direct') {
        this.fn = function (val) {
            return val;
        }
        this.dfn = function (val) {
            return 1;
        }
    }
    
    this.reset = function () { hasvalue = false; }
    
    this.value = function (val) {
        if (val != null) {
            hasvalue = true;
            value = val;
        }
        
        if (hasvalue)
            return value;
            
        var total = 0;
        
        for (var n in inputs) {
            var input = inputs[n];
            var weight = weights[n];
            
            total += input.output() * weight;
        }
        
        value = total;
        hasvalue = true;
        
        return value;
    }
    
    this.output = function () {
        return this.fn(this.value());
    }
    
    this.input = function (neuron, weight) {
        if (weight == null)
            weight = 1; 
            
        var p = inputs.indexOf(neuron);
        
        if (p < 0) {
            inputs.push(neuron);
            weights.push(weight);
        }
        else
            weights[p] = weight;
    }
    
    this.weight = function (neuron) {
        var position = inputs.indexOf(neuron);
        
        if (position < 0)
            return 0;
            
        return weights[position];
    }
}

function createNeuron(options) {
    return new Neuron(options);
}

module.exports = {
    neuron: createNeuron,
    network: createNetwork
}
