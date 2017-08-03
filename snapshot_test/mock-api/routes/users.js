const utils = require('../utils');

module.exports = server => {
  server.post('/users/sign_in', (req, res) => {
    const db = utils.getDB();
    const account = db.get('users').find(req.body).value();

    if (!account) {
      return res.status(400).send({ user: ['not exist'] });
    }

    const { id } = account;
    delete account.id;
    delete account.password;
    return res.cookie('mock_cookie', JSON.stringify(account))
      .status(200)
      .send(account);
  });

  server.post('/users/sign_up', (req, res) => {
    const { email, password, password_confirmation } = req.body;
    const db = utils.getDB();
    if (password !== password_confirmation) {
      return res.status(400).send({ password: ['is not matched'] });
    }

    const duplicateMail = db.get('users').find({ email }).value();
    if (duplicateMail) {
      return res.status(400).send({ email: ['already taken'] });
    }

    const userTotal = db.get('users').size().value();
    const usersList = db.get('users')
      .push({
        id:  userTotal + 1,
        email,
        password,
        active_subscription: true,
        first_name: "test",
        last_name: "test",
        avatar: {
          url: "url to s3"
        },
        guest: true,
      })
      .write();

    return res.status(200).send(usersList[userTotal]);
  });

  server.delete('/users/sign_out', (req, res) => {
    return res.clearCookie('mock_cookie')
      .status(200)
      .send({ result: 'success' });
  });

  server.get('/users/current_user', (req, res) => {
    const { id } = req;
    const db = utils.getDB();
    const user = db.get('users').find({ id }).value();

    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }

    delete user.id;
    return res.status(200).send(user);
  });

  server.put('/users/info', (req, res) => {
    const {
      id,
      body: {
        email,
        first_name,
        last_name,
        password,
        password_confirmation,
        current_password
      },
    } = req;
    const db = utils.getDB();
    let newInfo = {};
    let user = db.get('users');
    if (current_password && current_password !== '') {
      user = find({ id, password: current_password });

      if (!user.value()) {
        return res.status(400).send({ current_password: ['is invalid'] });
      }

      if (password !== password_confirmation) {
        return res.status(400).send({ password: ['is not matched'] });
      }

      newInfo.password = password;
    }

    user = user.find({ id })
    .assign(Object.assign(newInfo, { first_name, last_name, email }))
    .write();
    delete user.id;
    return res.status(200).send(user);
  });

  server.get('/users/info', (req, res) => {
    const { email, first_name } = JSON.parse(req.cookies.mock_cookie);
    const db = utils.getDB();
    const user = db.get('users').find({ email, first_name }).value();
    delete user.id;
    delete user.password;
    return res.status(200).send(user);
  })
};
