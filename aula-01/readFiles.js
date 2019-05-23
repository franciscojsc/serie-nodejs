var fs = require('fs');

/**
 * Executar o módulo fs de forma assíncrona
 */

console.log('asy before');

fs.readFile(__dirname + '/file/arquivo.txt', function(err, data) {
	if (err) {
		throw err;
	}
	console.log('asy executed', data);
});

console.log('asy after');

/**
 * Executar o módulo fs de forma síncrona
 */

console.log('sy before');

var data = fs.readFileSync(__dirname + '/file/arquivo.txt');

console.log('sy executed', data);

console.log('sy after');
