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
import Button from './Button';
import Link from 'next/link';

export default function Hero() {
  const eggImages = [
    'eggs images/A01ED9DF-9438-4E70-B773-60A2C41A82F3.PNG',
    'eggs images/A1C8EC8B-F376-4179-9677-5EEB3BED10E1.PNG',
    'eggs images/78F51BD8-2667-4818-A8EB-F96F9A75C762.PNG',
    'eggs images/985F746C-6F78-4E2A-BD7F-20F49045629D.PNG',
    'eggs images/900607D2-4C7C-4EA3-BED1-CEC884AC396F.PNG',
    'eggs images/B96EC52A-B308-4F59-BDF1-FF4634AF366F.PNG',
    'eggs images/5A1D36A7-05A2-4D73-862E-478A4C6B175A.PNG',
    'eggs images/20A37086-FD6B-4CA4-A663-92783F0D587A.PNG',
    'eggs images/D05371AC-8A6A-420F-8EDB-CEA5A00AE606.PNG',
    'eggs images/D0126C2C-603B-471C-820E-370773708853.PNG',
    'eggs images/7F9DC646-284C-4E7F-8FBF-AA6A3F60096C.PNG',
    'eggs images/EF92674E-D04F-42F7-8308-DA4FF3C17BE1.PNG',
    'eggs images/BA0EA02E-9CD8-4405-92AB-A91969CB36D9.PNG',
    'eggs images/09FF42F9-2664-4698-8FD8-E544A47D616B.PNG',
    'eggs images/EE3B1C9F-EE9B-41F0-AADE-A1785767ECF8.PNG',
    'eggs images/FC7DEB0F-9010-41FF-A9DE-05AC0CE582DB.PNG',
    'eggs images/A1C1364A-0881-4FD4-8863-942528923EF4.PNG',
    'eggs images/409969A2-15D6-417E-BB80-7F5514D4C420.PNG',
    'eggs images/F2B512AE-60BB-403D-A6F1-C7D8B963DDF4.PNG',
    'eggs images/C35ACEE8-3CC4-4372-BE84-6658357CED6A.PNG',
    'eggs images/C2084B60-843C-45F9-85CA-FC4D5099707B.PNG',
    'eggs images/5D6FB616-991D-4FF4-8188-8DD066C89F60.PNG',
    'eggs images/D1ED21D6-2288-497B-AF9D-BDA37D4FEB9D.PNG',
    'eggs images/12ABB356-852A-4C46-97EF-C93BAD83AD37.PNG',
    'eggs images/74AB1B49-6171-4D10-94D7-D9A2F0CD87A9.PNG',
  ];

  return (
    <section className="relative pt-20 pb-16 px-4 !font-poppins overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://hips.hearstapps.com/hmg-prod/images/colorful-easter-eggs-royalty-free-image-534890729-1551194622.jpg')`
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7fcee]/80 to-[#f6e79e]/60" />
      {/* Content */}
      <div className="relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-5">
              <div className="bg-[#f6e79e] p-2 rounded-full shadow-inner">
                <Sparkles className="h-5 w-5 text-amber-600 animate-pulse" />
              </div>
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Custom Egg Motif Products
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-manrope ">
               Create Your Unique
              <span className="text-[#f6e79e] block">Egg Memory!</span>
            </h1>

            <p className="text-lg text-gray-700 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Choose from over 100 creative egg designs or let us surprise you – 
              the perfect personalized Easter gift!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center lg:justify-start">
              <Link href="/catalog">
                <Button className='flex'>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create Set Now
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button className="!bg-transparent border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Egg Grid */}
          <div className="grid grid-cols-5 gap-3 max-w-7xl mx-auto lg:max-w-2xl">
            {eggImages.map((fileName, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 transform hover:scale-110 overflow-hidden"
              >
                <Image
                  src={`/${fileName}`}
                  alt={`Egg design ${index + 1}`}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
