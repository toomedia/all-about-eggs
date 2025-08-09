'use client';

import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Sparkles, Star, Search, Filter, Download, Eye, X, Gift, ArrowUpDown, TrendingUp, Clock, SortAsc, ChevronLeft, ChevronRight, Play, Info} from 'lucide-react';
import Image from 'next/image';

import useTranslation from '@/lib/useTranslation';
export default function CatalogPage() {
  
     const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('XL');
  const [displayCount, setDisplayCount] = useState(16);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDesigns, setSelectedDesigns] = useState<typeof eggDesigns>([]);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderType, setOrderType] = useState<'custom' | 'preset'>('custom');
  const [isSurpriseSelection, setIsSurpriseSelection] = useState(false);
  
  // New state variables for enhanced functionality
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'trending' | 'alphabetical'>('newest');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewDesign, setPreviewDesign] = useState<typeof eggDesigns[0] | null>(null);
  const [showInfoSection, setShowInfoSection] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  
  // Surprise Me Modal States
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [surpriseStep, setSurpriseStep] = useState(1); // 1: selection, 2: loading, 3: result
  const [selectedSurpriseType, setSelectedSurpriseType] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [surpriseResult, setSurpriseResult] = useState<typeof eggDesigns>([]);
const [loadingMessages] = useState([
  t.Catalog.message1,
  t.Catalog.message2,
  t.Catalog.message3,
  t.Catalog.message4,
  t.Catalog.message5
]);

  // Load saved selections from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
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
    }
  }, []);

  // Save selections to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedDesigns', JSON.stringify(selectedDesigns));
      localStorage.setItem('selectedSize', selectedSize);
      localStorage.setItem('isSurpriseSelection', JSON.stringify(isSurpriseSelection));
    }
  }, [selectedDesigns, selectedSize, isSurpriseSelection]);

