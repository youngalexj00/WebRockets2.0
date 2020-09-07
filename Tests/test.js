const assert = require('assert');
const server = 'http://localhost:3000';
const database = require('../Server/Database/database.js')
const axios = require('axios');

describe('Tests', () => {

  describe('Users', async () => {

    before(async () => {
      await database.query(`CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100),
        password VARCHAR(100),
        wins INT,
        losses INT)`);
    })

    it('/user/createUser POST', async () => {
      const createUserResponse = await axios.post(server + '/user/createUser', {
        username: 'createUserUsername',
        password: 'createUserPassword'
      }).then(res => res.data)
        .catch(error => {
          throw new Error(error)
        });
      let result = await database.query('SELECT * FROM users WHERE username = $1', ['createUserUsername'])
        .catch(error => {
          throw new Error(error)
        });

      assert.equal(result.rows.length, 1);
      assert.ok(createUserResponse.data.user.id);
    })

    it('should not be able to create users with a preexisting username', async () => {
      preexistingUsernameResponse = await axios.post(server + '/user/createUser', {
        username: 'createUserUsername',
        password: 'createUserPassword'
      }).then(res => res.data)
        .catch(error => {
          throw new Error(error);
        });
      assert.ok(preexistingUsernameResponse.data.error);
    })

    it('/user/getUser POST', async () => {
      const newUser = await axios.post(server + '/user/createUser', {
        username: 'username2',
        password: 'password2'
      }).then(res => res.data)
        .catch(error => {
          throw new Error(error)
        });
      const getUserResponse = await axios.post(server + '/user/getUser', {
        id: newUser.data.user.id
      }).then(res => res.data)
        .catch(error => {
          throw new Error(error);
        })
      assert.ok(getUserResponse.data.user.hasOwnProperty('username'));
      assert.ok(getUserResponse.data.user.hasOwnProperty('wins'));
      assert.ok(getUserResponse.data.user.hasOwnProperty('losses'));
    })

    it('/user/updateUser POST', async () => {
      const newUser = await axios.post(server + '/user/createUser', {
        username: 'username3',
        password: 'password3'
      }).then(res => res.data)
        .catch(error => {
          throw new Error(error)
        });
      const updateUserResponse = await axios.post(server + '/user/updateUser', {
        id: newUser.data.user.id,
        username: 'username4',
        password: 'password4',
        wins: 1,
        losses: 1
      }).then(res => res.data)
        .catch(error => {
          throw new Error(error)
        });
      let result = await database.query('SELECT * FROM users WHERE id = $1', [newUser.data.user.id])
        .then((res) => res.rows[0])
        .catch(error => {
          throw new Error(error)
        });
      assert.equal(result.id, newUser.data.user.id);
      assert.equal(result.username, 'username4');
      assert.equal(result.password, 'password4');
      assert.equal(result.wins, 1);
      assert.equal(result.losses, 1);
    })

    it('should validate users with correct username and password', () => {

    })

    it('should reject users with correct username and but wrong password', () => {

    })

    it('should reject users with correct password but incorrect username', () => {

    })

    after(async () => {
      await database.query('DROP TABLE users');
    })

  })

})
