const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

JWT_SECRET_KEY = 'helloworld';


function login(req, res, db) {
  console.log("POST: /api/login")
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
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
      const token = jwt.sign({ userId: user.id, username: user.email }, JWT_SECRET_KEY, {
        expiresIn: '1h', // Token expiration time
      });
      res.status(200).json({ token });
    });
  });
}


function register(req, res, db) {
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
}


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


module.exports = { login, register, verifyToken };