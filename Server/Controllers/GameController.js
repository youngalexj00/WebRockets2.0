const database = require('../Database/database')

const GameController = {};

GameController.getBoard = (req, res, next) => {

}

GameController.checkForWin = (req, res, next) => {

}

GameController.updateBoard = (req, res, next) => {
  database.query('UPDATE games SET board = $1, WHERE id = $2;', [req.body.board, req.body.id])
    .then(() => next())
    .catch((error) => next({
      message: 'error updating board',
      status: 400,
      error: error
    }))
}

GameController.createGame = (user1, user2) => {
  let board = [];
  for (let i = 0; i < 9; i++) board.push('');
  database.query('INSERT INTO games (user1, user2, status, board) VALUES ($1, $2, $3, $4)', [user1.userID, user2.userID, 'active', board])
    .then(() => {
      user1.res.send('game has started');
      user2.res.send('game has started');
    }).catch(error => { throw new Error(error) });
}

GameController.deleteGame = (req, res, next) => {
  database.query('DELETE FROM games WHERE id=$1', [req.body.id])
    .then((response) => next())
    .catch(error => next({
      message: 'error deleting game',
      status: 400,
      error: error
    }));
}

module.exports = GameController;