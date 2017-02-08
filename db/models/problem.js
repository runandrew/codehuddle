'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');

const Problem = db.define('problems', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.TEXT,
  difficulty: Sequelize.ENUM('easy', 'medium', 'hard')
});

module.exports = Problem;
