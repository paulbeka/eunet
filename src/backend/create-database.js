const sqlite3 = require('sqlite3').verbose();
const fs = require('fs').promises; // Use fs.promises for promises-based file operations

const db = new sqlite3.Database('database.db');

const FILE_LOCATIONS = './data/posts/';

const processFile = async (file) => {
  return fs.readFile(FILE_LOCATIONS + file, 'utf8')
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);
        return {
          "title": jsonData["title"],
          "description": jsonData["description"],
          "location": file
        };
      } catch (parseError) {
        console.log(`Error parsing the JSON file ${file}: `, parseError);
        return null;
      }
    });
};

db.serialize(() => {
  db.run(`
    CREATE TABLE posts (
      id INTEGER PRIMARY KEY,
      title TEXT,
      description TEXT,
      location TEXT
    );
  `);
})

fs.readdir(FILE_LOCATIONS)
  .then((files) => {
    console.log("Detected files: ");
    const filePromises = files.map(processFile);
    return Promise.all(filePromises);
  })
  .then((fileList) => {
    fileList.forEach((item) => {
      if (item) {
        db.run(`INSERT INTO posts (title, description, location) VALUES (?, ?, ?);`, [item.title, item.description, item.location], (err) => {
          if (err) {
            console.error(`Error adding ${item.location} to database: ${err.message}`);
          } else {
            console.log(`Added ${item.location} to the database.`);
          }
        });
      }
    });
  })
  .finally(() => {
    db.close((err) => {
      if (err) {
        console.error('Error closing the database:', err.message);
      } else {
        console.log('Database connection closed successfully.');
      }
    });
  })
  .catch((err) => {
    console.log(err.message);
  });


