import { Router } from "express";
import { insertCategories, listCategories } from "../controllers/categoriesController.js";

const categoriesRouter = Router();
categoriesRouter.post('/categories', insertCategories);
categoriesRouter.get('/categories', listCategories);

export default categoriesRouter;