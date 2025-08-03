"use client";

import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#f7fcee] to-[#f6e79e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-4xl lg:text-5xl font-bold text-[#333] mb-6">
          Ready to Create Your Perfect Easter Memory?
        </h3>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Start designing your unique egg set today and make this Easter unforgettable for your loved ones.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-[#f6e79e] text-gray-900 hover:bg-[#f4e285] px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <Sparkles className="w-5 h-5 mr-2" />
            Start Designing Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button size="lg" className="bg-[#f6e79e] text-gray-900 hover:bg-[#f4e285] px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            Contact Us
          </Button>
        </div>
        
        <div className="flex items-center justify-center space-x-8 mt-12 text-gray-600">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>30-Day Returns</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Premium Quality</span>
          </div>
        </div>
      </div>
    </section>
  );
}
