var express = require('express');
var router = express.Router();
var logs = require('../models/EventLog.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    logs.find(function (err, logs) {
      if (err) return next(err);
      res.json(logs);
    });
  });

module.exports = router;