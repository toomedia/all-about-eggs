import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Package, Palette, CreditCard, Truck, Award, Users } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: 'Choose Your Size',
      description: 'Select the perfect set size for your family',
      details: ['L: 24 cards (€29.99)', 'XL: 48 cards (€49.99)', 'XXL: 72 cards (€69.99)'],
      icon: Package
    },
    {
      number: 2,
      title: 'Pick Your Motifs',
      description: 'Browse our catalog or let us surprise you',
      details: ['100+ unique designs', 'Multiple categories', '"Surprise Me" option available'],
      icon: Palette
    },
    {
      number: 3,
      title: 'Secure Checkout',
      description: 'Complete your order with trusted payment',
      details: ['PayPal & Stripe accepted', 'SSL encrypted', '30-day money back guarantee'],
      icon: CreditCard
    },
    {
      number: 4,
      title: 'We Print & Ship',
      description: 'Professional printing and fast delivery',
      details: ['Print-on-demand quality', 'Free shipping over €50', '3-5 business days production'],
      icon: Truck
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header cartItems={0} cartTotal={0} />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Creating your personalized Easter egg memory game is simple and fun. Follow these easy steps to get started.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.number} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 text-white rounded-full text-2xl font-bold mb-6">
                    {step.number}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h2>
                  <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="w-80 h-80 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center">
                    <step.icon className="w-32 h-32 text-orange-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Families Love EggFinity</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              More than just a game – it's about creating lasting memories and bringing families together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Materials</h3>
              <p className="text-gray-600">
                High-quality cardstock with UV-resistant printing ensures your memories last for years.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Family Fun</h3>
              <p className="text-gray-600">
                Perfect for all ages – create bonding moments that bring generations together.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Unique Designs</h3>
              <p className="text-gray-600">
                Every set is personalized with your chosen motifs, making each game truly one-of-a-kind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who have already created their perfect Easter memories with EggFinity.
          </p>
          <Link 
            href="/catalog"
            className="inline-flex items-center bg-white text-orange-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-5 h-5 mr-2" />
            Start Creating Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}