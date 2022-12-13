import { Router } from "express";
import { insertCustomer, updateCustomer, listCustomers } from "../controllers/customersController.js";
import { validateCustomer } from "../middlewares/customerValidator.js";

const customersRouter = Router();
customersRouter.post('/customers', validateCustomer, insertCustomer);
customersRouter.put('/customers/:id', validateCustomer, updateCustomer);
customersRouter.get('/customers', listCustomers);
customersRouter.get('/customers/:id', listCustomers);

export default customersRouter;