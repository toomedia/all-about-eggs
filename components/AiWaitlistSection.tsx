"use client";

import useTranslation from '@/lib/useTranslation';
import Button from "./Button";

export default function AiWaitlistSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#fef6ff] py-20 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center font-manrope">
          {t['ai-waitlist'].title}
        </h2>

        <p className="text-gray-600 mb-8 text-lg md:text-xl">
          {t['ai-waitlist'].description}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder={t['ai-waitlist'].placeholder}
            className="px-5 py-3 rounded-xl border border-gray-300 text-gray-800 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
          />
          <Button className="w-full sm:w-auto">
            {t['ai-waitlist'].button}
          </Button>
        </div>
      </div>
    </section>
  );
}
