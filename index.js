
const express = require('express');
require('dotenv').config();
const accountsRoute = require(`${process.env.DIR_PATH}/routes/accounts.route`);
const clientsRoute = require(`${process.env.DIR_PATH}/routes/clients.route`);
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
// const cors = require('cors');
// app.use(cors({ origin: ['http://localhost:5000', 'http://127.0.0.1:5000'] }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
    if (error) console.error(error);
    else console.log(`Server is running on port ${PORT}`); 
  });


app.use('/clients', clientsRoute);
app.use('/accounts', accountsRoute);
