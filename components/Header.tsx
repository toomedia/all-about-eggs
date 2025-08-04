"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Egg, Menu, X, User } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadCart = () => {
      const items = parseInt(localStorage.getItem("eggfinity-cart-items") || "0");
      const total = parseFloat(localStorage.getItem("eggfinity-cart-total") || "0");
      setCartItems(isNaN(items) ? 0 : items);
      setCartTotal(isNaN(total) ? 0 : total);
    };

    loadCart();
    window.addEventListener("eggfinity-cart-updated", loadCart);
    return () => window.removeEventListener("eggfinity-cart-updated", loadCart);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Design Egg', href: '/design' },
    { label: 'Catalog', href: '/catalog' },
  ];

  return (
    <header className={`backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/20 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-4 hover:opacity-80 transition-opacity group">
            <div className="bg-[#f6e79e] p-1.5 sm:p-2 rounded-xl shadow-inner group-hover:shadow-md transition-shadow">
              <Egg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 group-hover:scale-110 transition-transform" />
            </div>
            <div className="leading-tight">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-gray-800 tracking-tight group-hover:text-[#f6e79e] transition-colors font-manrope">EggFinity</h1>
              <p className="text-xs text-gray-500 font-medium hidden sm:block">Your Unique Memory Game</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map(({ label, href }) => (
              <Link key={label} href={href} className="text-base font-medium hover:text-[#f6e79e] transition-colors relative group">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f6e79e] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Account */}
            <Link href="/account" className="hidden sm:flex items-center gap-2 px-2 sm:px-3 py-2 rounded-xl hover:bg-white/20 transition-all group">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 group-hover:text-[#f6e79e]" />
              <span className="hidden md:block text-sm md:text-base font-medium text-gray-700 group-hover:text-[#f6e79e]">Account</span>
            </Link>

            {/* Cart */}
            <Link href="/checkout" className="relative flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-xl hover:bg-white/20 transition-all group">
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 group-hover:text-[#f6e79e]" />
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-xs text-gray-600 font-medium">Cart</span>
                <span className="text-base font-semibold text-gray-800">
                  {cartItems > 0 ? `${cartItems} items` : 'Empty'}
                </span>
              </div>

              {/* Badge Mobile */}
              {cartItems > 0 && (
                <div className="sm:hidden absolute -top-1 -right-1 bg-[#f6e79e] text-gray-900 text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                  {cartItems}
                </div>
              )}

              {/* Badge Desktop */}
              {cartItems > 0 && (
                <span className="hidden sm:flex absolute -top-1.5 -right-1.5 bg-[#f6e79e] text-gray-900 text-[10px] font-bold rounded-full h-5 w-5 items-center justify-center animate-pulse shadow-lg">
                  {cartItems}
                </span>
              )}
            </Link>

            {/* Total Price */}
            {cartTotal > 0 && (
              <div className="hidden sm:block text-base font-semibold text-gray-800 bg-white/30 backdrop-blur-sm px-2 sm:px-3 py-2 rounded-lg border border-gray-200/50">
                €{cartTotal.toFixed(2)}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="lg:hidden p-2 rounded-xl hover:bg-white/20 transition-all">
              {menuOpen ? <X size={20} className="sm:w-6 sm:h-6 text-gray-700" /> : <Menu size={20} className="sm:w-6 sm:h-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="lg:hidden mt-2 space-y-1 pb-4 px-2 animate-slide-down bg-white/30 backdrop-blur-md rounded-lg border border-gray-200/50 shadow-lg">
            {navLinks.map(({ label, href }) => (
              <Link key={label} href={href} onClick={() => setMenuOpen(false)} className="block text-sm md:text-base font-medium text-gray-700 hover:text-[#f6e79e] py-2.5 px-3 rounded-lg hover:bg-white/20 transition-colors">
                {label}
              </Link>
            ))}
            <div className="border-t border-gray-200/50 mt-2 pt-2">
              <Link href="/account" onClick={() => setMenuOpen(false)} className="block text-sm md:text-base font-medium text-gray-700 hover:text-[#f6e79e] py-2.5 px-3 rounded-lg hover:bg-white/20 transition-colors">
                My Account
              </Link>
              <div className="px-3 py-2.5">
                <div className="flex items-center justify-between text-sm md:text-base">
                  <span className="text-gray-600">Cart Items:</span>
                  <span className="font-semibold text-gray-800">{cartItems}</span>
                </div>
                {cartTotal > 0 && (
                  <div className="flex items-center justify-between text-sm md:text-base mt-1">
                    <span className="text-gray-600">Total:</span>
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
