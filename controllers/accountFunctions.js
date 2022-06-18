const fs = require('fs');
const dirname = require('path');
const Account = require('../models/Account');
const { incDecBalance } = require('../utils/utils');
const dbPath = process.cwd() + '/db/';
const accountsDB = dbPath + 'accounts.json';
const accounts = JSON.parse(fs.readFileSync(accountsDB, 'utf-8'));


async function createAccount(req, res, next) {
    const newAcc = new Account(req.body.owner);
    accounts.push(newAcc);
    fs.writeFileSync(accountsDB, JSON.stringify(accounts), 'utf-8');
    try {
        res.status(200).send(`Success. Account created:  ${JSON.stringify(newAcc)}`);
    }
    catch (err) {
        next(err);
    }
}

async function deleteAccount(req, res, next) {

    const modified = accounts.filter(account => account.accountId != req.params.id);
    fs.writeFileSync(accountsDB, JSON.stringify(modified), 'utf-8');
    try {
        res.status(200).send(`Account ${req.params.id} deleted successfully`);
    }
    catch (err) {
        next(err);
    }
}

async function getAllAccounts(req, res, next) {
    try {
        res.status(200).send(accounts);
    }
    catch (err) {
        next(err);
    }
    return accounts;
}

async function getAccount(req, res, next) {
    const result = accounts.find(account => account.accountId === req.params.id);
    if (result) {
        try {
            res.status(200).send(result);
        }
        catch (err) {
            next(err)
        }
    } else { res.status(404).send(`account: ${req.params.id} not found`) }

}

async function updateCash(req, res, next) {
    const exists = accounts.find(account => account.accountId === req.params.id);
    if (exists) {
        incDecBalance(req.body.accountId, req.body.amount)
        fs.writeFileSync(accountsDB, JSON.stringify(modified), 'utf-8');
        try {
            res.status(200).send(`Success. Account: ${req.body.accountId} balance updated.`);
        } catch (err) {
            next(err);
        }
    } else { res.status(404).send(`account ${req.body.accountId} not found`) }
}

async function updateCredit(req, res, next) {
    const exists = accounts.find(account => account.accountId === req.params.id);
    if (exists) {
        let parsedAmount = parseFloat(req.body.amount);
        if (parsedAmount < 0) {
            res.status(400).send('invalid: credit cannot be negative');
        } else {
            let modified = accounts.map((e) => {
                if (e.accountId == req.body.accountId) {
                    e.credit = parsedAmount;
                    return e;
                } else {
                    return e;
                }
            })
            fs.writeFileSync(accountsDB, JSON.stringify(modified), 'utf-8');
            try {
                res.status(200).send(`Success. Account: ${req.body.accountId} credit updated.`);
            } catch (err) {
                next(err);
            }
        }
    } else { res.status(404).send(`account ${req.body.accountId} not found`) }
}



async function transferFunds(req, res, next) {
    senderIndex = accounts.findIndex((account) => account.accountId === req.body.senderId);
    recieverIndex = accounts.findIndex((account) => account.accountId === req.body.recieverId);
    if (senderIndex != -1 && recieverIndex != -1) {
        if (accounts[senderIndex].balance >= req.body.amount) {
            incDecBalance(req.body.senderId, req.body.amount * (-1));
            incDecBalance(req.body.recieverId, req.body.amount);

            try {
                res.send(`Success. transferred ${req.body.amount} from ${req.body.senderId} to ${req.body.recieverId}.`);
            } catch (err) {
                next(err);
            }
        } else {
            res.status(400).send('insuffecient funds');
        }
    } else {
        res.status(404).send(`account not found`)
    }
}

module.exports = {
    deleteAccount,
    updateCash,
    updateCredit,
    transferFunds,
    getAllAccounts,
    getAccount,
    createAccount
};
