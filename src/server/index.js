import express from 'express';
import bodyParser from 'body-parser';
import { server } from './server.js';
import cloneDeep from 'lodash/cloneDeep.js';

const http = express();

http.use(bodyParser.json({ limit: '50mb' }));

http.post('/json-rpc', (req, res) => {
  const request = cloneDeep(req.body);

  if (request.params) {
    request.params.peer = req.ip;
  }

  server.receive(request).then(response => {
    if (response) {
      res.json(response);
    } else {
      res.sendStatus(204);
    }
  });
});

http.listen(8081, () => console.log('Server is up and running'));