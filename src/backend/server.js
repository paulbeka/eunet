const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

const db = new sqlite3.Database('database.db');

const port = 8000;

app.get('/api/posts', (req, res) => {
  db.all('SELECT * FROM posts', (err, rows) => {
    if(err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  })
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})