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

import React, { useState } from 'react';
import { ShoppingCart, Egg, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartItems: number;
  cartTotal: number;
}

export default function Header({ cartItems, cartTotal }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Create Your Egg', href: '#' },
    { label: 'Catalog', href: '/catalog' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Community', href: '/community' },
  ];

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="bg-amber-100 p-2 rounded-xl shadow-inner">
              <Egg className="h-6 w-6 text-amber-600" />
            </div>
            <div className="leading-tight">
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">EggFinity</h1>
              <p className="text-xs text-slate-500 font-medium">Your Unique Memory Game</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Cart and Hamburger */}
          <div className="flex items-center space-x-4">
            <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors group">
              <ShoppingCart className="h-6 w-6 text-slate-600 group-hover:text-slate-800 transition-colors" />
              {cartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow">
                  {cartItems}
                </span>
              )}
            </button>

            {cartTotal > 0 && (
              <div className="hidden sm:block text-base font-semibold text-slate-700">
                €{cartTotal.toFixed(2)}
              </div>
            )}

            {/* Hamburger Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded hover:bg-gray-100 transition"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4 px-2 animate-slide-down">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="block text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
