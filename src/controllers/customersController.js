import { connection } from "../db.js";

export async function insertCustomer (req, res){
    const {name, phone, cpf, birthday} = req.body;
    if(!name || !phone || !cpf || !birthday){
        return res.sendStatus(400);
    };
    try {
        const cpfValidator = await connection.query('SELECT id FROM customers WHERE cpf = $1', [cpf]);
        if (cpfValidator.rowCount >= 1) {
          return res.sendStatus(409);
        };
        const result = await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
        if (result.rowCount>=1){
            res.sendStatus(201);
        }
    } catch (error) {
        console.log(error);
        res.send(`${error.name}: ${error.message}`);
    }
}

export async function updateCustomer (req, res){
    const id = parseInt(req.params.id);
    const {name, phone, cpf, birthday} = req.body;
    if(!name || !phone || !cpf || !birthday){
        return res.sendStatus(400);
    }
    try {
        const cpfValidator = await connection.query('SELECT id FROM customers WHERE cpf = $1', [cpf]);
        if (cpfValidator.rowCount >= 1) {
          return res.sendStatus(409);
        };
        const result = await connection.query(`UPDATE customers SET name='${name}', phone='${phone}', cpf='${cpf}', birthday='${birthday}' WHERE id = ${id};`);
        if (result.rowCount>=1){
            res.sendStatus(200);
        };
    } catch (error) {
        console.log(error);
        res.send(`${error.name}: ${error.message}`);
    }
};

export async function listCustomers (req, res){
    const cpf = req.query.cpf
    const id = parseInt(req.params.id);
    try {
        if(id){
            const customer = await connection.query(`SELECT * FROM customers WHERE id = ${id};`);
            if(customer.rows.length === 0){
                return res.sendStatus(404);
            }
            return res.send(customer.rows);
        };
        if(!cpf){
            const customers = await connection.query('SELECT * FROM customers;');
            return res.send(customers.rows); 
        };
        const customers = await connection.query(`SELECT * FROM customers WHERE customers.cpf ILIKE $1;`, [`${cpf}%`]);
        res.send(customers.rows);
    } catch (error) {
        console.log(error);
        res.send(`${error.name}: ${error.message}`);
    }
};