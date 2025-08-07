'use client';

import en from "@/public/locales/en";
import de from '@/public/locales/de';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const translations = { en, de };

export default function useTranslation() {
  const router = useRouter();
  const pathname = usePathname();

  const [lang, setLang] = useState<'en' | 'de'>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as 'en' | 'de' | null;
    if (storedLang) {
      setLang(storedLang);
    } else {
      localStorage.setItem('lang', 'en'); // default to English
    }
  }, []);

  const t = translations[lang];

  const switchLanguage = () => {
    const newLang = lang === 'en' ? 'de' : 'en';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    router.push(pathname); // Reload without ?lang query
  };

  return { t, lang, switchLanguage };
}
