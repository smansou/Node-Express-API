
const fs = require('fs');
const { dbPath } = require('../config');
const accountsDB = dbPath + 'accounts.json';
const accounts = JSON.parse(fs.readFileSync(accountsDB, 'utf-8'));



async function incDecBalance(id, amount){
    let modified = accounts.map((e) => {
        if (e.accountId === id) {
            let currentBalance = parseFloat(e.balance);
            e.balance = currentBalance + parseFloat(amount);
            return e;
        } else {
            return e;
        }})
    fs.writeFileSync(accountsDB, JSON.stringify(modified), 'utf-8');
}
module.exports = {incDecBalance};