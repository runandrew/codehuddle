const router = require('express').Router();
const db = require('APP/db');
const Problem = db.model('problems');
const {mustBeInterviewer} = require('./auth.filters');

router.post('/', mustBeInterviewer, (req, res, next) => {
  Problem.create(req.body)
  .then(createdProblem => res.status(201).send(createdProblem))
  .catch(next);
});

router.param('problemId', (req, res, next, id) => {
  Problem.findById(id)
  .then(problem => {
    if (!problem) res.send(404);
    else {
      req.problem = problem;
      next();
    }
  })
  .catch(next);
});

router.put('/:problemId', (req, res, next) => {
  req.problem.update(req.body)
  .then(problem => res.send(problem))
  .catch(next);
});

router.delete('/:problemId', (req, res, next) => {
  req.problem.destroy()
  .then(() => res.sendStatus(204))
  .catch(next);
});

module.exports = router;
