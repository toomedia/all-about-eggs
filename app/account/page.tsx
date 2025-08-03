"use client";

import React from 'react';
import { Egg, Sparkles, User, Settings, Heart, ShoppingBag, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fcee] via-white to-[#f6e79e]/20">
      <Header cartItems={0} cartTotal={0} />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#f6e79e] to-[#f4e285] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <User className="w-12 h-12 text-gray-700" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-manrope">
              My Account
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage your EggFinity account, view orders, and customize your experience
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-12 text-center">
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full mb-8">
              <Clock className="w-5 h-5" />
              <span className="font-bold">Coming Soon</span>
              <Sparkles className="w-5 h-5" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-manrope">
              Account Features Are Under Development
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We're working hard to bring you amazing account features! Soon you'll be able to manage your orders, 
              save your favorite designs, and track your Easter memory game collection.
            </p>

            {/* Feature Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-[#f6e79e]/20 to-[#f7fcee]/30 rounded-2xl p-6 border border-[#f6e79e]/30">
                <div className="w-12 h-12 bg-[#f6e79e] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Order History</h3>
                <p className="text-sm text-gray-600">Track all your past orders and reorder your favorites</p>
              </div>

              <div className="bg-gradient-to-br from-[#f6e79e]/20 to-[#f7fcee]/30 rounded-2xl p-6 border border-[#f6e79e]/30">
                <div className="w-12 h-12 bg-[#f6e79e] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Favorite Designs</h3>
                <p className="text-sm text-gray-600">Save and organize your favorite egg designs</p>
              </div>

              <div className="bg-gradient-to-br from-[#f6e79e]/20 to-[#f7fcee]/30 rounded-2xl p-6 border border-[#f6e79e]/30">
                <div className="w-12 h-12 bg-[#f6e79e] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Account Settings</h3>
                <p className="text-sm text-gray-600">Manage your profile and preferences</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/catalog"
                className="px-8 py-4 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] hover:from-[#f4e285] hover:to-[#f6e79e] text-gray-900 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Egg className="w-5 h-5" />
                Browse Designs
              </Link>
              <Link 
                href="/"
                className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 hover:bg-white flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Back to Home
              </Link>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-12 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-200/30">
              <h3 className="font-bold text-gray-900 mb-3">Get Notified When It's Ready!</h3>
              <p className="text-gray-600 mb-4">Be the first to know when account features launch</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f6e79e] text-sm"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl font-semibold text-sm transition-all transform hover:scale-105">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 