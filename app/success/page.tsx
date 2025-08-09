
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





// 'use client';

// import { Suspense, useEffect, useState } from 'react';
// import { CheckCircle } from 'lucide-react';
// import useTranslation from '@/lib/useTranslation';

// function SuccessContent() {
//   const { t } = useTranslation();

//   const [total, setTotal] = useState<string | null>(null);
//   const [cards, setCards] = useState<string | null>(null);
//   const [size, setSize] = useState<string | null>(null);

//   const [eggs, setEggs] = useState<any[]>([]);
//   const [visibleCount, setVisibleCount] = useState(8);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const params = new URLSearchParams(window.location.search);
//       setTotal(params.get('total'));
//       setCards(params.get('cards'));
//       setSize(params.get('size'));

//       // Read cart from localStorage
//       const cartData = localStorage.getItem('cart');
//       if (cartData) {
//         try {
//           const parsed = JSON.parse(cartData);
//           // Assuming parsed[0].designs array
//           if (parsed[0]?.designs) {
//             setEggs(parsed[0].designs);
//           }
//         } catch (err) {
//           console.error('Error parsing cart data:', err);
//         }
//       }
//     }
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
//       <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md text-center mb-10">
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

//       {/* Eggs List */}
//       {eggs.length > 0 && (
//         <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-6">
//           {eggs.slice(0, visibleCount).map((egg, index) => (
//             <div key={index} className="bg-white rounded-lg shadow p-3 flex flex-col items-center">
//               <img
//                 src={egg.image}
//                 alt={egg.name}
//                 className="w-24 h-24 object-cover rounded-md mb-2"
//               />
//               <p className="text-sm font-medium text-gray-800 text-center">{egg.name}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Show More Button */}
//       {visibleCount < eggs.length && (
//         <button
//           onClick={() => setVisibleCount((prev) => prev + 8)}
//           className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-semibold shadow"
//         >
//           Show More
//         </button>
//       )}
//     </div>
//   );
// }

// export default function SuccessPage() {
//   return (
//     <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
//       <SuccessContent />
//     </Suspense>
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
  const [eggs, setEggs] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setTotal(params.get('total'));
      setCards(params.get('cards'));
      setSize(params.get('size'));

      // Read cart from localStorage
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        try {
          const parsed = JSON.parse(cartData);
          if (parsed[0]?.designs) {
            setEggs(parsed[0].designs);
          }
        } catch (err) {
          console.error('Error parsing cart data:', err);
        }
      }
    }
  }, []);

  // Get full image path (fixed)
  const getImageUrl = (path: string) => {
    if (!path) return '';
    const cleanPath = path.trim();
    const encodedPath = cleanPath.replace(/ /g, '%20');
    if (encodedPath.startsWith('/')) {
      return encodedPath; // public folder path
    }
    return `/${encodedPath}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-3xl w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.Success.title}</h1>
        <p className="text-gray-600 mb-6">{t.Success.message}</p>

        {/* Payment Details */}
        <div className="text-left space-y-2 mb-6">
          <p><strong>{t.Success.cardsOrdered}:</strong> {cards || 'N/A'}</p>
          <p><strong>{t.Success.size}:</strong> {size || 'N/A'}</p>
          <p><strong>{t.Success.totalPaid}:</strong> €{total || 'N/A'}</p>
        </div>

        {/* Eggs List */}
        {eggs.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
            {eggs.slice(0, visibleCount).map((egg, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow p-3 flex flex-col items-center">
                <img
                  src={getImageUrl(egg.image)}
                  alt={egg.name}
                  className="w-24 h-24 object-cover rounded-md mb-2"
                />
                <p className="text-sm font-medium text-gray-800 text-center">{egg.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* Show More Button */}
        {visibleCount < eggs.length && (
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="mt-2 bg-[#f6e79e] text-gray-900 px-6 py-2 rounded-lg font-semibold shadow"
          >
            Show More
          </button>
        )}

        {/* Back Home Button */}
        <a
          href="/"
          className="inline-block mt-6 bg-[#f6e79e] text-gray-900 px-6 py-3 rounded-lg font-semibold shadow transition"
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
