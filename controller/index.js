'use strict'

const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

// search option should be here

module.exports = router;
