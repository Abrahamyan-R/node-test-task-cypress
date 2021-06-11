const db = require('../db');

(async () => {
  // migrating balance table
  await db.exec(`
    CREATE TABLE account_balance (
      "account_id" TEXT NOT NULL UNIQUE,
      "balance" INTEGER NOT NULL CHECK(balance >= 0)
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

  await db.exec(`
    INSERT INTO account_balance (account_id, balance)
    VALUES ("a40bcc03-6f39-418c-ad0b-97e14f522ec1", 0);
  `);

  await db.exec(`
    INSERT INTO account_balance (account_id, balance)
    VALUES ("0b230303-0156-45a9-b996-16574b6be525", 0);
  `);

  await db.exec(`
    INSERT INTO account_balance (account_id, balance)
    VALUES ("ddb28326-25b5-431d-92bd-7a1b4372a10f", 0);
  `);

  await db.exec(`
    INSERT INTO account_balance (account_id, balance)
    VALUES ("134aa5a1-488f-4c84-b434-1d61d44de6eb", 0);
  `);

  await db.exec(`
    INSERT INTO account_balance (account_id, balance)
    VALUES ("7c9be9e8-a6df-4f43-9a44-38c10ad0de4a", 0);
  `);

  await db.exec(`
    INSERT INTO account_balance (account_id, balance)
    VALUES ("75108c41-0002-4778-95ed-f6a1bd897b58", 0);
  `);

  await db.exec(`
    INSERT INTO account_balance (account_id, balance)
    VALUES ("44a92331-a533-4dd3-82e3-3ff75219e33b", 0);
  `);

  console.info('migrations done successfully');
})();