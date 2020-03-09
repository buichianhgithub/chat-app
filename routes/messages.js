var express = require('express');
var router = express.Router();
var messages = require('../models/Messages.js');

/* GET ALL MESSAGES */
router.get('/', function(req, res, next) {
  messages.find(function (err, messages) {
    if (err) return next(err);
    res.json(messages);
  });
});

/* GET SINGLE MESSAGE BY ID */
router.get('/:id', function(req, res, next) {
  messages.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE MESSAGE */
router.post('/', function(req, res, next) {
  messages.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE MESSAGE */
router.put('/:id', function(req, res, next) {
  messages.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE MESSAGE */
router.delete('/:id', function(req, res, next) {
  messages.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;