const { updateCash, updateCredit, transferFunds, getAllAccounts, getAccount, createAccount, deleteAccount } = require('../controllers/accountFunctions');
const express = require('express');
const router = express.Router();


// get all accounts
router.get('/', getAllAccounts);

// get account by id (params)
router.get('/:id', getAccount);

// create new account (body)
router.post('/', createAccount);

//delete accounts by id (params)
router.delete('/:id', deleteAccount);

//update cash by accountId & amount (body)
router.patch('/update-cash', updateCash);

//update credit by accountId & amount (body)
router.patch('/update-credit', updateCredit);

//transfer cash by senderId, recieverId & amount (body)
router.patch('/transfer', transferFunds);



module.exports = router;
