const https = require('https');
const fs = require('fs-extra');

function FileSaver(input, output) {
	
	const urlListMinifyReg = /\r?\n|\r\s/g;
	const urlListDividerAddReg = /http/g;
	const ARRAY_DIVIDER = '--url-fs--';

	function DownloadStatus() {
		this.total = 0;
		this.current = 0;
		this.update = ()=> {
			console.log(`downloaded ${this.current} files from ${this.total}`);
			this.current++;
		}
	}

	const downloadStatus = new DownloadStatus();

	var saveFile = function(filePath, index) {
		const file = fs.createWriteStream(`${output}file-${index}.jpg`);
		if(fs.existsSync(file)) {
			return;
		}
		const fileStream = https.get(filePath, function (res) {
			res.pipe(file);
		});

		console.log(fileStream);

		fileStream.on('finish', function() {
			downloadStatus.update();
		})
	}

	this.run = () => {
		fs.readFile(input, 'utf-8')
			.then((data, err)=> {
				if(err) {
					console.log(err);
				}
				return data.replace(urlListMinifyReg, '')
						.replace(urlListDividerAddReg, `${ARRAY_DIVIDER}http`)
						.split(ARRAY_DIVIDER)
						.slice(1)
			})
			.then((listArray, err) => {
				if(err) {
					console.log(err);
				}
				downloadStatus['total'] = listArray.length - 1;
				listArray.forEach((item, index) => {
					saveFile(item, index);
				})
			})
	}

}

module.exports = FileSaver;