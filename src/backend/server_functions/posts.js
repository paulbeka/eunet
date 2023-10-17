const fs = require('fs');


function getPosts(res, db) {
  console.log("GET: /api/posts")
  db.all('SELECT * FROM posts', (err, rows) => {
    if(err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  })
}


function getSpecificPost(req, res, db) {
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
}

function postPost(req, res, db) {
  console.log("GET: /api/postPost");
}


module.exports = { getPosts, getSpecificPost }