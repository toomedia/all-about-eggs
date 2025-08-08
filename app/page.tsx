
"use client";

import useTranslation from '@/lib/useTranslation';
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
// import FeaturesSection from "@/components/FeaturesSection";
// import ProductsSection from "@/components/ProductsSection";

import TestimonialsSection from "@/components/WhyEggfinityMemory";
// import CTASection from "@/components/CTASection";
// import SetSizeAndCategorySection from "@/components/SetSizeSection";
import HowItWorks from "@/components/HowItWorks";
import AiWaitlistSection from "@/components/AiWaitlistSection";
import FAQSection from "@/components/faqs";
import Footer from "@/components/Footer";
import { Egg, Sparkles, ArrowRight, Star, Heart, ShoppingCart, X, Settings, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Design type
interface Design {
  id: number;
  name: string;
  category: string;
  image: string;
  premium?: boolean;
  featured?: boolean;
  price: number;
}

// Catalog Section Component
const CatalogSection = () => {
  
      const { t } = useTranslation();
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [showModal, setShowModal] = useState(false);

  const featuredDesigns = [
    { id: 1, name: t.catalogSection.easterBunnyDelight,  category: t.Catalog.categoryeaster, image: '/eggs images/A01ED9DF-9438-4E70-B773-60A2C41A82F3.PNG', premium: true, price: 2.99 },
    { id: 2, name: t.catalogSection.springBloomMagic, category: t.Catalog.categoryeaster, image: '/eggs images/A1C8EC8B-F376-4179-9677-5EEB3BED10E1.PNG', featured: true, price: 1.99 },
    { id: 3, name: t.catalogSection.pastelRainbowDream, category: t.Catalog.categoryeaster, image: '/eggs images/78F51BD8-2667-4818-A8EB-F96F9A75C762.PNG', price: 1.49 },
    { id: 4, name: t.catalogSection.floralGardenParty, category: t.Catalog.categoryeaster, image: '/eggs images/985F746C-6F78-4E2A-BD7F-20F49045629D.PNG', premium: true, price: 3.99 },
    { id: 5, name: t.catalogSection.modernGeometry, category: t.Catalog.categoryabstract, image: '/eggs images/2B56B7A1-95A1-4348-BB4E-8C039CF9A5E6 2.PNG', price: 2.49 },
    { id: 6, name: t.catalogSection.gardenSymphony, category: t.Catalog.categorynature, image: '/eggs images/BA7F578A-E63C-4015-A821-32EE5943F69A 2.PNG', featured: true, price: 2.99 },
  ];

  const handleDesignClick = (design: Design) => {
    setSelectedDesign(design);
    setShowModal(true);
  };

  const handleAddToWishlist = () => {
    alert('Wishlist Feature - Coming Soon! 💝\n\nWe\'re working on a beautiful wishlist feature where you can save your favorite designs and share them with friends!');
  };

  const handleBuyNow = () => {
    if (!selectedDesign) return;
    // Redirect to checkout with this design
    window.location.href = `/checkout?designs=${selectedDesign.id}&size=L&count=1`;
  };

  const handleCustomEnhancement = () => {
    alert('Custom Enhancement - Coming Soon! 🎨\n\nWe\'re working on amazing customization features that will let you personalize your designs even further!');
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDesign(null);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-[#f7fcee] via-white to-[#f6e79e]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
    <div className="text-center mb-16">
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 px-4 py-2 rounded-full mb-6">
      <Egg className="w-5 h-5" />
      <span className="font-semibold text-sm">{t.catalogSection.badge}</span>
    </div>
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-manrope">
      {t.catalogSection.title}
    </h2>
    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
      {t.catalogSection.description}
    </p>
  </div>

          {/* Featured Designs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {featuredDesigns.map((design) => (
              <div 
                key={design.id} 
                className="group relative cursor-pointer"
                onClick={() => handleDesignClick(design)}
              >
                <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#f6e79e] transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105">
                  <Image
                    src={design.image}
                    alt={design.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  />
                  
                  Badges
            {design.premium && (
  <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-0.5 sm:gap-1">
    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
    <span className="hidden sm:inline">{t.catalogSection.premium}</span>
    <span className="sm:hidden">P</span>
  </div>
)}

{design.featured && (
  <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-0.5 sm:gap-1">
    <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
    <span className="hidden sm:inline">{t.catalogSection.featured}</span>
    <span className="sm:hidden">F</span>
  </div>
)}


                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
                      <p className="text-white text-[10px] sm:text-xs font-bold truncate">{design.name}</p>
                      <p className="text-gray-200 text-[10px] sm:text-xs">{design.category}</p>
                    </div>
                  </div>

                  {/* Click Indicator */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 sm:p-2">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Categories Preview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {[
              { name: t.Catalog.categoryeaster, icon: '🥚', count: 10, color: 'from-pink-400 to-rose-400', slug: 'easter-eggs' },
              { name: t.Catalog.categoryabstract, icon: '🎨', count: 8, color: 'from-purple-400 to-indigo-400', slug: 'abstract-designs' },
              { name: t.Catalog.categorynature, icon: '🌿', count: 6, color: 'from-green-400 to-emerald-400', slug: 'nature-inspired' },
              { name: t.Catalog.categoryclassics, icon: '✨', count: 4, color: 'from-amber-400 to-orange-400', slug: 'classic-collection' },
            ].map((category) => (
              <Link key={category.name} href={`/presets/${category.slug}`}>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                  <div className="text-center">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${category.color} rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base group-hover:text-gray-700 transition-colors">{category.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-500 transition-colors">{category.count} designs</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#f6e79e]/20 to-[#f7fcee]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-[#f6e79e]/30">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 font-manrope">
                {t.catalogSection.ctaTitle}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
                {t.catalogSection.exploreOrSurprise}
              </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
  {/* First Button */}
  <Link href="/catalog" className="w-full sm:w-auto">
    <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] hover:from-[#f4e285] hover:to-[#f6e79e] text-gray-900 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 w-full sm:w-auto">
      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
      {t.catalogSection.eggsplorebtn}
      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  </Link>

  {/* Second Button */}
  <Link href="/presets/top-10" className="w-full sm:w-auto">
    <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all transform hover:scale-105 hover:bg-white flex items-center justify-center gap-2 w-full sm:w-auto">
      <Star className="w-4 h-4 sm:w-5 sm:h-5" />
      {t.catalogSection.setbtn}
    </button>
  </Link>
</div>

            </div>
          </div>
        </div>
      </section>

      {/* Design Modal */}
      {showModal && selectedDesign && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-sm sm:max-w-md w-full my-8 max-h-[calc(100vh-4rem)] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900 font-manrope">{selectedDesign.name}</h2>
                <button
                  onClick={closeModal}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm text-gray-600">{selectedDesign.category}</span>
                {selectedDesign.premium && (
                  <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span className="hidden sm:inline">
                      {t.catalogSection.premium}
                    </span>
                    <span className="sm:hidden">P</span>
                  </span>
                )}
                {selectedDesign.featured && (
                  <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900">
                    <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span className="hidden sm:inline">
                      {t.catalogSection.featured}
                    </span>
                    <span className="sm:hidden">F</span>
                  </span>
                )}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              {/* Design Image */}
              <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 border-2 border-gray-200">
                <Image
                  src={selectedDesign.image}
                  alt={selectedDesign.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 400px"
                />
              </div>

              {/* Price */}
              <div className="text-center mb-4 sm:mb-6">
                <p className="text-2xl sm:text-3xl font-bold text-[#f6e79e]">€{selectedDesign.price}</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {t.Catalog.perDesign}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 sm:space-y-3">
                <button
                  onClick={handleAddToWishlist}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] hover:from-[#f4e285] hover:to-[#f6e79e] text-gray-900 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                 {t.catalogSection.wishlist}
                </button>
                
                <button
                  onClick={handleBuyNow}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  {t.catalogSection.buyNow}
                </button>
                
                <button
                  onClick={handleCustomEnhancement}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all transform hover:scale-105 hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                  {t.catalogSection.customEnhancement}
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                <p className="text-xs sm:text-sm text-gray-600 text-center">
                  {t.catalogSection.extraInfo}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CatalogSection />
      {/* <FeaturesSection /> */}
      {/* <SetSizeAndCategorySection /> */}
      {/* <ProductsSection /> */}
      <TestimonialsSection />
      <HowItWorks />
      {/* <CTASection /> */}
      <AiWaitlistSection />
      <FAQSection/>
    </div>
  );
}







