require('dotenv').config();

const db = require("./db");

const express = require('express');

const app = express();

app.use(express.json());

app.delete("/costumers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await db.deleteCustomer(id);
    res.status(204).send("Excluído com sucesso!");
})

app.patch("/costumers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const customer = req.body;
    await db.updateCustomer(id, customer);
    res.status(200).send("Alterado com sucesso!");
});

app.post("/costumers", async (req, res) => {
    const customer = req.body;
    await db.insertCustomer(customer);
    res.status(201).send("Cadastrado com sucesso!");
});

app.get("/costumers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const results = await db.selectCustomer(id);
    res.json(results);
})

app.get("/costumers", async (req, res) => {
    const results = await db.selectCustomers();
    res.json(results);
})


app.get('/', (req, res) => {
    res.json({
        message: "it's alive!"
    })
});

app.listen(process.env.PORT, () => {
    console.log('App ins running!');
});