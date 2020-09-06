const express = require('express');
const router = express.Router();
const GameController = require('../Controllers/GameController.js');
const UserController = require('../Controllers/UserController.js');

router.use('/createUser', UserController.createUser, (req, res) => {
  res.send(200);
});

router.use('/login', UserController.login, (req, res) => {
  res.send(200);
});

module.exports = router;