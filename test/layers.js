
var sn = require('..');

exports['create layer with one dimension'] = function (test) {
    var layer = sn.layer(4);
    
    test.ok(layer);
    test.equal(typeof layer, 'object');
    
    test.equal(layer.size(), 4);
    test.deepEqual(layer.shape(), [ 4 ]);
};

