const app = require('./mock-api');
const serverConfig = require('./configs/server-config');

app.listen(
  serverConfig.apiServerPort,
  () => {
    console.log('Development server now is listening on:');
    console.log(`http://localhost:${serverConfig.apiServerPort}`);
    console.log(`http://127.0.0.1:${serverConfig.apiServerPort}`);
    console.log(serverConfig.apiServerAddress);
  }
);
