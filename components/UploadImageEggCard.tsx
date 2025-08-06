// "use client";
// import React, { useState } from 'react'
// import {Image} from 'lucide-react';
// import { useRouter } from 'next/navigation';

// const UploadImageEggCard = () => {
//     const router = useRouter(); 
//     const [selectedOption, setSelectedOption] = useState<string | null>(null);
//     const [prompt, setPrompt] = useState('');
//     const [showLoadingModal, setShowLoadingModal] = useState(false);
//     const [loadingProgress, setLoadingProgress] = useState(0);

//     const designOption  = {
//         id: 'upload',
//         title: 'Make Egg with My Image',
//         description: 'Upload your image to create a custom egg design',
//         icon: <Image className="w-6 h-6" />,
//         color: 'from-green-500 to-emerald-500'
//       }
  
      // const autoSuggestedPrompts = [
      //   "A magical Easter egg with galaxy patterns, featuring swirling nebulas in purple and gold, with tiny stars sparkling across the surface",
      //   "A vintage floral egg with delicate roses and pastel colors, perfect for spring",
      //   "A geometric modern egg with bold geometric shapes and vibrant colors",
      //   "A nature-inspired egg with cherry blossoms and soft pink background",
      //   "A cosmic egg with swirling galaxies and twinkling stars",
      //   "A neon green egg with futuristic patterns and glowing circuits",
      //   "A rainbow-colored egg with smooth gradients and shiny reflections",
      //   "A steampunk-inspired egg with gears, cogs, and metallic textures",
      //   "A minimalistic white egg with subtle marble texture and gold accents",
      //   "An underwater egg with a coral reef design, featuring colorful fish swimming around",
      //   "A winter-themed egg with snowflakes, ice crystals, and a frosty blue tint",
      //   "A pumpkin spice egg with warm orange tones and autumn leaves scattered across",
      //   "A fire-inspired egg with molten lava patterns and glowing embers",
      //   "A psychedelic egg with swirling tie-dye patterns in vivid colors",
      //   "A royal egg with intricate gold detailing, velvet red background, and a crown",
      //   "A superhero egg with comic book-style graphics, bright bold colors, and dynamic lines",
      //   "A mystical moonlit egg with silver and dark blue tones, featuring crescent moons and stars",
      //   "A woodland egg with leafy vines, mushrooms, and soft earthy tones",
      //   "A painter’s egg with splashes of paint in an abstract expressionist style",
      //   "A celestial egg with constellations, shooting stars, and a glowing full moon",
      //   "A tropical egg with palm trees, sunsets, and sandy beach motifs",
      //   "A futuristic egg with holographic reflections, circuit board patterns, and glowing elements",
      //   "A wild animal egg with jungle-themed designs, featuring tigers, zebras, and exotic birds",
      //   "A fantasy dragon egg with scales, fiery breath, and a glowing red interior",
      //   "A candy-inspired egg with colorful sweets, lollipops, and a shiny sugar coating",
      //   "A celestial egg inspired by the northern lights, with soft greens and purples swirling across",
      //   "A vintage circus egg with bold stripes, clowns, and old-school carnival designs"
      // ];
      
  
//     const handleOptionSelect = (optionId: string) => {
//       try {
//         router.push(`/design/studio?mode=${optionId}`);
//         setSelectedOption(optionId);
//         setPrompt('');
//       } catch (error) {
//         console.error('Navigation error:', error);
//         // Fallback: show alert for now
//         alert('Coming soon! This feature is under development.');
//       }
//     };
  
  
//     const handleGenerate = () => {
//       if (!prompt.trim()) return;
      
//       setShowLoadingModal(true);
//       setLoadingProgress(0);
      
//       // Simulate loading progress
//       const interval = setInterval(() => {
//         setLoadingProgress(prev => {
//           if (prev >= 100) {
//             clearInterval(interval);
//             setTimeout(() => {
//               setShowLoadingModal(false);
//               alert('Coming soon! 🎨\n\nWe\'re working hard to bring you amazing AI-powered egg design features!');
//             }, 1000);
//             return 100;
//           }
//           return prev + 16.67; // 100% over 6 seconds
//         });
//       }, 1000);
//     };
  
//     const handleBack = () => {
//       setSelectedOption(null);
//       setPrompt('');
//     };

//     const handleAutoSuggest = () => {
//       const randomIndex = Math.floor(Math.random() * autoSuggestedPrompts.length);
//       setPrompt(autoSuggestedPrompts[randomIndex]);
//     };
    
