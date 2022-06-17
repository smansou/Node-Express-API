const uniqid = require('uniqid');
const currentdate = new Date(); 


class Client {
    constructor(name, age, email, phone, address) {
        this.id = uniqid();
        this.name = name
        this.email = email
        this.age = age
        this.phone = phone
        this.address = address
        this.registered = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/" 
        + currentdate.getFullYear() + " @ "  
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds();
    }
}

module.exports = Client;