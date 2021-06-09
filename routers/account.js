const express = require('express');

const { accountController } = require('../controllers');
const { accountValidator } = require('../validators')
const { validateMiddleware } = require('../middlewares');


const router = express.Router();

router.get(
  '/balance/:accountId',
  accountValidator.getBalanceByAccountIdValidator,
  validateMiddleware,
  accountController.getBalanceByAccountId,
);

router.get(
  '/transaction/:transactionId',
  accountValidator.getTransactionDetailsByIdValidator,
  validateMiddleware,
  accountController.getTransactionDetailsById,
);

router.post(
  '/amount',
  accountValidator.createTransactionValidator,
  validateMiddleware,
  accountController.createTransaction,
);

router.get(
  '/max-transaction-volume',
  accountController.getAccountsWithMaxTransactions,
);

module.exports = router;