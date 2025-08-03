// "use client";

// import { Card } from '@/components/ui/card';
// import { Award, Sparkles, Shield } from 'lucide-react';

// const features = [
//   {
//     icon: Award,
//     title: "Premium Quality",
//     description: "Hand-crafted eggs with attention to every detail and premium materials."
//   },
//   {
//     icon: Sparkles,
//     title: "100+ Designs",
//     description: "Choose from our vast collection of unique and beautiful egg designs."
//   },
//   {
//     icon: Shield,
//     title: "Satisfaction Guarantee",
//     description: "100% satisfaction guaranteed or your money back, no questions asked."
//   }
// ];

// export default function FeaturesSection() {
//   return (
//    <section className="relative bg-gradient-to-br from-[#f7fcee] to-[#f6e79e] py-16 sm:py-24 overflow-hidden">

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h3 className="text-4xl font-extrabold text-gray-800 mb-4">Why Choose EggFinity Studio?</h3>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             We make Easter special with premium quality, unique designs, and unforgettable memories.
//           </p>
//         </div>

//         <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
//           {features.map((feature, index) => (
//             <Card
//               key={index}
//               className="p-8 text-center bg-white/80 backdrop-blur-md border border-[#f6e79e] rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-2"
//             >
//               <div className="w-16 h-16 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
//                 <feature.icon className="w-8 h-8 text-gray-700" />
//               </div>
//               <h4 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h4>
//               <p className="text-gray-600">{feature.description}</p>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
