const fs = require('fs');
const path = require('path');

function FileToFolder(input, output, callback) {
	let files = fs.readdirSync(input);
	let extRemover = /.txt/;

	const createFolder = (inputFile) => {
		let newFolder = `${output}${inputFile.replace(extRemover, '')}`;
		if(!fs.existsSync(newFolder)) {
			fs.mkdirSync(newFolder);
		} 

		callback(`${input}${inputFile}`, `${newFolder}/`);
		
	}

	const syncController = () => {
		for(let item in files) {
			if(path.extname(files[item]) === '.txt') {
				createFolder(files[item]);
			}
		}
	}

	this.run = () => {
		syncController();
	}

}

module.exports = FileToFolder