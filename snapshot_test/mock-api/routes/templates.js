const utils = require('../utils');

module.exports = server => {
  server.get('/templates', (req, res) => {
    const db = utils.getDB();
    return res.status(200).send(db.get('templates').value()[0]);
  });
};
