const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan =  require('morgan');
const app = express();
const router = express.Router();
const routes = require('./routes');
const authMiddleware = require('./middlewares/auth');
authMiddleware.unless = require('express-unless');
const config = require('./config');


router.use(cors({
  origin: 'http://localhost:8080',
  methods: "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());
router.use(morgan('tiny'));
router.use(authMiddleware.unless(config.authUnless));

routes.forEach(route => route(router));

app.use('/api/v1', router);

module.exports = app;
