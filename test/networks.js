
var sn = require('..');

exports['create network'] = function (test) {
    var network = sn.network([4, 6, 5]);
    
    test.ok(network);
    test.equal(typeof network, 'object');
    
    test.equal(network.layers(), 3);
    test.equal(network.neurons(), 4 + 6 + 5);
    test.equal(network.neurons(0), 4);
    test.equal(network.neurons(1), 6);
    test.equal(network.neurons(2), 5);
    
    for (var k = 0; k < 4; k++)
        for (var j = 4; j < 10; j++) {
            test.ok(network.weight(k, j) <= 1);
            test.ok(network.weight(k, j) >= -1);
        }
    
    for (var k = 4; k < 10; k++)
        for (var j = 10; j < 15; j++) {
            test.ok(network.weight(k, j) <= 1);
            test.ok(network.weight(k, j) >= -1);
        }
};
