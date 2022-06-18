
const fs = require('fs');
const { dbPath } = require('../config');
const clientsDB = dbPath + 'clients.json';
const clients = JSON.parse(fs.readFileSync(clientsDB, 'utf-8'));
const Client = require('../models/Client');



async function getAllClients(req, res, next) {
    try {
        res.status(200).send(clients);
    }
    catch (err) {
        next(err);
    }
    return clients;
}

async function deleteClient(req, res, next) {
    const modified = clients.filter(client => client.id != req.params.id);
    fs.writeFileSync(clientsDB, JSON.stringify(modified), 'utf-8');
    try {
        res.status(200).send(`client ${req.params.id} deleted successfully`);
    }
    catch (err) {
        next(err);
    }
}
async function getClient(req, res, next) {
    const result = clients.find(client => client.id === req.params.id);
    try {
        res.status(200).send(result);
    }
    catch (err) {
        next(err)
    }

}
async function createClient(req, res, next) {
    const newClient = new Client(req.body.name, req.body.email, req.body.age, req.body.phone,req.body.address );
    clients.push(newClient);
    fs.writeFileSync(clientsDB, JSON.stringify(clients), 'utf-8');
    try {
        res.status(200).send(`Success. client created:  ${JSON.stringify(newClient)}`);
    }
    catch (err) {
        next(err);
    }
}

module.exports = {deleteClient, getAllClients, getClient, createClient }