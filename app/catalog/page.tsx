'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('XL');

  const categories = [
    { name: 'All', count: 100 },
    { name: 'Classics', count: 25 },
    { name: 'Easter', count: 30 },
    { name: 'Abstract', count: 20 },
    { name: 'Food', count: 15 },
    { name: 'Nature', count: 10 }
  ];

  const eggDesigns = [
    {
      id: 1,
      name: 'Floral Delight',
      category: 'Easter',
      image: '/api/placeholder/300/300'
    },
    {
      id: 2,
      name: 'Teddy Bear',
      category: 'Classics',
      image: '/api/placeholder/300/300'
    },
    {
      id: 3,
      name: 'Nordic Pattern',
      category: 'Abstract',
      image: '/api/placeholder/300/300'
    },
    {
      id: 4,
      name: 'Golden Elegance',
      category: 'Classics',
      image: '/api/placeholder/300/300'
    },
    {
      id: 5,
      name: 'Sunshine Yellow',
      category: 'Nature',
      image: '/api/placeholder/300/300'
    },
    {
      id: 6,
      name: 'Garden Fresh',
      category: 'Nature',
      image: '/api/placeholder/300/300'
    },
    {
      id: 7,
      name: 'Berry Red',
      category: 'Food',
      image: '/api/placeholder/300/300'
    },
    {
      id: 8,
      name: 'Pure White',
      category: 'Classics',
      image: '/api/placeholder/300/300'
    },
    {
      id: 9,
      name: 'Ocean Blue',
      category: 'Abstract',
      image: '/api/placeholder/300/300'
    },
    {
      id: 10,
      name: 'Forest Green',
      category: 'Nature',
      image: '/api/placeholder/300/300'
    },
    {
      id: 11,
      name: 'Sunset Orange',
      category: 'Abstract',
      image: '/api/placeholder/300/300'
    },
    {
      id: 12,
      name: 'Lavender Dreams',
      category: 'Easter',
      image: '/api/placeholder/300/300'
    }
  ];

  const sizes = [
    { name: 'L', cards: 24, price: 29.99 },
    { name: 'XL', cards: 48, price: 49.99 },
    { name: 'XXL', cards: 72, price: 69.99 }
  ];

  const filteredDesigns = selectedCategory === 'All' 
    ? eggDesigns 
    : eggDesigns.filter(design => design.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Size Selection */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">Choose Set Size</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {sizes.map((size) => (
              <div 
                key={size.name}
                className={`bg-white p-6 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedSize === size.name 
                    ? 'border-orange-500 ring-2 ring-orange-200' 
                    : 'border-gray-200 hover:border-orange-300'
                }`}
                onClick={() => setSelectedSize(size.name)}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{size.name}</h3>
                  <p className="text-gray-600 mb-4">{size.cards} Cards</p>
                  <p className="text-2xl font-bold text-orange-500">€{size.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
            <button className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-full font-medium hover:bg-yellow-500 transition-colors">
              Surprise Me
            </button>
          </div>
        </div>
      </section>

      {/* Design Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Choose Your Designs</h2>
            <p className="text-gray-600">Choose 24 out of 24 designs</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDesigns.map((design) => (
              <div key={design.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <div className="w-full h-48 bg-orange-100 rounded-lg flex items-center justify-center">
                    <div className="w-20 h-20 bg-orange-400 rounded-full"></div>
                  </div>
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4 text-gray-500 hover:text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{design.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{design.category}</p>
                  <Link 
                    href={`/product/${design.id}`}
                    className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors text-center block"
                  >
                    Select Design
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Add to Cart Section */}
          <div className="mt-12 text-center">
            <button className="bg-orange-500 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors">
              Finished – Add to Cart (€{sizes.find(s => s.name === selectedSize)?.price})
            </button>
          </div>
        </div>
      </section>

      {/* Preset Collections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Preset Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Top 10</h3>
              <p className="text-gray-600 mb-4">Our most popular and loved designs</p>
              <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
                View Collection
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Editor's Picks</h3>
              <p className="text-gray-600 mb-4">Carefully curated by our design team</p>
              <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
                View Collection
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Holiday Special</h3>
              <p className="text-gray-600 mb-4">Limited edition Easter designs</p>
              <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
                View Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}