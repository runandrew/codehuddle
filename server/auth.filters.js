const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in');
  }
  next();
};

const mustBeInterviewer = (req, res, next) => {
  if (!req.user || req.user.role !== 'interviewer') {
    return res.status(401).send('You must be an interviewer');
  }
  next();
};

const selfOnly = (req, res, next) => {
  if (req.params.userId !== req.user.id) {
    return res.status(403).send('Only user can take this action.');
  }
  next();
};

const forbidden = message => (req, res, next) => {
  res.status(403).send(message)
}

module.exports = {mustBeLoggedIn, selfOnly, forbidden, mustBeInterviewer};
