
function Neuron() {
    var value;
    var hasvalue = false;
    var inputs = [];
    var fns = { };
    
    this.output = function (val) {
        if (val != null) {
            hasvalue = true;
            value = val;
        }
        
        if (hasvalue)
            return value;
            
        var total = 0;
        
        inputs.forEach(function (input) {
            total += input.output();
        });
        
        return total >= 1 ? 1 : 0;
    }
    
    this.input = function (neuron) {
        if (inputs.indexOf(neuron) < 0)
            inputs.push(neuron);
    }
}

function createNeuron() {
    return new Neuron();
}

module.exports = {
    neuron: createNeuron
}
