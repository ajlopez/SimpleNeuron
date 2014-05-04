
function Neuron() {
    var value;
    var hasvalue = false;
    var inputs = [];
    var weights = [];
    var fns = { };
    
    this.output = function (val) {
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
        
        return total >= 1 ? 1 : 0;
    }
    
    this.input = function (neuron, weight) {
        if (weight == null)
            weight = 1;
            
        if (inputs.indexOf(neuron) < 0) {
            inputs.push(neuron);
            weights.push(weight);
        }
    }
}

function createNeuron() {
    return new Neuron();
}

module.exports = {
    neuron: createNeuron
}
