import { Router } from "express";
import { insertCategory, listCategories } from "../controllers/categoriesController.js";
import { validateCategory } from "../middlewares/categoryValidator.js";

const categoriesRouter = Router();
categoriesRouter.post('/categories', validateCategory, insertCategory);
categoriesRouter.get('/categories', listCategories);

export default categoriesRouter;