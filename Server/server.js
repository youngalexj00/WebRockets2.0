const express = require('express');
const app = express();
const path = require('path');

const UserController = require('./Controllers/UserController.js');
const BoardController = require('./Controllers/GameController.js');

app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './StaticAssets/index.html')));

app.get('/build', express.static('./Build'));

app.post('/createUser', UserController.createUser, (req, res) => {
  res.sendStatus(200);
})

app.post('/login', UserController.login, (req, res) => {
  res.sendStatus(200);
});

app.use((req, res) => res.send('hi theredsafsdf!'));

app.use((incomingError, req, res, next) => {
  const defaultError = {
    message: 'unknown error from express middlware',
    status: 400,
    error: null
  }
  const error = Object.assign(defaultError, incomingError);
  res.status(error.status).json({ " error ": error.message });
})

app.listen(3000, () => console.log('server listening on port 3000'));