const fs = require('fs');
const dirname = require('path');
const dbPath = '/Users/sobhi/Fullstack Bootcamp/NodeJS-Express/Node-Express-API/db/accounts.json';
const Account = require('../models/Account');


function createAccount(owner){
    let accounts = getAllAccounts();
   accounts.push(new Account(owner));
   fs.writeFileSync(dbPath, JSON.stringify(accounts), 'utf-8');
  
}

function getAllAccounts() {
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}
function getAccount(id) {
    const accounts = getAllAccounts();
     return accounts.find(account=>account.accountId === id);
    
}

function updateCash(accountId, amount) {
    try {
        let accounts = getAllAccounts();
        let modified = accounts.map((e) => {
            if (e.accountId == accountId) {
                let currentBalance = parseFloat(e.balance);
                e.balance = currentBalance + amount;
                return e;
            } else {
                return e;
            }
        })
        fs.writeFileSync(dbPath, JSON.stringify(modified), 'utf-8');
    } catch (err) {
        console.error('error fetching/writing account files' + err);
    }
}
function updateCredit(accountId, amount) {
    if (amount < 0) { console.log('credit cannot be negative'); } else {
        try {
            let accounts = getAllAccounts();
            let modified = accounts.map((e) => {
                if (e.accountId == accountId) {
                    e.credit = amount;
                    return e;
                } else {
                    return e;
                }
            })
            fs.writeFileSync(dbPath, JSON.stringify(modified), 'utf-8');

        } catch (err) {
            console.error('error fetching/writing account files' + err);
        }
    }
}

function transferFunds(senderId, recieverId, amount) {
    try {
        let accounts = getAllAccounts();
        senderIndex = accounts.findIndex((account) => account.accountId === senderId);
        recieverIndex = accounts.findIndex((account) => account.accountId === recieverId);
        if (accounts[senderIndex].balance >= amount) {
            accounts[senderIndex].balance -= amount;
            accounts[recieverIndex].balance += amount;
            fs.writeFileSync(dbPath, JSON.stringify(accounts), 'utf-8');
        } else { console.log('insufficient funds') }
    } catch (err) { console.log(err); }

}





module.exports = { updateCash, updateCredit, transferFunds, getAllAccounts, getAccount, createAccount }
