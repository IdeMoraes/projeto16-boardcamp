import { connection } from "../db.js";

export async function insertGame (req, res){
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body;
    if(!name || !image || !stockTotal || !categoryId || !pricePerDay){
        return res.sendStatus(400);
    }
    try {
        const categoryIdValidator = await connection.query('SELECT id FROM categories WHERE id = $1', [categoryId]);
        if (categoryIdValidator.rowCount === 0) {
          return res.sendStatus(400);
        };
        const repeatedGameValidator = await connection.query('SELECT id FROM games WHERE name=$1', [name]);
        if (repeatedGameValidator.rowCount >= 1) {
          return res.sendStatus(409);
        };
        const result = await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);`, [name, image, stockTotal, categoryId, pricePerDay]);
        if (result.rowCount>=1){
            res.sendStatus(201);
        };
    } catch (error) {
        console.log(error);
        res.send(`${error.name}: ${error.message}`);
    }
};

export async function listGames (req, res){
    const name = req.query.name;
    try {
        if(!name){
            const games = await connection.query(`SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id`);
            return res.send(games.rows);
        }
        const games = await connection.query(`SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.name ILIKE $1;`, [`${name}%`]);
        res.send(games.rows);
    } catch (error) {
        console.log(error);
        res.send(`${error.name}: ${error.message}`);
    }
};