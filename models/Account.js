const uniqid = require('uniqid');

class Account {
    constructor(owner) {
        this.accountId = uniqid();
        this.isActive = true
        this.balance = 0
        this.credit = 0
        this.owner = owner
    }
}

module.exports = Account;
