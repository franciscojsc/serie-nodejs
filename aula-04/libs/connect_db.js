var mongoose = require('mongoose');
require('dotenv/config');

var db;

module.exports = function() {
	if (!db) {
		db = mongoose.createConnection(process.env.MONGODB_URI);
	}
	return db;
};
