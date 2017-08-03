const utils = require('../utils');

module.exports = server => {
  server.get('/documents/:document_id', (req, res) => {
    const { document_id } = req.params;
    const db = utils.getDB();
    const result = db.get('documents')
      .find({ id: parseInt(document_id) })
      .value();
    if (!result) {
      return res.status(404).send({ message: 'message not found' });
    }

    return res.status(200).send(result);
  });

  server.get('/documents/:document_id/preview', (req, res) => {
    const content = '<head>...</head><body>document content here</body>';
    return res.status(200).send({ content });
  });

  server.delete('/documents/:document_id', (req, res) => {
    const { document_id } = req.params;
    const db = utils.getDB();
    db.get('documents')
      .remove({ id: parseInt(document_id) })
      .write();
    return res.status(200).send({ result: 'success' });
  });

  server.put('/documents/:document_id/apply_latest', (req, res) => {
    const { document_id } = req.params;
    const db = utils.getDB();
    const doc = db.get('documents').find({ id: parseInt(document_id) });
    if (!doc.value()) {
      return res.status(404).send({ message: 'not found message' });
    }

    return res.status(200).send(doc.assign({ latest: true }).write());
  });

  server.put('/documents/:document_id/deny_latest', (req, res) => {
    const { document_id } = req.params;
    const db = utils.getDB();
    const doc = db.get('documents').find({ id: parseInt(document_id) });
    if (!doc.value()) {
      return res.status(404).send({ message: 'not found message' });
    }

    return res.status(200).send(doc.assign({ latest: false }).write());
  });

  server.put('/documents/:document_id/published', (req, res) => {
    const { document_id } = req.params;
    const db = utils.getDB();
    const doc = db.get('documents').find({ id: parseInt(document_id) });
    if (!doc.value()) {
      return res.status(404).send({ message: 'not found message' });
    }

    const version = doc.value().document_version;
    return res
      .status(200)
      .send(doc.assign({ document_version: version + 1 })
      .write());
  });

  server.put('/documents/:document_id', (req, res) => {
    const { document_id } = req.params;
    const db = utils.getDB();
    const doc = db.get('documents').find({ id: parseInt(document_id) });
    if (!doc.value()) {
      return res.status(404).send({ message: 'document not found' });
    }

    return res.status(200).send(doc.assign(req.body.document).write());
  });

};
