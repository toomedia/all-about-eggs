'use client';

import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Sparkles, Star, Search, Filter, Download, Eye, X, CreditCard, Shield, Truck, Gift, Zap, Crown, Rainbow, Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('XL');
  const [displayCount, setDisplayCount] = useState(8);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDesigns, setSelectedDesigns] = useState<typeof eggDesigns>([]);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderType, setOrderType] = useState<'custom' | 'preset'>('custom');
  const [isSurpriseSelection, setIsSurpriseSelection] = useState(false);
  
  // Surprise Me Modal States
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [surpriseStep, setSurpriseStep] = useState(1); // 1: selection, 2: loading, 3: result
  const [selectedSurpriseType, setSelectedSurpriseType] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [surpriseResult, setSurpriseResult] = useState<typeof eggDesigns>([]);
  const [loadingMessages] = useState([
    "🥚 Cracking open your surprise...",
    "🎨 Mixing paints and sparkles...",
    "🔍 Finding the perfect egg for you...",
    "✨ Adding a sprinkle of magic...",
    "🎉 Almost ready for your surprise!"
  ]);

  // Load saved selections from localStorage on component mount
  useEffect(() => {
    const savedDesigns = localStorage.getItem('selectedDesigns');
    const savedSize = localStorage.getItem('selectedSize');
    const savedIsSurprise = localStorage.getItem('isSurpriseSelection');
    
    if (savedDesigns) {
      setSelectedDesigns(JSON.parse(savedDesigns));
    }
    if (savedSize) {
      setSelectedSize(savedSize);
    }
    if (savedIsSurprise) {
      setIsSurpriseSelection(JSON.parse(savedIsSurprise));
    }
  }, []);

  // Save selections to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('selectedDesigns', JSON.stringify(selectedDesigns));
    localStorage.setItem('selectedSize', selectedSize);
    localStorage.setItem('isSurpriseSelection', JSON.stringify(isSurpriseSelection));
  }, [selectedDesigns, selectedSize, isSurpriseSelection]);

  const categories = [
    { name: 'All', count: 30, icon: '🌟' },
    { name: 'Easter', count: 10, icon: '🥚' },
    { name: 'Abstract', count: 8, icon: '🎨' },
    { name: 'Nature', count: 6, icon: '🌿' },
    { name: 'Classics', count: 4, icon: '✨' },
    { name: 'Pop Culture', count: 2, icon: '🎭' }
  ];

  const eggDesigns = [
    // Easter Category
    {
      id: 1,
      name: 'Easter Bunny Delight',
      category: 'Easter',
      image: '/eggs images/A01ED9DF-9438-4E70-B773-60A2C41A82F3.PNG',
      likes: 234,
      difficulty: 'Easy',
      tags: ['pastel', 'bunny', 'spring'],
      premium: false,
      featured: true
    },
    {
      id: 2,
      name: 'Spring Bloom Magic',
      category: 'Easter',
      image: '/eggs images/A1C8EC8B-F376-4179-9677-5EEB3BED10E1.PNG',
      likes: 456,
      difficulty: 'Medium',
      tags: ['floral', 'bloom', 'magic'],
      premium: true,
      featured: false
    },
    {
      id: 3,
      name: 'Pastel Rainbow Dream',
      category: 'Easter',
      image: '/eggs images/78F51BD8-2667-4818-A8EB-F96F9A75C762.PNG',
      likes: 189,
      difficulty: 'Easy',
      tags: ['rainbow', 'pastel', 'dream'],
      premium: false,
      featured: false
    },
    {
      id: 4,
      name: 'Floral Garden Party',
      category: 'Easter',
      image: '/eggs images/985F746C-6F78-4E2A-BD7F-20F49045629D.PNG',
      likes: 567,
      difficulty: 'Hard',
      tags: ['garden', 'floral', 'party'],
      premium: true,
      featured: true
    },
    {
      id: 5,
      name: 'Easter Egg Hunt',
      category: 'Easter',
      image: '/eggs images/900607D2-4C7C-4EA3-BED1-CEC884AC396F.PNG',
      likes: 312,
      difficulty: 'Easy',
      tags: ['hunt', 'easter', 'fun'],
      premium: false,
      featured: false
    },
    {
      id: 6,
      name: 'Spring Chick Adventure',
      category: 'Easter',
      image: '/eggs images/B96EC52A-B308-4F59-BDF1-FF4634AF366F.PNG',
      likes: 278,
      difficulty: 'Medium',
      tags: ['chick', 'spring', 'adventure'],
      premium: false,
      featured: false
    },
    {
      id: 7,
      name: 'Easter Basket Joy',
      category: 'Easter',
      image: '/eggs images/5A1D36A7-05A2-4D73-862E-478A4C6B175A.PNG',
      likes: 423,
      difficulty: 'Medium',
      tags: ['basket', 'joy', 'easter'],
      premium: true,
      featured: false
    },
    {
      id: 8,
      name: 'Pastel Paradise',
      category: 'Easter',
      image: '/eggs images/20A37086-FD6B-4CA4-A663-92783F0D587A.PNG',
      likes: 345,
      difficulty: 'Easy',
      tags: ['pastel', 'paradise', 'soft'],
      premium: false,
      featured: false
    },
    {
      id: 9,
      name: 'Easter Morning Glory',
      category: 'Easter',
      image: '/eggs images/D05371AC-8A6A-420F-8EDB-CEA5A00AE606.PNG',
      likes: 198,
      difficulty: 'Hard',
      tags: ['morning', 'glory', 'easter'],
      premium: true,
      featured: false
    },
    {
      id: 10,
      name: 'Spring Awakening',
      category: 'Easter',
      image: '/eggs images/D0126C2C-603B-471C-820E-370773708853.PNG',
      likes: 267,
      difficulty: 'Medium',
      tags: ['spring', 'awakening', 'renewal'],
      premium: false,
      featured: false
    },
    {
      id: 11,
      name: 'Easter Eggstravaganza',
      category: 'Easter',
      image: '/eggs images/7F9DC646-284C-4E7F-8FBF-AA6A3F60096C.PNG',
      likes: 512,
      difficulty: 'Hard',
      tags: ['extravaganza', 'easter', 'celebration'],
      premium: true,
      featured: true
    },
    {
      id: 12,
      name: 'Pastel Harmony',
      category: 'Easter',
      image: '/eggs images/EF92674E-D04F-42F7-8308-DA4FF3C17BE1.PNG',
      likes: 334,
      difficulty: 'Easy',
      tags: ['pastel', 'harmony', 'peace'],
      premium: false,
      featured: false
    },
    {
      id: 13,
      name: 'Easter Joy',
      category: 'Easter',
      image: '/eggs images/BA0EA02E-9CD8-4405-92AB-A91969CB36D9.PNG',
      likes: 289,
      difficulty: 'Medium',
      tags: ['joy', 'easter', 'happiness'],
      premium: false,
      featured: false
    },
    {
      id: 14,
      name: 'Spring Celebration',
      category: 'Easter',
      image: '/eggs images/09FF42F9-2664-4698-8FD8-E544A47D616B.PNG',
      likes: 376,
      difficulty: 'Medium',
      tags: ['spring', 'celebration', 'festive'],
      premium: true,
      featured: false
    },
    {
      id: 15,
      name: 'Easter Wonderland',
      category: 'Easter',
      image: '/eggs images/EE3B1C9F-EE9B-41F0-AADE-A1785767ECF8.PNG',
      likes: 445,
      difficulty: 'Hard',
      tags: ['wonderland', 'easter', 'magical'],
      premium: true,
      featured: true
    },

    // Abstract Category
    {
      id: 16,
      name: 'Cosmic Galaxy',
      category: 'Abstract',
      image: '/eggs images/FC7DEB0F-9010-41FF-A9DE-05AC0CE582DB.PNG',
      likes: 678,
      difficulty: 'Hard',
      tags: ['cosmic', 'galaxy', 'space'],
      premium: true,
      featured: true
    },
    {
      id: 17,
      name: 'Neon Dreams',
      category: 'Abstract',
      image: '/eggs images/A1C1364A-0881-4FD4-8863-942528923EF4.PNG',
      likes: 523,
      difficulty: 'Medium',
      tags: ['neon', 'dreams', 'vibrant'],
      premium: true,
      featured: false
    },
    {
      id: 18,
      name: 'Digital Matrix',
      category: 'Abstract',
      image: '/eggs images/409969A2-15D6-417E-BB80-7F5514D4C420.PNG',
      likes: 412,
      difficulty: 'Hard',
      tags: ['digital', 'matrix', 'tech'],
      premium: true,
      featured: false
    },
    {
      id: 19,
      name: 'Geometric Harmony',
      category: 'Abstract',
      image: '/eggs images/F2B512AE-60BB-403D-A6F1-C7D8B963DDF4.PNG',
      likes: 356,
      difficulty: 'Medium',
      tags: ['geometric', 'harmony', 'shapes'],
      premium: false,
      featured: false
    },
    {
      id: 20,
      name: 'Abstract Expression',
      category: 'Abstract',
      image: '/eggs images/C35ACEE8-3CC4-4372-BE84-6658357CED6A.PNG',
      likes: 298,
      difficulty: 'Hard',
      tags: ['abstract', 'expression', 'art'],
      premium: true,
      featured: false
    },
    {
      id: 21,
      name: 'Modern Minimalist',
      category: 'Abstract',
      image: '/eggs images/C2084B60-843C-45F9-85CA-FC4D5099707B.PNG',
      likes: 445,
      difficulty: 'Easy',
      tags: ['modern', 'minimalist', 'clean'],
      premium: false,
      featured: false
    },
    {
      id: 22,
      name: 'Artistic Flow',
      category: 'Abstract',
      image: '/eggs images/5D6FB616-991D-4FF4-8188-8DD066C89F60.PNG',
      likes: 367,
      difficulty: 'Medium',
      tags: ['artistic', 'flow', 'creative'],
      premium: true,
      featured: false
    },
    {
      id: 23,
      name: 'Contemporary Chaos',
      category: 'Abstract',
      image: '/eggs images/D1ED21D6-2288-497B-AF9D-BDA37D4FEB9D.PNG',
      likes: 234,
      difficulty: 'Hard',
      tags: ['contemporary', 'chaos', 'dynamic'],
      premium: true,
      featured: false
    },
    {
      id: 24,
      name: 'Abstract Symphony',
      category: 'Abstract',
      image: '/eggs images/12ABB356-852A-4C46-97EF-C93BAD83AD37.PNG',
      likes: 389,
      difficulty: 'Medium',
      tags: ['symphony', 'abstract', 'music'],
      premium: false,
      featured: false
    },
    {
      id: 25,
      name: 'Digital Artistry',
      category: 'Abstract',
      image: '/eggs images/74AB1B49-6171-4D10-94D7-D9A2F0CD87A9.PNG',
      likes: 456,
      difficulty: 'Hard',
      tags: ['digital', 'artistry', 'modern'],
      premium: true,
      featured: true
    },
    {
      id: 26,
      name: 'Modern Geometry',
      category: 'Abstract',
      image: '/eggs images/2B56B7A1-95A1-4348-BB4E-8C039CF9A5E6 2.PNG',
      likes: 312,
      difficulty: 'Medium',
      tags: ['modern', 'geometry', 'shapes'],
      premium: false,
      featured: false
    },
    {
      id: 27,
      name: 'Abstract Fusion',
      category: 'Abstract',
      image: '/eggs images/E4513E64-1FAF-4F88-81C1-51D9E43AF23B.PNG',
      likes: 278,
      difficulty: 'Hard',
      tags: ['fusion', 'abstract', 'mixed'],
      premium: true,
      featured: false
    },

    // Nature Category
    {
      id: 28,
      name: 'Forest Whisper',
      category: 'Nature',
      image: '/eggs images/E74484D8-5397-4B11-AC94-49D1F1AA05DA.PNG',
      likes: 423,
      difficulty: 'Medium',
      tags: ['forest', 'whisper', 'nature'],
      premium: false,
      featured: false
    },
    {
      id: 29,
      name: 'Ocean Depths',
      category: 'Nature',
      image: '/eggs images/C45C3AAA-999C-4D28-866C-ED60247B38DA.PNG',
      likes: 567,
      difficulty: 'Hard',
      tags: ['ocean', 'depths', 'blue'],
      premium: true,
      featured: true
    },
    {
      id: 30,
      name: 'Mountain Majesty',
      category: 'Nature',
      image: '/eggs images/FFB0A181-F174-4265-A600-BB6CBD8AD68F.PNG',
      likes: 389,
      difficulty: 'Medium',
      tags: ['mountain', 'majesty', 'grand'],
      premium: false,
      featured: false
    },
    {
      id: 31,
      name: 'Desert Sunset',
      category: 'Nature',
      image: '/eggs images/1D183BF4-5321-4CD1-9A88-9E1B0EE2756A.PNG',
      likes: 445,
      difficulty: 'Medium',
      tags: ['desert', 'sunset', 'warm'],
      premium: true,
      featured: false
    },
    {
      id: 32,
      name: 'Tropical Paradise',
      category: 'Nature',
      image: '/eggs images/2B56B7A1-95A1-4348-BB4E-8C039CF9A5E6.PNG',
      likes: 512,
      difficulty: 'Hard',
      tags: ['tropical', 'paradise', 'exotic'],
      premium: true,
      featured: true
    },
    {
      id: 33,
      name: 'Arctic Aurora',
      category: 'Nature',
      image: '/eggs images/E37F5708-3D61-46B6-A872-804A5DCE3549.PNG',
      likes: 634,
      difficulty: 'Hard',
      tags: ['arctic', 'aurora', 'northern'],
      premium: true,
      featured: true
    },
    {
      id: 34,
      name: 'Garden Symphony',
      category: 'Nature',
      image: '/eggs images/BA7F578A-E63C-4015-A821-32EE5943F69A 2.PNG',
      likes: 378,
      difficulty: 'Medium',
      tags: ['garden', 'symphony', 'floral'],
      premium: false,
      featured: false
    },
    {
      id: 35,
      name: 'Wilderness Call',
      category: 'Nature',
      image: '/eggs images/1A13F1D5-56EE-4ABB-8EBF-6472C571F8C0 2.PNG',
      likes: 298,
      difficulty: 'Medium',
      tags: ['wilderness', 'call', 'adventure'],
      premium: false,
      featured: false
    },
    {
      id: 36,
      name: 'Natural Harmony',
      category: 'Nature',
      image: '/eggs images/49EBD2EA-DB4E-498C-B362-5CC7BC8D8EFC 2.PNG',
      likes: 456,
      difficulty: 'Easy',
      tags: ['natural', 'harmony', 'balance'],
      premium: true,
      featured: false
    },
    {
      id: 37,
      name: 'Earth Elements',
      category: 'Nature',
      image: '/eggs images/E6EC4F06-A22A-418F-A17A-4914AA3FD4B4 2.PNG',
      likes: 334,
      difficulty: 'Medium',
      tags: ['earth', 'elements', 'natural'],
      premium: false,
      featured: false
    },

    // Classics Category
    {
      id: 38,
      name: 'Timeless Elegance',
      category: 'Classics',
      image: '/eggs images/8A597E8D-765D-4CF6-AE37-03B2BFBD3E05 2.PNG',
      likes: 523,
      difficulty: 'Medium',
      tags: ['timeless', 'elegance', 'classic'],
      premium: true,
      featured: true
    },
    {
      id: 39,
      name: 'Vintage Charm',
      category: 'Classics',
      image: '/eggs images/68AD1A11-8B38-4AB9-A0A6-77313D984D91 2.PNG',
      likes: 445,
      difficulty: 'Medium',
      tags: ['vintage', 'charm', 'retro'],
      premium: false,
      featured: false
    },
    {
      id: 40,
      name: 'Classic Beauty',
      category: 'Classics',
      image: '/eggs images/18A7AE83-8BCA-4A40-902C-491B827D40D7 2.PNG',
      likes: 389,
      difficulty: 'Easy',
      tags: ['classic', 'beauty', 'simple'],
      premium: false,
      featured: false
    },
    {
      id: 41,
      name: 'Heritage Pattern',
      category: 'Classics',
      image: '/eggs images/4AEA8E2E-3BA1-4E9D-85F5-1FD24F251D82 2.PNG',
      likes: 567,
      difficulty: 'Hard',
      tags: ['heritage', 'pattern', 'traditional'],
      premium: true,
      featured: true
    },
    {
      id: 42,
      name: 'Traditional Grace',
      category: 'Classics',
      image: '/eggs images/DD32BCE3-A8F9-44F4-A032-C6022DFF8F06 2.PNG',
      likes: 412,
      difficulty: 'Medium',
      tags: ['traditional', 'grace', 'elegant'],
      premium: false,
      featured: false
    },
    {
      id: 43,
      name: 'Classic Sophistication',
      category: 'Classics',
      image: '/eggs images/F75CD647-69B9-4A7B-B20D-06C0433D6365 2.PNG',
      likes: 478,
      difficulty: 'Hard',
      tags: ['sophistication', 'classic', 'refined'],
      premium: true,
      featured: false
    },
    {
      id: 44,
      name: 'Elegant Simplicity',
      category: 'Classics',
      image: '/eggs images/45B42402-455F-4068-86AC-99D79531ADD2 2.PNG',
      likes: 356,
      difficulty: 'Easy',
      tags: ['elegant', 'simplicity', 'clean'],
      premium: false,
      featured: false
    },
    {
      id: 45,
      name: 'Timeless Design',
      category: 'Classics',
      image: '/eggs images/3CC844D3-B143-4C2A-89A2-3717C91873ED 2.PNG',
      likes: 423,
      difficulty: 'Medium',
      tags: ['timeless', 'design', 'enduring'],
      premium: true,
      featured: false
    },

    // Pop Culture Category
    {
      id: 46,
      name: 'Retro Gaming',
      category: 'Pop Culture',
      image: '/eggs images/B7FC98EB-F2EB-4638-8841-3E570F536F1D 2.PNG',
      likes: 678,
      difficulty: 'Hard',
      tags: ['retro', 'gaming', 'pixel'],
      premium: true,
      featured: true
    },
    {
      id: 47,
      name: 'Movie Magic',
      category: 'Pop Culture',
      image: '/eggs images/A01ED9DF-9438-4E70-B773-60A2C41A82F3.PNG',
      likes: 534,
      difficulty: 'Medium',
      tags: ['movie', 'magic', 'cinema'],
      premium: true,
      featured: false
    }
  ];

  const sizes = [
    { name: 'L', cards: 24, price: 29.99 },
    { name: 'XL', cards: 48, price: 49.99 },
    { name: 'XXL', cards: 72, price: 69.99 }
  ];

  const filteredDesigns = selectedCategory === 'All' 
    ? eggDesigns.filter(design => 
        design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        design.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : eggDesigns.filter(design => 
        design.category === selectedCategory &&
        (design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         design.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );

  const displayedDesigns = filteredDesigns.slice(0, displayCount);

  const handleDesignSelect = (design: typeof eggDesigns[0]) => {
    setSelectedDesigns(prev => {
      if (prev.some(d => d.id === design.id)) {
        return prev.filter(d => d.id !== design.id);
      } else {
        const maxCards = sizes.find(s => s.name === selectedSize)?.cards || 24;
        if (prev.length < maxCards) {
          return [...prev, design];
        }
        return prev;
      }
    });
    // Mark as regular selection, not surprise
    setIsSurpriseSelection(false);
  };

  const selectedDesignObjects = selectedDesigns;



  const calculateCartTotal = () => {
    return cartItems.length * (sizes.find(s => s.name === selectedSize)?.price || 0);
  };

  const calculateOrderTotal = () => {
    const selectedSizeData = sizes.find(s => s.name === selectedSize);
    const basePrice = selectedSizeData?.price || 0;
    const totalCards = selectedSizeData?.cards || 24;
    const selectedCount = selectedDesigns.length;
    
    // Calculate price based on selected cards vs total cards
    const pricePerCard = basePrice / totalCards;
    return selectedCount * pricePerCard;
  };

  const handleAddToCart = () => {
    if (selectedDesigns.length === 0) {
      alert('Please select at least one design before adding to cart.');
      return;
    }
    // Redirect to checkout with selected designs
    const queryParams = new URLSearchParams({
      designs: selectedDesigns.map(d => d.id).join(','),
      size: selectedSize,
      count: selectedDesigns.length.toString()
    });
    window.location.href = `/checkout?${queryParams.toString()}`;
  };

  // Surprise Me Functions
  const handleSurpriseMe = () => {
    setShowSurpriseModal(true);
    setSurpriseStep(1);
    setSelectedSurpriseType('');
    setLoadingProgress(0);
  };

  const handleSurpriseTypeSelect = (type: string) => {
    setSelectedSurpriseType(type);
    setSurpriseStep(2);
    
    // Start loading animation
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setLoadingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          generateSurpriseResult(type);
          setSurpriseStep(3);
        }, 900);
      }
    }, 100); // 5 seconds total
  };

  const generateSurpriseResult = (type: string) => {
    let count = 1;
    switch (type) {
      case 'One Egg Card':
        count = 1;
        break;
      case 'Mini Preset':
        count = 5;
        break;
      case 'Full Preset':
        count = 24;
        break;
      case 'XL Preset':
        count = 45;
        break;
    }
    
    // Shuffle and select random designs
    const shuffled = [...eggDesigns].sort(() => 0.5 - Math.random());
    const result = shuffled.slice(0, count);
    setSurpriseResult(result);
  };

  const handleViewSurprise = () => {
    setSelectedDesigns(surpriseResult);
    setIsSurpriseSelection(true);
    setShowSurpriseModal(false);
    setSurpriseStep(1);
    // Scroll to top to show the surprise section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTryAnother = () => {
    setSurpriseStep(1);
    setSelectedSurpriseType('');
    setLoadingProgress(0);
  };

  const closeSurpriseModal = () => {
    setShowSurpriseModal(false);
    setSurpriseStep(1);
    setSelectedSurpriseType('');
    setLoadingProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fcee]/50  to-rose-100/80">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 sm:opacity-30"
          style={{
            backgroundImage: `url('/mood image/IMG_1152.jpg')`
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f6e79e]/20 to-[#f7fcee]/40"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 font-manrope leading-tight">
            Beautiful Egg Templates
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 md:mb-12 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-4">
            Choose from our curated collection of stunning Easter egg designs. Each template is crafted with love and ready to become your memory game.
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 md:mb-12 px-4">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-[#f6e79e] focus:border-transparent outline-none transition-all text-sm sm:text-base"
              />
            </div>
            <button className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl sm:rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter</span>
            </button>
          </div>
        </div>
      </section>

      {/* Surprise Results Section */}
      {selectedDesigns.length > 0 && isSurpriseSelection && (
        <section className="py-12 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-b-4 border-purple-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full mb-4">
                <Gift className="w-6 h-6" />
                <span className="font-bold text-lg">Your Surprise Selection!</span>
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 font-manrope">
                {selectedDesigns.length} Amazing Designs Selected for You
              </h2>
              <p className="text-gray-600 text-lg">
                These designs were specially chosen just for you! Ready to create your perfect egg memory set?
              </p>
            </div>

            {/* Surprise Designs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-8">
              {selectedDesigns.map((design, index) => (
                <div key={design.id} className="relative group">
                  <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <Image
                      src={design.image}
                      alt={design.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, (max-width: 1280px) 16vw, 12vw"
                      loading="lazy"
                      quality={50}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-xs font-bold truncate">{design.name}</p>
                        <p className="text-purple-200 text-xs">{design.category}</p>
                      </div>
                    </div>
                    {/* Selection Badge */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleAddToCart}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add Surprise to Cart - €{calculateOrderTotal().toFixed(2)}
              </button>
              <button
                onClick={() => {
                  setSelectedDesigns([]);
                  setIsSurpriseSelection(false);
                  localStorage.removeItem('selectedDesigns');
                  localStorage.removeItem('isSurpriseSelection');
                }}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200 text-purple-700 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 hover:bg-white flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Clear Surprise
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Selected Designs Section */}
      {selectedDesigns.length > 0 && !isSurpriseSelection && (
        <section className="py-12 bg-gradient-to-br from-[#f6e79e]/10 to-[#f7fcee]/20 border-b-4 border-[#f6e79e]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 px-6 py-3 rounded-full mb-4">
                <ShoppingCart className="w-6 h-6" />
                <span className="font-bold text-lg">Your Selected Designs</span>
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 font-manrope">
                {selectedDesigns.length} Designs in Your Cart
              </h2>
              <p className="text-gray-600 text-lg">
                Ready to create your custom egg memory game? Review your selections below.
              </p>
            </div>

            {/* Selected Designs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-8">
              {selectedDesigns.map((design, index) => (
                <div key={design.id} className="relative group">
                  <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-[#f6e79e] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <Image
                      src={design.image}
                      alt={design.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, (max-width: 1280px) 16vw, 12vw"
                      loading="lazy"
                      quality={50}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f6e79e]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-xs font-bold truncate">{design.name}</p>
                        <p className="text-gray-200 text-xs">{design.category}</p>
                      </div>
                    </div>
                    {/* Selection Badge */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#f6e79e] rounded-full flex items-center justify-center">
                      <span className="text-gray-900 text-xs font-bold">{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleAddToCart}
                className="px-8 py-4 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] hover:from-[#f4e285] hover:to-[#f6e79e] text-gray-900 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart - €{calculateOrderTotal().toFixed(2)}
              </button>
              <button
                onClick={() => {
                  setSelectedDesigns([]);
                  setIsSurpriseSelection(false);
                  localStorage.removeItem('selectedDesigns');
                  localStorage.removeItem('isSurpriseSelection');
                }}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-[#f6e79e] text-gray-700 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 hover:bg-white flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Clear Selection
              </button>
            </div>
          </div>
        </section>
      )}
      
      {/* Size Selection */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-manrope">Choose Set Size</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {sizes.map((size) => (
              <div 
                key={size.name}
                className={`relative p-8 rounded-2xl border-2 cursor-pointer transition-all transform hover:scale-105 ${
                  selectedSize === size.name 
                    ? 'border-[#f6e79e] ring-4 ring-[#f6e79e]/20 bg-gradient-to-br from-[#f6e79e]/10 to-[#f7fcee]/50'
                    : 'border-gray-200 hover:border-[#f6e79e] bg-white/80 backdrop-blur-sm hover:shadow-xl'
                }`}
                onClick={() => setSelectedSize(size.name)}
              >
                {selectedSize === size.name && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#f6e79e] rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-gray-900" />
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3 font-manrope">{size.name}</h3>
                  <p className="text-gray-600 mb-6 text-lg">{size.cards} Cards</p>
                  <p className="text-3xl font-bold text-[#f6e79e]">€{size.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-12 bg-white backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 flex items-center gap-2 ${
                  selectedCategory === category.name
                    ? 'bg-[#f6e79e] text-gray-900 shadow-lg'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-[#f6e79e]/20 border border-gray-200/50'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                {category.name} ({category.count})
              </button>
            ))}
            <button 
              onClick={handleSurpriseMe}
              className="px-6 py-3 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 rounded-full font-medium hover:from-[#f4e285] hover:to-[#f6e79e] transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              Surprise Me
            </button>
          </div>
        </div>
      </section>

      {/* Design Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 font-manrope">Choose Your Designs</h2>
              <p className="text-gray-600 text-lg">Choose {sizes.find(s => s.name === selectedSize)?.cards} out of {filteredDesigns.length} designs</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Showing {displayedDesigns.length} of {filteredDesigns.length}</p>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-[#f6e79e] rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedDesigns.map((design) => (
              <div key={design.id} className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                {/* Premium Badge */}
                {design.premium && (
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Premium
                  </div>
                )}
                
                {/* Featured Badge */}
                {design.featured && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </div>
                )}

                {/* Image Container */}
                                  <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                      src={design.image}
                      alt={design.name}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={50}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                  
                                    {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => window.open(design.image, '_blank')}
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all transform hover:scale-110"
                        title="Preview Design"
                      >
                        <Eye className="w-5 h-5 text-gray-700" />
                      </button>
                      <button 
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = design.image;
                          link.download = `${design.name}.png`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="p-3 bg-[#f6e79e]/90 backdrop-blur-sm rounded-full hover:bg-[#f6e79e] transition-all transform hover:scale-110"
                        title="Download Design"
                      >
                        <Download className="w-5 h-5 text-gray-900" />
                      </button>
                      <button 
                        onClick={() => {
                          // Add to favorites functionality
                          alert(`Added "${design.name}" to favorites!`);
                        }}
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all transform hover:scale-110"
                        title="Add to Favorites"
                      >
                        <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#f6e79e] transition-colors">{design.name}</h3>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{design.likes}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">{design.category}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      design.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      design.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {design.difficulty}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {design.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => handleDesignSelect(design)}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-center transition-all transform hover:scale-105 ${
                      selectedDesigns.some(d => d.id === design.id)
                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-400'
                        : design.premium 
                          ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-orange-500 hover:to-amber-400'
                          : 'bg-[#f6e79e] text-gray-900 hover:bg-[#f4e285]'
                    } flex items-center justify-center gap-2`}
                  >
                    {selectedDesigns.some(d => d.id === design.id) ? (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Selected
                      </>
                    ) : design.premium ? (
                      <>
                        <Star className="w-4 h-4" />
                        Get Premium
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                    Select Design
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

                    {/* Load More Button */}
          {displayCount < filteredDesigns.length && (
            <div className="text-center mt-12">
              <button
                onClick={() => setDisplayCount(prev => Math.min(prev + 4, filteredDesigns.length))}
                className="px-8 py-4 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 rounded-2xl font-semibold text-lg hover:from-[#f4e285] hover:to-[#f6e79e] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Load More
            </button>
          </div>
          )}

          {/* Show Less Button */}
          {displayCount > 4 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setDisplayCount(4)}
                className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-xl font-semibold text-base hover:bg-white transition-all transform hover:scale-105"
              >
                Show Less
              </button>
            </div>
          )}

          {/* Preview Area - Template */}
          {selectedDesigns.length > 0 && (
            <div className="mt-16 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4 font-manrope">Your Selected Designs Preview</h3>
                <p className="text-gray-600 text-lg">
                  {selectedDesigns.length} of {sizes.find(s => s.name === selectedSize)?.cards} designs selected
                </p>
              </div>

                        {/* Template Preview Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                {selectedDesignObjects.map((design, index) => (
                  <div key={design.id} className="relative group">
                    {/* Template Frame */}
                    <div className="relative bg-gradient-to-br from-[#f7fcee] to-[#f6e79e]/30 rounded-2xl p-4 border-2 border-[#f6e79e]/50 shadow-lg">
                      {/* Egg Design in Template */}
                                      <div className="relative w-full h-32 bg-white rounded-xl overflow-hidden shadow-inner">
                  <Image
                    src={design.image}
                    alt={design.name}
                    fill
                    className="object-contain p-2"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    quality={50}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </div>
                      
                      {/* Design Info */}
                      <div className="mt-3 text-center">
                        <p className="text-xs font-semibold text-gray-700 truncate">{design.name}</p>
                        <p className="text-xs text-gray-500">{design.category}</p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleDesignSelect(design)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Empty Slots */}
                {Array.from({ length: (sizes.find(s => s.name === selectedSize)?.cards || 24) - selectedDesigns.length }).map((_, index) => (
                  <div key={`empty-${index}`} className="relative">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-4 border-2 border-dashed border-gray-300 shadow-lg">
                      <div className="w-full h-32 bg-gray-200 rounded-xl flex items-center justify-center">
                        <div className="text-gray-400 text-4xl">+</div>
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-xs text-gray-400">Empty Slot</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Set Summary */}
              <div className="bg-gradient-to-r from-[#f6e79e]/20 to-[#f7fcee]/30 rounded-2xl p-6 border border-[#f6e79e]/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 mb-2">Set Size</h4>
                    <p className="text-lg text-[#f6e79e] font-semibold">{selectedSize} ({sizes.find(s => s.name === selectedSize)?.cards} cards)</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 mb-2">Selected</h4>
                    <p className="text-lg text-green-600 font-semibold">{selectedDesigns.length} designs</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 mb-2">Total Price</h4>
                    <p className="text-2xl font-bold text-[#f6e79e]">€{calculateOrderTotal().toFixed(2)}</p>
                  </div>
                </div>
              </div>

                            {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button 
                  onClick={handleAddToCart}
                  disabled={selectedDesigns.length === 0}
                  className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    selectedDesigns.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 hover:from-[#f4e285] hover:to-[#f6e79e]'
                  }`}
                >
                  {selectedDesigns.length === 0 
                    ? 'Select Designs First' 
                    : `Add to Cart - €${calculateOrderTotal().toFixed(2)}`
                  }
                </button>
                <button 
                  onClick={() => {
                    setSelectedDesigns([]);
                    localStorage.removeItem('selectedDesigns');
                  }}
                  disabled={selectedDesigns.length === 0}
                  className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 ${
                    selectedDesigns.length === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white'
                  }`}
                >
                  Clear Selection
            </button>
          </div>
            </div>
          )}
        </div>
      </section>

      {/* Preset Collections */}
      <section className="py-20 bg-gradient-to-br from-[#f7fcee] via-white to-[#f6e79e]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 font-manrope">Preset Collections</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Curated collections of our most popular designs, ready for instant purchase
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Link href="/presets/top-10" className="group block">
              <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-200/50 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f6e79e]/5 to-[#f4e285]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#f6e79e] to-[#f4e285] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                      <Star className="w-8 h-8 text-gray-900" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-manrope">Top 10</h3>
                    <p className="text-gray-600 mb-6">Most popular designs</p>
                    
                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-[#f6e79e] rounded-full"></span>
                        <span>10 curated designs</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-[#f6e79e] rounded-full"></span>
                        <span>Premium quality</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-[#f6e79e] rounded-full"></span>
                        <span>Instant download</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 py-3 px-6 rounded-2xl font-semibold hover:from-[#f4e285] hover:to-[#f6e79e] transition-all transform hover:scale-105 text-center group-hover:shadow-lg">
                View Collection
            </div>
                </div>
              </div>
            </Link>
            
                        <Link href="/presets/staff-picks" className="group block">
              <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-200/50 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-manrope">Staff Picks</h3>
                    <p className="text-gray-600 mb-6">Curated by our team</p>
                    
                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>6 award-winning designs</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>Expert curation</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>Premium quality</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-2xl font-semibold hover:from-pink-500 hover:to-purple-500 transition-all transform hover:scale-105 text-center group-hover:shadow-lg">
                View Collection
            </div>
                </div>
              </div>
            </Link>
            
            <Link href="/presets/cute-holiday-eggs" className="group block">
              <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-200/50 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-manrope">Cute Holiday</h3>
                    <p className="text-gray-600 mb-6">Easter special designs</p>
                    
                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                        <span>6 festive designs</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                        <span>Holiday themed</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                        <span>Perfect for celebrations</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-2xl font-semibold hover:from-rose-500 hover:to-pink-500 transition-all transform hover:scale-105 text-center group-hover:shadow-lg">
                View Collection
            </div>
                </div>
              </div>
            </Link>

                        <Link href="/presets/abstract-art" className="group block">
              <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-200/50 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-manrope">Abstract Art</h3>
                    <p className="text-gray-600 mb-6">Modern & creative</p>
                    
                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>6 artistic designs</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Modern aesthetics</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Creative expression</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-2xl font-semibold hover:from-indigo-500 hover:to-blue-500 transition-all transform hover:scale-105 text-center group-hover:shadow-lg">
                    View Collection
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Surprise Me Modal */}
      {showSurpriseModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-sm sm:max-w-md w-full my-8 max-h-[calc(100vh-4rem)] flex flex-col">
            
            {/* Step 1: Surprise Type Selection */}
            {surpriseStep === 1 && (
              <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-manrope">Choose your surprise!</h2>
                  <p className="text-sm sm:text-base text-gray-600">What kind of egg adventure are you looking for?</p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {[
                    { type: 'One Egg Card', icon: '🥚', description: '1 perfect design', color: 'from-blue-500 to-cyan-500' },
                    { type: 'Mini Preset', icon: '🎨', description: '5 curated designs', color: 'from-green-500 to-emerald-500' },
                    { type: 'Full Preset', icon: '✨', description: '24 complete set', color: 'from-purple-500 to-pink-500' },
                    { type: 'XL Preset', icon: '👑', description: '45 premium collection', color: 'from-orange-500 to-red-500' }
                  ].map((option) => (
                    <button
                      key={option.type}
                      onClick={() => handleSurpriseTypeSelect(option.type)}
                      className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-gray-200 hover:border-transparent transition-all transform hover:scale-105 shadow-lg hover:shadow-xl bg-gradient-to-r ${option.color} text-white text-left`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="text-xl sm:text-2xl">{option.icon}</span>
                        <div>
                          <h3 className="font-bold text-base sm:text-lg">{option.type}</h3>
                          <p className="text-white/80 text-xs sm:text-sm">{option.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto" />
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={closeSurpriseModal}
                  className="w-full mt-4 sm:mt-6 py-2.5 sm:py-3 text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base"
                >
                  Maybe later
                </button>
              </div>
            )}

            {/* Step 2: Loading Animation */}
            {surpriseStep === 2 && (
              <div className="p-4 sm:p-6 md:p-8 text-center overflow-y-auto flex-1">
                <div className="mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse">
                    <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-spin" />
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 font-manrope">Creating your surprise...</h2>
                  
                  <div className="mb-4 sm:mb-6">
                    <div className="text-base sm:text-lg text-gray-600 mb-2">
                      {loadingMessages[Math.floor((loadingProgress / 20))] || loadingMessages[loadingMessages.length - 1]}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 sm:h-3 rounded-full transition-all duration-300"
                        style={{ width: `${loadingProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-1 sm:gap-2">
                    {['🥚', '🎨', '✨', '🎉', '🌟'].map((emoji, index) => (
                      <span 
                        key={index}
                        className={`text-xl sm:text-2xl animate-bounce`}
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Result Reveal */}
            {surpriseStep === 3 && (
              <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-bounce">
                    <span className="text-2xl sm:text-3xl">🎉</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-manrope">Ta-da! Your surprise is ready!</h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                    We found {surpriseResult.length} perfect design{surpriseResult.length > 1 ? 's' : ''} for you!
                  </p>
                </div>

                {/* Preview of selected designs */}
                <div className="mb-4 sm:mb-6">
                  <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 text-center">
                    {surpriseResult.length} designs selected for you
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2 max-h-32 sm:max-h-48 overflow-y-auto rounded-lg sm:rounded-xl p-2 bg-gray-50">
                    {surpriseResult.map((design, index) => (
                      <div key={index} className="relative aspect-square rounded-md sm:rounded-lg overflow-hidden border-2 border-purple-200">
                        <Image
                          src={design.image}
                          alt={design.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 80px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-1 left-1 text-white text-[10px] sm:text-xs font-medium truncate w-full px-1">
                            {design.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <button
                    onClick={handleViewSurprise}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    View My Surprise
                  </button>
                  <button
                    onClick={handleTryAnother}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all"
                  >
                    Try Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}