const razorpay = require('../config/razorpay.config');
const { CURRENCY } = require('../config/constants');
const { getServiceById } = require('../Models/service.model');

class PaymentService {
    async createDentalServiceOrder(serviceId, patientId) {
    try {
      if (!serviceId || !patientId) {
        throw new Error('Missing serviceId or patientId');
      }
      // console.log()

      const service = getServiceById(serviceId);
      
      if (!service.price || isNaN(service.price)) {
        throw new Error(`Invalid price for service: ${service.price}`);
      }

      const options = {
        amount: service.price * 100,
        currency: CURRENCY,
        receipt: `dental_${Date.now()}_${patientId.slice(0, 5)}`,
        notes: {
          serviceId,
          patientId,
          serviceName: service.name
        }
      };

      const order = await razorpay.orders.create(options);
      return {
        ...order,
        serviceDetails: {
          name: service.name,
          price: service.price
        }
      };
    } catch (error) {
      console.error('Payment Service Error:', error);
      throw new Error(error.message || 'Failed to create payment order');
    }
  }

  async verifyPayment(paymentId, orderId) {
    try {
      const payment = await razorpay.payments.fetch(paymentId);
      
      if (payment.order_id === orderId && payment.status === 'captured') {
        return { verified: true, payment };
      }
      return { verified: false, payment };
    } catch (error) {
      throw new Error(`Payment verification error: ${error.message}`);
    }
  }
}

module.exports = new PaymentService();