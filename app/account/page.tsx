"use client";

import useTranslation from '@/lib/useTranslation';
import React from 'react';
import { Egg, Sparkles, User, Settings, Heart, ShoppingBag, Clock } from 'lucide-react';
import Link from 'next/link';
import Wishlist from '@/components/wishlist';

export default function AccountPage() {
   const { t } = useTranslation();
   
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fcee] via-white to-[#f6e79e]/20">      
      {/* Hero Section */}
      <section className="pt-16 sm:pt-18 md:pt-20 pb-12 sm:pb-14 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#f6e79e] to-[#f4e285] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <User className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-700" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 font-manrope leading-tight">
              {t.account.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              {t.account.subtitle}
            </p>
          </div>
        </div>
      </section>
  <Wishlist/>
      {/* Coming Soon Section */}
      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200/50 p-6 sm:p-8 md:p-12 text-center">
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-bold text-sm sm:text-base">{t.account.comingSoon}</span>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 font-manrope">
             {t.account.featuresTitle}
            </h2>
            
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
             {t.account.featuresDesc}
            </p>

            {/* Feature Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
              <div className="bg-gradient-to-br from-[#f6e79e]/20 to-[#f7fcee]/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#f6e79e]/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f6e79e] rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{t.account.ordersTitle}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{t.account.ordersDesc}</p>
              </div>

              <div className="bg-gradient-to-br from-[#f6e79e]/20 to-[#f7fcee]/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#f6e79e]/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f6e79e] rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">
                  {t.account.favoritesTitle}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {t.account.favoritesDesc}
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#f6e79e]/20 to-[#f7fcee]/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#f6e79e]/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f6e79e] rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">
                  {t.account.settingsTitle}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {t.account.settingsDesc}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link 
                href="/catalog"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] hover:from-[#f4e285] hover:to-[#f6e79e] text-gray-900 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Egg className="w-4 h-4 sm:w-5 sm:h-5" />
                {t.account.browseDesigns}
              </Link>
              <Link 
                href="/"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all transform hover:scale-105 hover:bg-white flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                {t.account.backToHome}
              </Link>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8 sm:mt-10 md:mt-12 p-4 sm:p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl sm:rounded-2xl border border-purple-200/30">
              <h3 className="font-bold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                {t.account.newsletterTitle}
              </h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
                {t.account.newsletterDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t.account.emailPlaceholder}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f6e79e] text-xs sm:text-sm"
                />
                <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all transform hover:scale-105">
                  {t.account.notifyMe}
                </button>
              </div>
            </div>
          </div>
        </div>
      
      </section>
    </div>
  );
} 
