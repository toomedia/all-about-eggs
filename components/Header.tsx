import React from 'react';
import { ShoppingCart, Egg } from 'lucide-react';

interface HeaderProps {
  cartItems: number;
  cartTotal: number;
}

export default function Header({ cartItems, cartTotal }: HeaderProps) {
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
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                EggFinity
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Your Unique Memory Game
              </p>
            </div>
          </div>

          {/* Cart Section */}
          <div className="flex items-center space-x-5">
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
          </div>
        </div>
      </div>
    </header>
  );
}
