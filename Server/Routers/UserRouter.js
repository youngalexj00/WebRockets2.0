const express = require('express');
const router = express.Router();
const GameController = require('../Controllers/GameController.js');
const UserController = require('../Controllers/UserController.js');

router.post('/createUser', UserController.createUser, (req, res) => {
  res.json({ data: res.locals });
});

router.post('/getUser', UserController.getUser, (req, res) => {
  res.json({ data: res.locals })
})

router.post('/updateUser', UserController.getUser, UserController.updateUser, (req, res) => {
  res.json({ data: res.locals })
})

router.post('/login', UserController.login, (req, res) => {
  res.send(200);
});

module.exports = router;