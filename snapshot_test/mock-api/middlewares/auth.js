const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  } else {
    const { mock_cookie } = req.cookies;
    if (!mock_cookie) {
      return res.status(401).send({ error: 'unauthorized' });
    }

    req.id = mock_cookie.id;
    next();
  }
};

module.exports = authMiddleware;
