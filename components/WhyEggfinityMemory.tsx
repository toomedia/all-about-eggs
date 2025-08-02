"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Paintbrush, Gift, Leaf } from "lucide-react";

const features = [
  {
    icon: <Paintbrush className="text-yellow-500 w-8 h-8" />,
    title: "Personalized Design",
    description:
      "Choose from 100 unique egg motifs or let our random generator surprise you.",
  },
  {
    icon: <Gift className="text-green-500 w-8 h-8" />,
    title: "Perfect for Gifting",
    description:
      "Ideal for Easter, birthdays, or a special surprise for family and friends.",
  },
  {
    icon: <Leaf className="text-blue-500 w-8 h-8" />,
    title: "On-Demand Production",
    description:
      "Sustainably made to order – less waste, more quality for you.",
  },
];

export default function WhyEggfinityMemory() {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-8 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-10">
        Why Eggfinity Memory?
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className="rounded-xl shadow-md">
            <CardContent className="p-6 flex flex-col items-center gap-4">
              <div className="bg-gray-100 rounded-full p-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
