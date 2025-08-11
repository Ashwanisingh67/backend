const Joi = require('joi');

const dentalServiceSchema = Joi.object({
  serviceId: Joi.string().valid(
    'dental_cleaning',
    'dental_filling',
    'dental_root_canal'
  ).required(),
  patientId: Joi.string().required()
});

const verifyPaymentSchema = Joi.object({
  paymentId: Joi.string().required(),
  orderId: Joi.string().required()
});

module.exports = {
  validateDentalServiceRequest: (data) => dentalServiceSchema.validate(data),
  validateVerification: (data) => verifyPaymentSchema.validate(data)
};// console.log()