'use strict';
const UserInterface = require('./user-interface');
const FileToFolder = require('./file-to-folder-saver');
const FileSaver = require('./file-saver');

const userInterface = new UserInterface(runFileToFolder);

userInterface.run();

function runFileToFolder(input, output) {
	const fileToFolder = new FileToFolder(input, output, runFileSaver);
	fileToFolder.run();
}

function runFileSaver(input, output) {
	const fileSaver = new FileSaver(input, output);
	fileSaver.run();
	console.log('runed');
}
