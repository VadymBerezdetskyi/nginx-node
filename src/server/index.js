import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.all('*', (req, res) => res.status(404).json({ error: `Cannot ${req.method} ${req.path}` }));
app.listen(8081, () => console.log('Server is up and running'));