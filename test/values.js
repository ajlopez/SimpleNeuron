
const values = require('../lib/values');

exports['one values from string'] = function (test) {
    test.deepEqual(values('***'), [1, 1, 1]);
}

exports['zero values from string'] = function (test) {
    test.deepEqual(values('...'), [0, 0, 0]);
}

exports['one values from string with spaces'] = function (test) {
    test.deepEqual(values('* * *'), [1, 1, 1]);
}

exports['zero values from string with spaces'] = function (test) {
    test.deepEqual(values('. . .'), [0, 0, 0]);
}

exports['values from string with new lines'] = function (test) {
    test.deepEqual(values('*****\n*...*\n*****'), [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1]);
}


