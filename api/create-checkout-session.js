import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe'; 

dotenv.config(); 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(cors({
  origin: '*',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());

app.post("/api/create-checkout-session", async (req, res) => {
  const { orderDetails } = req.body;
  console.log("🚀 ~ app.post ~ products:", orderDetails);

  try {
    const totalPrice = parseFloat(orderDetails.total);

    const lineItems = orderDetails.designs.map((product) => ({
      price_data: {
        currency: "AED",
        product_data: { name: product.name },
        unit_amount: Math.round((totalPrice * 100) / orderDetails.designs.length),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      
      success_url: `http://all-about-eggs.vercel.app/success?total=${totalPrice}&cards=${orderDetails.designs.length}&size=${orderDetails.size}`,

      cancel_url: "http://all-about-eggs.vercel.app/cancel",
    });

    res.json({ url: session.url }); 
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
