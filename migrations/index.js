const db = require('../db');

(async () => {
  // migrating balance table
  await db.exec(`
    CREATE TABLE account_balance (
      "account_id" TEXT NOT NULL UNIQUE,
      "balance" INTEGER NOT NULL CHECK(balance > 0)
    );`
  );

  await db.exec(`
    CREATE TABLE transactions (
      "id"	TEXT NOT NULL,
      "account_id"	TEXT NOT NULL,
      "amount"	INTEGER NOT NULL,
      PRIMARY KEY("id")
    );
  `);

  console.info('migrations done successfully');
})();