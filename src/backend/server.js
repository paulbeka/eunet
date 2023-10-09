const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
app.use(express.json());

JWT_SECRET_KEY = 'helloworld';

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

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token missing' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    req.user = decoded;
    next();
  });
}


// User registration
app.post('/api/register', (req, res) => {
  console.log("POST: /api/register")
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, user) => {
      if(err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if(user) {
        return res.status(405).json({ error: 'This user already exists.' })
      }

      db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to register user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
});

// User login
app.post('/api/login', (req, res) => {
  console.log("POST: /api/login")
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed - user not found' });
    }

    // Compare the password with the stored hash
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (!result) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      // Create and send a JWT
      const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET_KEY, {
        expiresIn: '1h', // Token expiration time
      });
      res.status(200).json({ token });
    });
  });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})