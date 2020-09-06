const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const server = 'http://localhost:3000';

describe('Tests', () => {

  describe('Users', () => {

    it('should be able to create users', async () => {
      const createUser = await chai.request(server).post('/createUser');
      assert(CreateUser.body).to.be.an('object');
    });

    it('should be able to create users', async () => {
      const result = await chai.request(server).get('/')
      console.log(result.text)
    });

  })

})
