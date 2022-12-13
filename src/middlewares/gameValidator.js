import joi from "joi";

const gameSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().uri().required(),
  stockTotal: joi.number().required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().required()
});

export function validateGame(req, res, next) {
  const game = req.body;
  const validation = gameSchema.validate(game);
  if (validation.error) {
    return res.sendStatus(400);
  }
  next();
}