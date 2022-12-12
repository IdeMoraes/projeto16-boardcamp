import { Router } from "express";
import { insertCategory, listCategories } from "../controllers/categoriesController.js";

const categoriesRouter = Router();
categoriesRouter.post('/categories', insertCategory);
categoriesRouter.get('/categories', listCategories);

export default categoriesRouter;