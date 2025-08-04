"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { ArrowLeft, Sparkles, Upload, Palette, Wand2, Image, Star, Heart, Download, Eye, Loader2, X, Egg } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

// Type definition for API response
interface GenerateResponse {
  image: string;
  success: boolean;
  message?: string;
}

function DesignStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [usageCount, setUsageCount] = useState(0);

  const autoSuggestPrompts = [
    // Surreal & Mind-Bending
    "An egg that's actually a miniature black hole with stars spiraling into it, glowing accretion disk, floating in a void with warped light",
    "A glitch-art egg with digital corruption effects, fragmented pixels, and VHS static, hovering over a broken code background",
    "An impossible M.C. Escher egg with infinite staircases wrapping around it in paradoxical geometry, monochrome sketch style",
  
    // Hyper-Futuristic
    "A nanotech egg made of millions of tiny robots reassembling into different shapes, chrome and neon blue, holographic interface projected around it",
    "A quantum physics egg that exists in multiple states at once (cat, galaxy, and cactus simultaneously), shimmering uncertainty effect",
    "A bio-mechanical egg with pulsating veins and OLED screen skin displaying memes, USB-C port at the bottom",
  
    // Dark Fantasy
    "A Lovecraftian horror egg with too many eyes and tentacles emerging from cracks, dripping black ooze, eerie green glow",
    "A post-apocalyptic egg rusted and overgrown with barbed wire, glowing cracks revealing molten lava inside",
    "A vampire egg in a gothic cathedral, stained-glass wings, fangs dripping 'blood' (red glitter)",
  
    // Absurd & Humorous
    "An egg dressed as a Karen demanding to speak to the universe's manager, perm haircut and oversized sunglasses",
    "A dramatic soap opera egg with googly eyes, crying chocolate tears onto a tiny couch, reality TV lighting",
    "An egg that's 90% hotdog (the other 10% is existential dread), ketchup and mustard swirl background",
  
    // Meta & Self-Aware
    "An egg holding a paintbrush painting another egg holding a paintbrush (infinite recursion), art studio backdrop",
    "A glitched '404 Egg Not Found' error egg with broken texture map, floating in cyberspace",
    "An egg made entirely of other tiny eggs (egg-ception), each with microscopic egg designs",
  
    // Extreme Textures
    "An egg carved from frozen fire that somehow doesn't melt, paradoxical icy flames, extreme detail",
    "A liquid mercury egg reflecting a distorted funhouse version of the viewer, animated ripple effect",
    "An egg wrapped in unraveling bandages revealing a black hole inside, mummy-chic aesthetic",
  
    // Pop Culture Mashups
    "An egg doing the 'Distracted Boyfriend' meme with two other eggs, full dramatic lighting",
    "A 'Breaking Bad' egg as Heisenburg in a hazmat suit, tiny blue crystal sprinkles falling",
    "A 'Stranger Things' Upside Down egg with Demogorgon vines and Christmas lights embedded"
  ];
  // Template options for customize mode
  const templates = [
    { id: 'template1', name: 'Classic Easter', image: '/egg1.png', category: 'Traditional' },
    { id: 'template2', name: 'Modern Abstract', image: '/egg2.png', category: 'Contemporary' },
    { id: 'template3', name: 'Nature Inspired', image: '/egg3.png', category: 'Natural' },
    { id: 'template4', name: 'Geometric Pattern', image: '/egg4.png', category: 'Modern' },
    { id: 'template5', name: 'Watercolor Art', image: '/egg5.png', category: 'Artistic' },
    { id: 'template6', name: 'Minimalist Design', image: '/egg6.png', category: 'Simple' }
  ];

  useEffect(() => {
    if (mode === 'create') {
      setTitle('Create Custom Egg');
      setDescription('Use AI to describe your egg and generate a design.');
    } else if (mode === 'customize') {
      setTitle('Enhance Existing Egg');
      setDescription('Select from our templates and modify them.');
    } else if (mode === 'upload') {
      setTitle('Upload Your Image');
      setDescription('Upload any image and we will turn it into an egg design.');
    } else {
      setTitle('Unknown Mode');
      setDescription('');
    }
  }, [mode]);

  // Load usage count from localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem('designStudioUsageCount');
    if (savedCount) {
      setUsageCount(parseInt(savedCount));
    }
  }, []);

  const incrementUsageCount = () => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem('designStudioUsageCount', newCount.toString());
    
    // Show modal after 4 uses
    if (newCount >= 4) {
      setShowCreditsModal(true);
    }
  };

  const handleAutoSuggest = () => {
    const randomIndex = Math.floor(Math.random() * autoSuggestPrompts.length);
    setPrompt(autoSuggestPrompts[randomIndex]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleGenerate = async () => {
    if (mode === 'create' && !prompt.trim()) return;
    if (mode === 'upload' && !selectedImage) return;
    if (mode === 'customize' && !selectedTemplate) return;

    // Check if user has exceeded free credits
    if (usageCount >= 4) {
      setShowCreditsModal(true);
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation process
    setTimeout(() => {
      setIsGenerating(false);
      // For demo purposes, use a placeholder image
      setGeneratedImage('/egg1.png');
      incrementUsageCount();
    }, 3000);
  };

  const handleGenerateCustom = async () => {
    if (mode === 'customize' && !selectedTemplate) return;
    
    if (usageCount >= 4) {
      setShowCreditsModal(true);
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const response = await axios.post<GenerateResponse>('https://all-about-eggs.vercel.app/api/generate-custom', {
        prompt: prompt, 
      });
  
      if (response.data.success && response.data.image) {
        setGeneratedImage(response.data.image);
        incrementUsageCount();
      } else {
        throw new Error(response.data.message || 'Failed to generate image');
      }
      
    } catch (error) {
      console.error("Generation failed:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setPreviewUrl(template.image);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `egg-design-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSave = () => {
    if (generatedImage) {
      // For now, just show a success message
      // In a real app, this would save to user's account
      alert('Design saved to your favorites!');
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/design" className="inline-flex items-center text-gray-600 hover:text-[#f6e79e] transition-colors text-sm sm:text-base mb-4">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Back to Design Options
          </Link>
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-xs sm:text-sm">AI Design Studio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-manrope leading-tight">
              {title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          </div>
        </div>

        {/* Main Content - Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Input Options */}
          <div className="space-y-6">
            {/* Create Mode */}
            {mode === 'create' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200/50 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 font-manrope">Describe Your Design</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Design Prompt</label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe your perfect egg design... (e.g., A magical Easter egg with galaxy patterns and golden stars)"
                      className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f6e79e] resize-none"
                    />
                  </div>
                  
                  <button
                    onClick={handleAutoSuggest}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Auto Suggest Prompt
                  </button>
                </div>
                         {/* Generate Button */}
            <button
              onClick={handleGenerateCustom}
              disabled={isGenerating }
              className="w-full px-6 py-4 mt-8 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] hover:from-[#f4e285] hover:to-[#f6e79e] disabled:from-gray-300 disabled:to-gray-400 text-gray-900 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Design
                </>
              )}
            </button>
              </div>
            )}

            {/* Customize Mode */}
            {mode === 'customize' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200/50 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 font-manrope">Select Template</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleTemplateSelect(template.id)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        selectedTemplate === template.id 
                          ? 'border-[#f6e79e] shadow-lg scale-105' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={template.image}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-xs font-medium">{template.name}</p>
                          <p className="text-white/80 text-xs">{template.category}</p>
                        </div>
                      </div>
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-[#f6e79e] rounded-full flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-gray-900" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                         {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full px-6 py-4 bg-gradient-to-r mt-7 from-[#f6e79e] to-[#f4e285] hover:from-[#f4e285] hover:to-[#f6e79e] disabled:from-gray-300 disabled:to-gray-400 text-gray-900 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Design
                </>
              )}
            </button>
              </div>
            )}

            {/* Upload Mode */}
      {mode === 'upload' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200/50 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 font-manrope">Upload Your Image</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#f6e79e] transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                    </label>
                  </div>
                  
                  {selectedImage && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <Image className="w-8 h-8 text-green-500" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{selectedImage.name}</p>
                          <p className="text-sm text-gray-500">
                            {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedImage(null);
                            setPreviewUrl(null);
                          }}
                          className="p-1 hover:bg-gray-200 rounded-full"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                         {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating }
              className="w-full px-6 mt-8 py-4 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] hover:from-[#f4e285] hover:to-[#f6e79e] disabled:from-gray-300 disabled:to-gray-400 text-gray-900 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Design
                </>
              )}
            </button>
              </div>
            )}
          </div>

          {/* Right Side - Preview */}
          <div className="space-y-6">
            {/* Preview Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200/50 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 font-manrope">Preview</h2>
              </div>
              
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
                {isGenerating ? (
                  <div className="text-center">
                    <Loader2 className="w-16 h-16 text-[#f6e79e] animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Creating your design...</p>
                    <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                  </div>
                ) : generatedImage ? (
                  <div className="relative w-full h-full">
                    <img
                      src={generatedImage}
                      alt="Generated Design"
                      className="w-full h-full object-cover"
                    />
                                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
                       <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                         <button 
                           onClick={handleDownload}
                           className="flex-1 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg font-medium text-gray-900 hover:bg-white transition-colors flex items-center justify-center gap-2"
                         >
                           <Download className="w-4 h-4" />
                           Download
                         </button>
                         <button 
                           onClick={handleSave}
                           className="flex-1 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg font-medium text-gray-900 hover:bg-white transition-colors flex items-center justify-center gap-2"
                         >
                           <Heart className="w-4 h-4" />
                           Save
                         </button>
                       </div>
                     </div>
                  </div>
                ) : previewUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-xs font-medium">Preview</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <Egg className="w-16 h-16 mx-auto mb-4" />
                    <p className="font-medium">No preview available</p>
                    <p className="text-sm mt-1">Complete the form to see your design</p>
                  </div>
                )}
              </div>
            </div>

            {/* Design Info */}
            {generatedImage && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4">Design Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resolution:</span>
                    <span className="font-medium">1024x1024px</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">PNG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Style:</span>
                    <span className="font-medium">
                      {mode === 'create' ? 'AI Generated' : 
                       mode === 'customize' ? 'Template Enhanced' : 
                       'Image Transformed'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Credits Modal */}
      {showCreditsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full my-8 max-h-[calc(100vh-4rem)] flex flex-col">
            {/* Modal Content */}
            <div className="p-8 overflow-y-auto flex-1">
              <div className="text-center">
                {/* Cute Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                
                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-manrope">
                  Aha! 🎨✨
                </h2>
                
                {/* Message */}
                <div className="space-y-4 mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Your free credits for creating designs have ended.
                  </p>
                  <p className="text-base text-gray-600">
                    But don't worry! You've just scratched the surface of what's possible with our AI design studio.
                  </p>
                </div>

                {/* Features List */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
                  <h3 className="font-bold text-gray-900 mb-4">Unlock Unlimited Access:</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm text-gray-700">Unlimited AI generations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm text-gray-700">Premium design templates</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm text-gray-700">High-resolution downloads</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm text-gray-700">Priority customer support</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setShowCreditsModal(false);
                      alert('Coming soon! 🚀\n\nWe\'re working hard to bring you amazing premium features. Stay tuned!');
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    <Sparkles className="w-5 h-5" />
                    Buy Now - Unlock Unlimited Access
                  </button>
                  <button
                    onClick={() => setShowCreditsModal(false)}
                    className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors text-base"
                  >
                    Maybe later
                  </button>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    You've used {usageCount} of 4 free generations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DesignStudio() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DesignStudioContent />
    </Suspense>
  );
}