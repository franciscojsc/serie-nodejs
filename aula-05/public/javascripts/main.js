(function() {
	if (Notification.permission === 'default') {
		Notification.requestPermission(function() {
			console.log('Usuário não deu premissão ainda');
		});
	}

	var notify = function(data) {
		var notification = new Notification(data.title, {
			body: data.msg
		});
	};

	var socket = io('http://localhost:3000');

	socket.on('hello', function(msg) {
		console.log(msg);
		notify(msg);
	});

	socket.on('turn_response', function(msg) {
		notify(msg);
		$('#content').load('/ #content table');
	});

	socket.on('add_response', function(msg) {
		notify(msg);
		$('#content').load('/ #content table');
	});

	$('form').submit(function() {
		$.post($(this).attr('action'), $(this).serialize()).done((data) => {
			socket.emit('add', { msg: 'task added' });

			$(this).trigger('reset');

			var table_html = `<tr>
                    <td>#${$('tr').length + 1} <strong>${data.title}</strong></td>
                    <td class="actions"><a href="/turn/${data._id}"
                        class="color-red">not ok</a></td>
                    <td class="highlight">${data.description}</td>
                </tr>`;

			$('tbody').append(table_html);
		});

		return false;
	});

	$(document).on('click', 'table a', function() {
		$.get($(this).attr('href')).done((data) => {
			socket.emit('turn', { msg: data.status });

			$(this).toggleClass('color-red');
			if ($(this).text().trim() == 'ok') {
				$(this).text('not ok');
			} else {
				$(this).text('ok');
			}
		});
		return false;
	});
})();
