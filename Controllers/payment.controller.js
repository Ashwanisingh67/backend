const paymentService = require('../services/payment.service');
const { validateDentalServiceRequest } = require('../validations/payment.validation');

class PaymentController {
  async createDentalServiceOrder(req, res) {
    try {
      const { error } = validateDentalServiceRequest(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const { serviceId, patientId } = req.body;
      
      const order = await paymentService.createDentalServiceOrder(serviceId, patientId);
      
      res.status(201).json({
        success: true,
        message: 'Dental service order created successfully',
        order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async verifyPayment(req, res) {
    try {
      const { paymentId, orderId } = req.body;
      
      const { verified, payment } = await paymentService.verifyPayment(paymentId, orderId);
      
      if (verified) {
        return res.status(200).json({
          success: true,
          message: 'Payment for dental service verified successfully',
          payment
        });
      }
      
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new PaymentController();