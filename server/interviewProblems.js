const router = require('express').Router();
const db = require('APP/db');
const InterviewProblem = db.model('interviewProblems');

router.put('/:interviewId/problems/:problemId', (req, res, next) => {
  InterviewProblem.update(req.body, {
    where: {
      interview_id: req.params.interviewId,
      problem_id: req.params.problemId
    }
  })
  .then(() =>
    InterviewProblem.find({
      where: {
        interview_id: req.params.interviewId,
        problem_id: req.params.problemId
      }
    })
  )
  .then(_ => res.send(_))
  .catch(next);
});

module.exports = router;
