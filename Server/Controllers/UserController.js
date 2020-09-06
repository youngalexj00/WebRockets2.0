const database = require('../Database/database.js');

const UserController = {};

UserController.createUser = async (req, res, next) => {
  console.log('call to createUser');

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
    return next({
      message: 'username already exists',
      status: 400,
      error: null
    })
  }

  // create user
  let createUserQuery = await database.query('INSERT INTO users (username, password) VALUES ($1, $2)', [req.body.username, req.body.password])
    .catch(error => {
      return next({
        message: 'creating user',
        status: 400,
        error: error
      })
    });

  next();
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
    })
    .catch(error => {
      return next({
        message: 'logging in',
        status: 400,
        error: error
      })
    });
}

module.exports = UserController;