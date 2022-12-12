import { Router } from "express";
import { insertCategories, listCategories } from "../controllers/categoriesController.js";

const categoriesRouter = Router();
categoriesRouter.get('/categories', listCategories);
categoriesRouter.post('/categories', insertCategories);

export default categoriesRouter;