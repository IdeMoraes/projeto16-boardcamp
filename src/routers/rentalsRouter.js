import { Router } from "express";
import { deleteRental, finishRental, insertRental, listRentals } from "../controllers/rentalsController.js";
import { validateRental } from "../middlewares/rentalValidator.js";


const rentalsRouter = Router();
rentalsRouter.post('/rentals', validateRental, insertRental);
rentalsRouter.post('/rentals/:id/return', finishRental);
rentalsRouter.delete('/rentals/:id', deleteRental);
rentalsRouter.get('/rentals', listRentals);

export default rentalsRouter;