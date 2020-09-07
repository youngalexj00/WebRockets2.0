const express = require('express');
const app = express();
const path = require('path');

const GameRouter = require('./Routers/GameRouter.js');
const UserRouter = require('./Routers/UserRouter.js');

const UserController = require('./Controllers/UserController.js');
const BoardController = require('./Controllers/GameController.js');

// static assets and build
app.use(express.json());
app.use((req, res, next) => {
  res.locals = {};
  next();
});
app.get('/build', (req, res) => res.sendFile(path.resolve(__dirname, './Build/bundle.js')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './StaticAssets/index.html')));

app.use('/game', GameRouter);
app.use('/user', UserRouter);


// 404 error handler
app.use((req, res) => {
  console.log('404 ERROR\nurl was ', req.url, '\nmethod was ', req.method, '\nbody was ', req.body);
  res.sendStatus(404);
})

app.use((incomingError, req, res, next) => {
  const defaultError = {
    message: 'unknown error from express middlware',
    status: 400,
    error: null
  }
  const error = Object.assign(defaultError, incomingError);
  console.log('error ', error)
  res.status(error.status).json({ " error ": error.message });
});

app.listen(3000, () => console.log('server listening on port 3000'));