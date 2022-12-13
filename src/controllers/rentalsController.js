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
    const {id} = req.params;
    try {
        const rental = await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
        if(rental.rowCount === 0){
            return res.sendStatus(404);
        };
        const {returnDate, rentDate, daysRented, originalPrice} = rental.rows[0];
        if(returnDate){
            return res.sendStatus(400);
        };
        const differenceInMillisecond= new Date().getTime() - new Date(rentDate).getTime();
        const differenceInDays = Math.floor(differenceInMillisecond / (24 * 3600 * 1000));
        let delayFee = 0;
        if (differenceInDays > daysRented) {
            delayFee = (differenceInDays - daysRented) * originalPrice;
        };
        const result = await connection.query(`UPDATE rentals SET "returnDate" = NOW(), "delayFee" = $1 WHERE id = $2`, [delayFee, id]);
        if (result.rowCount>=1){
            res.sendStatus(200);
        };
    } catch (error) {
        console.log(error);
        res.send(`${error.name}: ${error.message}`);
    }
};

export async function deleteRental (req, res){
    const {id} = req.params;
    try {
        const rental = await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
        if(rental.rowCount === 0) {
            return res.sendStatus(404);
        };
        const {returnDate} = rental.rows[0];
        if(!returnDate){
            return res.sendStatus(400); 
        };
        const result = await connection.query(`DELETE FROM rentals WHERE id = $1`, [id]);
        if (result.rowCount>=1){
            res.sendStatus(200);
        };
    } catch (error) {
        console.log(error);
        res.send(`${error.name}: ${error.message}`);
    }
};

export async function listRentals (req, res){
    try {
        const rentals = await connection.query(`
        SELECT rentals.*,
        customers.id AS "customer.id", customers.name AS "customer.name",
        games.id AS "game.id", games.name AS "game.name", games."categoryId" AS "game.categoryId",
        categories.name AS "game.categoryName"
        FROM customers
        JOIN rentals ON customers.id = rentals."customerId"
        JOIN games ON games.id = rentals."gameId"
        JOIN categories ON games."categoryId" = categories.id;
        `);
        const formattedList = rentals.rows.map((rental)=>({
            id: rental.id,
            customerId: rental.customerId,
            gameId: rental.gameId,
            rentDate: rental.rentDate,
            originalPrice: rental.originalPrice,
            delayFee: rental.delayFee,
            customer:{
                id: rental['customer.id'],
                name: rental['customer.name']
            },
            game:{
                id: rental['game.id'],
                name: rental['game.name'],
                categoryId: rental['game.categoryId'],
                categoryName: rental['game.categoryName']
            }
        }));
        res.send(formattedList);
    } catch (error) {
        console.log(error);
        res.send(`${error.name}: ${error.message}`);
    }
};