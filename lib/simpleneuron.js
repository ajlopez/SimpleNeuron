
var simpleneuron = (function () {
    function Network(layers) {
        var size = 0;
        var outputoffset = 0;
        var neurons = [];
		var layeroffsets = [ 0 ];
		var nlayers = layers.length;
		var ninputs = layers[0];
        
        for (var k = 0; k < nlayers; k++)
            size += layers[k];
		for (var k = 1; k < nlayers; k++)
			layeroffsets[k] = layeroffsets[k - 1] + layers[k - 1];
		
        outputoffset = size - layers[layers.length - 1];
            
        for (var k = 0; k < size; k++)
            if (k < ninputs)
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
            return neurons[layeroffsets[nlayer] + nneuron];
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
                
            for (var k = 0; k < ninputs; k++)
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
                var from = layeroffsets[nl];
                var to = from + layers[nl];
                
                for (var k = from; k < to; k++)
                    if (nl === layers.length - 1) {
                        errors[k] = (expected[k - from] - outputs[k - from]);
                    }
                    else {
                        var error = 0;
                        var to2 = to + layers[nl + 1];
                        
                        for (var j = to; j < to2; j++) {
                            var weight = neurons[j].weight(neurons[k]);
                            error += errors[j] * weight;
                        }
                            
                        errors[k] = error * neurons[k].derivative();
                    }
            }

            for (var nl = 0; nl < nlayers - 1; nl++) {
                var from = layeroffsets[nl];
                var to = from + layers[nl];
                var to2 = to + layers[nl + 1];
                
                for (var k = from; k < to; k++)
                    for (var j = to; j < to2; j++) {
                        var weight = neurons[j].weight(neurons[k]);
                        var output = neurons[k].output();
                        var error = errors[j];
                        var dweight = output * error * (learningrate);
                        neurons[j].input(neurons[k], weight + dweight);
                    }
            }
        }
        
        function connectLayers(n, m) {
            var k0 = layeroffsets[n];
            var j0 = layeroffsets[m];
            
            for (var k = 0; k < layers[n]; k++)
                for (var j = 0; j < layers[m]; j++)
                    neurons[j + j0].input(neurons[k + k0], Math.random() * 2 - 1);
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
        var bias = 0;
        var fn;
        var dfn;
        
        options = options || {};
        
        if (!options.fn || options.fn === 'relu') {
            fn = fnRelu;
			dfn = dfnRelu;
        }
        else if (options.fn === 'direct') {
            fn = fnDirect;
			dfn = dfnDirect;
        }
        
        if (options.bias != null)
            bias = options.bias;
        
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
            
            value = total + bias;
            hasvalue = true;
            
            return value;
        }
        
        this.output = function () {
            return fn(this.value());
        }
        
        this.derivative = function () {
            return dfn(this.value());
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
        
        this.bias = function () {
            return bias;
        }
    }

    function createNeuron(options) {
        return new Neuron(options);
    }
	
	// Direct function and derivative
	function fnDirect(value) { return value; }
	function dfnDirect(value) { return 1; }
	
	// Relu function and derivative
	function fnRelu(value) { return value > 0 ? value : 0 }
	function dfnRelu(value) { return value > 0 ? 1 : 0 }

    return {
        neuron: createNeuron,
        network: createNetwork
    }
})();

if (typeof(window) === 'undefined')
    module.exports = simpleneuron;

