const readline = require('readline');

function UserInterface(callback) {
	
	const rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});
	
	let workArea = {
		input: `${__dirname}/../input/url-list.txt`,
		output: `${__dirname}/../output/`
	}

	this.run = () => {
		const rewriteData = function (key, data) {
			if (data) {
				workArea[key] = data;
			}
		}
		
		rl.question('Urls file location: ', (answer) => {
			rewriteData('input', answer.trim());
			
			rl.question('Where to save: ', (answer) => {
				rewriteData('output', answer);
				callback(workArea.input, workArea.output);
			})

		})
	}
}

module.exports = UserInterface