var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var t = 'Express';
	if (req.query.title) {
		t = req.query.title;
	}
	res.render('index', { title: t });
});

module.exports = router;
