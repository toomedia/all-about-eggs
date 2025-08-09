"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { ShoppingCart, Egg, Menu, X, User, Heart } from 'lucide-react';
import Link from 'next/link';
import useTranslation from '@/lib/useTranslation';

function HeaderContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [wishlistItems, setWishlistItems] = useState(0);
  const { t, lang, switchLanguage } = useTranslation();

  const navLinks = [
    { label: t.nav.home, href: '/' },
    // { label: t.nav.design, href: '/design' },
    { label: t.nav.catalog, href: '/catalog' },
    { label: t.nav.configurator, href: '/configurator' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadCart = () => {
      // Read cart data from localStorage
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('cart');
        let items = 0;
        let total = 0;
        
        if (savedCart) {
          try {
            const cartItems = JSON.parse(savedCart);
            
            if (Array.isArray(cartItems) && cartItems.length > 0) {
              // Count total items across all cart entries
              items = cartItems.reduce((sum, item) => {
                let designCount = 0;
                
                // Handle different possible structures
                if (item.designs && Array.isArray(item.designs)) {
                  designCount = item.designs.length;
                } else if (item.designs && typeof item.designs === 'number') {
                  designCount = item.designs;
                } else if (item.designCount) {
                  designCount = item.designCount;
                } else if (item.count) {
                  designCount = item.count;
                }
                
                return sum + designCount;
              }, 0);
              
              // Calculate total price
              total = cartItems.reduce((sum, item) => {
                const price = item.price ? parseFloat(item.price) : 0;
                return sum + (isNaN(price) ? 0 : price);
              }, 0);
              
              // If the count is unreasonably high (more than 200), clear the cart
              if (items > 200) {
                console.log('Cart count too high, clearing cart data');
                localStorage.removeItem('cart');
                items = 0;
                total = 0;
              }
            }
          } catch (error) {
            console.error('Error parsing cart data:', error);
            // Clear invalid cart data
            localStorage.removeItem('cart');
          }
        }
        
        setCartItems(items);
        setCartTotal(total);
      }
    };

    const loadWishlist = () => {
      // Read wishlist data from localStorage
      if (typeof window !== 'undefined') {
        const savedWishlist = localStorage.getItem('wishlist');
        let items = 0;
        
        if (savedWishlist) {
          try {
            const wishlistItems = JSON.parse(savedWishlist);
            
            if (Array.isArray(wishlistItems)) {
              items = wishlistItems.length;
            }
          } catch (error) {
            console.error('Error parsing wishlist data:', error);
            // Clear invalid wishlist data
            localStorage.removeItem('wishlist');
          }
        }
        
        setWishlistItems(items);
      }
    };

    loadCart();
    loadWishlist();
    
    if (typeof window !== 'undefined') {
      window.addEventListener("eggfinity-cart-updated", loadCart);
      window.addEventListener("eggfinity-wishlist-updated", loadWishlist);
      return () => {
        window.removeEventListener("eggfinity-cart-updated", loadCart);
        window.removeEventListener("eggfinity-wishlist-updated", loadWishlist);
      };
    }
  }, []);

  return (
    <header className={`backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/20 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity group">
            <div className="bg-[#f6e79e] p-2 rounded-xl shadow-inner group-hover:shadow-md">
              <Egg className="h-6 w-6 text-gray-700 group-hover:scale-110 transition-transform" />
            </div>
            <div className="leading-tight">
              <h1 className="text-xl font-extrabold text-gray-800 group-hover:text-[#f6e79e] transition-colors">Eggception</h1>
              <p className="text-xs text-gray-500 hidden sm:block">{t.nav.gameSubtitle}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map(({ label, href }) => (
              <Link key={label} href={href} className="text-base font-medium hover:text-[#edd040] transition-colors relative group">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f6e79e] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-2">
            {/* Account */}
            <Link href="/account" className="hidden sm:flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded-xl group">
              <User className="h-5 w-5 text-gray-700 group-hover:text-[#f6e79e]" />
              <span className="text-base font-medium text-gray-700 group-hover:text-[#f6e79e]">{t.nav.account}</span>
            </Link>

            {/* Cart */}
            <Link href="/checkout" className="relative flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded-xl group">
              <ShoppingCart className="h-5 w-5 text-gray-700 group-hover:text-[#f6e79e]" />
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-xs text-gray-600">{t.nav.cart}</span>
                <span className="text-base font-semibold text-gray-800">
                  {cartItems > 0 ? `${cartItems} ${t.nav.items}` : t.nav.emptyCart}
                </span>
              </div>

              {cartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#f6e79e] text-gray-900 text-[10px] font-bold rounded-full h-7 w-7 flex items-center justify-center animate-pulse shadow-md">
                  {cartItems}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded-xl group">
              <Heart className="h-5 w-5 text-gray-700 group-hover:text-[#f6e79e]" />
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-xs text-gray-600">{t.nav.wishlist}</span>
                <span className="text-base font-semibold text-gray-800">
                  {wishlistItems > 0 ? `${wishlistItems} ${t.nav.items}` : t.nav.emptyWishlist}
                </span>
              </div>

              {wishlistItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#f6e79e] text-gray-900 text-[10px] font-bold rounded-full h-7 w-7 flex items-center justify-center animate-pulse shadow-md">
                  {wishlistItems}
                </span>
              )}
            </Link>

            {/* Total Price */}
            {cartTotal > 0 && (
              <div className="hidden sm:block text-base font-semibold text-gray-800 bg-white/30 px-3 py-2 rounded-lg border border-gray-200/50">
                €{cartTotal.toFixed(2)}
              </div>
            )}

            {/* Language Switch */}
            <button
              onClick={switchLanguage}
              className="text-sm font-semibold px-3 py-1.5 border border-white/40 rounded-lg hover:bg-white/20 transition-all"
            >
              {lang === 'en' ? t.nav.languages.de : t.nav.languages.en}
            </button>

            {/* Mobile Menu Button */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 rounded-xl hover:bg-white/20">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-2 space-y-1 pb-4 px-2 bg-white/30 rounded-lg border border-gray-200/50">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block text-base font-medium text-gray-700 hover:text-[#f6e79e] py-2 px-3 rounded-lg hover:bg-white/20"
              >
                {label}
              </Link>
            ))}

            <div className="border-t border-gray-200/50 mt-2 pt-2">
              <Link
                href="/account"
                onClick={() => setMenuOpen(false)}
                className="block text-base font-medium text-gray-700 hover:text-[#f6e79e] py-2 px-3 rounded-lg hover:bg-white/20"
              >
                {t.nav.myAccount}
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="block text-base font-medium text-gray-700 hover:text-[#f6e79e] py-2 px-3 rounded-lg hover:bg-white/20"
              >
                {t.nav.wishlist}
              </Link>

              <div className="px-3 py-2">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">{t.nav.cartItems}</span>
                  <span className="font-semibold text-gray-800">{cartItems}</span>
                </div>
                <div className="flex justify-between text-base mt-1">
                  <span className="text-gray-600">{t.nav.wishlist}</span>
                  <span className="font-semibold text-gray-800">{wishlistItems}</span>
                </div>
                {cartTotal > 0 && (
                  <div className="flex justify-between text-base mt-1">
                    <span className="text-gray-600">{t.nav.total}</span>
                    <span className="font-semibold text-[#f6e79e]">€{cartTotal.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<div className="h-20 flex items-center justify-center text-sm text-gray-500">Loading header...</div>}>
      <HeaderContent />
    </Suspense>
  );
}
