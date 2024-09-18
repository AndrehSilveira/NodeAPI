const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING);

async function selectCustomers(){
    const results = await client.query("SELECT * FROM costumers");
    return results[0];
}

async function selectCustomer(id){
    const results = await client.query("SELECT * FROM costumers WHERE id=?", [id]);
    return results[0];
}

async function insertCustomer(customer){
    const values = [customer.name, customer.age, customer.uf]
    await client.query("INSERT INTO costumers(name,age,uf) VALUES (?,?,?)", values);
}

async function updateCustomer(id, customer){
    const values = [customer.name, customer.age, customer.uf, id]
    await client.query("UPDATE costumers SET name=?, age=?, uf=? WHERE id=?", values);
}

async function deleteCustomer(id){
    await client.query("DELETE FROM costumers WHERE id=?", id);
}

module.exports = {
    selectCustomers,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}