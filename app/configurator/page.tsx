'use client';

import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Gift, 
  Wand2, 
  ShoppingCart, 
  ArrowLeft, 
  X, 
  Plus, 
  RefreshCw, 
  Check,
  Settings,
  Palette,
  Zap,
  Upload,
  Eye,
  Download,
  Heart,
  Loader2,
  Egg
} from 'lucide-react';
import Image from 'next/image';
import useTranslation from '@/lib/useTranslation';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Type definition for API response
interface GenerateResponse {
  image: string;
  success: boolean;
  message?: string;
}

export default function ConfiguratorPage() {
  const { t } = useTranslation();
  
  // Main state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState<'L' | 'XL' | 'XXL' | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [selectedDesigns, setSelectedDesigns] = useState<any[]>([]);
  const [showSurprisePreview, setShowSurprisePreview] = useState(false);
  const [surpriseDesigns, setSurpriseDesigns] = useState<any[]>([]);
  
  // Enhanced AI Studio states
  const [aiStep, setAiStep] = useState<'prompt' | 'generating' | 'result'>('prompt');
  const [aiPrompt, setAiPrompt] = useState('A magical Easter egg with galaxy patterns and golden stars');
  const [aiProgress, setAiProgress] = useState(0);
  const [generatedDesign, setGeneratedDesign] = useState<any>(null);
  const [showAISection, setShowAISection] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [aiMode, setAiMode] = useState<'create' | 'customize' | 'upload'>('create');
  
  // Cart state
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Set sizes configuration
  const setSizes = [
    { 
      name: 'L', 
      cards: 24, 
      price: 29.99,
      description: 'Perfect for small families',
      popular: false
    },
    { 
      name: 'XL', 
      cards: 48, 
      price: 49.99,
      description: 'Most popular choice',
      popular: true
    },
    { 
      name: 'XXL', 
      cards: 96, 
      price: 89.99,
      description: 'For large gatherings',
      popular: false
    }
  ];

  // Preset collections
  const presetCollections = [
    {
      id: 'easter',
      name: 'Easter Collection',
      description: 'Spring joy and bunny magic',
      count: 24,
      image: '/eggs images/A01ED9DF-9438-4E70-B773-60A2C41A82F3.PNG',
      designs: [
        { id: 1, name: 'Easter Bunny Delight', image: '/eggs images/A01ED9DF-9438-4E70-B773-60A2C41A82F3.PNG' },
        { id: 2, name: 'Spring Bloom Magic', image: '/eggs images/A1C8EC8B-F376-4179-9677-5EEB3BED10E1.PNG' },
        { id: 3, name: 'Pastel Rainbow Dream', image: '/eggs images/78F51BD8-2667-4818-A8EB-F96F9A75C762.PNG' },
        { id: 4, name: 'Floral Garden Party', image: '/eggs images/985F746C-6F78-4E2A-BD7F-20F49045629D.PNG' },
        { id: 5, name: 'Easter Egg Hunt', image: '/eggs images/900607D2-4C7C-4EA3-BED1-CEC884AC396F.PNG' },
        { id: 6, name: 'Spring Chick Adventure', image: '/eggs images/B96EC52A-B308-4F59-BDF1-FF4634AF366F.PNG' },
        { id: 7, name: 'Easter Basket Joy', image: '/eggs images/5A1D36A7-05A2-4D73-862E-478A4C6B175A.PNG' },
        { id: 8, name: 'Pastel Paradise', image: '/eggs images/20A37086-FD6B-4CA4-A663-92783F0D587A.PNG' },
        { id: 9, name: 'Easter Morning Glory', image: '/eggs images/D05371AC-8A6A-420F-8EDB-CEA5A00AE606.PNG' },
        { id: 10, name: 'Spring Awakening', image: '/eggs images/D0126C2C-603B-471C-820E-370773708853.PNG' },
        { id: 11, name: 'Easter Eggstravaganza', image: '/eggs images/7F9DC646-284C-4E7F-8FBF-AA6A3F60096C.PNG' },
        { id: 12, name: 'Pastel Harmony', image: '/eggs images/EF92674E-D04F-42F7-8308-DA4FF3C17BE1.PNG' },
        { id: 13, name: 'Easter Joy', image: '/eggs images/BA0EA02E-9CD8-4405-92AB-A91969CB36D9.PNG' },
        { id: 14, name: 'Spring Celebration', image: '/eggs images/09FF42F9-2664-4698-8FD8-E544A47D616B.PNG' },
        { id: 15, name: 'Easter Wonderland', image: '/eggs images/EE3B1C9F-EE9B-41F0-AADE-A1785767ECF8.PNG' },
        { id: 16, name: 'Easter Magic', image: '/eggs images/A01ED9DF-9438-4E70-B773-60A2C41A82F3.PNG' },
        { id: 17, name: 'Spring Delight', image: '/eggs images/A1C8EC8B-F376-4179-9677-5EEB3BED10E1.PNG' },
        { id: 18, name: 'Easter Dreams', image: '/eggs images/78F51BD8-2667-4818-A8EB-F96F9A75C762.PNG' },
        { id: 19, name: 'Pastel Spring', image: '/eggs images/985F746C-6F78-4E2A-BD7F-20F49045629D.PNG' },
        { id: 20, name: 'Easter Charm', image: '/eggs images/900607D2-4C7C-4EA3-BED1-CEC884AC396F.PNG' },
        { id: 21, name: 'Spring Magic', image: '/eggs images/B96EC52A-B308-4F59-BDF1-FF4634AF366F.PNG' },
        { id: 22, name: 'Easter Bliss', image: '/eggs images/5A1D36A7-05A2-4D73-862E-478A4C6B175A.PNG' },
        { id: 23, name: 'Pastel Dreams', image: '/eggs images/20A37086-FD6B-4CA4-A663-92783F0D587A.PNG' },
        { id: 24, name: 'Easter Wonder', image: '/eggs images/D05371AC-8A6A-420F-8EDB-CEA5A00AE606.PNG' },
      ]
    },
    {
      id: 'nature',
      name: 'Nature Collection',
      description: 'Earth\'s beauty in every card',
      count: 24,
      image: '/eggs images/E74484D8-5397-4B11-AC94-49D1F1AA05DA.PNG',
      designs: [
        { id: 28, name: 'Forest Whisper', image: '/eggs images/E74484D8-5397-4B11-AC94-49D1F1AA05DA.PNG' },
        { id: 29, name: 'Ocean Depths', image: '/eggs images/C45C3AAA-999C-4D28-866C-ED60247B38DA.PNG' },
        { id: 30, name: 'Mountain Majesty', image: '/eggs images/FFB0A181-F174-4265-A600-BB6CBD8AD68F.PNG' },
        { id: 31, name: 'Desert Sunset', image: '/eggs images/1D183BF4-5321-4CD1-9A88-9E1B0EE2756A.PNG' },
        { id: 32, name: 'Tropical Paradise', image: '/eggs images/2B56B7A1-95A1-4348-BB4E-8C039CF9A5E6.PNG' },
        { id: 33, name: 'Arctic Aurora', image: '/eggs images/E37F5708-3D61-46B6-A872-804A5DCE3549.PNG' },
        { id: 34, name: 'Garden Symphony', image: '/eggs images/BA7F578A-E63C-4015-A821-32EE5943F69A 2.PNG' },
        { id: 35, name: 'Wilderness Call', image: '/eggs images/1A13F1D5-56EE-4ABB-8EBF-6472C571F8C0 2.PNG' },
        { id: 36, name: 'Natural Harmony', image: '/eggs images/49EBD2EA-DB4E-498C-B362-5CC7BC8D8EFC 2.PNG' },
        { id: 37, name: 'Earth Elements', image: '/eggs images/E6EC4F06-A22A-418F-A17A-4914AA3FD4B4 2.PNG' },
        { id: 38, name: 'Nature\'s Beauty', image: '/eggs images/E74484D8-5397-4B11-AC94-49D1F1AA05DA.PNG' },
        { id: 39, name: 'Forest Magic', image: '/eggs images/C45C3AAA-999C-4D28-866C-ED60247B38DA.PNG' },
        { id: 40, name: 'Ocean Waves', image: '/eggs images/FFB0A181-F174-4265-A600-BB6CBD8AD68F.PNG' },
        { id: 41, name: 'Mountain Peak', image: '/eggs images/1D183BF4-5321-4CD1-9A88-9E1B0EE2756A.PNG' },
        { id: 42, name: 'Desert Storm', image: '/eggs images/2B56B7A1-95A1-4348-BB4E-8C039CF9A5E6.PNG' },
        { id: 43, name: 'Tropical Breeze', image: '/eggs images/E37F5708-3D61-46B6-A872-804A5DCE3549.PNG' },
        { id: 44, name: 'Arctic Frost', image: '/eggs images/BA7F578A-E63C-4015-A821-32EE5943F69A 2.PNG' },
        { id: 45, name: 'Garden Bloom', image: '/eggs images/1A13F1D5-56EE-4ABB-8EBF-6472C571F8C0 2.PNG' },
        { id: 46, name: 'Wilderness Trail', image: '/eggs images/49EBD2EA-DB4E-498C-B362-5CC7BC8D8EFC 2.PNG' },
        { id: 47, name: 'Natural Wonder', image: '/eggs images/E6EC4F06-A22A-418F-A17A-4914AA3FD4B4 2.PNG' },
        { id: 48, name: 'Earth\'s Gift', image: '/eggs images/E74484D8-5397-4B11-AC94-49D1F1AA05DA.PNG' },
        { id: 49, name: 'Forest Echo', image: '/eggs images/C45C3AAA-999C-4D28-866C-ED60247B38DA.PNG' },
        { id: 50, name: 'Ocean Calm', image: '/eggs images/FFB0A181-F174-4265-A600-BB6CBD8AD68F.PNG' },
        { id: 51, name: 'Mountain View', image: '/eggs images/1D183BF4-5321-4CD1-9A88-9E1B0EE2756A.PNG' },
      ]
    },
    {
      id: 'abstract',
      name: 'Abstract Collection',
      description: 'Modern art and creativity',
      count: 24,
      image: '/eggs images/FC7DEB0F-9010-41FF-A9DE-05AC0CE582DB.PNG',
      designs: [
        { id: 52, name: 'Cosmic Galaxy', image: '/eggs images/FC7DEB0F-9010-41FF-A9DE-05AC0CE582DB.PNG' },
        { id: 53, name: 'Neon Dreams', image: '/eggs images/A1C1364A-0881-4FD4-8863-942528923EF4.PNG' },
        { id: 54, name: 'Digital Matrix', image: '/eggs images/409969A2-15D6-417E-BB80-7F5514D4C420.PNG' },
        { id: 55, name: 'Geometric Harmony', image: '/eggs images/F2B512AE-60BB-403D-A6F1-C7D8B963DDF4.PNG' },
        { id: 56, name: 'Abstract Expression', image: '/eggs images/C35ACEE8-3CC4-4372-BE84-6658357CED6A.PNG' },
        { id: 57, name: 'Modern Minimalist', image: '/eggs images/C2084B60-843C-45F9-85CA-FC4D5099707B.PNG' },
        { id: 58, name: 'Artistic Flow', image: '/eggs images/5D6FB616-991D-4FF4-8188-8DD066C89F60.PNG' },
        { id: 59, name: 'Contemporary Chaos', image: '/eggs images/D1ED21D6-2288-497B-AF9D-BDA37D4FEB9D.PNG' },
        { id: 60, name: 'Abstract Symphony', image: '/eggs images/12ABB356-852A-4C46-97EF-C93BAD83AD37.PNG' },
        { id: 61, name: 'Digital Artistry', image: '/eggs images/74AB1B49-6171-4D10-94D7-D9A2F0CD87A9.PNG' },
        { id: 62, name: 'Modern Geometry', image: '/eggs images/2B56B7A1-95A1-4348-BB4E-8C039CF9A5E6 2.PNG' },
        { id: 63, name: 'Abstract Fusion', image: '/eggs images/E4513E64-1FAF-4F88-81C1-51D9E43AF23B.PNG' },
        { id: 64, name: 'Cosmic Dreams', image: '/eggs images/FC7DEB0F-9010-41FF-A9DE-05AC0CE582DB.PNG' },
        { id: 65, name: 'Neon Vibes', image: '/eggs images/A1C1364A-0881-4FD4-8863-942528923EF4.PNG' },
        { id: 66, name: 'Digital Flow', image: '/eggs images/409969A2-15D6-417E-BB80-7F5514D4C420.PNG' },
        { id: 67, name: 'Geometric Bliss', image: '/eggs images/F2B512AE-60BB-403D-A6F1-C7D8B963DDF4.PNG' },
        { id: 68, name: 'Abstract Magic', image: '/eggs images/C35ACEE8-3CC4-4372-BE84-6658357CED6A.PNG' },
        { id: 69, name: 'Modern Art', image: '/eggs images/C2084B60-843C-45F9-85CA-FC4D5099707B.PNG' },
        { id: 70, name: 'Artistic Vision', image: '/eggs images/5D6FB616-991D-4FF4-8188-8DD066C89F60.PNG' },
        { id: 71, name: 'Contemporary Art', image: '/eggs images/D1ED21D6-2288-497B-AF9D-BDA37D4FEB9D.PNG' },
        { id: 72, name: 'Abstract Vision', image: '/eggs images/12ABB356-852A-4C46-97EF-C93BAD83AD37.PNG' },
        { id: 73, name: 'Digital Dreams', image: '/eggs images/74AB1B49-6171-4D10-94D7-D9A2F0CD87A9.PNG' },
        { id: 74, name: 'Modern Fusion', image: '/eggs images/2B56B7A1-95A1-4348-BB4E-8C039CF9A5E6 2.PNG' },
        { id: 75, name: 'Abstract Bliss', image: '/eggs images/E4513E64-1FAF-4F88-81C1-51D9E43AF23B.PNG' },
      ]
    }
  ];

  // AI Studio Templates
  const templates = [
    { id: 'template1', name: 'Classic Easter', image: '/egg1.png', category: 'Traditional' },
    { id: 'template2', name: 'Modern Abstract', image: '/egg2.png', category: 'Contemporary' },
    { id: 'template3', name: 'Nature Inspired', image: '/egg3.png', category: 'Natural' },
    { id: 'template4', name: 'Geometric Pattern', image: '/egg4.png', category: 'Modern' },
    { id: 'template5', name: 'Watercolor Art', image: '/egg5.png', category: 'Artistic' },
    { id: 'template6', name: 'Minimalist Design', image: '/egg6.png', category: 'Simple' },
  ];

  // Auto-suggested prompts
  const autoSuggestedPrompts = [
    "A magical Easter egg with galaxy patterns and golden stars",
    "A whimsical forest egg with mushrooms and fairy lights",
    "A geometric egg with modern abstract patterns",
    "A watercolor egg with soft pastel flowers",
    "A minimalist egg with clean lines and elegant design",
    "A nature-inspired egg with leaves and branches"
  ];

  // Calculate current set size and completion status
  const currentSetSize = selectedSize ? setSizes.find(s => s.name === selectedSize)?.cards || 48 : 0;
  const filledSlots = selectedDesigns.length;
  const isSetComplete = selectedSize ? filledSlots >= currentSetSize : false;

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedSize) return 0;
    const basePrice = setSizes.find(s => s.name === selectedSize)?.price || 0;
    return basePrice;
  };

  // Load saved state from localStorage
  useEffect(() => {
    const loadSavedState = () => {
      const savedState = localStorage.getItem('configuratorState');
      if (savedState) {
        const state = JSON.parse(savedState);
        setSelectedSize(state.selectedSize || null);
        setSelectedPreset(state.selectedPreset || '');
        setSelectedDesigns(state.selectedDesigns || []);
        setCurrentStep(state.currentStep || 1);
      }
    };

    // Load state on mount
    loadSavedState();

    // Listen for localStorage changes (works across different tabs/windows)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'configuratorState') {
        loadSavedState();
      }
    };

    // Listen for page visibility changes (when user returns from wishlist)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Small delay to ensure localStorage is updated
        setTimeout(() => {
          loadSavedState();
        }, 100);
      }
    };

    // Listen for custom events from wishlist
    const handleWishlistUpdate = () => {
      // Small delay to ensure localStorage is updated
      setTimeout(() => {
        loadSavedState();
      }, 100);
    };

    // Listen for focus events (when user returns to tab)
    const handleFocus = () => {
      setTimeout(() => {
        loadSavedState();
      }, 100);
    };

    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('eggfinity-wishlist-updated', handleWishlistUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('eggfinity-wishlist-updated', handleWishlistUpdate);
    };
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('configuratorState', JSON.stringify({
      selectedSize,
      selectedPreset,
      selectedDesigns,
      currentStep
    }));
  }, [selectedSize, selectedPreset, selectedDesigns, currentStep]);

  // Auto-advance to step 3 when set is complete
  useEffect(() => {
    if (isSetComplete && currentStep < 3) {
      setCurrentStep(3);
    }
  }, [isSetComplete, currentStep]);

  // Load usage count from localStorage for AI Studio
  useEffect(() => {
    const savedCount = localStorage.getItem('designStudioUsageCount');
    if (savedCount) {
      setUsageCount(parseInt(savedCount));
    }
  }, []);

  // Load cart items from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Initialize AI prompt when AI Studio is opened
  useEffect(() => {
    if (showAISection && aiMode === 'create' && !aiPrompt.trim()) {
      setAiPrompt('A magical Easter egg with galaxy patterns and golden stars');
    }
  }, [showAISection, aiMode]);

  // Handle set size selection
  const handleSizeSelect = (size: 'L' | 'XL' | 'XXL') => {
    const newSize = setSizes.find(s => s.name === size)?.cards || 48;
    const currentSize = selectedSize ? setSizes.find(s => s.name === selectedSize)?.cards || 48 : 0;
    
    setSelectedSize(size);
    
    if (newSize > currentSize) {
      // If upgrading to larger size, keep existing designs and auto-fill remaining slots
      if (selectedDesigns.length > 0) {
        setTimeout(() => {
          autoFillSlotsForSize(newSize);
        }, 100);
      }
    } else if (newSize < currentSize && currentSize > 0) {
      // If downgrading to smaller size, truncate the designs
      setSelectedDesigns(selectedDesigns.slice(0, newSize));
    }
    
    setCurrentStep(2);
  };

  // Handle preset selection
  const handlePresetSelect = (presetId: string) => {
    if (!selectedSize) return; // Don't proceed if no size is selected
    
    setSelectedPreset(presetId);
    const preset = presetCollections.find(p => p.id === presetId);
    if (preset) {
      const currentSize = setSizes.find(s => s.name === selectedSize)?.cards || 48;
      const presetDesigns = preset.designs.slice(0, currentSize);
      setSelectedDesigns(presetDesigns);
      
      // If preset doesn't fill all slots, auto-fill the remaining
      if (presetDesigns.length < currentSize) {
        setTimeout(() => {
          autoFillSlotsForSize(currentSize);
        }, 100);
      }
    }
    setCurrentStep(3);
  };

  // Generate surprise set
  const generateSurpriseSet = () => {
    if (!selectedSize) return; // Don't proceed if no size is selected
    
    const currentSize = setSizes.find(s => s.name === selectedSize)?.cards || 48;
    const allDesigns = presetCollections.flatMap(collection => collection.designs);
    const shuffled = [...allDesigns].sort(() => 0.5 - Math.random());
    const surpriseSet = shuffled.slice(0, currentSize);
    setSurpriseDesigns(surpriseSet);
    setSelectedDesigns(surpriseSet);
    setShowSurprisePreview(true);
    setCurrentStep(3);
  };

  // AI Design generation
  const generateAIDesign = async () => {
    if (!aiPrompt.trim()) return;
    
    setAiStep('generating');
    setAiProgress(0);
    
    // Simulate AI generation
    const interval = setInterval(() => {
      setAiProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate generated design
          setGeneratedDesign({
            id: Date.now(),
            name: `AI Generated: ${aiPrompt}`,
            image: '/eggs images/A01ED9DF-9438-4E70-B773-60A2C41A82F3.PNG', // Placeholder
            prompt: aiPrompt
          });
          setAiStep('result');
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  // Add AI design to set
  const addAIDesign = () => {
    const currentSize = setSizes.find(s => s.name === selectedSize)?.cards || 48;
    if (generatedDesign && selectedDesigns.length < currentSize) {
      setSelectedDesigns([...selectedDesigns, generatedDesign]);
      setAiStep('prompt');
      setAiPrompt('');
      setGeneratedDesign(null);
    }
  };

  // Remove design from set
  const removeDesign = (index: number) => {
    setSelectedDesigns(selectedDesigns.filter((_, i) => i !== index));
  };

  // Auto-fill remaining slots for a specific size
  const autoFillSlotsForSize = (targetSize: number) => {
    const allDesigns = presetCollections.flatMap(collection => collection.designs);
    const availableDesigns = allDesigns.filter(design => 
      !selectedDesigns.some(selected => selected.id === design.id)
    );
    
    let toAdd = [];
    const needed = targetSize - selectedDesigns.length;
    
    if (needed <= 0) return; // No slots to fill
    
    if (availableDesigns.length >= needed) {
      // We have enough unique designs
      const shuffled = [...availableDesigns].sort(() => 0.5 - Math.random());
      toAdd = shuffled.slice(0, needed);
    } else {
      // We don't have enough unique designs, so we'll use what we have and duplicate if necessary
      const shuffled = [...availableDesigns].sort(() => 0.5 - Math.random());
      toAdd = [...shuffled];
      
      // If we still need more, duplicate some designs (limit to prevent infinite loops)
      const maxDuplicates = Math.min(needed - toAdd.length, allDesigns.length * 2);
      for (let i = 0; i < maxDuplicates && toAdd.length < needed; i++) {
        const randomDesign = allDesigns[Math.floor(Math.random() * allDesigns.length)];
        const duplicatedDesign = {
          ...randomDesign,
          id: Date.now() + i + Math.floor(Math.random() * 1000), // Use number for ID
          name: `${randomDesign.name} (Copy ${i + 1})`
        };
        toAdd.push(duplicatedDesign);
      }
      
      toAdd = toAdd.slice(0, needed);
    }
    
    if (toAdd.length > 0) {
      // Use setTimeout to prevent blocking the UI
      setTimeout(() => {
        setSelectedDesigns(prev => [...prev, ...toAdd]);
      }, 0);
    }
  };

  // Auto-fill remaining slots (for the current size)
  const autoFillSlots = () => {
    const currentSize = setSizes.find(s => s.name === selectedSize)?.cards || 48;
    autoFillSlotsForSize(currentSize);
  };

  // Enhanced AI Studio Functions
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
    setAiPrompt(autoSuggestedPrompts[randomIndex]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setPreviewUrl(template.image);
    }
  };

  const handleGenerateCustom = async () => {
    if (aiMode === 'upload' && !selectedImage) return;
    if (aiMode === 'customize' && !selectedTemplate) return;

    // Check if user has exceeded free credits
    if (usageCount >= 4) {
      setShowCreditsModal(true);
      return;
    }

    setIsGenerating(true);
    
    try {
      // Use default prompt if none provided in create mode
      const promptToUse = aiMode === 'create' && !aiPrompt.trim() 
        ? 'A magical Easter egg with galaxy patterns and golden stars' 
        : aiPrompt;

      const response = await axios.post<GenerateResponse>('https://all-about-eggs.vercel.app/api/generate-custom', {
        prompt: promptToUse, 
      });
  
      if (response.data.success && response.data.image) {
        setGeneratedImage(response.data.image);
        setGeneratedDesign({
          id: Date.now(),
          name: `AI Generated: ${promptToUse}`,
          image: response.data.image,
          prompt: promptToUse
        });
        incrementUsageCount();
      } else {
        throw new Error(response.data.message || 'Generation failed');
      }
    } catch (error) {
      console.error("Generation failed:", error);
      alert('Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
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
      alert('Design saved successfully!');
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    // Allow checkout when on step 3, even if set isn't complete
    if (!isSetComplete && currentStep < 3) return;
    
    // Save to cart
    const cartItem = {
      id: Date.now(),
      size: selectedSize,
      designs: selectedDesigns,
      price: calculateTotalPrice(),
      createdAt: new Date().toISOString(),
      totalCards: currentSetSize,
      collection: selectedPreset ? presetCollections.find(p => p.id === selectedPreset)?.name : 'Mixed'
    };
    
    const updatedCart = [...cartItems, cartItem];
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Dispatch cart update event for header
    window.dispatchEvent(new CustomEvent('eggfinity-cart-updated'));
    
    // Show success modal with translated message
    const message = t.configurator?.successModal?.message || `Added ${selectedDesigns.length} designs to cart! Total: €${calculateTotalPrice()}`;
    const translatedMessage = message.replace('{count}', selectedDesigns.length.toString()).replace('{total}', calculateTotalPrice().toString());
    setSuccessMessage(translatedMessage);
    setShowSuccessModal(true);
  };

  // Step configuration
  const steps = [
    { id: 1, name: t.configurator?.steps?.chooseSize || 'Choose Size', icon: Settings, completed: currentStep >= 1 },
    { id: 2, name: t.configurator?.steps?.selectDesigns || 'Select Designs', icon: Palette, completed: currentStep >= 2 },
    { id: 3, name: t.configurator?.steps?.reviewCheckout || 'Review & Checkout', icon: ShoppingCart, completed: currentStep >= 3 || isSetComplete }
  ];

  return (
    <div className="min-h-screen ">
      {/* Header with Progress Steps */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-lg  top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <button
                onClick={() => window.history.back()}
                className="p-3 hover:bg-gray-100/80 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {t.configurator?.title || "Memory Game Configurator"}
                </h1>
                <p className="text-gray-500 text-sm">{t.configurator?.subtitle || "Create your perfect memory game set"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              {/* Cart Count */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.location.href = '/checkout'}
                  className="relative p-3 hover:bg-gray-100/80 rounded-2xl transition-all duration-300 hover:scale-105 group"
                >
                  <ShoppingCart className="w-7 h-7 text-gray-700 group-hover:text-gray-900 transition-colors" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 rounded-full flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
                      {cartItems.reduce((sum, item) => sum + (item.designs ? item.designs.length : 0), 0)}
                    </span>
                  )}
                </button>
                {cartItems.length > 0 && (
                  <span className="text-sm text-gray-600 font-medium">
                    {cartItems.reduce((sum, item) => sum + (item.designs ? item.designs.length : 0), 0)} {cartItems.reduce((sum, item) => sum + (item.designs ? item.designs.length : 0), 0) !== 1 ? (t.configurator?.itemsInCart || "items in cart") : (t.configurator?.itemInCart || "item in cart")}
                  </span>
                )}
              </div>
              
              <div className="text-right">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#f6e79e] to-[#f4e285] bg-clip-text text-transparent">
                  €{calculateTotalPrice()}
                </p>
                <p className="text-sm text-gray-500 font-medium">{t.configurator?.totalPrice || "Total Price"}</p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center">
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
  {steps.map((step, index) => (
    <div key={step.id} className="flex items-center">
      <div
        className={`flex flex-col items-center transition-all duration-500 ${
          step.completed ? "text-[#f6e79e]" : "text-gray-400"
        }`}
      >
        <div
          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-2 sm:mb-3 transition-all duration-500 shadow-lg ${
            step.completed
              ? "bg-gradient-to-br from-[#f6e79e] to-[#f4e285] text-gray-900 shadow-xl sm:scale-110"
              : "bg-white/80 text-gray-500 shadow-md"
          }`}
        >
          <step.icon className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <span
          className={`text-xs sm:text-sm font-semibold transition-all duration-300 ${
            step.completed ? "text-gray-900" : "text-gray-500"
          }`}
        >
          {step.name}
        </span>
      </div>
      {index < steps.length - 1 && (
        <div
          className={`w-10 sm:w-20 h-1 mx-3 sm:mx-6 rounded-full transition-all duration-500 ${
            step.completed
              ? "bg-gradient-to-r from-[#f6e79e] to-[#f4e285]"
              : "bg-gray-200"
          }`}
        />
      )}
    </div>
  ))}
</div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Set Size Selection */}
        <div className={`transition-all duration-700 ${currentStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              {t.configurator?.chooseSetSize || "Choose Your Set Size"}
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              {t.configurator?.chooseSetSizeDesc || "Select the perfect size for your memory game. Each set comes with unique designs that will create lasting memories for your family."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {setSizes.map((size) => (
              <div
                key={size.name}
                onClick={() => handleSizeSelect(size.name as 'L' | 'XL' | 'XXL')}
                className={`relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                  selectedSize === size.name
                    ? 'border-[#f6e79e] ring-4 ring-[#f6e79e]/30 bg-gradient-to-br from-[#f6e79e]/20 to-[#f7fcee]/60 shadow-2xl'
                    : 'border-gray-200/50 hover:border-[#f6e79e] bg-white/90 backdrop-blur-sm hover:shadow-xl'
                }`}
              >
                {size.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      {t.configurator?.mostPopular || "Most Popular"}
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                    {size.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-xl font-semibold">{size.cards} {t.configurator?.cards || "Cards"}</p>
                  <p className="text-gray-500 mb-8 text-sm">{size.description}</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-[#f6e79e] to-[#f4e285] bg-clip-text text-transparent">
                    €{size.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Design Selection */}
        <div className={`transition-all duration-700 ${currentStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              {t.configurator?.chooseDesigns || "Choose Your Designs"}
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              {t.configurator?.chooseDesignsDesc || "Select from our curated collections, let us surprise you, or create your own designs with AI."}
            </p>
          </div>

          {/* Creation Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Preset Collections */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                  Preset Collections
                </h3>
                <p className="text-gray-600 text-base">Choose from curated themes</p>
              </div>
              
              <div className="space-y-4">
                {presetCollections.map((collection) => (
                  <div
                    key={collection.id}
                    onClick={() => handlePresetSelect(collection.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedPreset === collection.id
                        ? 'border-[#f6e79e] bg-gradient-to-br from-[#f6e79e]/20 to-[#f7fcee]/60 shadow-lg'
                        : 'border-gray-200/50 hover:border-[#f6e79e] bg-white/80 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg">
                        <Image
                          src={collection.image}
                          alt={collection.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg">{collection.name}</h4>
                        <p className="text-sm text-gray-600">{collection.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Surprise Me */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Gift className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                  Surprise Me
                </h3>
                <p className="text-gray-600 text-base">Let AI create a perfect set</p>
              </div>
              
              <button
                onClick={generateSurpriseSet}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-2xl font-bold text-lg hover:from-pink-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Gift className="w-5 h-5 inline mr-2" />
                Generate Surprise Set
              </button>
            </div>

            {/* AI Design Studio */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Wand2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                  AI Design Studio
                </h3>
                <p className="text-gray-600 text-base">Create custom designs with AI</p>
              </div>
              
              <button
                onClick={() => setShowAISection(true)}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Wand2 className="w-5 h-5 inline mr-2" />
                Open AI Studio
              </button>
            </div>
          </div>

          {/* AI Design Studio Section */}
          {showAISection && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                    AI Design Studio
                  </h3>
                  <p className="text-gray-600">Create custom designs with the power of AI</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setAiMode('create')}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                      aiMode === 'create' 
                        ? 'bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 shadow-lg' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setAiMode('customize')}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                      aiMode === 'customize' 
                        ? 'bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 shadow-lg' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Customize
                  </button>
                  <button
                    onClick={() => setAiMode('upload')}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                      aiMode === 'upload' 
                        ? 'bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 shadow-lg' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Upload
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side - Input Options */}
                <div className="space-y-6">
                  {/* Create Mode */}
                  {aiMode === 'create' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Describe your design
                        </label>
                        <textarea
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          placeholder="Describe your perfect egg design... (e.g., A magical Easter egg with galaxy patterns and golden stars)"
                          className="w-full h-32 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f6e79e] resize-none shadow-sm"
                        />
                        {!aiPrompt.trim() && (
                          <p className="text-sm text-gray-500 mt-2">
                            💡 Leave empty to use the default magical Easter egg design
                          </p>
                        )}
                      </div>
                      
                      <button
                        onClick={handleAutoSuggest}
                        className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Sparkles className="w-5 h-5" />
                        Auto-suggest Prompt
                      </button>
                    </div>
                  )}

                  {/* Customize Mode */}
                  {aiMode === 'customize' && (
                    <div className="space-y-6">
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Select a template
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {templates.map((template) => (
                          <div
                            key={template.id}
                            onClick={() => handleTemplateSelect(template.id)}
                            className={`relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                              selectedTemplate === template.id 
                                ? 'border-[#f6e79e] shadow-xl scale-105' 
                                : 'border-gray-200 hover:border-gray-300 shadow-lg'
                            }`}
                          >
                            <img
                              src={template.image}
                              alt={template.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-2 left-2 right-2">
                                <p className="text-white text-xs font-bold">{template.name}</p>
                                <p className="text-white/80 text-xs">{template.category}</p>
                              </div>
                            </div>
                            {selectedTemplate === template.id && (
                              <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] rounded-full flex items-center justify-center shadow-lg">
                                <Sparkles className="w-3 h-3 text-gray-900" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upload Mode */}
                  {aiMode === 'upload' && (
                    <div className="space-y-6">
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#f6e79e] transition-colors duration-300 bg-gradient-to-br from-gray-50 to-gray-100">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 font-medium">Click to upload an image</p>
                          <p className="text-gray-500 text-sm">or drag and drop</p>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Generate Button */}
                  <button
                    onClick={handleGenerateCustom}
                    disabled={isGenerating || (aiMode === 'upload' && !selectedImage) || (aiMode === 'customize' && !selectedTemplate)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] hover:from-[#f4e285] hover:to-[#f6e79e] disabled:from-gray-300 disabled:to-gray-400 text-gray-900 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
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

                {/* Right Side - Preview */}
                <div className="space-y-6">
                  {/* Preview Card */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Preview
                      </h2>
                    </div>
                    
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
                      {isGenerating ? (
                        <div className="text-center">
                          <Loader2 className="w-16 h-16 text-[#f6e79e] animate-spin mx-auto mb-4" />
                          <p className="text-gray-600 font-medium">
                            Creating your design...
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            This may take a few moments
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
                            <span className="text-white text-xs font-medium">
                              Preview
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-400">
                          <Egg className="w-16 h-16 mx-auto mb-4" />
                          <p className="font-medium">
                            No preview available
                          </p>
                          <p className="text-sm mt-1">
                            Complete the form to see a preview
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Design Info */}
                  {generatedImage && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                      <h3 className="font-bold text-gray-900 mb-4">
                        Design Information
                      </h3>
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
                            {aiMode === 'create' ? 'AI Generated' : 
                             aiMode === 'customize' ? 'Template Enhanced' : 
                             'Image Transformed'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Add to Set Button */}
              {generatedDesign && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <button
                      onClick={addAIDesign}
                      disabled={selectedDesigns.length >= currentSetSize}
                      className="flex-1 py-3 bg-[#f6e79e] text-gray-900 rounded-xl font-semibold hover:bg-[#f4e285] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add to Set
                    </button>
                    <button
                      onClick={() => {
                        setAiStep('prompt');
                        setAiPrompt('');
                        setGeneratedDesign(null);
                        setGeneratedImage(null);
                      }}
                      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Generate Another
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Surprise Preview */}
          {showSurprisePreview && (
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 mb-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full mb-4">
                  <Gift className="w-6 h-6" />
                  <span className="font-bold text-lg">Your Surprise Set!</span>
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-gray-600">
                  We've created a perfect surprise set for you. Love it or shuffle for a new surprise!
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-6">
                {surpriseDesigns.map((design, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden border-2 border-purple-300">
                    <Image
                      src={design.image}
                      alt={design.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={generateSurpriseSet}
                  className="px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Shuffle Again
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-[#f6e79e] text-gray-900 rounded-xl font-semibold hover:bg-[#f4e285] transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Keep This Set
                </button>
              </div>
            </div>
          )}

          {/* Selected Designs Preview */}
          {selectedDesigns.length > 0 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                    Your Selected Designs ({selectedDesigns.length}/{currentSetSize})
                  </h3>
                  <p className="text-gray-600">Review and customize your memory game set</p>
                </div>
                {selectedDesigns.length < currentSetSize && (
                  <button
                    onClick={autoFillSlots}
                    className="px-6 py-3 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 rounded-2xl font-bold hover:from-[#f4e285] hover:to-[#f6e79e] transition-all transform hover:scale-105 shadow-lg"
                  >
                    <Sparkles className="w-4 h-4 inline mr-2" />
                    Auto-fill Remaining
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
                {Array.from({ length: currentSetSize }).map((_, index) => (
                  <div key={index} className="relative group">
                    {selectedDesigns[index] ? (
                      <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <Image
                          src={selectedDesigns[index].image}
                          alt={selectedDesigns[index].name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-white text-xs font-bold truncate">{selectedDesigns[index].name}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeDesign(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 shadow-lg"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="absolute top-2 left-2 w-6 h-6 bg-[#f6e79e] text-gray-900 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-square rounded-2xl border-2 border-dashed border-gray-300/50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 group">
                        <Plus className="w-8 h-8 text-gray-400 group-hover:text-gray-500 transition-colors" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Review & Checkout */}
        <div className={`transition-all duration-700 ${currentStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
          {currentStep >= 3 && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                  Review Your Memory Game
                </h2>
                <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
                  {isSetComplete 
                    ? `Perfect! Your ${selectedSize} set is ready. Take a final look before we create your memories.`
                    : `You're on step 3. ${selectedSize ? `Your ${selectedSize} set has ${selectedDesigns.length}/${currentSetSize} designs.` : 'Please select a size first.'}`
                  }
                </p>
              </div>

              {/* Set Summary */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                      Set Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
                        <span className="text-gray-600 font-medium">Size:</span>
                        <span className="font-bold text-gray-900">{selectedSize} ({currentSetSize} cards)</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
                        <span className="text-gray-600 font-medium">Collection:</span>
                        <span className="font-bold text-gray-900 capitalize">
                          {selectedPreset ? presetCollections.find(p => p.id === selectedPreset)?.name : 'Mixed'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#f6e79e]/20 to-[#f7fcee]/40 rounded-2xl border border-[#f6e79e]/30">
                        <span className="text-gray-700 font-bold">Total Price:</span>
                        <span className="font-bold text-2xl bg-gradient-to-r from-[#f6e79e] to-[#f4e285] bg-clip-text text-transparent">
                          €{calculateTotalPrice()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                      Your Designs
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                      {selectedDesigns.map((design, index) => (
                        <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                          <Image
                            src={design.image}
                            alt={design.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 left-2 w-6 h-6 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedDesigns.length > 0 && (
                <div className="text-center">
                  <button
                    onClick={handleAddToCart}
                    className="px-12 py-6 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 rounded-3xl font-bold text-2xl hover:from-[#f4e285] hover:to-[#f6e79e] transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl"
                  >
                    <ShoppingCart className="w-6 h-6 inline mr-3" />
                    {isSetComplete 
                      ? `Crack it & Checkout - €${calculateTotalPrice()}`
                      : `Add to Cart - €${calculateTotalPrice()}`
                    }
                  </button>
                  {!isSetComplete && (
                    <p className="text-gray-500 mt-3 text-sm">
                      You can add more designs to complete your set, or checkout with current selection
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
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
                  Credits Ended
                </h2>
                
                {/* Message */}
                <div className="space-y-4 mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    You've used all your free AI design credits! Upgrade to unlock unlimited design generation.
                  </p>
                  <p className="text-base text-gray-600">
                    Get unlimited access to our AI design studio and create as many custom designs as you want.
                  </p>
                </div>

                {/* Features List */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Unlock Premium Features
                  </h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm text-gray-700">
                        Unlimited AI design generation
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm text-gray-700">
                        Priority processing
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm text-gray-700">
                        Advanced customization options
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm text-gray-700">
                        Exclusive design templates
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setShowCreditsModal(false);
                      alert('Premium upgrade coming soon!');
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    <Sparkles className="w-5 h-5" />
                    Upgrade to Unlimited
                  </button>
                  <button
                    onClick={() => setShowCreditsModal(false)}
                    className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors text-base"
                  >
                    Maybe Later
                  </button>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Usage: {usageCount}/4 free credits
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] mx-4 sm:mx-0">
          <DialogHeader className="space-y-3 sm:space-y-4">
            <DialogTitle className="text-center flex flex-col sm:flex-row items-center justify-center gap-2 text-lg sm:text-xl">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#f6e79e] to-[#f4e285] rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
              </div>
              <span className="text-base sm:text-lg font-semibold text-center">
                {t.configurator?.successModal?.title || "Successfully Added to Cart!"}
              </span>
            </DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base px-2 sm:px-0">
              {successMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
            <button
              onClick={() => {
                setShowSuccessModal(false);
                window.location.href = '/checkout';
              }}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] hover:from-[#f4e285] hover:to-[#f6e79e] text-gray-900 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base min-h-[44px]"
            >
              <ShoppingCart className="w-4 h-4 flex-shrink-0" />
              <span>{t.configurator?.successModal?.goToCheckout || "Go to Checkout"}</span>
            </button>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-xl hover:bg-gray-50 text-sm sm:text-base min-h-[44px]"
            >
              {t.configurator?.successModal?.continueShopping || "Continue Shopping"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