//   return (
//     <div>
//               <div
//                 key={designOption.id}
//                 onClick={() => handleOptionSelect(designOption.id)}
//                 className="group cursor-pointer"
//               >
//                 <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-gray-200/50 hover:border-[#f6e79e] transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105">
//                   <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${designOption.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
//                     {designOption.icon}
//                   </div>
//                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center font-manrope">
//                     {designOption.title}
//                   </h3>
//                   <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
//                     {designOption.description}
//                   </p>
//                 </div>
//               </div>
//     </div>
//   )
// }

// export default UploadImageEggCard




"use client";
import React, { useState } from 'react';
import { Image } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useTranslation from '@/lib/useTranslation';

const UploadImageEggCard = () => {
  const { t } = useTranslation();
  const router = useRouter(); 
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const designOption  = {
    id: 'upload',
    title: t.uploadImage.title,
    description: t.uploadImage.description,
    icon: <Image className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500'
  };

      const autoSuggestedPrompts = [
        "A magical Easter egg with galaxy patterns, featuring swirling nebulas in purple and gold, with tiny stars sparkling across the surface",
        "A vintage floral egg with delicate roses and pastel colors, perfect for spring",
        "A geometric modern egg with bold geometric shapes and vibrant colors",
        "A nature-inspired egg with cherry blossoms and soft pink background",
        "A cosmic egg with swirling galaxies and twinkling stars",
        "A neon green egg with futuristic patterns and glowing circuits",
        "A rainbow-colored egg with smooth gradients and shiny reflections",
        "A steampunk-inspired egg with gears, cogs, and metallic textures",
        "A minimalistic white egg with subtle marble texture and gold accents",
        "An underwater egg with a coral reef design, featuring colorful fish swimming around",
        "A winter-themed egg with snowflakes, ice crystals, and a frosty blue tint",
        "A pumpkin spice egg with warm orange tones and autumn leaves scattered across",
        "A fire-inspired egg with molten lava patterns and glowing embers",
        "A psychedelic egg with swirling tie-dye patterns in vivid colors",
        "A royal egg with intricate gold detailing, velvet red background, and a crown",
        "A superhero egg with comic book-style graphics, bright bold colors, and dynamic lines",
        "A mystical moonlit egg with silver and dark blue tones, featuring crescent moons and stars",
        "A woodland egg with leafy vines, mushrooms, and soft earthy tones",
        "A painter’s egg with splashes of paint in an abstract expressionist style",
        "A celestial egg with constellations, shooting stars, and a glowing full moon",
        "A tropical egg with palm trees, sunsets, and sandy beach motifs",
        "A futuristic egg with holographic reflections, circuit board patterns, and glowing elements",
        "A wild animal egg with jungle-themed designs, featuring tigers, zebras, and exotic birds",
        "A fantasy dragon egg with scales, fiery breath, and a glowing red interior",
        "A candy-inspired egg with colorful sweets, lollipops, and a shiny sugar coating",
        "A celestial egg inspired by the northern lights, with soft greens and purples swirling across",
        "A vintage circus egg with bold stripes, clowns, and old-school carnival designs"
      ];
      
  const handleOptionSelect = (optionId: string) => {
    try {
      router.push(`/design/studio?mode=${optionId}`);
      setSelectedOption(optionId);
      setPrompt('');
    } catch (error) {
      console.error('Navigation error:', error);
      alert(t.uploadImage.alert);
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setShowLoadingModal(true);
    setLoadingProgress(0);
    
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowLoadingModal(false);
            alert(t.uploadImage.comingSoon);
          }, 1000);
          return 100;
        }
        return prev + 16.67;
      });
    }, 1000);
  };

  const handleBack = () => {
    setSelectedOption(null);
    setPrompt('');
  };

  const handleAutoSuggest = () => {
    const randomIndex = Math.floor(Math.random() * autoSuggestedPrompts.length);
    setPrompt(autoSuggestedPrompts[randomIndex]);
  };
    
  return (
    <div>
      <div
        key={designOption.id}
        onClick={() => handleOptionSelect(designOption.id)}
        className="group cursor-pointer"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-gray-200/50 hover:border-[#f6e79e] transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${designOption.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
            {designOption.icon}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center font-manrope">
            {designOption.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
            {designOption.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadImageEggCard;
