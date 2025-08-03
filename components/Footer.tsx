import { Button } from "@/components/ui/button"
import { Sparkles,Egg,  Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from "lucide-react"

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
      <div className="absolute inset-0 bg-gradient-to-br from-[#f6e79e]/90 to-[#f7fcee]/85" />
      {/* Content */}
      <div className="relative z-10">
              <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#f6e79e] p-2 rounded-xl shadow-inner">
                <Egg className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-poppins">EggFinity</h3>
            </div>
            <p className="text-gray-600 text-base leading-relaxed">
              Creating magical Easter memories through personalized memory games. 
              Where tradition meets innovation, and families come together.
            </p>
            <div className="flex gap-3">
              <div className="p-2 bg-[#f6e79e] rounded-full hover:bg-[#f4e285] transition-colors cursor-pointer">
                <Instagram className="h-4 w-4 text-gray-700" />
              </div>
              <div className="p-2 bg-[#f6e79e] rounded-full hover:bg-[#f4e285] transition-colors cursor-pointer">
                <Twitter className="h-4 w-4 text-gray-700" />
              </div>
              <div className="p-2 bg-[#f6e79e] rounded-full hover:bg-[#f4e79e] transition-colors cursor-pointer">
                <Facebook className="h-4 w-4 text-gray-700" />
              </div>
              <div className="p-2 bg-[#f6e79e] rounded-full hover:bg-[#f4e285] transition-colors cursor-pointer">
                <Youtube className="h-4 w-4 text-gray-700" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Quick Links</h4>
            <div className="space-y-2">
              <a href="/create" className="block text-base text-gray-600 hover:text-[#f6e79e] transition-colors">
                Create Your Egg
              </a>
              <a href="/templates" className="block text-base text-gray-600 hover:text-[#f6e79e] transition-colors">
                Browse Templates
              </a>
              <a href="/how-it-works" className="block text-base text-gray-600 hover:text-[#f6e79e] transition-colors">
                How It Works
              </a>
              <a href="/pricing" className="block text-base text-gray-600 hover:text-[#f6e79e] transition-colors">
                Pricing
              </a>
              <a href="/community" className="block text-base text-gray-600 hover:text-[#f6e79e] transition-colors">
                Community Gallery
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Support</h4>
            <div className="space-y-2">
              <a href="/faq" className="block text-base text-gray-600 hover:text-[#f6e79e] transition-colors">
                FAQ
              </a>
              <a href="/contact" className="block text-base text-gray-600 hover:text-[#f6e79e] transition-colors">
                Contact Us
              </a>
              <a href="/shipping" className="block text-base text-gray-600 hover:text-[#f6e79e] transition-colors">
                Shipping Info
              </a>
              <a href="/returns" className="block text-base text-gray-600 hover:text-[#f6e79e] transition-colors">
                Returns & Refunds
              </a>
              <a href="/accessibility" className="block text-base text-gray-600 hover:text-[#f6e79e] transition-colors">
                Accessibility
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-base text-gray-600">
                <Mail className="h-4 w-4 text-[#f6e79e]" />
                <span>hello@eggmemory.com</span>
              </div>
              <div className="flex items-center gap-2 text-base text-gray-600">
                <Phone className="h-4 w-4 text-[#f6e79e]" />
                <span>1-800-EGG-GAME</span>
              </div>
              <div className="flex items-center gap-2 text-base text-gray-600">
                <MapPin className="h-4 w-4 text-[#f6e79e]" />
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
                <Button size="sm" className="text-xs bg-[#f6e79e] hover:bg-[#f4e285] text-gray-900">Subscribe</Button>
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
              <a href="/privacy" className="hover:text-[#f6e79e] transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-[#f6e79e] transition-colors">Terms of Service</a>
              <a href="/cookies" className="hover:text-[#f6e79e] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  )
}

export default Footer