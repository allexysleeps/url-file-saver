'use strict';
const FileSaver = require('./file-saver');

const UserInterface = require('./user-interface');

var testvar = 'test test test1';

const userInterface = new UserInterface(runFileSaver);

userInterface.run();

function runFileSaver(input, output) {
	// console.log(input, output);
	const fileSaver = new FileSaver(input, output);
	fileSaver.run();
}

