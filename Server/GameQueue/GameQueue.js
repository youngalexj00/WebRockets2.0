const GameController = require('../Controllers/GameController');

class GameQueue {
  constructor() {
    this.queue = [];
  }
  queueUser(userID, res) {
    this.queue.push({ userID, res });
    console.log('queue is ', this.queue.length)
    if (this.queue.length < 2) return;
    const user1 = this.queue.shift();
    const user2 = this.queue.shift();
    GameController.createGame(user1, user2);
  }
  dequeueUser(userID) {
    console.log('call to dequeue')
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].userID === userID) {
        if (i === 0) this.queue.shift();
        else if (i === this.queue.length - 1) this.queue.pop();
        else this.queue = [...this.queue.slice(0, i), ...this.queue.slice(i + 1)];
        return;
      }
    }
  }
}

module.exports = GameQueue;