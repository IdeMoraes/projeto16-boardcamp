import joi from "joi";

const customerSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().min(10).max(11).required(),
  cpf: joi.string().length(11).required(),
  birthday: joi.date().required(),
});

export function validateCustomer(req, res, next) {
  const customer = req.body;
  const validation = customerSchema.validate(customer);
  if (validation.error) {
    return res.sendStatus(409);
  }
  next();
};