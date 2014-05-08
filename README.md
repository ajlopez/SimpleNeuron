# SimpleNeuron

Simple neural network library for browser and Node.js. Work in Progress.

## Installation

Via npm on Node:

```
npm install simpleneuron
```

## Usage

Reference in your program:

```js
var sn = require('simpleneuron');
```

Create a neuron
```js
var neuron = sn.neuron();
```
It is a simple threshold neuron with trigger value = 1.

Connect a neuron with other neuron
```js
var neuron = sn.neuron();
var input = sn.neuron();
neuron.input(input);
```
The input has weight 1

Connect a neuron with other neuron using a weight value
```js
var neuron = sn.neuron();
var input = sn.neuron();
neuron.input(input, -0.5);
```
The input has weight -0.5.

Set the output value of neuron:
```js
neuron.output(1);
```
Usually, this method is used to set the initial neuron layer values.

Get the output value of a neuron:
```js
var result = neuron.output();
```

Create a network of neurons, with three layers, containing 4, 15, 3 neurons. The weights
are random values between -1 and 1:
```js
var network = ss.network([4, 15, 3]);
```

Get the number of neurons in a network:
```js
var count = network.neurons();
```
In the previous created network, the count is 4+15+3 == 22.

Get the number of neurons in a layer:
```js
var count0 = network.neurons(0); // 4
var count1 = network.neurons(1); // 15
var count2 = network.neurons(2); // 3
```

TBD

## Development

```
git clone git://github.com/ajlopez/SimpleNeuron.git
cd SimpleNeuron
npm install
npm test
```

## Samples

TBD

## Versions

TBD

## License

MIT

## References

TBD

## Contribution

Feel free to [file issues](https://github.com/ajlopez/SimpleNeuron) and submit
[pull requests](https://github.com/ajlopez/SimpleNeuron/pulls) — contributions are
welcome<

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

