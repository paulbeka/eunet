const { faCommentsDollar } = require('@fortawesome/free-solid-svg-icons');
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
      res.json({"title": jsonData.title, "content": jsonData.postData});
    } catch (parseError) {
      console.error(parseError);
      res.status(500).json({ error: 'Error parsing JSON data' });
    }
  });
}


function deleteSpecificPost(req, res, db) {
  const location = req.params.title;
  console.log("DELETE: /api/get-post/" + location);

  fs.unlink(`data/posts/${location}.json`, (err) => {
    if(err) {
      console.error(err);
      return res.status(500).json({ error: 'Error deleting the file.' })
    }
    db.run(`DELETE FROM posts WHERE location = ?`, [location], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error.' });
      }
    
      return res.status(200).json({ message: 'Post deleted successfully' });
    });
  })
}


function postPost(req, res, db) {
  console.log("POST: /api/postPost");

  const title = req.body.title;
  const location = title.replaceAll(" ", "_").toLowerCase();
  const description = req.body.description;
  const postData = req.body.postContent;

  db.all(`SELECT * FROM posts WHERE location = ?`, [location], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error.' });
    }

    if (data && data.length > 0) {
      return res.status(405).json({ error: 'This post has already been uploaded.' });
    }

    db.run(`INSERT INTO posts (title, description, location) VALUES (?, ?, ?);`, [title, description, location], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const fileData = JSON.stringify({
        "title": title,
        "description": description,
        "postData": postData
      });

      fs.writeFile(`data/posts/${location}.json`, fileData, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json({ message: 'Post uploaded successfully.' });
      });
    });
  });
}


module.exports = { getPosts, getSpecificPost, deleteSpecificPost, postPost }