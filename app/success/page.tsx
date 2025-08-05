'use client';

import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const [total, setTotal] = useState<string | null>(null);
  const [cards, setCards] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setTotal(params.get('total'));
      setCards(params.get('cards'));
      setSize(params.get('size'));
    }
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful</h1>
        <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>

        <div className="text-left space-y-2 mb-6">
          <p><strong>Cards Ordered:</strong> {cards || 'N/A'}</p>
          <p><strong>Size:</strong> {size || 'N/A'}</p>
          <p><strong>Total Paid:</strong> €{total || 'N/A'}</p>
        </div>

        <a
          href="/"
          className="inline-block mt-4 bg-[#f6e79e] text-gray-900 px-6 py-3 rounded-lg font-semibold shadow transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
