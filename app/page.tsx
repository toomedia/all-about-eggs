

"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductsSection from "@/components/ProductsSection";
import TestimonialsSection from "@/components/WhyEggfinityMemory";
import CTASection from "@/components/CTASection";
import SetSizeAndCategorySection from "@/components/SetSizeSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [cartItems, setCartItems] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  return (
    <div className="min-h-screen">
      <Header cartItems={cartItems} cartTotal={cartTotal} />
      <HeroSection />
      <FeaturesSection />
      <SetSizeAndCategorySection />
      <ProductsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
