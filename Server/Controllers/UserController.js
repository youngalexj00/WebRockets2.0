const database = require('../Database/database.js');

const UserController = {};

UserController.createUser = async (req, res, next) => {
  // make sure user name is not already taken
  let usernameQuery = await database.query('SELECT username FROM users where username = $1', [req.body.username])
    .catch(error => {
      return next({
        message: 'checking if username already exists',
        status: 400,
        error: error
      })
    });
  if (usernameQuery.rows.length > 0) {
    res.locals.error = 'username is taken';
    return next();
  }

  // create user
  let createUserQuery = await database.query(
    'INSERT INTO users (username, password, wins, losses) VALUES ($1, $2, $3, $4) RETURNING id',
    [req.body.username, req.body.password, 0, 0]
  ).then((response) => {
    res.locals.user = response.rows[0];
    return next();
  }).catch(error => {
    return next({
      message: 'creating user',
      status: 400,
      error: error
    })
  });
}

UserController.getUser = (req, res, next) => {
  database.query('SELECT username, password, wins, losses FROM users WHERE id = $1', [req.body.id])
    .then((response) => {
      if (response.rows.length === 0) {
        res.locals.error = 'user does not exist';
        return next();
      }
      res.locals.user = response.rows[0];
      return next();
    }).catch(error => {
      return next({
        message: 'error getting user info from DB',
        status: 400,
        error: error
      })
    });
}

UserController.updateUser = (req, res, next) => {
  console.log('req body is ', req.body)
  Object.assign(res.locals.user, req.body);
  database.query('UPDATE users SET username = $1, password = $2, wins = $3, losses = $4 WHERE id = $5',
    [res.locals.user.username, res.locals.user.password, res.locals.user.wins, res.locals.user.losses, req.body.id])
    .then(() => next())
    .catch(error => {
      return next({
        message: 'error updating user information',
        status: 400,
        error: error
      })
    });
}

UserController.login = (req, res, next) => {
  database.query('SELECT userid FROM users WHERE username = $1 AND password = $2', [req.body.username, req.body.password])
    .then((response) => {
      if (response.rows.length === 0) {
        return next({
          message: 'username or password was invalid',
          status: 400,
          error: null
        })
      }
      next();
    }).catch(error => {
      return next({
        message: 'logging in',
        status: 400,
        error: error
      })
    });
}

module.exports = UserController;