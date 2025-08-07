'use client';

import en from "@/public/locales/en";
import de from "@/public/locales/de";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const translations = { en, de };

export default function useTranslation() {
  const [lang, setLang] = useState<"en" | "de">("en");
  const router = useRouter();
  const pathname = usePathname();
  const lastUrlRef = useRef<string>("");
  
  // Function to get language from current URL
  const getLangFromUrl = () => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const urlLang = searchParams.get("lang") as "en" | "de";
      return urlLang && (urlLang === "en" || urlLang === "de") ? urlLang : "en";
    }
    return "en";
  };

  // Update language when component mounts and when URL changes
  useEffect(() => {
    const updateLang = () => {
      const currentUrl = window.location.href;
      if (currentUrl !== lastUrlRef.current) {
        lastUrlRef.current = currentUrl;
        const newLang = getLangFromUrl();
        setLang(newLang);
      }
    };

    // Set initial language
    updateLang();

    // Poll for URL changes every 100ms
    const interval = setInterval(updateLang, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const t = translations[lang] || translations.en;

  const switchLanguage = () => {
    const newLang = lang === "en" ? "de" : "en";
    setLang(newLang);

    // Create a new URLSearchParams object to retain existing params
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("lang", newLang);

    router.push(`${pathname}?${searchParams.toString()}`);
  };

  return { t, lang, switchLanguage };
}
