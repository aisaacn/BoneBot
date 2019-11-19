#! /usr/bin/env node

const Blynk = require('/usr/lib/node_modules/blynk-library');
const b = require('/usr/lib/node_modules/bonescript');
const util = require('util');

// Initialize motors and sensors
const leftForward = 'P9_29';
const leftBackward = 'P9_30';
const rightForward = 'P9_27';
const rightBackward = 'P9_28';

const senseRight = 'P9_26';
const senseLeft = 'P9_25';

b.pinMode(leftForward, b.ANALOG_OUTPUT);
b.pinMode(leftBackward, b.ANALOG_OUTPUT);
b.pinMode(rightForward, b.ANALOG_OUTPUT);
b.pinMode(rightBackward, b.ANALOG_OUTPUT);

b.pinMode(senseRight, b.INPUT);
b.pinMode(senseLeft, b.INPUT);

// Initialize Blynk
const AUTH = 'TVsjcF7bH1jnW2LVn8EkY5tWUg46-SxB';
var blynk = new Blynk.Blynk(AUTH);

var joy = new blynk.VirtualPin(0);
var autoswitch = new blynk.VirtualPin(1);

var x = 0;
var y = 0;
var autopilot = 0;

var timer;
var _DELAY = 750;

joy.on('write', function(param) {
	x = param[0];
	y = param[1];
	if (autopilot == 0) {
		drive(x, y);
	}
});

autoswitch.on('write', function(param) {
	drive(0, 0);
	if (param[0] == 1) {
		autopilot = 1;
		timer = setInterval(driveAuto, _DELAY);
	} else {
		autopilot = 0;
		clearInterval(timer);
	}
});

function driveAuto() {
	var r = b.digitalRead(senseRight);
	var l = b.digitalRead(senseLeft);

	if (r == 1 && l == 1) {
		// Go forward
		b.analogWrite(rightForward, 1);
		b.analogWrite(rightBackward, 0);

		b.analogWrite(leftForward, 1);
		b.analogWrite(leftBackward, 0);
	} else if (r == 0 && l == 1) {
		// Go left
		b.analogWrite(rightForward, 1);
		b.analogWrite(rightBackward, 0);

		b.analogWrite(leftForward, 0);
		b.analogWrite(leftBackward, 1);
	} else { // if (r == 1 && l == 0) {
		// Go right
		b.analogWrite(rightForward, 0);
		b.analogWrite(rightBackward, 1);

		b.analogWrite(leftForward, 1);
		b.analogWrite(leftBackward, 0);
	}
}

function drive(funX, funY) {
	console.log('x: ', funX);
	console.log('y: ', funY);

	// if (autopilot == 0) {
		var opp_y = funY * -1;

		if (funY == 0) {
			// Stop
			b.analogWrite(rightForward, 0);
			b.analogWrite(rightBackward, 0);

			b.analogWrite(leftForward, 0);
			b.analogWrite(leftBackward, 0);
		} else if (autopilot == 0) {
			if (opp_y < 0) {
				opp_y = 0;
			} else {
				funY = 0;
			}

			if (funX <= -75) {
				b.analogWrite(rightForward, funY);
				b.analogWrite(rightBackward, opp_y);

				b.analogWrite(leftForward, opp_y);
				b.analogWrite(leftBackward, funY);
			} else if (funX >= 75) {
				b.analogWrite(rightForward, opp_y);
				b.analogWrite(rightBackward, funY);

				b.analogWrite(leftForward, funY);
				b.analogWrite(leftBackward, opp_y);
			} else {
				b.analogWrite(rightForward, funY);
				b.analogWrite(rightBackward, opp_y);

				b.analogWrite(leftForward, funY);
				b.analogWrite(leftBackward, opp_y);
			}
		}
	//} //else {
		// autopilot?
	//}
}
