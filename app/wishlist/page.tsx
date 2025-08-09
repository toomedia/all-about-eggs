'use client';

import useTranslation from '@/lib/useTranslation';
import { useEffect, useState } from 'react';
import { Heart, ArrowLeft, ShoppingCart, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface WishlistItem {
  id: number;
  name: string;
  category: string;
  image: string;
  likes?: number;
  price?: number;
  premium?: boolean;
  featured?: boolean;
}

export default function WishlistPage() {
  const { t } = useTranslation();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wishlist');
      if (saved) {
        try {
          const parsed: WishlistItem[] = JSON.parse(saved);
          setWishlistItems(parsed);
          console.log('Loaded wishlist:', parsed);
        } catch (error) {
          console.error('Error parsing wishlist:', error);
        }
      }
    }
  }, []);

  const removeFromWishlist = (id: number) => {
    const updated = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(updated));
      // Dispatch wishlist update event for header
      window.dispatchEvent(new CustomEvent('eggfinity-wishlist-updated'));
    }
  };

  const handleBuyNow = (item: WishlistItem) => {
    // Redirect to checkout with the selected item
    const queryParams = new URLSearchParams({
      designs: item.id.toString(),
      size: 'L',
      count: '1'
    });
    window.location.href = `/checkout?${queryParams.toString()}`;
  };

  const handleViewItem = (item: WishlistItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fcee] via-white to-[#f6e79e]/20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/catalog" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#f6e79e] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] p-4 rounded-2xl mb-6">
            <Heart className="w-8 h-8 text-gray-700" />
            <h1 className="text-3xl font-bold text-gray-900 font-manrope">
              My Wishlist
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            {wishlistItems.length > 0 
              ? `You have ${wishlistItems.length} item${wishlistItems.length > 1 ? 's' : ''} in your wishlist`
              : 'Your wishlist is empty'
            }
          </p>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No items in your wishlist</h3>
            <p className="text-gray-600 mb-8">
              Start exploring our catalog and add your favorite designs to your wishlist!
            </p>
            <Link 
              href="/catalog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 rounded-2xl font-semibold text-lg hover:from-[#f4e285] hover:to-[#f6e79e] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item, index) => (
              <div 
                key={`${item.id}-${index}`}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                {/* Image */}
                <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={80}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {item.premium && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                        Premium
                      </span>
                    )}
                    {item.featured && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => handleViewItem(item)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all transform hover:scale-110"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all transform hover:scale-110"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.category}</p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 rounded-xl font-semibold hover:from-[#f4e285] hover:to-[#f6e79e] transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for viewing item details */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="relative h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden mb-6">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedItem.name}</h3>
                  <p className="text-gray-600">{selectedItem.category}</p>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleBuyNow(selectedItem);
                      setShowModal(false);
                    }}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 rounded-xl font-semibold hover:from-[#f4e285] hover:to-[#f6e79e] transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now
                  </button>
                  <button
                    onClick={() => {
                      removeFromWishlist(selectedItem.id);
                      setShowModal(false);
                    }}
                    className="py-3 px-6 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 