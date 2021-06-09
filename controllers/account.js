const uuid = require('uuid');

const db = require('../db');


const getBalanceByAccountId = async (req, res) => {
  const { accountId } = req.params;

  const sql = `SELECT balance
              FROM account_balance
              WHERE account_id = ?`;


  db.get(sql, [accountId], (err, row) => {
      if (err) return res.status(500).json({ message: 'error' });

      if (!row) return res.status(404).send();

      res.json(row);
    }
  );
};

const getTransactionDetailsById = async (req, res) => {
  const { transactionId } = req.params;

  const sql = `SELECT account_id, amount
              FROM transactions
              WHERE id = ?`;

  db.get(sql, [transactionId], (err, row) => {
    if (err) return res.status(500).json({ message: 'error' });

    if (!row) return res.status(404).send();

    res.json(row);
  });
};

const createTransaction = async (req, res) => {
  const {
    accountId,
    amount,
  } = req.body;

  const transactionId = uuid.v4();
  
  db.serialize(() => {
    db.exec('BEGIN');

    db.exec(`UPDATE account_balance
            SET balance = balance + ${amount}
            WHERE account_id = "${accountId}";
    `);

    db.exec(`INSERT INTO transactions (id, account_id, amount)
            VALUES ("${transactionId}", "${accountId}", ${amount})
    `);

    db.exec('COMMIT');
  });

  res.send();
};

const getAccountsWithMaxTransactions = async (req, res) => {
  const sql = `SELECT COUNT(account_id) as volume, account_id
              FROM transactions
              GROUP BY account_id
              HAVING volume = (
              SELECT MAX(countOfTransactions)
              FROM (
              SELECT account_id, COUNT(account_id) countOfTransactions
              FROM transactions
              GROUP BY account_id
  ));`

  db.all(sql, (err, rows) => {
    if (err) return res.status(500).json({ message: 'error' });

    if (!rows) return res.status(404).send();

    const result = {
      maxVolume: rows[0].volume,
      accounts: rows.map(row => row.account_id),
    };

    res.json(result);
  });
};

module.exports = {
  getBalanceByAccountId,
  getTransactionDetailsById,
  createTransaction,
  getAccountsWithMaxTransactions,
};