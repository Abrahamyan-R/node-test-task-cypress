const express = require('express');

const { accountController } = require('../controllers');


const router = express.Router();

router.get('/balance/:accountId', accountController.getBalanceByAccountId);
router.get('/transaction/:transactionId', accountController.getTransactionDetailsById);
router.post('/amount', accountController.createTransaction);
router.get('/max-transaction-volume', accountController.getAccountsWithMaxTransactions);

module.exports = router;