const { updateCash, updateCredit, transferFunds, getAllAccounts, getAccount, createAccount } = require('../services/accountFunctions');
const express = require('express');
const router = express.Router();
// get all accounts
router.get('/', (req, res, next) => {
    res.status(200).send(getAllAccounts());
    next();
})

// get account by params.id
router.get('/:id', (req, res, next) => {
    try {
        res.status(200).send(getAccount(req.params.id));
        next();
    }
    catch { err => console.log('error getAccount' + err); }
})

router.post('/', (req, res, next) => {
    try {
        createAccount(req.body.owner);
        res.status(200).send(`Account created. Owner: ${req.body.owner}`);
        next();
    }
    catch { err => console.log('error getAccount' + err); }
})



module.exports = router;
