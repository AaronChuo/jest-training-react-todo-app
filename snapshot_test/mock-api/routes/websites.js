const utils = require('../utils');

module.exports = server => {
  server.post('/websites', (req, res) => {
    const {
      body: { name, url, logo },
      id,
    } = req;
    const db = utils.getDB();
    const websitesTotal = db.get('websites').size().value();
    const websitesList = db.get('websites')
      .push({
        id: websitesTotal + 1,
        user_id: id,
        name,
        url,
        logo: {
          url: 'http://s3.amazone/url_to_our_logo'
        },
        documents: [
          { name: 'terms of use' },
        ]
      })
      .write();
    const result = websitesList[websitesTotal];
    delete result.documents;
    return res.status(200).send(websitesList[websitesTotal]);
  });

  server.put('/websites/:website_id', (req, res) => {
    const {
      body: { name, url, logo },
      params: { website_id },
    } = req;
    const db = utils.getDB();
    const result = db.get('websites')
      .find({ id: parseInt(website_id) })
      .assign({
        name,
        url,
        logo: {
          url: 'http://s3.amazone/url_to_our_logo'
        },
      })
      .write();
    delete result.documents;
    return res.status(200).send(result);
  });

  server.get('/websites', (req, res) => {
    const db = utils.getDB();
    return res.status(200).send({
      websites: db.get('websites').value(),
    });
  });
};
