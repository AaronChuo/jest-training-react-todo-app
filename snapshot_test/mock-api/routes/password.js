const utils = require('../utils');

module.exports = server => {
  server.get('/password/forgot_password', (req, res) => {
    return res
      .status(200)
      .send({ msg: 'Reset password email has been sent.' });
  });

  server.get('/password/token_verification', (req, res) => {
    const { email } = req.query;
    const db = utils.getDB();

    const user = db.get('users').find({ email }).value();
    delete user.id;
    return res.status(200).send(user);
  });
};
