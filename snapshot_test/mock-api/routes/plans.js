const utils = require('../utils');

module.exports = server => {
  server.get('/plans', (req, res) => {
    const db = utils.getDB();
    return res.status(200).send({ plans: db.get('plans').value() });
  });

  server.post('/subscriptions', (req, res) => {
    const { token, plan_id } = req.body;
    const db = utils.getDB();
    db.get('subscriptions')
      .push({ id: parseInt(plan_id) })
      .write();
    return res.status(200).send({ result: 'success' });
  });

  server.put('/subscriptions', (req, res) => {
    const { plan_id } = req.body;
    const db = utils.getDB();
    if (!db.get('plans').find({ id: parseInt(plan_id) }).value()) {
      return res
        .status(400)
        .send({
          result: 'failed',
          message: 'Error message from stripe',
        });
    }

    res.status(200).send({ result: 'success' });
  });

  server.put('/subscriptions/cancelled', (req, res) => {
    res.status(200).send({ result: 'success' });
  });

  server.get('/transactions', (req, res) => {
    const db = utils.getDB();
    return res.status(200).send({ transactions: db.get('transactions').value() });
  });

  server.put('/payment_profile/change_card', (req, res) => {
    res.status(200).send({ result: 'success' });
  });

  server.get('/billing_info', (req, res) => {
    const db = utils.getDB();
    res.status(200).send(db.get('billing').value()[0]);
  });

  server.get('/billing_info', (req, res) => {
    const db = utils.getDB();
    return res.status(200).send(db.get('billing').value()[0]);
  });

  server.put('/subscriptions/reactive', (req, res) => {
    res.status(200).send({ result: 'success' });
  });
};
