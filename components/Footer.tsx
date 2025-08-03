import { Button } from "@/components/ui/button"
import { Sparkles, Egg, Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="relative border-t border-gray-200 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{
          backgroundImage: `url('https://cdn.mos.cms.futurecdn.net/TjtZ88nogxegChtJxdis3m-1200-80.jpg')`
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t to-[#f6e79e]/90 from-[#f6e79e]/40" />
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-[#f6e79e] p-2 rounded-xl shadow-inner">
                  <Egg className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-manrope">EggFinity</h3>
              </div>
              <p className="text-gray-600 text-base leading-relaxed">
                Creating magical Easter memories through personalized memory games. 
                Where tradition meets innovation, and families come together.
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-[#f6e79e] rounded-full hover:bg-[#f4e285] transition-colors cursor-pointer"
                >
                  <Instagram className="h-4 w-4 text-gray-700" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-[#f6e79e] rounded-full hover:bg-[#f4e285] transition-colors cursor-pointer"
                >
                  <Twitter className="h-4 w-4 text-gray-700" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-[#f6e79e] rounded-full hover:bg-[#f4e285] transition-colors cursor-pointer"
                >
                  <Facebook className="h-4 w-4 text-gray-700" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-base text-gray-600 hover:text-[#f6e79e] transition-colors">
                  Home
                </Link>
                <Link href="/catalog" className="block text-base text-gray-600 hover:text-[#f6e79e] transition-colors">
                  Create Your Egg
                </Link>
                <Link href="/checkout" className="block text-base text-gray-600 hover:text-[#f6e79e] transition-colors">
                  Checkout
                </Link>
                <Link href="/presets/top-10" className="block text-base text-gray-600 hover:text-[#f6e79e] transition-colors">
                  Preset Collections
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Support</h4>
              <div className="space-y-2">
                <a 
                  href="mailto:hello@eggfinity.com" 
                  className="block text-base text-gray-600 hover:text-[#f6e79e] transition-colors"
                >
                  Contact Us
                </a>
                <a 
                  href="tel:+1-800-EGG-GAME" 
                  className="block text-base text-gray-600 hover:text-[#f6e79e] transition-colors"
                >
                  Call Support
                </a>
                <span className="block text-base text-gray-600">
                  Shipping: 3-5 business days
                </span>
                <span className="block text-base text-gray-600">
                  Returns: 30 days
                </span>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Get in Touch</h4>
              <div className="space-y-3">
                <a 
                  href="mailto:hello@eggfinity.com" 
                  className="flex items-center gap-2 text-base text-gray-600 hover:text-[#f6e79e] transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>hello@eggfinity.com</span>
                </a>
                <a 
                  href="tel:+1-800-EGG-GAME" 
                  className="flex items-center gap-2 text-base text-gray-600 hover:text-[#f6e79e] transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>1-800-EGG-GAME</span>
                </a>
                <div className="flex items-center gap-2 text-base text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>Easter Valley, Spring Gardens</span>
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="mt-6 p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-900 mb-2">Easter Updates</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Get seasonal templates and special offers!
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 text-xs bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f6e79e]"
                  />
                  <Button size="sm" className="text-xs bg-[#f6e79e] hover:bg-[#f4e285] text-gray-900">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Easter Elements */}
          <div className="relative">
            <div className="absolute -top-8 left-1/4 animate-pulse">
              <div className="w-8 h-8 bg-[#f6e79e] rounded-full opacity-30"></div>
            </div>
            <div className="absolute -top-12 right-1/3 animate-pulse delay-1000">
              <div className="w-6 h-6 bg-[#f7fcee] rounded-full opacity-40"></div>
            </div>
            <div className="absolute -top-6 right-1/4 animate-bounce delay-500">
              <Heart className="h-4 w-4 text-[#f6e79e] opacity-50" />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-base text-gray-600">
                © 2024 EggFinity. Made with <Heart className="inline h-4 w-4 text-[#f6e79e] mx-1" /> for families everywhere.
              </div>
              <div className="flex gap-6 text-sm text-gray-600">
                <a 
                  href="/privacy" 
                  className="hover:text-[#f6e79e] transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Privacy Policy - Coming Soon!');
                  }}
                >
                  Privacy Policy
                </a>
                <a 
                  href="/terms" 
                  className="hover:text-[#f6e79e] transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Terms of Service - Coming Soon!');
                  }}
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer