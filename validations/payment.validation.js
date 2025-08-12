const Joi = require('joi');

const subscriptionPaymentSchema = Joi.object({
  planType: Joi.string().valid('basic', 'growth', 'premium').required()
    .messages({
      'any.required': 'Plan type is required',
      'string.empty': 'Plan type cannot be empty',
      'any.only': 'Plan type must be basic, growth, or premium'
    }),
  clinicId: Joi.string().required()
    .messages({
      'any.required': 'Clinic ID is required',
      'string.empty': 'Clinic ID cannot be empty'
    })
});

module.exports = {
  validateSubscriptionPayment: (data) => subscriptionPaymentSchema.validate(data, { abortEarly: false })
};