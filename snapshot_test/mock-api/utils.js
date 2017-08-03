const low = require('lowdb');
const path = require('path');

const getDB = () => {
  return low(path.resolve(__dirname, 'db.json'));
};

module.exports = {
  getDB,
};
