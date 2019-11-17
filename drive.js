#! /usr/bin/env node

const Blynk = require('/usr/local/lib/node_modules/blynk-library');
const b = require('bonescript');
const util = require('util');

const left = '';
const right = 'P9_30';

// b.pinMode(left, b.OUTPUT);
b.pinMode(right, b.ANALOG_OUTPUT);

const AUTH = 'TVsjcF7bH1jnW2LVn8EkY5tWUg46-SxB';
var blynk = new Blynk.Blynk(AUTH);

var joy = new blynk.VirtualPin(0);
var x = 0;
var y = 0;

joy.on('write', function(param) {
	x = param[0];
	y = param[1];
	drive(x, y);
});

function drive(x, y) {
	console.log('x: ', x);
	console.log('y: ', y);

	b.analogWrite(right, y);
	if (y <= 0) {
		b.analogWrite(right, 0);
		// b.analogWrite(left, 0);
	} else {
		if (x <= -75) {
			b.analogWrite(right, 1);
			// b.analogWrite(left, 0);
		} else if (x >= 75) {
			b.analogWrite(right, 0);
			// b.analogWrite(left, 1);
		} else {
			b.analogWrite(right, 1);
			// b.analogWrite(left, 1);
		}
	}
}
