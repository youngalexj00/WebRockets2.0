const express = require('express');
const router = express.Router();
const GameController = require('../Controllers/GameController.js');
const GameQueue = require('../GameQueue/index.js');

router.post('/queueGame', (req, res) => {
  GameQueue.queue(req.body.userID, res);
})
router.post('/dequeueGame', (req, res) => {
  GameQueue.dequeue(req.body.userID, res);
});

module.exports = router;