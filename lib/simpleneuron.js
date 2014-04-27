
function Neuron() {
    var value = 0;
    var calculated = true;
    var invalidated = false;
    var inputs = [];
    var fns = { };
    
    var self = this;
    
    this.output = function (val) {
        if (val != null) {
            value = val;
            emit('value', value);
        }
        else if (!calculated) {
            var total = 0;
            
            inputs.forEach(function (input) {
                total += input.output();
            });
            
            value = total >= 1 ? 1 : 0;
            
            calculated = true;
            emit('value', value);
        }
        
        return value;
    }
    
    this.on = function (event, fn) {
        if (!fns[event])
            fns[event] = [];
            
        fns[event].push(fn);
    }
    
    function emit(event, data) {
        if (!fns[event])
            return;
            
        fns[event].forEach(function (fn) {
            setTimeout(function () { fn(data); }, 0);
        });
    }
    
    this.input = function (neuron) {
        if (inputs.indexOf(neuron) < 0) {
            inputs.push(neuron);
            calculated = false;
            
            neuron.on('value', newinput);
            newinput();
        }
    }
    
    function newinput() {
        if (invalidated)
            return;
            
        invalidated = true;
        setTimeout(function () { invalidated = false; self.output(); }, 0);
    }
}

function createNeuron() {
    return new Neuron();
}

module.exports = {
    neuron: createNeuron
}
