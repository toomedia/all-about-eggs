'use client';

import en from "@/public/locales/en";
import de from "@/public/locales/de";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const translations = { en, de };

export default function useTranslation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const lang = (searchParams?.get("lang") as "en" | "de") || "en";
  const t = translations[lang] || translations.en;

  const switchLanguage = () => {
    const newLang = lang === "en" ? "de" : "en";

    // Create a new URLSearchParams object to retain existing params
    const params = new URLSearchParams(searchParams?.toString());
    params.set("lang", newLang);

    router.push(`${pathname}?${params.toString()}`);
  };

  return { t, lang, switchLanguage };
}
