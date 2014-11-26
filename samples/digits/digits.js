
var sn = require('../..');
var values = require('../../lib/values');
var fs = require('fs');

var zero0 = values(fs.readFileSync('./zero0.txt').toString());
var zero1 = values(fs.readFileSync('./zero1.txt').toString());
var one0 = values(fs.readFileSync('./one0.txt').toString());
var one1 = values(fs.readFileSync('./one1.txt').toString());
var two0 = values(fs.readFileSync('./two0.txt').toString());
var two1 = values(fs.readFileSync('./two1.txt').toString());

var network = sn.network([25, 50, 3]);

for (var k = 0; k < 300; k++) {
    network.train(zero0, [1, 0, 0], 0.01);
    var newoutput = network.outputs(zero0);
    showresult('zero0', newoutput);
    network.train(zero1, [1, 0, 0], 0.01);
    var newoutput = network.outputs(zero1);
    showresult('zero1', newoutput);
    network.train(one0, [0, 1, 0], 0.01);
    var newoutput = network.outputs(one0);
    showresult('one0', newoutput);
    network.train(one1, [0, 1, 0], 0.01);
    var newoutput = network.outputs(one1);
    showresult('one1', newoutput);
    network.train(two0, [0, 0, 1], 0.01);
    var newoutput = network.outputs(two0);
    showresult('two0', newoutput);
    network.train(two1, [0, 0, 1], 0.01);
    var newoutput = network.outputs(two1);
    showresult('two1', newoutput);
}

function showresult(name, output) {
    console.log();
    console.log(name);
    console.log('zero:', output[0]);
    console.log('one :', output[1]);
    console.log('two :', output[2]);
}