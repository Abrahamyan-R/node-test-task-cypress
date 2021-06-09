const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('/tmp/account-managment.db', (err) => {
  if (err) {
    console.error('Error during connecting database: ', err.message);
  }

  console.log('Connected to the database');
});

db.on('error', (err) => {
  console.log('error -> ', err);
});

module.exports = db;