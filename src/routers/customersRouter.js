import { Router } from "express";
import { insertCustomer, updateCustomer, listCustomers } from "../controllers/customersController.js";

const customersRouter = Router();
customersRouter.post('/customers', insertCustomer);
customersRouter.put('/customers/:id', updateCustomer);
customersRouter.get('/customers', listCustomers);
customersRouter.get('/customers/:id', listCustomers);

export default customersRouter;