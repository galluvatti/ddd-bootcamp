var express = require('express');
var router = express.Router();

/* GET aircraft listing. */
router.get('/', function(req, res, next) {
  res.send('List of aircrafts');
});

module.exports = router;
