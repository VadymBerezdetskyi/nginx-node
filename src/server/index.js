import express from 'express';
import bodyParser from 'body-parser';
import { server } from './server.js';


const http = express();

http.use(bodyParser.json({ limit: '50mb' }));

http.post('/json-rpc', (req, res) => {
  server.receive(req.body).then(response => {
    if (response) {
      res.json(response);
    } else {
      res.sendStatus(204);
    }
  });
});

http.listen(8081, () => console.log('Server is up and running'));