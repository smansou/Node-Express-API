        -  Bank API built with Node.js & Express  -



-Get all accounts:
method: get('/');

Get account by id (params)
method: get('/:id')

Create new account (body)
method: post
body: account owner ID (owner: XXXXXXXXXXX)

Delete accounts by id (params)
method: delete('/:id')

Update cash by accountId & amount (body)
method: patch('/update-cash');
body: {
    accountId: XXXXXXXXX,
    amount: XXXXX.XXX
    }
** positive amount for increment. Negative numbers for decrement.

Update credit by accountId & amount (body)
method: patch('/update-credit');
body: {accountId: XXXXXXXXX, amount: XXXX}
** positive amount for increment. Negative numbers for decrement.

Transfer cash by senderId, recieverId & amount (body)
method: patch('/transfer');
body: {senderId: XXXXXXXXX, recieverId: XXXXXXXXX amount: XXXX}



-Get all Clients:
method: get('/');

Get CLient by id (params)
method: get('/:id')

Create new Client (body)
method: post
body:{
    name = XXXXXXX
        email = XXXXXXX
        age = XXXXXXX
        phone = XXXXXXX
        address = XXXXXXX
        }

Delete CLient by id (params)
method: delete('/:id')