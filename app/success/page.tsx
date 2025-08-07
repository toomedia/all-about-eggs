
// 'use client';

// import { useEffect, useState } from 'react';
// import { CheckCircle } from 'lucide-react';
// import useTranslation from '@/lib/useTranslation';

// export default function SuccessPage() {
//   const { t } = useTranslation();

//   const [total, setTotal] = useState<string | null>(null);
//   const [cards, setCards] = useState<string | null>(null);
//   const [size, setSize] = useState<string | null>(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const params = new URLSearchParams(window.location.search);
//       setTotal(params.get('total'));
//       setCards(params.get('cards'));
//       setSize(params.get('size'));
//     }
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md text-center">
//         <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.Success.title}</h1>
//         <p className="text-gray-600 mb-6">{t.Success.message}</p>

//         <div className="text-left space-y-2 mb-6">
//           <p><strong>{t.Success.cardsOrdered}:</strong> {cards || 'N/A'}</p>
//           <p><strong>{t.Success.size}:</strong> {size || 'N/A'}</p>
//           <p><strong>{t.Success.totalPaid}:</strong> €{total || 'N/A'}</p>
//         </div>

//         <a
//           href="/"
//           className="inline-block mt-4 bg-[#f6e79e] text-gray-900 px-6 py-3 rounded-lg font-semibold shadow transition"
//         >
//           {t.Success.backHome}
//         </a>
//       </div>
//     </div>
//   );
// }



'use client';

import { Suspense, useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import useTranslation from '@/lib/useTranslation';

function SuccessContent() {
  const { t } = useTranslation();

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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.Success.title}</h1>
        <p className="text-gray-600 mb-6">{t.Success.message}</p>

        <div className="text-left space-y-2 mb-6">
          <p><strong>{t.Success.cardsOrdered}:</strong> {cards || 'N/A'}</p>
          <p><strong>{t.Success.size}:</strong> {size || 'N/A'}</p>
          <p><strong>{t.Success.totalPaid}:</strong> €{total || 'N/A'}</p>
        </div>

        <a
          href="/"
          className="inline-block mt-4 bg-[#f6e79e] text-gray-900 px-6 py-3 rounded-lg font-semibold shadow transition"
        >
          {t.Success.backHome}
        </a>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
