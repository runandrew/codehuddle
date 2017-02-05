const router = require('express').Router();
const db = require('APP/db');
const User = db.model('users');
const {mustBeLoggedIn, forbidden} = require('./auth.filters');

router.get('/', forbidden('only admins can list users'), (req, res, next) => {
  User.findAll()
  .then(users => res.json(users))
  .catch(next);
});

router.post('/', (req, res, next) => {
  User.create(req.body)
  .then(user => res.status(201).json(user))
  .catch(next);
});

router.param('userId', (req, res, next, id) => {
  User.findById(id)
  .then(user => {
    if (!user) res.send(404);
    else {
      req.user = user;
      next();
    }
  })
  .catch(next);
});

router.get('/:userId', (req, res, next) => {
  res.send(req.user);
});

router.put('/:userId', (req, res, next) => {
  req.user.update(req.body)
  .then(user => res.send(user))
  .catch(next);
});

router.delete('/:userId', (req, res, next) => {
  req.user.destroy()
  .then(() => res.sendStatus(204))
  .catch(next);
});

router.get('/:userId/problems', (req, res, next) => {
  req.user.getProblems()
  .then(problems => res.send(problems))
  .catch(next);
});

module.exports = router;
