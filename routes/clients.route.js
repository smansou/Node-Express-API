const {deleteClient, getAllClients, getClient, createClient} = require('../controllers/clientFunctions')
const express = require('express');
const router = express.Router();

router.get('/', getAllClients);
router.get('/:id', getClient);
router.post('/', createClient);
router.delete('/:id', deleteClient);


module.exports = router;

