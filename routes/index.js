var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { number: '123-456-7890' });
});

module.exports = router;
