const request = require('supertest');
const {expect} = require('chai');
const User = require('APP/db/models/user');
const Interview = require('APP/db/models/interview');
const Problem = require('APP/db/models/problem');
const app = require('./start');

describe('interviews router', () => {
  let marla;
  let createdInterview;
  before(() =>
    User.create({
      name: 'Marla', 
      email: 'marla@test.com', 
      password: '1234'
    })
    .then(user => {
      marla = user;
    })
    .then(() => Interview.create({
      date: '1/30/2017',
      interviewer_id: marla.id,
      problems: [
        {name: 'Bitwise Add', difficulty: 'medium'},
        {name: 'Sudoku Validator', difficulty: 'medium'}
      ]
    }, {
      include: [Problem]
    }))
    .then(interview => {
      createdInterview = interview;
    })
    .catch(err => console.log('Create interview error:, ', err))
  );

  describe('POST /api/interviews', () => {
    it('creates an interview', () => 
      request(app)
      .post('/api/interviews')
      .send({
        date: '1/30/2017',
        interviewer_id: createdInterview.interviewer_id,
        position: 'Engineer'
      })
      .expect(201)
      .then(res => expect(res.body.position).to.equal('Engineer'))
    );
  });

  describe('GET /api/interviews/:interviewId', () => {
    it('gets an interview by id', () => 
      request(app)
      .get(`/api/interviews/${createdInterview.id}`)
      .expect(200)
      .then(res => expect(res.body.candidate_id).to.equal(createdInterview.candidate_id))
    );
  });

  describe('PUT /api/interviews/:interviewId', () => {
    it('updates given interview', () =>
      request(app)
      .put(`/api/interviews/${createdInterview.id}`)
      .send({position: 'Manager'})
      .expect(200)
      .then(res => expect(res.body.position).to.equal('Manager'))
    );
  });

  describe('GET /api/interviews/:interviewId/problems', () => {
    it('gets all problems of given interview', () =>
      request(app)
      .get(`/api/interviews/${createdInterview.id}/problems`)
      .expect(200)
      .then(res => expect(res.body).to.have.lengthOf(2))
    );
  });

  describe('/api/interviews/:interviewId/problems', () => {
    let interview, problem;
    before(() =>
      Interview.create({
        date: '1/30/2017',
        interviewer_id: marla.id
      }) 
      .then(i => {
        interview = i;
      })
      .then(() => Problem.create({
        name: 'Decimal To Binary',
        difficulty: 'easy'
      }))
      .then(p => {
        problem = p;
      })
      .catch(err => console.log('create error: ', err))
    );

    describe('POST /api/interviews/:interviewId/problems', () => {
      it('adds a problem to an interview', () => 
        request(app)
        .post(`/api/interviews/${interview.id}/problems`)
        .send({problemId: problem.id})
        .expect(201)
        .then(() =>
          Interview.findById(interview.id, {
            include: [Problem]
          })
        )
        .then(interview => expect(interview.problems).to.have.lengthOf(1))
      );
    });
  
    describe('DELETE /api/interviews/:interviewId/problems/:problemId', () => {
      it('removes given problem from interview', () =>
        request(app)
        .delete(`/api/interviews/${interview.id}/problems/${problem.id}`)
        .expect(204)
        .then(() => Interview.findById(interview.id, {
          include: [Problem]
        }))
        .then(interview => expect(interview.problems).to.have.lengthOf(0))
      );
    });
  });

  describe('DELETE /api/interviews/:interviewId', () => {
    it('deletes given interview', () => 
      request(app)
      .delete(`/api/interviews/${createdInterview.id}`)
      .expect(204)
      .then(() => Interview.findById(createdInterview.id))
      .then(interview => expect(interview).to.be.null)
    );
  });
});
