const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Razorpay = require("razorpay");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Route to create a payment order
router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const { amount } = req.body;

    // Create an order
    const options = {
      amount: amount * 100, // amount in paise (1 INR = 100 paise)
      currency: "INR",
      receipt: "receipt#1",
    };

    try {
      const order = await razorpay.orders.create(options);
      res.status(200).json({
        success: true,
        order_id: order.id,
        currency: order.currency,
        amount: order.amount,
        key_id: process.env.RAZORPAY_KEY_ID,
      });
    } catch (error) {
      next(error);
    }
  })
);

// Route to get Razorpay API key (not recommended for security reasons)
router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ tripeApikey: process.env.RAZORPAY_KEY_ID });
  })
);

module.exports = router;
