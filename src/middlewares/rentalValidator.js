import joi from "joi";

const rentalsSchema = joi.object({
  customerId: joi.number().required(),
  gameId: joi.number().required(),
  daysRented: joi.number().min(1).required()
});

export function validateRental(req, res, next) {
  const rental = req.body;
  const validation = rentalsSchema.validate(rental);
  if (validation.error) {
    return res.sendStatus(400);
  }
  next();
}