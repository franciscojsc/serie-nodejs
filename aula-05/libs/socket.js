module.exports = function(io) {
	io.sockets.on('connection', function(client) {
		client.emit('hello', { title: 'Bem vindo', msg: 'Você está conectador' });
		client.broadcast.emit('hello', { title: 'Nova conexão', msg: 'Alguem se conectou' });

		client.on('add', function(data) {
			client.broadcast.emit('add_response', { title: 'Nova tarefa', msg: 'Uma nova tarefa foi adicionada' });
		});

		client.on('turn', function(data) {
			var msg = {};

			if (!data.msg) {
				msg = {
					title: 'Tarefa desfeita',
					msg: 'Alguém acha que não terminou uma tarefa.'
				};
			} else {
				msg = {
					title: 'Tarefa concluída',
					msg: 'Uma tarefa foi concluída com sucesso, por enquanto...'
				};
			}

			client.broadcast.emit('turn_response', msg);
		});
	});
};
