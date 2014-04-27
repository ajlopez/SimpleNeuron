
function Neuron() {
    var value = 0;
    var calculated = true;
    var inputs = [];
    
    this.output = function (val) {
        if (val != null)
            value = val;        
        else if (!calculated) {
            var total = 0;
            
            inputs.forEach(function (input) {
                total += input.output();
            });
            
            value = total >= 1 ? 1 : 0;
            
            calculated = true;
        }
        
        return value;
    }
    
    this.input = function (neuron) {
        if (inputs.indexOf(neuron) < 0) {
            inputs.push(neuron);
            calculated = false;
        }
    }
}

function createNeuron() {
    return new Neuron();
}

module.exports = {
    neuron: createNeuron
}
