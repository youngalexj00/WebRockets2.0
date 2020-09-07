const assert = require('assert');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const should = chai.should();
// chai.use(chaiHttp);

const server = 'http://localhost:3000';
const database = require('../Server/Database/database.js')
const axios = require('axios');

describe('Tests', () => {

  describe('Users', async () => {

    let response = null;
    const username = 'test_username';
    const password = 'test_password';

    before(async () => {
      await database.query('DELETE FROM users');
    })

    it('/user/createUser POST', async () => {
      response = await axios.post(server + '/user/createUser', {
        username: username,
        password: password
      }).then(res => res.data)
        .catch(error => {
          throw new Error(error)
        });
    })

    it('should return user id after creation', () => assert.ok(response.data.user.id));

    it('should not be able to create users with a preexisting username', async () => {
      preexistingUsernameResponse = await axios.post(server + '/user/createUser', {
        username: username,
        password: password
      }).then(res => res.data)
        .catch(error => {
          throw new Error(error);
        });
      assert.ok(preexistingUsernameResponse.data.error);
    })

    it('/user/getUser POST', async () => {
      getUserResponse = await axios.post(server + '/user/getUser', {
        id: response.data.user.id
      }).then(res => res.data)
        .catch(error => {
          throw new Error(error);
        })
    })

    it('should return username, wins, losses, and games', () => {
      console.log('user is ', getUserResponse)
      assert.equal(getUserResponse.data.user.username, username);
      assert.ok(getUserResponse.data.user.hasOwnProperty('wins'));
      assert.ok(getUserResponse.data.user.hasOwnProperty('losses'));
      assert.ok(getUserResponse.data.user.hasOwnProperty('games'));
    })

    it('should validate users with correct username and password', () => {

    })

    it('should reject users with correct username and but wrong password', () => {

    })

    it('should reject users with correct password but incorrect username', () => {

    })

  })

})
