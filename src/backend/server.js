const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
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
  console.log("GET: /api/posts")
  db.all('SELECT * FROM posts', (err, rows) => {
    if(err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  })
});


app.get('/api/get-post/:title', (req, res) => {
  const location = req.params.title;
  console.log("GET: /api/get-post/" + location);

  fs.readFile(`data/posts/${location}.json`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    try {
      const jsonData = JSON.parse(data);

      res.json(jsonData);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).json({ error: 'Error parsing JSON data' });
    }
  });
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})