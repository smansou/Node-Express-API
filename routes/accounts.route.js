const { updateCash, updateCredit, transferFunds, getAllAccounts, getAccount, createAccount, deleteAccount } = require('../services/accountFunctions');
const express = require('express');
const router = express.Router();


// get all accounts
router.get('/', (req, res, next) => {
    res.status(200).send(getAllAccounts());
    next();
})

// get account by id (params)
router.get('/:id', (req, res, next) => {
    try {
        res.status(200).send(getAccount(req.params.id));
    }
    catch {
        err => console.log('error getAccount' + err);
        next(err);
    }
})

// create new account (body)
router.post('/', (req, res, next) => {
    try {
        createAccount(req.body.owner);
        res.status(200).send(`Account created for owner: ${req.body.owner}`);
    }
    catch {
        err => console.log('error getAccount' + err);
        next(err);
    }
})
//delete accounts by id (params)
router.delete('/:id', (req, res, next) => {
    try {
        deleteAccount(req.params.id);
        res.status(200).send(`Account ${req.params.id} deleted successfully`);
    }
    catch {
        err => console.log('error deleting' + err);
        next(err);
    }
}
)
router.patch('/update-cash', (req, res, next) => {
    try {
        updateCash(req.body.accountId, req.body.amount);
        res.status(200).send(`Success. Account: ${req.body.accountId} balance updated.`);
    }
    catch {
        err => console.log('error deleting' + err);
        next(err);
    }

})


router.patch('/update-credit', (req, res, next) => {
    try {
        updateCredit(req.body.accountId, req.body.amount);
        res.status(200).send(`Success. Account: ${req.body.accountId} credit updated.`);
    }
    catch {
        (err) =>{ console.log('error deleting' + err);
        next(err);
    }
    }

})


router.patch('/transfer', (req, res, next) => {
    try {
        console.log(req.body);
        transferFunds(req.body.senderId, req.body.recieverId, req.body.amount);
        res.send(`Success. transferred ${req.body.amount} from ${req.body.senderId} to ${req.body.recieverId}.`);
    }
    catch {
        (err) =>{ console.log('error deleting' + err);
        next(err);
    }
    }

})



module.exports = router;
