'use client'

import useTranslation from '@/lib/useTranslation';
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Design type
interface Design {
  id: number;
  name: string;
  category: string;
  image: string;
  premium?: boolean;
  featured?: boolean;
  price: number;
}

interface WishlistItem {
  id: number;
  name: string;
  category: string;
  image: string;
  likes: number;
  price: number;
}

export default function Wishlist() {
  const { t } = useTranslation();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('wishlist')
    if (saved) {
      const parsed: WishlistItem[] = JSON.parse(saved)
      setWishlistItems(parsed)
      console.log('Loaded wishlist:', parsed)
    }
  }, [])

  const removeFromWishlist = (id: number) => {
    const updated = wishlistItems.filter(item => item.id !== id)
    setWishlistItems(updated)
    localStorage.setItem('wishlist', JSON.stringify(updated))
  }

  const handleBuyNow = (item: WishlistItem) => {
    setSelectedDesign(item as Design)
    window.location.href = `/checkout?designs=${item.id}&size=L&count=1`
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10 font-manrope">
        {t.wishlist.saved_designs}
      </h2>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          {t.wishlist.empty}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((item, index) => (
            <Card
              key={`${item.id}-${index}`}
              className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col shadow-sm hover:shadow-md transition"
            >
              <div className="w-full h-48 sm:h-52 md:h-56 overflow-hidden rounded-xl mb-4 bg-gray-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{item.category}</p>
              </div>
              <div className="flex justify-between gap-2 mt-auto">
                <Button
                  onClick={() => handleBuyNow(item)}
                  size="sm"
                  className="w-full bg-[#f6e79e] text-black font-semibold"
                >
                  {t.wishlist.add_to_cart}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="bg-white border-2 border-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  {t.wishlist.remove}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
