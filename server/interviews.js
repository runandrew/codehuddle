const router = require('express').Router();
const db = require('APP/db');
const Interview = db.model('interviews');
const InterviewProblem = db.model('interviewProblems');

// TODO: check authorizations where necessary. Can we do it in router.param?

router.param('interviewId', (req, res, next, id) => {
  Interview.findById(id)
  .then(interview => {
    if (!interview) res.send(404);
    else {
      req.interview = interview;
      next();
    }
  })
  .catch(next);
});

router.get('/:interviewId', (req, res, next) => {
  res.send(req.interview);
});

router.post('/', (req, res, next) => {
  Interview.create(req.body)
  .then(createdInterview => res.status(201).send(createdInterview))
  .catch(next);
});

router.put('/:interviewId', (req, res, next) => {
  req.interview.update(req.body)
  .then(interview => res.send(interview))
  .catch(next);
});

router.delete('/:interviewId', (req, res, next) => {
  req.interview.destroy()
  .then(() => res.sendStatus(204))
  .catch(next);
});

router.get('/:interviewId/problems', (req, res, next) => {
  req.interview.getProblems()
  .then(problems => res.send(problems))
  .catch(next);
});

router.post('/:interviewId/problems', (req, res, next) => {
  req.interview.addProblem(req.body.problemId)
  .then(problem => res.status(201).send(problem))
  .catch(next);
});

// We need to check authorization based on fields being changed. Probably in class method.
router.put('/:interviewId/problems/:problemId', (req, res, next) => {
  InterviewProblem.update(req.body, {
    where: {
      interview_id: req.params.interviewId,
      problem_id: req.params.problemId
    }
  })
  .then(_ => res.send(_))
  .catch(next);
});

router.delete('/:interviewId/problems/:problemId', (req, res, next) => {
  req.interview.removeProblem(req.params.problemId)
  .then(() => res.sendStatus(204))
  .catch(next);
});

module.exports = router;
