#! /usr/bin/env node

const Blynk = require('/usr/lib/node_modules/blynk-library');
const b = require('bonescript');
const util = require('util');

const leftForward = 'P9_29';
const leftBackward = 'P9_30';
const rightForward = 'P9_27';
const rightBackward = 'P9_28';

b.pinMode(leftForward, b.ANALOG_OUTPUT);
b.pinMode(leftBackward, b.ANALOG_OUTPUT);
b.pinMode(rightForward, b.ANALOG_OUTPUT);
b.pinMode(rightBackward, b.ANALOG_OUTPUT);

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

	var opp_y = y * -1;

	if (y == 0) {
		b.analogWrite(rightForward, 0);
		b.analogWrite(rightBackward, 0);

		b.analogWrite(leftForward, 0);
		b.analogWrite(leftBackward, 0);
	} else {
		if (opp_y < 0) {
			opp_y = 0;
		} else {
			y = 0;
		}
		if (x <= -75) {
			b.analogWrite(rightForward, y);
			b.analogWrite(rightBackward, opp_y);

			b.analogWrite(leftForward, opp_y);
			b.analogWrite(leftBackward, y);
		} else if (x >= 75) {
			b.analogWrite(rightForward, opp_y);
			b.analogWrite(rightBackward, y);

			b.analogWrite(leftForward, y);
			b.analogWrite(leftBackward, opp_y);
		} else {
			b.analogWrite(rightForward, y);
			b.analogWrite(rightBackward, opp_y);

			b.analogWrite(leftForward, y);
			b.analogWrite(leftBackward, opp_y);
		}
	}
}
