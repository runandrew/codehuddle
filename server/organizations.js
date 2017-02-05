const router = require('express').Router();
const db = require('APP/db');
const Organization = db.model('organizations');
const User = db.model('users');
const Problems = db.model('problems');

router.get('/', (req, res, next) => {
  Organization.findAll()
  .then(organizations => res.send(organizations))
  .catch(next);
});

router.delete('/:organizationName', (req, res, next) => {
  Organization.destroy({
    where: {
      name: req.params.organizationName
    }
  })
  .then(r => {
    if (r === 0) res.sendStatus(404);
    else res.sendStatus(204);
  })
  .catch(next);
});

router.get('/:organizationName/problems', (req, res, next) => {
  Problems.findAll({
    where: {
      organization_name: req.params.organizationName
    }
  })
  .then(problems => res.send(problems))
  .catch(next);
});

router.get('/:organizationName/users', (req, res, next) => {
  User.findAll({
    where: {
      organization_name: req.params.organizationName
    }
  })
  .then(users => res.send(users))
  .catch(next);
});

// Is this route necessary?
// router.get('/:organizationName/interviews', (req, res, next) => {

// });

module.exports = router;
