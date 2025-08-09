
// 'use client';

// import useTranslation from '@/lib/useTranslation';
// import React from 'react';
// import Image from 'next/image';
// import { Egg, Sparkles } from 'lucide-react';
// import Button from './Button';
// import Link from 'next/link';

// export default function Hero() {
//    const { t } = useTranslation();
//   const eggImages = [
//     'eggs images/A01ED9DF-9438-4E70-B773-60A2C41A82F3.PNG',
//     'eggs images/A1C8EC8B-F376-4179-9677-5EEB3BED10E1.PNG',
//     'eggs images/78F51BD8-2667-4818-A8EB-F96F9A75C762.PNG',
//     'eggs images/985F746C-6F78-4E2A-BD7F-20F49045629D.PNG',
//     'eggs images/900607D2-4C7C-4EA3-BED1-CEC884AC396F.PNG',
//     'eggs images/B96EC52A-B308-4F59-BDF1-FF4634AF366F.PNG',
//     'eggs images/5A1D36A7-05A2-4D73-862E-478A4C6B175A.PNG',
//     'eggs images/20A37086-FD6B-4CA4-A663-92783F0D587A.PNG',
//     'eggs images/D05371AC-8A6A-420F-8EDB-CEA5A00AE606.PNG',
//     'eggs images/D0126C2C-603B-471C-820E-370773708853.PNG',
//     'eggs images/7F9DC646-284C-4E7F-8FBF-AA6A3F60096C.PNG',
//     'eggs images/EF92674E-D04F-42F7-8308-DA4FF3C17BE1.PNG',
//     'eggs images/BA0EA02E-9CD8-4405-92AB-A91969CB36D9.PNG',
//     'eggs images/09FF42F9-2664-4698-8FD8-E544A47D616B.PNG',
//     'eggs images/EE3B1C9F-EE9B-41F0-AADE-A1785767ECF8.PNG',
//     'eggs images/FC7DEB0F-9010-41FF-A9DE-05AC0CE582DB.PNG',
//     'eggs images/A1C1364A-0881-4FD4-8863-942528923EF4.PNG',
//     'eggs images/409969A2-15D6-417E-BB80-7F5514D4C420.PNG',
//     'eggs images/F2B512AE-60BB-403D-A6F1-C7D8B963DDF4.PNG',
//     'eggs images/C35ACEE8-3CC4-4372-BE84-6658357CED6A.PNG',
//     'eggs images/C2084B60-843C-45F9-85CA-FC4D5099707B.PNG',
//     'eggs images/5D6FB616-991D-4FF4-8188-8DD066C89F60.PNG',
//     'eggs images/D1ED21D6-2288-497B-AF9D-BDA37D4FEB9D.PNG',
//     'eggs images/12ABB356-852A-4C46-97EF-C93BAD83AD37.PNG',
//     'eggs images/74AB1B49-6171-4D10-94D7-D9A2F0CD87A9.PNG',
//   ];

//   return (
//   <section className="relative pt-20 pb-16 px-4 !font-poppins overflow-hidden">
//     {/* Background Image */}
//     <div 
//       className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
//       style={{
//         backgroundImage: `url('mood image/IMG_1218.jpg')`
//       }}
//     />
//     {/* Overlay */}
//     <div className="absolute inset-0 bg-gradient-to-l from-[#f7fcee]/30 to-[#f6e79e]/20" />

//     {/* Content */}
//     <div className="relative z-10">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           {/* Left Content */}
//           <div className="text-center lg:text-left">
//             <div className="flex items-center justify-center lg:justify-start space-x-3 mb-5">
//               <div className="bg-[#f6e79e] p-2 rounded-full shadow-inner">
//                 <Sparkles className="h-5 w-5 text-amber-600 animate-pulse" />
//               </div>
//               <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                 {t.hero.tagline}
//               </span>
//             </div>

//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-manrope leading-tight">
//               {t.hero.titleLine1}
//               <span className="text-[#f6e79e] text-shadow-2xs shadow-black whitespace-nowrap block">{t.hero.titleLine2}</span>

//             </h1>

//             <p className="text-lg text-gray-700 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
//               {t.hero.description}
//             </p>

//             <div className="">
//               <Link href="/catalog">
//                 <Button className="flex md:w-3/5">
//                   <Sparkles className="w-5 h-5 mr-2" />
//                   {t.hero.createSet}
//                 </Button>
//               </Link>
//             </div>
//           </div>

//           {/* Right Content - Egg Grid */}
//           <div className="grid grid-cols-5 gap-3 max-w-7xl mx-auto lg:max-w-2xl">
//             {eggImages.map((fileName, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 transform hover:scale-110 overflow-hidden"
//               >
//                 <Image
//                   src={`/${fileName}`}
//                   alt={`Egg design ${index + 1}`}
//                   width={200}
//                   height={200}
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// }


'use client';

import useTranslation from '@/lib/useTranslation';
import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import Button from './Button';
import Link from 'next/link';

export default function Hero() {
  const { t } = useTranslation();
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
    <section className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 font-poppins overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('mood image/IMG_1218.jpg')`
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#f7fcee]/30 to-[#f6e79e]/20" />

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-5">
                <div className="bg-[#f6e79e] p-2 rounded-full shadow-inner">
                  <Sparkles className="h-5 w-5 text-amber-600 animate-pulse" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  {t.hero.tagline}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold font-manrope leading-tight">
                {t.hero.titleLine1}
                <span className="text-[#f6e79e] text-shadow-2xs shadow-black whitespace-nowrap block">
                  {t.hero.titleLine2}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-700 mb-8 sm:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {t.hero.description}
              </p>

              <div className="flex justify-center lg:justify-start">
                <Link href="/catalog">
                  <Button className="px-6 py-3 text-sm sm:text-base flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    {t.hero.createSet}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Egg Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 max-w-full lg:max-w-2xl mx-auto">
              {eggImages.map((fileName, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 transform hover:scale-105 overflow-hidden"
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
