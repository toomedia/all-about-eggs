// "use client";

// import useTranslation from '@/lib/useTranslation';
// import { Egg, ArrowLeft, Sparkles, Star, Heart, Download, Users, Clock, Zap, Palette, Camera, Wand2 } from 'lucide-react';
// import Link from 'next/link';
// import CreateCustomEggCard from '@/components/CreateCustomEggCard';
// import CustomizeEggCard from '@/components/CustomizeEggCard';
// import UploadImageEggCard from '@/components/UploadImageEggCard';

// export default function DesignPage() {
//    const { t } = useTranslation();
//   return (
//     <div className="min-h-screen ">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
//         {/* Back Button */}
//         <div className="mb-6 sm:mb-8">
//           <Link href="/" className="inline-flex items-center text-gray-600 hover:text-[#f6e79e] transition-colors text-sm sm:text-base">
//             <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
//             Back to Home
//           </Link>
//         </div>

//         {/* Header Section */}
//         <div className="text-center mb-8 sm:mb-10 md:mb-12">
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
//             <Egg className="w-4 h-4 sm:w-5 sm:h-5" />
//             <span className="font-semibold text-xs sm:text-sm">AI Design Studio</span>
//           </div>
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-manrope leading-tight">
//             Design Your Egg
//           </h1>
//           <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto px-4">
//             Create unique, personalized egg designs with our AI-powered tools. From custom prompts to image uploads, 
//             bring your creative vision to life with our advanced design studio.
//           </p>
//         </div>

//         {/* Main Design Options */}
//         <div className="grid md:grid-cols-3 gap-6 mb-16 sm:mb-20">
//           <CreateCustomEggCard />
//           <CustomizeEggCard />
//           <UploadImageEggCard />
//         </div>

//         {/* Features Showcase */}

//         {/* Design Examples */}
//         <section className="mb-16 sm:mb-20">
//           <div className="text-center mb-8 sm:mb-12">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-manrope">
//               Design Examples
//             </h2>
//             <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
//               See what's possible with our AI design tools
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[
//               { 
//                 name: "Galactic Easter Egg", 
//                 type: "AI Generated", 
//                 image: "/egg1.png", 
//                 likes: 156,
//                 description: "Cosmic space design with stars and nebula"
//               },
//               { 
//                 name: "Floral Spring Egg", 
//                 type: "Image Upload", 
//                 image: "/egg2.png", 
//                 likes: 234,
//                 description: "Beautiful spring flowers and pastel colors"
//               },
//               { 
//                 name: "Geometric Pattern Egg", 
//                 type: "AI Enhanced", 
//                 image: "/egg3.png", 
//                 likes: 189,
//                 description: "Modern geometric patterns and shapes"
//               },
//               { 
//                 name: "Watercolor Art Egg", 
//                 type: "AI Generated", 
//                 image: "/egg4.png", 
//                 likes: 267,
//                 description: "Soft watercolor painting style"
//               },
//               { 
//                 name: "Tropical Paradise Egg", 
//                 type: "Custom Prompt", 
//                 image: "/egg5.png", 
//                 likes: 198,
//                 description: "Vibrant tropical colors and patterns"
//               },
//               { 
//                 name: "Minimalist Elegance", 
//                 type: "AI Enhanced", 
//                 image: "/egg6.png", 
//                 likes: 145,
//                 description: "A minimalist, elegant food-inspired design resembling vegetable soup and natural textures."
//               }              
//             ].map((example, index) => (
//               <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
//                 <div className="relative aspect-square overflow-hidden">
//                   <img 
//                     src={example.image} 
//                     alt={example.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
//                     <span className="text-xs font-medium text-gray-700">{example.type}</span>
//                   </div>
//                   <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <p className="text-white text-xs font-medium bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
//                       {example.description}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-bold text-gray-900 mb-1">{example.name}</h3>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">{example.type}</span>
//                     <div className="flex items-center gap-1">
//                       <Heart className="w-4 h-4 text-red-500" />
//                       <span className="text-sm text-gray-600">{example.likes}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="text-center">
//           <div className="bg-gradient-to-r from-[#f6e79e]/20 to-[#f7fcee]/30 rounded-2xl sm:rounded-3xl p-8 sm:p-12 border-2 border-[#f6e79e]/30">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-manrope">
//               Ready to Start Creating?
//             </h2>
//             <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
//               Choose your preferred method and begin designing your perfect egg today. 
//               No design experience required - our AI does the heavy lifting!
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <Link href="/catalog">
//                 <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] hover:from-[#f4e285] hover:to-[#f6e79e] text-gray-900 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
//                   <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
//                   Browse Catalog
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// } 


"use client";
import useTranslation from '@/lib/useTranslation';
import { Egg, ArrowLeft, Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';
import CreateCustomEggCard from '@/components/CreateCustomEggCard';
import CustomizeEggCard from '@/components/CustomizeEggCard';
import UploadImageEggCard from '@/components/UploadImageEggCard';

export default function DesignPage() {
  const { t } = useTranslation();
  

  const designExamples = [
    {
      name: t.designstudio.examples.egg1.name,
      type: t.designstudio.examples.egg1.type,
      image: "/egg1.png",
      likes: 156,
      description: t.designstudio.examples.egg1.description,
    },
    {
      name: t.designstudio.examples.egg2.name,
      type: t.designstudio.examples.egg2.type,
      image: "/egg2.png",
      likes: 234,
      description: t.designstudio.examples.egg2.description,
    },
    {
      name: t.designstudio.examples.egg3.name,
      type: t.designstudio.examples.egg3.type,
      image: "/egg3.png",
      likes: 189,
      description: t.designstudio.examples.egg3.description,
    },
    {
      name: t.designstudio.examples.egg4.name,
      type: t.designstudio.examples.egg4.type,
      image: "/egg4.png",
      likes: 267,
      description: t.designstudio.examples.egg4.description,
    },
    {
      name: t.designstudio.examples.egg5.name,
      type: t.designstudio.examples.egg5.type,
      image: "/egg5.png",
      likes: 198,
      description: t.designstudio.examples.egg5.description,
    },
    {
      name: t.designstudio.examples.egg6.name,
      type: t.designstudio.examples.egg6.type,
      image: "/egg6.png",
      likes: 145,
      description: t.designstudio.examples.egg6.description,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">

        {/* Back Button */}
        <div className="mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-[#f6e79e] transition-colors text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            {t.designstudio.back}
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
            <Egg className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold text-xs sm:text-sm">
              {t.designstudio.badge}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-manrope leading-tight">
            {t.designstudio.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto px-4">
            {t.designstudio.description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 sm:mb-20">
          <CreateCustomEggCard />
          <CustomizeEggCard />
          <UploadImageEggCard />
        </div>

        {/* Examples */}
        <section className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-manrope">
              {t.designstudio.examples.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              {t.designstudio.examples.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {designExamples.map((example, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={example.image}
                    alt={example.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-xs font-medium text-gray-700">{example.type}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs font-medium bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      {example.description}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{example.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{example.type}</span>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-gray-600">{example.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-[#f6e79e]/20 to-[#f7fcee]/30 rounded-2xl sm:rounded-3xl p-8 sm:p-12 border-2 border-[#f6e79e]/30">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-manrope">
              {t.designstudio.cta.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t.designstudio.cta.description}
            </p>
            <Link href="/catalog" className="flex items-center justify-center gap-2 w-full">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] hover:from-[#f4e285] hover:to-[#f6e79e] text-gray-900 rounded-xl sm:rounded-2xl items-center justify-center gap-2 font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                {t.designstudio.cta.button}
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
