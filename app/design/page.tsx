"use client";

import { useState } from 'react';
import { Egg, Sparkles, Palette, Image, Wand2, Loader2, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface DesignOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function DesignPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const designOptions: DesignOption[] = [
    {
      id: 'custom',
      title: 'Create Custom Egg',
      description: 'Design your egg from scratch with AI assistance',
      icon: <Palette className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'customize',
      title: 'Customize Existing Egg',
      description: 'Modify and enhance existing egg designs',
      icon: <Wand2 className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'image',
      title: 'Make Egg with My Image',
      description: 'Upload your image to create a custom egg design',
      icon: <Image className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const autoSuggestedPrompts = [
    "A magical Easter egg with galaxy patterns, featuring swirling nebulas in purple and gold, with tiny stars sparkling across the surface",
    "A vintage floral egg with delicate roses and pastel colors, perfect for spring",
    "A geometric modern egg with bold geometric shapes and vibrant colors",
    "A nature-inspired egg with cherry blossoms and soft pink background",
    "A cosmic egg with swirling galaxies and twinkling stars"
  ];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setPrompt('');
  };

  const handleAutoSuggest = () => {
    const randomPrompt = autoSuggestedPrompts[Math.floor(Math.random() * autoSuggestedPrompts.length)];
    setPrompt(randomPrompt);
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setShowLoadingModal(true);
    setLoadingProgress(0);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowLoadingModal(false);
            alert('Coming soon! 🎨\n\nWe\'re working hard to bring you amazing AI-powered egg design features!');
          }, 1000);
          return 100;
        }
        return prev + 16.67; // 100% over 6 seconds
      });
    }, 1000);
  };

  const handleBack = () => {
    setSelectedOption(null);
    setPrompt('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fcee] via-white to-[#f6e79e]/20">
      <Header cartItems={0} cartTotal={0} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-[#f6e79e] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 px-4 py-2 rounded-full mb-6">
            <Egg className="w-5 h-5" />
            <span className="font-semibold text-sm">AI Design Studio</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-manrope">
            Design Your Egg
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This is an example of how users can design their egg.
          </p>
        </div>

        {!selectedOption ? (
          /* Main Options */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-stretch">
            {designOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className="group cursor-pointer"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-gray-200/50 hover:border-[#f6e79e] transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center font-manrope">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Design Interface */
          <div className="max-w-4xl mx-auto">
            {/* Option Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border-2 border-gray-200/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleBack}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-manrope">
                      {designOptions.find(opt => opt.id === selectedOption)?.title}
                    </h2>
                    <p className="text-gray-600">
                      {designOptions.find(opt => opt.id === selectedOption)?.description}
                    </p>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${designOptions.find(opt => opt.id === selectedOption)?.color} rounded-xl flex items-center justify-center text-white`}>
                  {designOptions.find(opt => opt.id === selectedOption)?.icon}
                </div>
              </div>
            </div>

            {/* Design Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-gray-200/50">
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 mb-3 font-manrope">
                  Describe Your Egg Design
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A magical Easter egg with galaxy patterns, featuring swirling nebulas in purple and gold, with tiny stars sparkling across the surface..."
                  className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-[#f6e79e] focus:outline-none resize-none text-gray-700 placeholder-gray-400"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Tip: Be specific about colors, patterns, and themes for best results!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAutoSuggest}
                  className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold transition-all transform hover:scale-105 hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Auto Suggested Prompt
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim()}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                    !prompt.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 hover:from-[#f4e285] hover:to-[#f6e79e]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  Generate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading Modal */}
      {showLoadingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-gray-700 animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-manrope">
                Generating your egg...
              </h3>
              <p className="text-gray-600">
                Our AI is creating something magical for you!
              </p>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-[#f6e79e] to-[#f4e285] h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            
            <p className="text-sm text-gray-500">
              {Math.round(loadingProgress)}% complete
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
} 