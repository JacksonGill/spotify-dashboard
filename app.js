const express = require('express');
const cors = require('cors');
const path = require('path');
const initViews = require('./controllers/initViews');
const sendNewRouter = require('./controllers/sendNewRouter');
const storageRouter = require('./controllers/storage');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.use('/api', initViews);
app.use('/api/new', sendNewRouter);
app.use('/api/initialize', storageRouter);

app.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = app;
