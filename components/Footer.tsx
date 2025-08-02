"use client";

import { Facebook, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white text-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* Left column */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-200 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-xl">🥚</span>
            </div>
            <h2 className="text-lg font-semibold">Eggfinity</h2>
          </div>
          <p className="text-gray-400">
            Wir bringen Freude und Kreativität in jedes Zuhause mit personalisierbaren Memory-Spielen, die Erinnerungen schaffen und Familien zusammenbringen.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#"><Instagram className="w-5 h-5 text-white hover:text-gray-300" /></a>
            <a href="#"><Facebook className="w-5 h-5 text-white hover:text-gray-300" /></a>
            <a href="#"><Mail className="w-5 h-5 text-white hover:text-gray-300" /></a>
          </div>
        </div>

        {/* Service */}
        <div>
          <h4 className="font-semibold mb-4">Service</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Versand</a></li>
            <li><a href="#" className="hover:text-white">Rückgabe</a></li>
            <li><a href="#" className="hover:text-white">Kontakt</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-4">Rechtliches</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">AGB</a></li>
            <li><a href="#" className="hover:text-white">Datenschutz</a></li>
            <li><a href="#" className="hover:text-white">Impressum</a></li>
            <li><a href="#" className="hover:text-white">Widerruf</a></li>
          </ul>
        </div>

        {/* Payment */}
        <div>
          <h4 className="font-semibold mb-4">Sichere Zahlung mit:</h4>
          <div className="flex items-center gap-3 mt-2">
            <span className="bg-white text-black rounded px-2 py-1 text-xs font-semibold">PayPal</span>
            <span className="bg-white text-black rounded px-2 py-1 text-xs font-semibold">Visa</span>
            <span className="bg-white text-black rounded px-2 py-1 text-xs font-semibold">Mastercard</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-400 text-xs">
        © 2025 Eggfinity. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
