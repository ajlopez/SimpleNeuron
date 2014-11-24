
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
    console.dir(newoutput);
    network.train(zero1, [1, 0, 0], 0.01);
    var newoutput = network.outputs(zero1);
    console.dir(newoutput);
    network.train(one0, [0, 1, 0], 0.01);
    var newoutput = network.outputs(one0);
    console.dir(newoutput);
    network.train(one1, [0, 1, 0], 0.01);
    var newoutput = network.outputs(one1);
    console.dir(newoutput);
    network.train(two0, [0, 0, 1], 0.01);
    var newoutput = network.outputs(two0);
    console.dir(newoutput);
    network.train(two1, [0, 0, 1], 0.01);
    var newoutput = network.outputs(two1);
    console.dir(newoutput);
}