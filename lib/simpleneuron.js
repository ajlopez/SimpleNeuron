
var simpleneuron = (function () {
    function randomWeight() {
        return Math.random() * 2 - 1;
    }
    
    function randomWeights(n) {
        var weights = [];
        
        for (var k = 0; k < n; k++)
            weights[k] = randomWeight();
        
        return weights;
    }
    
    function Layer(dimensions, options) {
        var neurons = [];
        
        for (var k = 0; k < dimensions; k++)
            neurons[k] = createNeuron(options);
        
        this.size = function () { return dimensions; }
        this.shape = function () { return [ dimensions ]; }
        this.neuron = function (n) { return neurons[n]; }
        this.neurons = function () { return neurons; }
        
        this.over = function (layer) {
            var inputs = layer.neurons();
            var ninputs = inputs.length;
            
            for (var k = 0; k < neurons.length; k++) {
                neurons[k].inputs(inputs);
                neurons[k].weights(randomWeights(ninputs));
            }
        }
        
        this.reset = function () {
            for (var k = 0; k < neurons.length; k++)
                neurons[k].reset();
        }
        
        this.outputs = function () {
            var outputs = [];
            
            for (var k = 0; k < neurons.length; k++)
                outputs.push(neurons[k].output());
        }
    }
    
    function Network(layerdims, options) {
		var nlayers = layerdims.length;
        var layers = [];
        
        layers.push(new Layer(layerdims[0], { fn: 'direct' }));
        
        for (var k = 1; k < nlayers; k++) {
            layers.push(new Layer(layerdims[k]));
            layers[k].over(layers[k - 1]);
        }
        
		var ninputs = layerdims[0];
        		            
        this.size = function (nlayer) {
            return layerdims[nlayer];
        }
        
        this.neuron = function (nlayer, nneuron) {
            return layers[nlayer].neurons()[nneuron];
        }
        
        this.nlayers = function () {
            return layerdims.length;
        }
        
        this.process = function (inputs) {
            for (var k = 0; k < nlayers; k++)
                layers[k].reset();
                
            var ineurons = layers[0].neurons();
            
            for (var k = 0; k < ineurons.length; k++)
                ineurons[k].value(inputs[k]);
                
            var outputs = [];
            
            for (var k = 0; k < nlayers; k++)
                outputs = layers[k].outputs();
            
            return outputs;
        }
        
        this.train = function (inputs, expected, learningrate) {
            var outputs = this.process(inputs);
            
            var errors = [];
            
            for (var k = 0; k < outputs.length; k++)
                errors[k] = expected[k] - outputs[k];
            
            for (var nl = nlayers - 1; nl >= 0; nl--) {
                var from = layers[nl];
                var to = layers[nl + 1];
                
                for (var k = from; k < to; k++)
                    if (nl === layerdims.length - 1) {
                        errors[k] = (expected[k - from] - outputs[k - from]);
                    }
                    else {
                        var error = 0;
                        var to2 = to + layerdims[nl + 1];
                        
                        for (var j = to; j < to2; j++) {
                            var weight = neurons[j].weights()[k - from];
                            error += errors[j] * weight;
                        }
                            
                        errors[k] = error * neurons[k].derivative();
                    }
            }

            for (var nl = 0; nl < nlayers - 1; nl++) {
                var from = layeroffsets[nl];
                var to = from + layerdims[nl];
                var to2 = to + layerdims[nl + 1];
                
                for (var j = to; j < to2; j++) {
                    var jweights = neurons[j].weights();
                    
                    for (var k = from; k < to; k++) {
                        var weight = jweights[k - from];
                        var output = neurons[k].output();
                        var error = errors[j];
                        var dweight = output * error * (learningrate);
                        jweights[k - from] = weight + dweight;
                    }
                }
            }
        }
    }

    function createNetwork(layers, options)
    {
        return new Network(layers, options);
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
        else if (options.fn === 'logistic') {
            fn = fnLogistic;
            dfn = dfnLogistic;
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

        this.inputs = function (newinputs) {
            if (newinputs != null)
                inputs = newinputs;
            
            return inputs;
        }    
        
        this.weights = function (newweights) {
            if (newweights != null)
                weights = newweights;
            
            return weights; 
        }
        
        this.output = function (value) {
            if (value == null)
                value = this.value();
            
            return fn(value);
        }
        
        this.derivative = function () {
            return dfn(this.value());
        }

        this.bias = function (newbias) {
            if (newbias != null)
                bias = newbias;
            
            return bias;
        }
    }

    function createNeuron(options) {
        return new Neuron(options);
    }
    
    function createLayer(dimensions, options) {
        return new Layer(dimensions, options);
    }
	
	// Direct function and derivative
	function fnDirect(value) { return value; }
	function dfnDirect(value) { return 1; }
	
	// Relu function and derivative
	function fnRelu(value) { return value > 0 ? value : 0 }
	function dfnRelu(value) { return value > 0 ? 1 : 0 }

	// Logistic function
	function fnLogistic(value) { return 1 / (1 + Math.exp(-value)); }
	function dfnLogistic(value) { var v = fnLogistic(value); return v * (1 - v); }

    return {
        neuron: createNeuron,
        network: createNetwork,
        layer: createLayer
    }
})();

if (typeof(window) === 'undefined')
    module.exports = simpleneuron;

