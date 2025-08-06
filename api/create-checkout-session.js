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

    // const lineItems = orderDetails.designs.map((product) => ({
    //   pr
  const exchangeRate = 3.67; // 1 USD = 3.67 AED

const lineItems = orderDetails.designs.map((product) => ({
  price_data: {
    currency: "usd",
    product_data: {
      name: product.name,
    },
    unit_amount: Math.round((totalPrice / exchangeRate) * 100 / orderDetails.designs.length), // amount in cents
  },
  quantity: 1,
}));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      
      success_url: `https://all-about-eggs.vercel.app/success?total=${totalPrice}&cards=${orderDetails.designs.length}&size=${orderDetails.size}`,

      cancel_url: "https://all-about-eggs.vercel.app/cancel",
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



// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import Stripe from 'stripe';

// dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY , {
//   apiVersion: '2024-04-10',
// });

// const app = express();

// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// app.use(express.json());

// app.post("/api/create-checkout-session", async (req, res) => {
//   const { orderDetails } = req.body;
//   console.log("🚀 ~ app.post ~ orderDetails:", orderDetails);

//   try {
//     const totalPriceAED = parseFloat(orderDetails.total);
//     const exchangeRate = 3.67; // 1 USD = 3.67 AED
//     const totalPriceUSD = totalPriceAED / exchangeRate;

//     const lineItems = orderDetails.designs.map((product) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: product.name,
//         },
//         unit_amount: Math.round((totalPriceUSD * 100) / orderDetails.designs.length), 
//       },
//       quantity: 1,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `https://all-about-eggs.vercel.app/success?total=${totalPriceAED}&cards=${orderDetails.designs.length}&size=${orderDetails.size}`,
//       cancel_url: "https://all-about-eggs.vercel.app/cancel",
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(` Server running on port ${PORT}`);
// });
