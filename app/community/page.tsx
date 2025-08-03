import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Heart, Star, MessageCircle } from 'lucide-react';

export default function CommunityPage() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Berlin, Germany',
      rating: 5,
      comment: 'Our family absolutely loves the Nordic Pattern set! The quality is amazing and the kids had so much fun playing. Will definitely order more designs.',
      image: '/api/placeholder/50/50'
    },
    {
      name: 'Michael Chen',
      location: 'London, UK',
      rating: 5,
      comment: 'Perfect Easter gift! The packaging was beautiful and the memory game brought our whole family together. Highly recommended!',
      image: '/api/placeholder/50/50'
    },
    {
      name: 'Emma Williams',
      location: 'Amsterdam, Netherlands',
      rating: 5,
      comment: 'The Surprise Me option was amazing! Got such unique and beautiful designs that we never would have picked ourselves.',
      image: '/api/placeholder/50/50'
    }
  ];

  const communityStats = [
    { number: '10,000+', label: 'Happy Families' },
    { number: '50,000+', label: 'Games Created' },
    { number: '4.9/5', label: 'Customer Rating' },
    { number: '95%', label: 'Return Customers' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join Our Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with thousands of families who have created unforgettable memories with EggFinity. Share your stories, see amazing designs, and get inspired!
          </p>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Stories</h2>
            <p className="text-lg text-gray-600">See what our community members are saying about their EggFinity experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-200 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-sm">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Features</h2>
            <p className="text-lg text-gray-600">Coming soon to enhance your EggFinity experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Design Gallery</h3>
              <p className="text-gray-600 text-sm">Share photos of your finished memory games and see others' creations</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Family Stories</h3>
              <p className="text-gray-600 text-sm">Read heartwarming stories about families creating memories together</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Design Contests</h3>
              <p className="text-gray-600 text-sm">Participate in monthly design challenges and win prizes</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Chat</h3>
              <p className="text-gray-600 text-sm">Connect with other families and share tips and experiences</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Stay Connected</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get the latest design releases, community highlights, and exclusive offers delivered to your inbox.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 p-4 rounded-lg border-0 focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-orange-100 mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}