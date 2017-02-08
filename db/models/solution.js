'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');

const Solution = db.define('solutions', {
  code: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  bigO: Sequelize.STRING
});
  
module.exports = Solution;
