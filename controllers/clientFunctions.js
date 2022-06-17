

function getAllClients() {
    return JSON.parse(fs.readFileSync(`/Users/sobhi/Fullstack Bootcamp/NodeJS-Express/Node-Express-API/db/clients.json`, 'utf-8'));

}