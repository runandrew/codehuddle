const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('APP/db');
const User = db.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  })
  .catch(done);
});

passport.use(new LocalStrategy((email, password, done) => {
  User.findOne({where: {email}})
  .then(user => {
    if (!user) {
      return done(null, false, { message: 'Login incorrect' })
    }
    return user.authenticate(password)
    .then(ok => {
      if (!ok) {
        return done(null, false, { message: 'Login incorrect' })
      }
      done(null, user)
    });
  })
  .catch(done);
}));

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.send(req.user); // change to redirect once front end is implemented.
});

module.exports = router;
