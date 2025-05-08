const path = require('path');

module.exports = {
  development: {
    dialect: 'sqlite',
    dialectModule: require('better-sqlite3'),
    storage: path.resolve(__dirname, '../database.sqlite')
  },
  test: {
    dialect: 'sqlite',
    dialectModule: require('better-sqlite3'),
    storage: ':memory:'
  },
  production: {
    dialect: 'sqlite',
    dialectModule: require('better-sqlite3'),
    storage: path.resolve(__dirname, '../database.sqlite')
  }
};
