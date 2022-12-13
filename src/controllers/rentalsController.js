import { connection } from "../db.js";

export async function insertRental (req, res){
    const {customerId, gameId, daysRented} = req.body;
    console.log(customerId);
    try {
        const customer = await connection.query(`SELECT id FROM customers WHERE id = $1;`, [customerId]);
        if (customer.rowCount === 0) {
            return res.sendStatus(400);
        };
        const game = await connection.query(`SELECT * FROM games WHERE id=$1`, [gameId]);
        if (game.rowCount === 0) {
            return res.sendStatus(400);
        };
        const rented = await connection.query(`SELECT id FROM rentals WHERE "gameId" = $1 AND "returnDate" IS null`, [gameId]);
        if (rented.rowCount >= 1) {
            if (game.rows[0].stockTotal === rented.rowCount) {
                return res.sendStatus(400);
            }
        };
        const originalPrice = daysRented * game.rows[0].pricePerDay;
        const result = await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, NOW(), $3, null, $4, null); `, [customerId, gameId, daysRented, originalPrice]);
        if (result.rowCount>=1){
            res.sendStatus(201);
        };
    } catch (error) {
        console.log(error);
        res.send(`${error.name}: ${error.message}`);
    }
};

export async function finishRental (req, res){
    try {
    } catch (error) {
        console.log(error);
        res.send(`${error.name}: ${error.message}`);
    }
};

export async function deleteRental (req, res){
    try {
    } catch (error) {
        console.log(error);
        res.send(`${error.name}: ${error.message}`);
    }
};

export async function listRentals (req, res){
    try {
    } catch (error) {
        console.log(error);
        res.send(`${error.name}: ${error.message}`);
    }
};