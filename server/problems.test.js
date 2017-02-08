const request = require('supertest');
const {expect} = require('chai');
const Problem = require('APP/db/models/problem');
const User = require('APP/db/models/user');
const app = require('./start');

describe('problems router', () => {
  const bill = {name: 'Bill', email: 'bill@test.com', password: '1234'};
  let createdProblem;
  before(() => 
    User.create(bill)
  );

  describe('POST /api/problems', () => {
    const testProblem = {name: 'String Search', difficulty: 'easy'};
    const agent = request.agent(app);
    before(() => agent
      .post('/api/auth/login')
      .send({username: bill.email, password: bill.password})
    );
    it('creates a new problem', () => agent
      .post('/api/problems')
      .send(testProblem)
      .expect(201)
      .then(res => {
        createdProblem = res.body;
      })
    );
  });

  describe('GET /api/problems/:problemId', () => {
    it('gets problem by id', () => 
      request(app)
      .get(`/api/problems/${createdProblem.id}`)
      .expect(200)
      .then(res => {
        expect(res.body.name).to.equal('String Search');
      })
    );
  });

  describe('PUT /api/problems/:problemId', () => {
    it('updates problem', () => 
      request(app)
      .put(`/api/problems/${createdProblem.id}`)
      .send({name: 'String Permutations', difficulty: 'hard'})
      .expect(200)
      .then(res => {
        expect(res.body.name).to.equal('String Permutations')
      })
    );
  });

  describe('DELETE /api/problems/:problemId', () => {
    it('deleted given problem', () => 
      request(app)
      .delete(`/api/problems/${createdProblem.id}`)
      .expect(204)
      .then(() => Problem.findById(createdProblem.id))
      .then(p => {
        expect(p).to.be.null;
      })
    );
  });
});

