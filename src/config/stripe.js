require('dotenv').config(); // Load biến môi trường

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // ✅ Truyền API Key vào

module.exports = stripe;