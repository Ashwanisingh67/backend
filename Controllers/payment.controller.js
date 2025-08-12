const { log } = require('console');
const Subscription = require('../Models/service.model');
const razorpay = require('../config/razorpay.config');
const { validateSubscriptionPayment } = require('../validations/payment.validation');
const crypto = require('crypto');

// Hardcoded plans matching your exact requirements
const HARDCODED_PLANS = {
  BASIC: {
    id: 'basic-plan-hardcoded',
    name: 'Basic',
    price: 1100,
    features: {
      clinicListing: {
        clinicCount: 1,
        verifiedBadge: true,
        priorityInSearch: false,
        googleReviews: false
      },
      instagram: {
        postsPerMonth: 1,
        stories: false,
        adBoost: false
      },
      youtube: {
        videoListing: false,
        videosPerMonth: 0
      },
      emailMarketing: {
        newsletters: false,
        monthlyEmails: 0
      }
    }
  },
  GROWTH: {
    id: 'growth-plan-hardcoded',
    name: 'Growth',
    price: 2200,
    features: {
      clinicListing: {
        clinicCount: 1,
        verifiedBadge: true,
        priorityInSearch: true,
        googleReviews: true
      },
      instagram: {
        postsPerMonth: 2,
        stories: true,
        adBoost: true
      },
      youtube: {
        videoListing: true,
        videosPerMonth: 0
      },
      emailMarketing: {
        newsletters: true,
        monthlyEmails: 1
      }
    }
  },
  PREMIUM: {
    id: 'premium-plan-hardcoded',
    name: 'Premium',
    price: 3200,
    features: {
      clinicListing: {
        clinicCount: 2,
        verifiedBadge: true,
        priorityInSearch: true,
        googleReviews: true
      },
      instagram: {
        postsPerMonth: 2,
        stories: true,
        adBoost: true
      },
      youtube: {
        videoListing: true,
        videosPerMonth: 1
      },
      emailMarketing: {
        newsletters: true,
        monthlyEmails: 1
      }
    }
  }
};

class PaymentController {
  async createSubscriptionOrder(req, res) {
    try {
      // 1. Validate request
      const { error } = validateSubscriptionPayment(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const { planType, clinicId } = req.body;

      // 2. Get plan from hardcoded data
      const plan = HARDCODED_PLANS[planType.toUpperCase()];
      if (!plan) {
        return res.status(404).json({ error: 'Invalid plan type' });
      }

      // 3. Create Razorpay order
      const options = {
        amount: plan.price * 100, // Convert to paise
        currency: 'INR',
        receipt: `sub_${clinicId}_${Date.now()}`,
        payment_capture: 1,
        notes: {
          planType: plan.name,
          clinicId: clinicId
        }
      };
console.log(options);

      const order = await razorpay.orders.create(options);

      // 4. Create subscription record
      const subscription = new Subscription({
        clinicId,
        planType: plan.name,
        planDetails: plan,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        status: 'pending',
        paymentId: order.id,
        amount: plan.price
      });

      await subscription.save();

      // 5. Return response
      res.status(201).json({
        success: true,
        order,
        subscriptionId: subscription._id,
        planDetails: plan
      });

    } catch (error) {
      console.error('Subscription creation error:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async verifySubscriptionPayment(req, res) {
    try {
      const { paymentId, orderId, subscriptionId } = req.body;

      // 1. Verify payment with Razorpay
      const payment = await razorpay.payments.fetch(paymentId);
      if (!payment || payment.status !== 'captured') {
        return res.status(400).json({
          success: false,
          message: 'Payment verification failed'
        });
      }

      // 2. Update subscription status
      const subscription = await Subscription.findByIdAndUpdate(
        subscriptionId,
        {
          status: 'active',
          paymentId,
          startDate: new Date(),
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          nextBillingDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
        },
        { new: true }
      );

      if (!subscription) {
        return res.status(404).json({ error: 'Subscription not found' });
      }

      // 3. Return success response
      res.status(200).json({
        success: true,
        message: 'Subscription activated successfully',
        subscription
      });

    } catch (error) {
      console.error('Payment verification error:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async handleWebhook(req, res) {
    try {
      // 1. Verify webhook signature
      const signature = req.headers['x-razorpay-signature'];
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest('hex');

      if (signature !== expectedSignature) {
        return res.status(400).json({ error: 'Invalid signature' });
      }

      // 2. Handle payment captured event
      if (req.body.event === 'payment.captured') {
        const payment = req.body.payload.payment.entity;
        
        await Subscription.findOneAndUpdate(
          { paymentId: payment.order_id },
          { 
            status: 'active',
            paymentId: payment.id,
            startDate: new Date(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
          }
        );
      }

      res.status(200).json({ success: true });

    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PaymentController();