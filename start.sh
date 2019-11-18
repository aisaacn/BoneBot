#! /bin/sh

config-pin P9_27 output
config-pin P9_28 output
config-pin P9_29 output
config-pin P9_30 output

while ! ping -c 1 -W 1 google.com; do
	echo 'Waiting for connection'
	sleep 1
done
echo 'Successfully connected!'

./home/debian/git/BoneBot/drive.js
