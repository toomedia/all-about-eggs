"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const setSizes = [
  { label: 'L', cards: 24, price: 29.99 },
  { label: 'XL', cards: 48, price: 49.99, active: true },
  { label: 'XXL', cards: 72, price: 69.99 },
];

const categories = [
  { name: 'All', count: 100, active: true },
  { name: 'Classics', count: 25 },
  { name: 'Easter', count: 30 },
  { name: 'Abstract', count: 20 },
  { name: 'Food', count: 15 },
  { name: 'Nature', count: 10 },
  { name: 'Surprise Me', isButton: true },
];

export default function SetSizeAndCategorySection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        
        {/* Set Size Selector */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Choose Set Size</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {setSizes.map((set) => (
            <Card
              key={set.label}
              className={`p-6 border-2 rounded-lg text-center w-48 transition-all transform hover:scale-105 ${
                set.active
                  ? 'border-orange-300 bg-orange-50 shadow-md'
                  : 'border-gray-200 bg-white hover:bg-orange-50 hover:border-orange-300'
              }`}
            >
              <h4 className="text-lg font-bold text-gray-800">{set.label}</h4>
              <p className="text-sm text-gray-500">{set.cards} Cards</p>
              <p className="text-orange-600 text-xl font-semibold mt-2">€{set.price}</p>
            </Card>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) =>
            cat.isButton ? (
              <Button
                key={cat.name}
                className="bg-orange-100 text-orange-700 px-5 py-2 rounded-full font-medium hover:bg-orange-200 transition-all"
              >
                {cat.name}
              </Button>
            ) : (
              <span
                key={cat.name}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all transform hover:scale-105 ${
                  cat.active
                    ? 'bg-orange-100 text-orange-700 shadow border-orange-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 border-gray-300'
                }`}
              >
                {cat.name} <span className="text-xs">({cat.count})</span>
              </span>
            )
          )}
        </div>

        {/* Instruction Bar */}
        <div className="mt-8 bg-white shadow-lg rounded-xl px-6 py-4 flex items-center justify-between max-w-3xl mx-auto">
          <p className="text-gray-800 font-medium">Choose 24 out of 24 designs</p>
          <Button className="bg-orange-100 hover:bg-orange-200 text-orange-800 font-semibold transform hover:scale-105">
            🛒 Finished – Add to Cart (€49.99)
          </Button>
        </div>
      </div>
    </section>
  );
}
