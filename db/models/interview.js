'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');

const Interview = db.define('interviews', {
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  candidateName: Sequelize.STRING,
  position: Sequelize.STRING,
  status: Sequelize.ENUM('planned', 'done'),
  candidateOverallRating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  },
  comments: Sequelize.TEXT
});

module.exports = Interview;
