// import React from 'react';
// import { ShoppingCart, Egg } from 'lucide-react';

// interface HeaderProps {
//   cartItems: number;
//   cartTotal: number;
// }

// export default function Header({ cartItems, cartTotal }: HeaderProps) {
//   return (
//     <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo Section */}
//           <div className="flex items-center space-x-4">
//             <div className="bg-amber-100 p-2 rounded-xl shadow-inner">
//               <Egg className="h-6 w-6 text-amber-600" />
//             </div>
//             <div className="leading-tight">
//               <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
//                 EggFinity
//               </h1>
//               <p className="text-xs text-slate-500 font-medium">
//                 Your Unique Memory Game
//               </p>
//             </div>
//           </div>

//           {/* Cart Section */}
//           <div className="flex items-center space-x-5">
//             <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors group">
//               <ShoppingCart className="h-6 w-6 text-slate-600 group-hover:text-slate-800 transition-colors" />
//               {cartItems > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow">
//                   {cartItems}
//                 </span>
//               )}
//             </button>

//             {cartTotal > 0 && (
//               <div className="hidden sm:block text-base font-semibold text-slate-700">
//                 €{cartTotal.toFixed(2)}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// import React from 'react';
// import { ShoppingCart, Egg } from 'lucide-react';

// interface HeaderProps {
//   cartItems: number;
//   cartTotal: number;
// }

// export default function Header({ cartItems, cartTotal }: HeaderProps) {
//   return (
//     <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo Section */}
//           <div className="flex items-center space-x-4">
//             <div className="bg-amber-100 p-2 rounded-xl shadow-inner">
//               <Egg className="h-6 w-6 text-amber-600" />
//             </div>
//             <div className="leading-tight">
//               <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
//                 EggFinity
//               </h1>
//               <p className="text-xs text-slate-500 font-medium">
//                 Your Unique Memory Game
//               </p>
//             </div>
//           </div>

//           {/* Cart Section */}
//           <div className="flex items-center space-x-5">
//             <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors group">
//               <ShoppingCart className="h-6 w-6 text-slate-600 group-hover:text-slate-800 transition-colors" />
//               {cartItems > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow">
//                   {cartItems}
//                 </span>
//               )}
//             </button>

//             {cartTotal > 0 && (
//               <div className="hidden sm:block text-base font-semibold text-slate-700">
//                 €{cartTotal.toFixed(2)}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Egg, Menu, X, User } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  cartItems: number;
  cartTotal: number;
}

export default function Header({ cartItems, cartTotal }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Create Your Egg', href: '/catalog' },
    { label: 'Catalog', href: '/catalog' },
  ];

  return (
    <header className={`backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/20 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
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
              <Link
                key={label}
                href={href}
                className="text-sm font-medium text-gray-600 hover:text-[#f6e79e] transition-colors relative group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f6e79e] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* User Account - Hidden on mobile, visible on tablet+ */}
            <Link href="/account" className="hidden sm:flex items-center gap-2 px-2 sm:px-3 py-2 rounded-xl hover:bg-white/20 transition-all group">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 group-hover:text-[#f6e79e] transition-colors" />
              <span className="hidden md:block text-sm font-medium text-gray-700 group-hover:text-[#f6e79e] transition-colors">
                Account
              </span>
            </Link>

            {/* Cart */}
            <Link href="/checkout" className="relative flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-xl hover:bg-white/20 transition-all group">
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 group-hover:text-[#f6e79e] transition-colors" />
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-xs text-gray-600 font-medium">Cart</span>
                <span className="text-sm font-semibold text-gray-800">
                  {cartItems > 0 ? `${cartItems} items` : 'Empty'}
                </span>
              </div>
              {/* Mobile cart count */}
              <div className="sm:hidden flex items-center justify-center w-5 h-5 bg-[#f6e79e] rounded-full">
                <span className="text-xs font-bold text-gray-900">{cartItems}</span>
              </div>
              {/* Desktop cart badge */}
              {cartItems > 0 && (
                <span className="hidden sm:block absolute -top-1.5 -right-1.5 bg-[#f6e79e] text-gray-900 text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                  {cartItems}
                </span>
              )}
            </Link>

            {/* Cart Total - Hidden on mobile, visible on tablet+ */}
            {cartTotal > 0 && (
              <div className="hidden sm:block text-sm font-semibold text-gray-800 bg-white/30 backdrop-blur-sm px-2 sm:px-3 py-2 rounded-lg border border-gray-200/50">
                €{cartTotal.toFixed(2)}
              </div>
            )}

            {/* Hamburger Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-xl hover:bg-white/20 transition-all"
            >
              {menuOpen ? <X size={20} className="sm:w-6 sm:h-6 text-gray-700" /> : <Menu size={20} className="sm:w-6 sm:h-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-2 space-y-1 pb-4 px-2 animate-slide-down bg-white/30 backdrop-blur-md rounded-lg border border-gray-200/50 shadow-lg">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="block text-sm font-medium text-gray-700 hover:text-[#f6e79e] py-2.5 px-3 rounded-lg hover:bg-white/20 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="border-t border-gray-200/50 mt-2 pt-2">
              <Link
                href="/account"
                className="block text-sm font-medium text-gray-700 hover:text-[#f6e79e] py-2.5 px-3 rounded-lg hover:bg-white/20 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                My Account
              </Link>
              {/* Mobile Cart Info */}
              <div className="px-3 py-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Cart Items:</span>
                  <span className="font-semibold text-gray-800">{cartItems}</span>
                </div>
                {cartTotal > 0 && (
                  <div className="flex items-center justify-between text-sm mt-1">
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
