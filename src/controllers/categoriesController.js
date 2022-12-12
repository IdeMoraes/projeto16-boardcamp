import { connection } from "../db.js";

export async function listCategories (req, res){
    try {
        const categories = await connection.query('SELECT * FROM categories;');
        res.send(categories.rows); 
    } catch (error) {
        console.log(error);
        res.send(`${error.name}: ${error.message}`);
    }
};

export async function insertCategories (req, res){
    const {name} = req.body;
    if(!name){
        res.sendStatus(400);
    }
    try {
        const result = await connection.query(`INSERT INTO categories (name) VALUES ('${name}');`);
        if (result.rowCount>=1){
            res.sendStatus(201);
        }
    } catch (error) {
        console.log(error);
        res.send(`${error.name}: ${error.message}`);
    }
}