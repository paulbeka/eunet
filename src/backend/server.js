const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const userFunctions = require('./server_functions/users')
const postFunctions = require('./server_functions/posts')

const app = express();

const corsOpts = {
  origin: '*',
};

app.use(cors(corsOpts));
app.use(express.json());

const db = new sqlite3.Database('database.db');
const port = 8000;

// posts URLs
app.get('/api/posts', (req, res) => postFunctions.getPosts(res, db));
app.get('/api/get-post/:title', (req, res) => postFunctions.getSpecificPost(req, res, db));

// login URLs
app.post('/api/register', (req, res) => userFunctions.register(req, res, db));
app.post('/api/login', (req, res) => userFunctions.login(req, res, db));
app.get('/api/checkLogin', userFunctions.verifyToken, (req, res) => {
  console.log("GET: /api/checkLogin");
  res.status(200).json({success: true})
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})