"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

// Dummy product data – replace with real image URLs
const eggProducts = [
  {
    id: 1,
    title: "Colorful Egg",
    imageUrl: "/egg1.png", // Replace with your actual path or Supabase URL
  },
  {
    id: 2,
    title: "Creative Egg",
    imageUrl: "/egg2.png",
  },
  {
    id: 3,
    title: "Natural Egg",
    imageUrl: "/egg3.png",
  },
  {
    id: 4,
    title: "Classic Egg",
    imageUrl: "/egg4.png",
  },
  {
    id: 5,
    title: "Abstract Egg",
    imageUrl: "/egg5.png",
  },
  {
    id: 6,
    title: "Food Egg",
    imageUrl: "/egg6.png",
  },
];

export default function ProductsSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Choose Your Designs
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {eggProducts.map((product) => (
            <Card
              key={product.id}
              className="relative overflow-hidden group rounded-xl shadow hover:shadow-lg transition-all"
            >
              <div className="relative w-full aspect-[3/4] bg-gray-100">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <Button
                  size="sm"
                  className="bg-orange-500 text-white hover:bg-orange-600 w-full"
                >
                  Select Design
                </Button>
              </div>

              {/* Favorite Icon */}
              <div className="absolute top-3 right-3 z-10">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-gray-600 hover:text-red-500"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
