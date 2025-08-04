"use client";
import React from 'react'
import { Wand2 } from 'lucide-react'
import { useRouter } from 'next/navigation';

const CreateCustomEggCard = () => {
    const router = useRouter(); 

    const designOption  =  {
        id: 'create',
        title: 'Customize Existing Egg',
        description: 'Modify and enhance existing egg designs',
        icon: <Wand2 className="w-6 h-6" />,
        color: 'from-blue-500 to-cyan-500'
      }

      const handleOptionSelect = (id: string) => {
        try {
          router.push(`/design/studio?mode=${id}`);
        } catch (error) {
          console.error('Navigation error:', error);
          // Fallback: show alert for now
          alert('Coming soon! This feature is under development.');
        }
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
  )
}

export default CreateCustomEggCard
