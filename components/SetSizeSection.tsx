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
    <section className="py-20 bg-[#f7fcee]">
      <div className="max-w-6xl mx-auto px-4 text-center">

        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Choose Set Size</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-6 mb-12">
          {setSizes.map((set) => (
            <Card
              key={set.label}
              className={`p-6 border-2 rounded-lg text-center transition-all transform hover:scale-105 ${
                set.active
                  ? 'border-[#f6e79e] bg-[#f6e79e]/20 shadow-md'
                  : 'border-gray-200 bg-white hover:bg-[#f6e79e]/20 hover:border-[#f6e79e]'
              }`}
            >
              <h4 className="text-lg font-bold text-gray-800">{set.label}</h4>
              <p className="text-sm text-gray-500">{set.cards} Cards</p>
              <p className="text-[#f6e79e] text-xl font-semibold mt-2">€{set.price}</p>
            </Card>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) =>
            cat.isButton ? (
              <Button
                key={cat.name}
                className="bg-[#f6e79e] text-gray-700 px-5 py-2 rounded-full font-medium hover:bg-[#f4e285] transition-all"
              >
                {cat.name}
              </Button>
            ) : (
              <span
                key={cat.name}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all transform hover:scale-105 ${
                  cat.active
                    ? 'bg-[#f6e79e] text-gray-700 shadow border-[#f6e79e]'
                    : 'bg-gray-100 text-gray-600 hover:bg-[#f6e79e]/20 hover:text-gray-700 hover:border-[#f6e79e] border-gray-300'
                }`}
              >
                {cat.name} <span className="text-xs">({cat.count})</span>
              </span>
            )
          )}
        </div>

        <div className="mt-8 bg-white shadow-lg rounded-xl px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
          <p className="text-gray-800 font-medium text-center sm:text-left">Choose 24 out of 24 designs</p>
          <Button className="bg-[#f6e79e] hover:bg-[#f4e285] text-gray-900 font-semibold transform hover:scale-105">
             Finished – Add to Cart (€49.99)
          </Button>
        </div>
      </div>
    </section>
  );
}