import { Router } from "express";
import { insertGame, listGames } from "../controllers/gamesController.js";
import { validateGame } from "../middlewares/gameValidator.js";

const gamesRouter = Router();
gamesRouter.post('/games', validateGame, insertGame);
gamesRouter.get('/games', listGames);

export default gamesRouter;