const categories = [
  { name: t.Catalog.all, count: 30, icon: '🌟' },
  { name: t.Catalog.easter, count: 10, icon: '🥚' },
  { name: t.Catalog.abstract, count: 8, icon: '🎨' },
  { name: t.Catalog.nature, count: 6, icon: '🌿' },
  { name: t.Catalog.classics, count: 4, icon: '✨' },
  { name: t.Catalog.popCulture, count: 2, icon: '🎭' }
];

  const eggDesigns = [
    // Easter Category
    {
      id: 1,
      name: 'Easter Bunny Delight',
      category: t.Catalog.categoryeaster,
      image: '/eggs images/A01ED9DF-9438-4E70-B773-60A2C41A82F3.PNG',
      difficulty: t.Catalog.easy,
      tags: ['pastel', 'bunny', 'spring'],
      premium: false,
      featured: true,
      popularity: 95,
      trending: true,
      createdAt: '2024-01-15',
      description: 'A delightful Easter bunny design perfect for spring celebrations. Features soft pastel colors and charming bunny motifs.',
      inspiration: 'Inspired by traditional Easter celebrations and the joy of spring renewal.',
      views: 1250,
      downloads: 340
    },
    {
      id: 2,
      name: 'Spring Bloom Magic',
      category: t.Catalog.categoryeaster,
      image: '/eggs images/A1C8EC8B-F376-4179-9677-5EEB3BED10E1.PNG',
      difficulty: t.Catalog.medium,
      tags: ['floral', 'bloom', 'magic'],
      premium: true,
      featured: false,
      popularity: 88,
      trending: false,
      createdAt: '2024-02-20',
      description: 'Magical spring flowers blooming in vibrant colors. Perfect for nature lovers and garden enthusiasts.',
      inspiration: 'Inspired by the first blooms of spring and the magic of seasonal renewal.',
      views: 980,
      downloads: 245
    },
    {
      id: 3,
      name: 'Pastel Rainbow Dream',
       category: t.Catalog.categoryeaster,
      image: '/eggs images/78F51BD8-2667-4818-A8EB-F96F9A75C762.PNG',
      difficulty: t.Catalog.easy,
      tags: ['rainbow', 'pastel', 'dream'],
      premium: false,
      featured: false
    },
    {
      id: 4,
      name: 'Floral Garden Party',
       category: t.Catalog.categoryeaster,
      image: '/eggs images/985F746C-6F78-4E2A-BD7F-20F49045629D.PNG',
      difficulty: t.Catalog.hard,
      tags: ['garden', 'floral', 'party'],
      premium: true,
      featured: true
    },
    {
      id: 5,
      name: 'Easter Egg Hunt',
       category: t.Catalog.categoryeaster,
      image: '/eggs images/900607D2-4C7C-4EA3-BED1-CEC884AC396F.PNG',
      difficulty: t.Catalog.easy,
      tags: ['hunt', 'easter', 'fun'],
      premium: false,
      featured: false
    },
    {
      id: 6,
      name: 'Spring Chick Adventure',
       category: t.Catalog.categoryeaster,
      image: '/eggs images/B96EC52A-B308-4F59-BDF1-FF4634AF366F.PNG',
      difficulty: t.Catalog.medium,
      tags: ['chick', 'spring', 'adventure'],
      premium: false,
      featured: false
    },
    {
      id: 7,
      name: 'Easter Basket Joy',
       category: t.Catalog.categoryeaster,
      image: '/eggs images/5A1D36A7-05A2-4D73-862E-478A4C6B175A.PNG',
      difficulty: t.Catalog.medium,
      tags: ['basket', 'joy', 'easter'],
      premium: true,
      featured: false
    },
    {
      id: 8,
      name: 'Pastel Paradise',
       category: t.Catalog.categoryeaster,
      image: '/eggs images/20A37086-FD6B-4CA4-A663-92783F0D587A.PNG',
      difficulty: t.Catalog.easy,
      tags: ['pastel', 'paradise', 'soft'],
      premium: false,
      featured: false
    },
    {
      id: 9,
      name: 'Easter Morning Glory',
       category: t.Catalog.categoryeaster,
      image: '/eggs images/D05371AC-8A6A-420F-8EDB-CEA5A00AE606.PNG',
      difficulty: t.Catalog.hard,
      tags: ['morning', 'glory', 'easter'],
      premium: true,
      featured: false
    },
    {
      id: 10,
      name: 'Spring Awakening',
       category: t.Catalog.categoryeaster,
      image: '/eggs images/D0126C2C-603B-471C-820E-370773708853.PNG',
      difficulty: t.Catalog.medium,
      tags: ['spring', 'awakening', 'renewal'],
      premium: false,
      featured: false
    },
    {
      id: 11,
      name: 'Easter Eggstravaganza',
       category: t.Catalog.categoryeaster,
      image: '/eggs images/7F9DC646-284C-4E7F-8FBF-AA6A3F60096C.PNG',
      difficulty: t.Catalog.hard,
      tags: ['extravaganza', 'easter', 'celebration'],
      premium: true,
      featured: true
    },
    {
      id: 12,
      name: 'Pastel Harmony',
       category: t.Catalog.categoryeaster,
      image: '/eggs images/EF92674E-D04F-42F7-8308-DA4FF3C17BE1.PNG',
      difficulty: t.Catalog.easy,
      tags: ['pastel', 'harmony', 'peace'],
      premium: false,
      featured: false
    },
    {
      id: 13,
      name: 'Easter Joy',
       category: t.Catalog.categoryeaster,
      image: '/eggs images/BA0EA02E-9CD8-4405-92AB-A91969CB36D9.PNG',
      difficulty: t.Catalog.medium,
      tags: ['joy', 'easter', 'happiness'],
      premium: false,
      featured: false
    },
    {
      id: 14,
      name: 'Spring Celebration',
       category: t.Catalog.categoryeaster,
      image: '/eggs images/09FF42F9-2664-4698-8FD8-E544A47D616B.PNG',
      difficulty: t.Catalog.medium,
      tags: ['spring', 'celebration', 'festive'],
      premium: true,
      featured: false
    },
    {
      id: 15,
      name: 'Easter Wonderland',
       category: t.Catalog.categoryeaster,
      image: '/eggs images/EE3B1C9F-EE9B-41F0-AADE-A1785767ECF8.PNG',
      difficulty: t.Catalog.hard,
      tags: ['wonderland', 'easter', 'magical'],
      premium: true,
      featured: true
    },

    // Abstract Category
    {
      id: 16,
      name: 'Cosmic Galaxy',
     category: t.Catalog.categoryabstract,
      image: '/eggs images/FC7DEB0F-9010-41FF-A9DE-05AC0CE582DB.PNG',
      difficulty: t.Catalog.hard,
      tags: ['cosmic', 'galaxy', 'space'],
      premium: true,
      featured: true
    },
    {
      id: 17,
      name: 'Neon Dreams',
       category: t.Catalog.categoryabstract,
      image: '/eggs images/A1C1364A-0881-4FD4-8863-942528923EF4.PNG',
      difficulty: t.Catalog.medium,
      tags: ['neon', 'dreams', 'vibrant'],
      premium: true,
      featured: false
    },
    {
      id: 18,
      name: 'Digital Matrix',
       category: t.Catalog.categoryabstract,
      image: '/eggs images/409969A2-15D6-417E-BB80-7F5514D4C420.PNG',
      difficulty: t.Catalog.hard,
      tags: ['digital', 'matrix', 'tech'],
      premium: true,
      featured: false
    },
    {
      id: 19,
      name: 'Geometric Harmony',
      category: t.Catalog.categoryabstract,
      image: '/eggs images/F2B512AE-60BB-403D-A6F1-C7D8B963DDF4.PNG',
      difficulty: t.Catalog.medium,
      tags: ['geometric', 'harmony', 'shapes'],
      premium: false,
      featured: false
    },
    {
      id: 20,
      name: 'Abstract Expression',
       category: t.Catalog.categoryabstract,
      image: '/eggs images/C35ACEE8-3CC4-4372-BE84-6658357CED6A.PNG',
      difficulty: t.Catalog.hard,
      tags: ['abstract', 'expression', 'art'],
      premium: true,
      featured: false
    },
    {
      id: 21,
      name: 'Modern Minimalist',
      category: t.Catalog.categoryabstract,
      image: '/eggs images/C2084B60-843C-45F9-85CA-FC4D5099707B.PNG',
      difficulty: t.Catalog.easy,
      tags: ['modern', 'minimalist', 'clean'],
      premium: false,
      featured: false
    },
    {
      id: 22,
      name: 'Artistic Flow',
      category: t.Catalog.categoryabstract,
      image: '/eggs images/5D6FB616-991D-4FF4-8188-8DD066C89F60.PNG',
      difficulty: t.Catalog.medium,
      tags: ['artistic', 'flow', 'creative'],
      premium: true,
      featured: false
    },
    {
      id: 23,
      name: 'Contemporary Chaos',
    category: t.Catalog.categoryabstract,
      image: '/eggs images/D1ED21D6-2288-497B-AF9D-BDA37D4FEB9D.PNG',
      difficulty: t.Catalog.hard,
      tags: ['contemporary', 'chaos', 'dynamic'],
      premium: true,
      featured: false
    },
    {
      id: 24,
      name: 'Abstract Symphony',
       category: t.Catalog.categoryabstract,
      image: '/eggs images/12ABB356-852A-4C46-97EF-C93BAD83AD37.PNG',
      difficulty: t.Catalog.medium,
      tags: ['symphony', 'abstract', 'music'],
      premium: false,
      featured: false
    },
    {
      id: 25,
      name: 'Digital Artistry',
       category: t.Catalog.categoryabstract,
      image: '/eggs images/74AB1B49-6171-4D10-94D7-D9A2F0CD87A9.PNG',
      difficulty: t.Catalog.hard,
      tags: ['digital', 'artistry', 'modern'],
      premium: true,
      featured: true
    },
    {
      id: 26,
      name: 'Modern Geometry',
       category: t.Catalog.categoryabstract,
      image: '/eggs images/2B56B7A1-95A1-4348-BB4E-8C039CF9A5E6 2.PNG',
      difficulty: t.Catalog.medium,
      tags: ['modern', 'geometry', 'shapes'],
      premium: false,
      featured: false
    },
    {
      id: 27,
      name: 'Abstract Fusion',
       category: t.Catalog.categoryabstract,
      image: '/eggs images/E4513E64-1FAF-4F88-81C1-51D9E43AF23B.PNG',
      difficulty: t.Catalog.hard,
      tags: ['fusion', 'abstract', 'mixed'],
      premium: true,
      featured: false
    },

    // Nature Category
    {
      id: 28,
      name: 'Forest Whisper',
       category: t.Catalog.categorynature,
      image: '/eggs images/E74484D8-5397-4B11-AC94-49D1F1AA05DA.PNG',
      difficulty: t.Catalog.medium,
      tags: ['forest', 'whisper', 'nature'],
      premium: false,
      featured: false
    },
    {
      id: 29,
      name: 'Ocean Depths',
      category: t.Catalog.categorynature,
      image: '/eggs images/C45C3AAA-999C-4D28-866C-ED60247B38DA.PNG',
      difficulty: t.Catalog.hard,
      tags: ['ocean', 'depths', 'blue'],
      premium: true,
      featured: true
    },
    {
      id: 30,
      name: 'Mountain Majesty',
     category: t.Catalog.categorynature,
      image: '/eggs images/FFB0A181-F174-4265-A600-BB6CBD8AD68F.PNG',
      difficulty: t.Catalog.medium,
      tags: ['mountain', 'majesty', 'grand'],
      premium: false,
      featured: false
    },
    {
      id: 31,
      name: 'Desert Sunset',
      category: t.Catalog.categorynature,
      image: '/eggs images/1D183BF4-5321-4CD1-9A88-9E1B0EE2756A.PNG',
      difficulty: t.Catalog.medium,
      tags: ['desert', 'sunset', 'warm'],
      premium: true,
      featured: false
    },
    {
      id: 32,
      name: 'Tropical Paradise',
  category: t.Catalog.categorynature,
      image: '/eggs images/2B56B7A1-95A1-4348-BB4E-8C039CF9A5E6.PNG',
      difficulty: t.Catalog.hard,
      tags: ['tropical', 'paradise', 'exotic'],
      premium: true,
      featured: true
    },
    {
      id: 33,
      name: 'Arctic Aurora',
   category: t.Catalog.categorynature,
      image: '/eggs images/E37F5708-3D61-46B6-A872-804A5DCE3549.PNG',
      difficulty: t.Catalog.hard,
      tags: ['arctic', 'aurora', 'northern'],
      premium: true,
      featured: true
    },
    {
      id: 34,
      name: 'Garden Symphony',
      category: t.Catalog.categorynature,
      image: '/eggs images/BA7F578A-E63C-4015-A821-32EE5943F69A 2.PNG',
      difficulty: t.Catalog.medium,
      tags: ['garden', 'symphony', 'floral'],
      premium: false,
      featured: false
    },
    {
      id: 35,
      name: 'Wilderness Call',
     category: t.Catalog.categorynature,
      image: '/eggs images/1A13F1D5-56EE-4ABB-8EBF-6472C571F8C0 2.PNG',
      difficulty: t.Catalog.medium,
      tags: ['wilderness', 'call', 'adventure'],
      premium: false,
      featured: false
    },
    {
      id: 36,
      name: 'Natural Harmony',
      category: t.Catalog.categorynature,
      image: '/eggs images/49EBD2EA-DB4E-498C-B362-5CC7BC8D8EFC 2.PNG',
      difficulty: t.Catalog.easy,
      tags: ['natural', 'harmony', 'balance'],
      premium: true,
      featured: false
    },
    {
      id: 37,
      name: 'Earth Elements',
      category: t.Catalog.categorynature,
      image: '/eggs images/E6EC4F06-A22A-418F-A17A-4914AA3FD4B4 2.PNG',
      difficulty: t.Catalog.medium,
      tags: ['earth', 'elements', 'natural'],
      premium: false,
      featured: false
    },

    // Classics Category
    {
      id: 38,
      name: 'Timeless Elegance',
      category: t.Catalog.categoryclassics,
      image: '/eggs images/8A597E8D-765D-4CF6-AE37-03B2BFBD3E05 2.PNG',
      difficulty: t.Catalog.medium,
      tags: ['timeless', 'elegance', 'classic'],
      premium: true,
      featured: true
    },
    {
      id: 39,
      name: 'Vintage Charm',
       category: t.Catalog.categoryclassics,
      image: '/eggs images/68AD1A11-8B38-4AB9-A0A6-77313D984D91 2.PNG',
      difficulty: t.Catalog.medium,
      tags: ['vintage', 'charm', 'retro'],
      premium: false,
      featured: false
    },
    {
      id: 40,
      name: 'Classic Beauty',
       category: t.Catalog.categoryclassics,
      image: '/eggs images/18A7AE83-8BCA-4A40-902C-491B827D40D7 2.PNG',
      difficulty: t.Catalog.easy,
      tags: ['classic', 'beauty', 'simple'],
      premium: false,
      featured: false
    },
    {
      id: 41,
      name: 'Heritage Pattern',
     category: t.Catalog.categoryclassics,
      image: '/eggs images/4AEA8E2E-3BA1-4E9D-85F5-1FD24F251D82 2.PNG',
      difficulty: t.Catalog.hard,
      tags: ['heritage', 'pattern', 'traditional'],
      premium: true,
      featured: true
    },
    {
      id: 42,
      name: 'Traditional Grace',
       category: t.Catalog.categoryclassics,
      image: '/eggs images/DD32BCE3-A8F9-44F4-A032-C6022DFF8F06 2.PNG',
      difficulty: t.Catalog.medium,
      tags: ['traditional', 'grace', 'elegant'],
      premium: false,
      featured: false
    },
    {
      id: 43,
      name: 'Classic Sophistication',
       category: t.Catalog.categoryclassics,
      image: '/eggs images/F75CD647-69B9-4A7B-B20D-06C0433D6365 2.PNG',
      difficulty: t.Catalog.hard,
      tags: ['sophistication', 'classic', 'refined'],
      premium: true,
      featured: false
    },
    {
      id: 44,
      name: 'Elegant Simplicity',
      category: t.Catalog.categoryclassics,
      image: '/eggs images/45B42402-455F-4068-86AC-99D79531ADD2 2.PNG',
      difficulty: t.Catalog.easy,
      tags: ['elegant', 'simplicity', 'clean'],
      premium: false,
      featured: false
    },
    {
      id: 45,
      name: 'Timeless Design',
      category: t.Catalog.categoryclassics,
      image: '/eggs images/3CC844D3-B143-4C2A-89A2-3717C91873ED 2.PNG',
      difficulty: t.Catalog.medium,
      tags: ['timeless', 'design', 'enduring'],
      premium: true,
      featured: false
    },

    // Pop Culture Category
    {
      id: 46,
      name: 'Retro Gaming',
       category: t.Catalog.pop_culture,
      image: '/eggs images/B7FC98EB-F2EB-4638-8841-3E570F536F1D 2.PNG',
      difficulty: t.Catalog.hard,
      tags: ['retro', 'gaming', 'pixel'],
      premium: true,
      featured: true
    },
    {
      id: 47,
      name: 'Movie Magic',
      category: t.Catalog.pop_culture,
      image: '/eggs images/A01ED9DF-9438-4E70-B773-60A2C41A82F3.PNG',
      difficulty: t.Catalog.medium,
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

  // Enhanced filtering and sorting
  const filteredDesigns = eggDesigns.filter(design => {
    // Category filter
    const categoryMatch = selectedCategory === 'All' || design.category === selectedCategory;
    
    // Search filter
    const searchMatch = design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       design.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                       (design.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    
    // Difficulty filter
    const difficultyMatch = selectedDifficulty === 'all' || design.difficulty === selectedDifficulty;
    
    // Price range filter (premium vs free)
    const priceMatch = selectedPriceRange === 'all' || 
                      (selectedPriceRange === 'free' && !design.premium) ||
                      (selectedPriceRange === 'premium' && design.premium);
    
    return categoryMatch && searchMatch && difficultyMatch && priceMatch;
  });

  // Sort designs based on selected criteria
  const sortedDesigns = [...filteredDesigns].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.popularity || 0) - (a.popularity || 0);
      case 'trending':
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || (b.views || 0) - (a.views || 0);
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'newest':
      default:
        return new Date(b.createdAt || '2024-01-01').getTime() - new Date(a.createdAt || '2024-01-01').getTime();
    }
  });

  const displayedDesigns = sortedDesigns.slice(0, displayCount);

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

  // New function to handle adding to wishlist
  const handleAddToWishlist = (design: typeof eggDesigns[0]) => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      // Check if item is already in wishlist
      const isAlreadyInWishlist = wishlist.some((item: any) => item.id === design.id);
      
      if (!isAlreadyInWishlist) {
        wishlist.push(design);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        console.log("Wishlist saved:", wishlist);
        // Dispatch wishlist update event for header
        window.dispatchEvent(new CustomEvent('eggfinity-wishlist-updated'));
        // Show a subtle notification instead of alert
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
        notification.textContent = `Added "${design.name}" to favorites!`;
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
          notification.style.transform = 'translateX(100%)';
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 3000);
      } else {
        // Item already in wishlist
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
        notification.textContent = `"${design.name}" is already in your favorites!`;
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
          notification.style.transform = 'translateX(100%)';
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 3000);
      }
    }
  };

  // Combined function for "Crack it" button
  const handleCrackIt = (design: typeof eggDesigns[0]) => {
    // First add to wishlist
    handleAddToWishlist(design);
    // Then handle design selection
    handleDesignSelect(design);
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
      alert(t.Catalog.selectDesignAlert);
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

  // Preview Modal Functions
  const openPreviewModal = (design: typeof eggDesigns[0]) => {
    setPreviewDesign(design);
    setShowPreviewModal(true);
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
    setPreviewDesign(null);
  };

  // Enhanced search toggle
  const toggleAdvancedSearch = () => {
    setAdvancedSearch(!advancedSearch);
  };

  return (
    <div className="min-h-screen ">
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
           {t.Catalog.eggTemplatesTitle}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 md:mb-12 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-4">
           {t.Catalog.eggTemplatesDescription }
          </p>
          
          {/* Enhanced Search and Filter */}
          <div className="flex flex-col gap-4 justify-center items-center mb-8 sm:mb-10 md:mb-12 px-4">
            {/* Main Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-4xl">
              <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder={t.Catalog.search_templates}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-[#f6e79e] focus:border-transparent outline-none transition-all text-sm sm:text-base"
              />
            </div>
              <button 
                onClick={toggleAdvancedSearch}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl sm:rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="font-medium text-gray-700">
                  {advancedSearch ? 'Hide Filters' : 'Advanced Filters'}
              </span>
            </button>
            </div>

            {/* Advanced Filters */}
            {advancedSearch && (
              <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Sort Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-transparent"
                    >
                      <option value="newest">Newest First</option>
                      <option value="popular">Most Popular</option>
                      <option value="trending">Trending</option>
                      <option value="alphabetical">A-Z</option>
                    </select>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-transparent"
                    >
                      <option value="all">All Difficulties</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <select
                      value={selectedPriceRange}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-transparent"
                    >
                      <option value="all">All Designs</option>
                      <option value="free">Free Designs</option>
                      <option value="premium">Premium Designs</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
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
                <span className="font-bold text-lg">
                  {t.Catalog.surpriseSelectionTitle}
                </span>
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 font-manrope">
                {selectedDesigns.length}
                {t.Catalog.surpriseSelectionSubtitle}
              </h2>
              <p className="text-gray-600 text-lg">
                {t.Catalog.surpriseSelectionDescription}
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
              {t.Catalog.addToCart} - €{calculateOrderTotal().toFixed(2)}
              </button>
              <button
                onClick={() => {
                  setSelectedDesigns([]);
                  setIsSurpriseSelection(false);
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('selectedDesigns');
                    localStorage.removeItem('isSurpriseSelection');
                  }
                }}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200 text-purple-700 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 hover:bg-white flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                {t.Catalog.clear_selection}
              </button>
            </div>
          </div>
        </section>
      )}

      
      {/* Size Selection */}
      {/* <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-manrope">
            {t.Catalog.choose_set_size}
          </h2>
          
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
      </section> */}

      {/* Category Filters */}
      <section className="py-12 bg-white backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
        <div className="overflow-x-auto whitespace-nowrap py-4">
  <div className="inline-flex gap-3">
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
  </div>
</div>

          <button 
  onClick={() => window.location.href = "/configurator"}
  title={t.Catalog.surprise_me_subtitle}
  className="px-6 py-3 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 rounded-full font-medium hover:from-[#f4e285] hover:to-[#f6e79e] transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg"
>
  <Sparkles className="w-4 h-4" />
  {t.Catalog.surprise_me}
</button>

          </div>
        </div>
      </section>


      {/* Design Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 font-manrope">
                {t.Catalog.choose_your_designs}
              </h2>
              <p className="text-gray-600 text-lg">Choose {sizes.find(s => s.name === selectedSize)?.cards} out of {filteredDesigns.length} designs</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">
                {t.Catalog.selection_status}
                 {displayedDesigns.length} 
                 {t.Catalog.of}
                  {filteredDesigns.length}
                  {t.Catalog.egg}
                  </p>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-[#f6e79e] rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayedDesigns.map((design) => (
              <div key={design.id} className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                {/* Premium Badge */}
                               {/* Premium Badge */}
{design.premium && (
  <div
    className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
    title={t.Catalog.premiumTooltip} // Tooltip text
  >
    <Star className="w-3 h-3" />
    {t.catalogSection.premium}
  </div>
)}

{/* Featured Badge */}
{design.featured && (
  <div
    className="absolute top-4 left-4 z-10 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
    title={t.Catalog.featuredTooltip} // Tooltip text
  >
    <Sparkles className="w-3 h-3" />
    {t.catalogSection.featured}
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
                        onClick={() => openPreviewModal(design)}
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
    handleAddToWishlist(design);
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
                    onClick={() => handleCrackIt(design)}
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
                        Egg-cellent choice!
                      </>
                    ) : design.premium ? (
                      <>
                        <Star className="w-4 h-4" />
                      {t.Catalog.getPremium}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Crack it
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
              {t.Catalog.loadMore}
            </button>
          </div>
          )}
          {displayCount > 4 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setDisplayCount(4)}
                className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-xl font-semibold text-base hover:bg-white transition-all transform hover:scale-105"
              >
                {t.Catalog.showLess}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Preview Modal */}
      {showPreviewModal && previewDesign && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{previewDesign.name}</h2>
              <button
                onClick={closePreviewModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="relative">
                  <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
                    <Image
                      src={previewDesign.image}
                      alt={previewDesign.name}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={90}
                    />
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => window.open(previewDesign.image, '_blank')}
                      className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Full Size
                    </button>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = previewDesign.image;
                        link.download = `${previewDesign.name}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="flex-1 py-3 px-4 bg-[#f6e79e] text-gray-900 rounded-xl font-semibold hover:bg-[#f4e285] transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                  {/* Design Info */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Design Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{previewDesign.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Difficulty:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          previewDesign.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                          previewDesign.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {previewDesign.difficulty}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <div className="flex gap-2">
                          {previewDesign.premium && (
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                              Premium
                            </span>
                          )}
                          {previewDesign.featured && (
                            <span className="px-2 py-1 bg-[#f6e79e] text-gray-900 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {previewDesign.description && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                      <p className="text-gray-600 leading-relaxed">{previewDesign.description}</p>
                    </div>
                  )}

                  {/* Inspiration */}
                  {previewDesign.inspiration && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Inspiration</h3>
                      <p className="text-gray-600 leading-relaxed">{previewDesign.inspiration}</p>
                    </div>
                  )}

                  {/* Tags */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {previewDesign.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  {(previewDesign.views || previewDesign.downloads || previewDesign.popularity) && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Stats</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {previewDesign.views && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{previewDesign.views}</div>
                            <div className="text-sm text-gray-600">Views</div>
                          </div>
                        )}
                        {previewDesign.downloads && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{previewDesign.downloads}</div>
                            <div className="text-sm text-gray-600">Downloads</div>
                          </div>
                        )}
                        {previewDesign.popularity && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{previewDesign.popularity}%</div>
                            <div className="text-sm text-gray-600">Popularity</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        handleCrackIt(previewDesign);
                        closePreviewModal();
                      }}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                        selectedDesigns.some(d => d.id === previewDesign.id)
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : previewDesign.premium 
                            ? 'bg-amber-500 text-white hover:bg-amber-600'
                            : 'bg-[#f6e79e] text-gray-900 hover:bg-[#f4e285]'
                      }`}
                    >
                      {selectedDesigns.some(d => d.id === previewDesign.id) ? 'Selected' : 'Crack it'}
                    </button>
                    <button
                      onClick={() => {
                        handleAddToWishlist(previewDesign);
                      }}
                      className="py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}





