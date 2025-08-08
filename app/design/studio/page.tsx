"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { ArrowLeft, Sparkles, Upload, Palette, Wand2, Image, Star, Heart, Download, Eye, Loader2, X, Egg } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

import useTranslation from '@/lib/useTranslation';
// Type definition for API response
interface GenerateResponse {
  image: string;
  success: boolean;
  message?: string;
}

function DesignStudioContent() {
   const { t } = useTranslation();
  const router = useRouter();
  const [mode, setMode] = useState<string | null>(null);

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

  // Get mode from URL parameters on client side
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlMode = searchParams.get('mode');
    setMode(urlMode);
  }, []);

  const autoSuggestedPrompts = t.designStudio.autoSuggestedPrompt as string[];

// Later in the JSX
{autoSuggestedPrompts.map((prompt, index) => (
  <div key={index}>{prompt}</div>
))}
const templates = [
  { id: 'template1', name: t.designStudio.classicEaster, image: '/egg1.png', category: t.designStudio.traditional },
  { id: 'template2', name: t.designStudio.modernAbstract, image: '/egg2.png', category: t.designStudio.contemporary },
  { id: 'template3', name: t.designStudio.natureInspired, image: '/egg3.png', category: t.designStudio.natural },
  { id: 'template4', name: t.designStudio.geometricPattern, image: '/egg4.png', category: t.designStudio.modern},
  { id: 'template5', name: t.designStudio.watercolorArt, image: '/egg5.png', category: t.designStudio.artistic},
  { id: 'template6', name: t.designStudio.minimalistDesign, image: '/egg6.png', category: t.designStudio.simple},
];

useEffect(() => {
  if (mode === 'create') {
    setTitle(t.designStudio.title1);
    setDescription(t.designStudio.description1);
  } else if (mode === 'customize') {
    setTitle(t.designStudio.title2);
    setDescription(t.designStudio.description2);
  } else if (mode === 'upload') {
    setTitle(t.designStudio.title3);
    setDescription(t.designStudio.description3);
  } else {
    setTitle(t.designStudio.title4);
    setDescription('');
  }
}, [mode, t]);


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
  const randomIndex = Math.floor(Math.random() * autoSuggestedPrompts.length);
  setPrompt(autoSuggestedPrompts[randomIndex]);
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
  throw new Error(response.data.message || t.designStudio.generationFailed);
}

      
    } catch (error) {
      console.error("Generation failed:", error);
      alert(t.designStudio.generationAlert);
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
      alert(t.designStudio.saveSuccess);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/design" className="inline-flex items-center text-gray-600 hover:text-[#f6e79e] transition-colors text-sm sm:text-base mb-4">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            {t.designStudio.backToOptions}
          </Link>
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-xs sm:text-sm">{t.designStudio['main-title']}</span>
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
                  <h2 className="text-xl font-bold text-gray-900 font-manrope">
                    {t.designStudio.describeDesign}
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.designStudio.designPrompt}
                    </label>
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
                  {t.designStudio.autoSuggestPrompt}
                  </button>
                </div>
                         {/* Generate Button */}
       <button
  onClick={handleGenerateCustom}
  disabled={isGenerating}
  className="w-full px-6 py-4 mt-8 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] hover:from-[#f4e285] hover:to-[#f6e79e] disabled:from-gray-300 disabled:to-gray-400 text-gray-900 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
>
  {isGenerating ? (
    <>
      <Loader2 className="w-5 h-5 animate-spin" />
      {t.designStudio.generating}
    </>
  ) : (
    <>
      <Wand2 className="w-5 h-5" />
      {t.designStudio.generateDesign}
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
                  <h2 className="text-xl font-bold text-gray-900 font-manrope">
                    {t.designStudio.selectTemplate}
                  </h2>
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
                  {t.designStudio.generating}
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  {t.designStudio.generateDesign}
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
                  <h2 className="text-xl font-bold text-gray-900 font-manrope">
                    {t.designStudio.uploadYourImage}
                  </h2>
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
                      <p className="text-gray-600 mb-2">
                        {t.designStudio.clickToUpload}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t.designStudio.uploadFormatsNote}
                      </p>
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
                 {t.designStudio.generating}
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  {t.designStudio.generateDesign}
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
                <h2 className="text-xl font-bold text-gray-900 font-manrope">
                  {t.designStudio.preview}
                </h2>
              </div>
              
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
                {isGenerating ? (
                  <div className="text-center">
                    <Loader2 className="w-16 h-16 text-[#f6e79e] animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">
                      {t.designStudio.creating_design}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {t.designStudio.creating_design_note}
                    </p>
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
                            {t.designStudio.download}
                         </button>
                         <button 
                           onClick={handleSave}
                           className="flex-1 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg font-medium text-gray-900 hover:bg-white transition-colors flex items-center justify-center gap-2"
                         >
                           <Heart className="w-4 h-4" />
                            {t.designStudio.save}
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
                      <span className="text-white text-xs font-medium">
                        {t.designStudio.preview}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <Egg className="w-16 h-16 mx-auto mb-4" />
                    <p className="font-medium">
                      {t.designStudio.no_preview}
                    </p>
                    <p className="text-sm mt-1">
                      {t.designStudio.complete_form}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Design Info */}
            {generatedImage && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4">
                  {t.designStudio.design_info}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t.designStudio.resolution}
                    </span>
                    <span className="font-medium">1024x1024px</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t.designStudio.format}
                    </span>
                    <span className="font-medium">PNG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t.designStudio.style}
                    </span>
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
                 {t.designStudio.creditsEndedTitle}
                </h2>
                
                {/* Message */}
                <div className="space-y-4 mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t.designStudio.creditsEndedMessage1}
                  </p>
                  <p className="text-base text-gray-600">
                    {t.designStudio.creditsEndedMessage2}
                  </p>
                </div>

                {/* Features List */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
                  <h3 className="font-bold text-gray-900 mb-4">
                    {t.designStudio.unlockTitle}
                  </h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm text-gray-700">
                        {t.designStudio.benefit1}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm text-gray-700">
                         {t.designStudio.benefit2}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm text-gray-700">
                         {t.designStudio.benefit3}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm text-gray-700">
                        {t.designStudio.benefit4}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setShowCreditsModal(false);
                      alert(t.designStudio.alertmsg);
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    <Sparkles className="w-5 h-5" />
                             {t.designStudio.unlimitedbtn}
                  </button>
                  <button
                    onClick={() => setShowCreditsModal(false)}
                    className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors text-base"
                  >
                    {t.designStudio.maybe}
                  </button>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                   {t.designStudio.usage}
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