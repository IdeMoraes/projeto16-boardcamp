import joi from "joi";

const categorySchema = joi.object({
  name: joi.string().required()
});

export function validateCategory(req, res, next) {
  const category = req.body;
  const validation = categorySchema.validate(category);
  if (validation.error) {
    return res.sendStatus(400);
  }
  next();
}