const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./router');

const port = 4000;

const app = express();

app.use('/', router);
const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`Please navigate to http://localhost:${port} on your browser`);
});
