'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Interview = require('./interview');
const Organization = require('./organization');
const Problem = require('./problem');
const Solution = require('./solution');
const InterviewProblem = require('./interviewProblem');

Interview.belongsTo(User, {as: 'interviewer'});
User.belongsTo(Organization);
User.hasMany(Problem, {foreignKey: 'author_id'});
User.hasMany(Interview, {foreignKey: 'interviewer_id'});
Problem.belongsTo(Organization);
Problem.belongsTo(User, {as: 'author'});
Problem.belongsToMany(Interview, {through: InterviewProblem});
Solution.belongsTo(Problem);
Interview.belongsToMany(Problem, {through: InterviewProblem});

module.exports = {
  User,
  Interview,
  Organization,
  Problem,
  InterviewProblem
};
