'use client';
import { XCircle } from 'lucide-react';

import useTranslation from '@/lib/useTranslation';

export default function CancelPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.cancel.orderComplete}</h1>
        <p className="text-gray-600 mb-6">{t.cancel.orderCompleteMessage}</p>
        <a
          href="/catalog"
          className="inline-block mt-4 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-300 transition"
        >
          {t.cancel.tryAgain}
        </a>
      </div>
    </div>
  );
}