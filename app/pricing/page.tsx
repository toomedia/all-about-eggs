import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Check, Star } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'L',
      description: 'Perfect for couples or small families',
      cards: 24,
      price: 29.99,
      features: [
        '24 memory cards',
        '12 unique designs',
        'Premium cardstock',
        'Free shipping over €50',
        '30-day guarantee'
      ],
      popular: false
    },
    {
      name: 'XL',
      description: 'Most popular for families',
      cards: 48,
      price: 49.99,
      features: [
        '48 memory cards',
        '24 unique designs',
        'Premium cardstock',
        'Free shipping included',
        '30-day guarantee',
        'Gift box included'
      ],
      popular: true
    },
    {
      name: 'XXL',
      description: 'Ultimate experience for large groups',
      cards: 72,
      price: 69.99,
      features: [
        '72 memory cards',
        '36 unique designs',
        'Premium cardstock',
        'Free shipping included',
        '30-day guarantee',
        'Deluxe gift box',
        'Extra design variations'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header cartItems={0} cartTotal={0} />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect size for your family. All sets include premium materials, beautiful designs, and our satisfaction guarantee.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                  plan.popular 
                    ? 'border-orange-500 ring-4 ring-orange-100' 
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    €{plan.price}
                  </div>
                  <p className="text-sm text-gray-600">{plan.cards} cards total</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/catalog"
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-center block transition-colors ${
                    plan.popular
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about our pricing and products</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What's included in each set?</h3>
              <p className="text-gray-600">
                Each set includes the specified number of memory cards with unique egg designs, premium cardstock material, 
                and a beautiful presentation box. Larger sets include additional design variations and upgraded packaging.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How long does shipping take?</h3>
              <p className="text-gray-600">
                We use print-on-demand technology to ensure the freshest quality. Production takes 3-5 business days, 
                followed by 2-3 days for shipping within Europe and 5-7 days internationally.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I customize the designs?</h3>
              <p className="text-gray-600">
                Absolutely! You can choose specific motifs from our catalog, use our "Surprise Me" feature for curated selections, 
                or wait for our upcoming AI design tool to create completely custom designs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What if I'm not satisfied?</h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee. If you're not completely satisfied with your order, 
                contact us for a full refund, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}