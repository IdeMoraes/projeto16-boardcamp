import { Router } from "express";
import { insertGame, listGames } from "../controllers/gamesController.js";

const gamesRouter = Router();
gamesRouter.post('/games', insertGame);
gamesRouter.get('/games', listGames);

export default gamesRouter;