const express = require('express');
const router = express.Router();
const GameController = require('../Controllers/GameController.js');
const GameQueue = require('../GameQueue/index.js');

router.post('/queueGame', (req, res) => {
  console.log('call to queue game')
  GameQueue.queueUser(req.body.userID, res);
})

router.post('/dequeueGame', (req, res) => {
  GameQueue.dequeueUser(req.body.userID);
  res.sendStatus(200);
});

module.exports = router;