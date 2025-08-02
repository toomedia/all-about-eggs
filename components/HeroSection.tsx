// "use client";

// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { 
//   Gift, 
//   ArrowRight,
//   Play,
//   Star,
//   Sparkles
// } from 'lucide-react';

// const featuredEggs = [
//   { id: 1, name: 'Golden Elegance', price: 12.99, color: 'bg-gradient-to-br from-yellow-200 to-yellow-400' },
//   { id: 2, name: 'Ruby Red', price: 13.99, color: 'bg-gradient-to-br from-red-200 to-red-400' },
//   { id: 3, name: 'Forest Green', price: 12.99, color: 'bg-gradient-to-br from-green-200 to-green-400' },
//   { id: 4, name: 'Pearl White', price: 15.99, color: 'bg-gradient-to-br from-gray-100 to-gray-300' },
// ];

// export default function HeroSection() {
//   return (
//     <section id="home" className="relative overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <div className="space-y-8">
//             <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-2 border border-orange-200">
//               <Gift className="w-5 h-5 text-orange-500" />
//               <span className="text-orange-700 font-medium">Perfect Easter Gift</span>
//             </div>
            
//             <h2 className="text-5xl lg:text-7xl font-bold leading-tight">
//               <span className="text-gray-900">Design Your</span>
//               <br />
//               <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
//                 Unique Egg
//               </span>
//               <br />
//               <span className="text-gray-900">Memory Set</span>
//               <span className="text-yellow-400 text-6xl lg:text-8xl">!</span>
//             </h2>
            
//             <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
//               Choose from 100+ unique designs or let us surprise you – perfect as a personalized Easter gift that creates lasting memories for your family.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold">
//                 <Sparkles className="w-5 h-5 mr-2" />
//                 Start Designing Now
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </Button>
//               <Button size="lg" variant="outline" className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 px-8 py-4 text-lg font-semibold group">
//                 <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
//                 Watch Demo
//               </Button>
//             </div>
            
//             <div className="flex items-center space-x-8 pt-4">
//               <div className="flex items-center space-x-2">
//                 <div className="flex -space-x-2">
//                   {[1,2,3,4].map(i => (
//                     <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 border-2 border-white"></div>
//                   ))}
//                 </div>
//                 <span className="text-sm text-gray-600">10,000+ Happy Customers</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                 ))}
//                 <span className="text-sm text-gray-600 ml-2">4.9/5 Rating</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="relative">
//             <div className="grid grid-cols-2 gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
//               {featuredEggs.map((egg, index) => (
//                 <Card key={egg.id} className={`p-6 ${egg.color} border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${index % 2 === 0 ? 'mt-8' : ''}`}>
//                   <div className="aspect-square flex items-center justify-center">
//                     <div className="w-16 h-20 rounded-full bg-white/30 backdrop-blur-sm border-2 border-white/50 shadow-lg">
//                       <div className="w-full h-full rounded-full bg-gradient-to-br from-white/40 to-transparent"></div>
//                     </div>
//                   </div>
//                   <div className="mt-4 text-center">
//                     <h4 className="font-semibold text-gray-800">{egg.name}</h4>
//                     <p className="text-gray-700 font-bold">€{egg.price}</p>
//                   </div>
//                 </Card>
//               ))}
//             </div>
            
//             {/* Floating Elements */}
//             <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
//             <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 animate-bounce"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// import React from 'react';
// import { Egg, Sparkles } from 'lucide-react';

// export default function Hero() {
//   return (
//     <section className="relative bg-gradient-to-br from-[#fefefc] to-[#f3fde9] py-16 sm:py-24 overflow-hidden">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           {/* Left Content */}
//           <div className="text-center lg:text-left">
//             <div className="flex items-center justify-center lg:justify-start space-x-3 mb-5">
//               <div className="bg-amber-100 p-2 rounded-full shadow-inner">
//                 <Sparkles className="h-5 w-5 text-amber-600 animate-pulse" />
//               </div>
//               <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
//                 Einzigartig & Personalisiert
//               </span>
//             </div>

//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
//               <span className="text-slate-900 block">Create Your</span>
//               <span className="text-slate-900 block">Unique</span>
//               <span className="text-amber-500 block">Egg Memory!</span>
//             </h1>

//             <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
//               Choose from over 100 creative egg designs or let us surprise you – 
//               the perfect personalized Easter gift!
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//                 🧺 Create Set Now
//               </button>
//               <button className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg transition duration-300">
//                 Learn More
//               </button>
//             </div>
//           </div>

//           {/* Right Content - Egg Grid */}
//           <div className="grid grid-cols-4 gap-4 max-w-md mx-auto lg:max-w-lg">
//             {[
//               'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=150',
//               'https://images.pexels.com/photos/1666073/pexels-photo-1666073.jpeg?auto=compress&cs=tinysrgb&w=150',
//               'https://images.pexels.com/photos/1556704/pexels-photo-1556704.jpeg?auto=compress&cs=tinysrgb&w=150',
//               'https://images.pexels.com/photos/1179532/pexels-photo-1179532.jpeg?auto=compress&cs=tinysrgb&w=150',
//               'https://images.pexels.com/photos/1666074/pexels-photo-1666074.jpeg?auto=compress&cs=tinysrgb&w=150',
//               'https://images.pexels.com/photos/1070940/pexels-photo-1070940.jpeg?auto=compress&cs=tinysrgb&w=150',
//               'https://images.pexels.com/photos/1666076/pexels-photo-1666076.jpeg?auto=compress&cs=tinysrgb&w=150',
//               'https://images.pexels.com/photos/1179533/pexels-photo-1179533.jpeg?auto=compress&cs=tinysrgb&w=150',
//             ].map((image, index) => (
//               <div
//                 key={index}
//                 className="aspect-square bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 transform hover:scale-110 overflow-hidden"
//               >
//                 <img
//                   src={image}
//                   alt={`Egg design ${index + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




'use client';

import React from 'react';
import Image from 'next/image';
import { Egg, Sparkles } from 'lucide-react';

export default function Hero() {
  const eggImages = [
    'egg1.png',
    'egg2.png',
    'egg3.png',
    'egg4.png',
    'egg5.png',
    'egg6.png',
    'egg7.png',
    'egg9.png',
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#fefefc] to-[#f3fde9] py-16 sm:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-5">
              <div className="bg-amber-100 p-2 rounded-full shadow-inner">
                <Sparkles className="h-5 w-5 text-amber-600 animate-pulse" />
              </div>
              <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Einzigartig & Personalisiert
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              <span className="text-slate-900 block">Create Your</span>
              <span className="text-slate-900 block">Unique</span>
              <span className="text-amber-500 block">Egg Memory!</span>
            </h1>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Choose from over 100 creative egg designs or let us surprise you – 
              the perfect personalized Easter gift!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                 Create Set Now
              </button>
              <button className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg transition duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Content - Egg Grid */}
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto lg:max-w-lg">
            {eggImages.map((fileName, index) => (
              <div
                key={index}
                className="aspect-square bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 transform hover:scale-110 overflow-hidden"
              >
                <Image
                  src={`/${fileName}`}
                  alt={`Egg design ${index + 1}`}
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
