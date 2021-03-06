const {
  body,
  param,
  header,
} = require('express-validator');


const getBalanceByAccountIdValidator = [
  param('accountId')
    .isUUID().withMessage('account id must be uuid')
];

const getTransactionDetailsByIdValidator = [
  param('transactionId')
    .isUUID().withMessage('transaction id must be uuid')
];

const createTransactionValidator = [
  body('accountId')
    .exists().withMessage('account id required')
    .isString().withMessage('account id must be string')
    .isUUID().withMessage('account id must be uuid'),
  body('amount')
    .exists().withMessage('amount is required')
    .isInt().withMessage('amount must be integer')
    .toInt(),
  header('transactionId')
    .exists().withMessage('transaction id required')
    .isString().withMessage('transaction id must be string')
    .isUUID().withMessage('transaction id must be uuid')
];

module.exports = {
  getBalanceByAccountIdValidator,
  getTransactionDetailsByIdValidator,
  createTransactionValidator,
}