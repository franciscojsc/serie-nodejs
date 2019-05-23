var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response) {
	var page = 'index.html';
	if (request.url != '/') {
		page = request.url + '.html';
	}

	fs.readFile(__dirname + '/public/' + page, function(err, data) {
		var headStatus = 200;
		if (err) {
			headStatus = 404;
			data = fs.readFileSync(__dirname + '/error/404.html');
		}
		response.writeHead(headStatus, { 'Content-type': 'text/html; charset=utf-8' });
		response.write(data);
		response.end();
	});
});

server.listen(3000);
console.log('Servidor funcionando!!!');
