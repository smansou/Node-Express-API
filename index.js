
const express = require('express');
require('dotenv').config();
// const bp = require('bodyParser');
const accountsRoute = require(`${process.env.DIR_PATH}/routes/accounts.route`);
const clientsRoute = require(`${process.env.DIR_PATH}/routes/clients.route`);
const app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended:true})); // to support URL-encoded bodies
const cors = require('cors');
app.use(cors({ origin: ['http://localhost:5000', 'http://127.0.0.1:5000'] }));

app.listen(5000, (error) => {
    if (error) console.error(error);
    else console.log(`Server is running on port ${PORT}`); 
  });

const PORT = process.env.PORT || 5000;

app.use('/clients', clientsRoute);
app.use('/accounts', accountsRoute);
