const fs = require('fs');
const dirname = require('path');
const { dbPath } = require('../config');
const Account = require('../models/Account');
const accountsDB = dbPath + 'accounts.json';

function createAccount(owner) {
    let accounts = getAllAccounts();
    accounts.push(new Account(owner));
    fs.writeFileSync(accountsDB, JSON.stringify(accounts), 'utf-8');

}
function deleteAccount(id) {
    let accounts = getAllAccounts();
    const modified = accounts.filter(account => account.accountId != id);
    fs.writeFileSync(accountsDB, JSON.stringify(modified), 'utf-8');

}
function getAllAccounts() {
    return JSON.parse(fs.readFileSync(accountsDB, 'utf-8'));
}
function getAccount(id) {
    const accounts = getAllAccounts();
    return accounts.find(account => account.accountId === id);

}

function updateCash(accountId, amount) {

    let accounts = getAllAccounts();
    let modified = accounts.map((e) => {
        if (e.accountId == accountId) {
            let currentBalance = parseFloat(e.balance);
            e.balance = currentBalance + parseFloat(amount);
            return e;
        } else {
            return e;
        }
    })
     fs.writeFileSync(accountsDB, JSON.stringify(modified), 'utf-8');


}
function updateCredit(accountId, amount) {
    let parsedAmount = parseFloat(amount);
    if (parsedAmount < 0) {
        console.error('invalid: credit cannot be negative');
    } else {
        let accounts = getAllAccounts();
        let modified = accounts.map((e) => {
            if (e.accountId == accountId) {
                e.credit = parsedAmount;
                return e;
            } else {
                return e;
            }
        })
        fs.writeFileSync(accountsDB, JSON.stringify(modified), 'utf-8');


    }
}


function transferFunds(senderId, recieverId, amount) {
    let accounts = getAllAccounts();
    senderIndex = accounts.findIndex((account) => account.accountId === senderId);
    if (accounts[senderIndex].balance >= amount) {
        updateCash(senderId, amount*(-1));
        updateCash(recieverId, amount);
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
// accounts[senderIndex].balance -= amount;
    // recieverIndex = accounts.findIndex((account) => account.accountId === recieverId);

//         accounts[recieverIndex].balance += amount;
//         fs.writeFileSync(accountsDB, JSON.stringify(accounts), 'utf-8');
//     } else { console.log('insufficient funds') }