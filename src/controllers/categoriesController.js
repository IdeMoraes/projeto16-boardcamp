import { connection } from "../db.js";

export async function insertCategory (req, res){
    const {name} = req.body;
    if(!name){
        res.sendStatus(400);
    }
    try {
        const repeatedNameValidator = await connection.query('SELECT id FROM categories WHERE name=$1', [name]);
        if (repeatedNameValidator.rowCount >= 1) {
          return res.sendStatus(409);
        };
        const result = await connection.query(`INSERT INTO categories (name) VALUES ('${name}');`);
        if (result.rowCount>=1){
            res.sendStatus(201);
        };
    } catch (error) {
        console.log(error);
        res.send(`${error.name}: ${error.message}`);
    }
}

export async function listCategories (req, res){
    try {
        const categories = await connection.query('SELECT * FROM categories;');
        res.send(categories.rows); 
    } catch (error) {
        console.log(error);
        res.send(`${error.name}: ${error.message}`);
    }
};

