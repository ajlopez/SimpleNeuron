
function Neuron() {
    var value = 0;
    var invalidate = false;
    var inputs = [];
    
    this.output = function (val) {
        if (val != null)
            value = val;
        
        if (invalidate) {
            var total = 0;
            inputs.forEach(function (input) {
                total += input.output();
            });
            
            value = total >= 1 ? 1 : 0;
            
            invalidate = false;
        }
        
        return value;
    }
    
    this.input = function (neuron) {
        if (inputs.indexOf(neuron) < 0) {
            inputs.push(neuron);
            invalidate = true;
        }
    }
}

function createNeuron() {
    return new Neuron();
}

module.exports = {
    neuron: createNeuron
}
