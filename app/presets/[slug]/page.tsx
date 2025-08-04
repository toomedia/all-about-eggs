'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, ShoppingCart, Sparkles, Star, Heart, Download, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Preset collections data
const presetCollections = {
  'easter-eggs': {
    title: 'Easter Eggs Collection',
    description: 'Beautiful Easter-themed designs perfect for spring celebrations',
    icon: '🥚',
    designs: [
      { id: 1, name: "Easter Bunny Delight", category: "Easter", image: "/egg1.png", premium: true, featured: true, likes: 245 },
      { id: 2, name: "Pastel Dream", category: "Easter", image: "/egg2.png", premium: false, featured: false, likes: 167 },
      { id: 3, name: "Spring Flower Garden", category: "Easter", image: "/egg3.png", premium: false, featured: true, likes: 189 },
      { id: 4, name: "Easter Basket Magic", category: "Easter", image: "/egg4.png", premium: true, featured: false, likes: 156 },
      { id: 5, name: "Chocolate Egg Fantasy", category: "Easter", image: "/egg5.png", premium: false, featured: true, likes: 223 },
      { id: 6, name: "Easter Parade", category: "Easter", image: "/egg6.png", premium: true, featured: true, likes: 178 },
      { id: 7, name: "Spring Awakening", category: "Easter", image: "/egg7.png", premium: false, featured: false, likes: 201 },
      { id: 8, name: "Easter Morning", category: "Easter", image: "/egg9.png", premium: true, featured: false, likes: 145 },
      { id: 9, name: "Bunny Hop", category: "Easter", image: "/egg1.png", premium: false, featured: true, likes: 234 },
      { id: 10, name: "Easter Joy", category: "Easter", image: "/egg2.png", premium: true, featured: true, likes: 267 }
    ]
  },
  'abstract-designs': {
    title: 'Abstract Designs Collection',
    description: 'Modern and artistic abstract designs for creative minds',
    icon: '🎨',
    designs: [
      { id: 11, name: "Colorful Chaos", category: "Abstract", image: "/egg3.png", premium: true, featured: true, likes: 312 },
      { id: 12, name: "Geometric Harmony", category: "Abstract", image: "/egg4.png", premium: false, featured: true, likes: 245 },
      { id: 13, name: "Fluid Motion", category: "Abstract", image: "/egg5.png", premium: true, featured: false, likes: 189 },
      { id: 14, name: "Minimalist Lines", category: "Abstract", image: "/egg6.png", premium: false, featured: false, likes: 167 },
      { id: 15, name: "Organic Shapes", category: "Abstract", image: "/egg7.png", premium: true, featured: true, likes: 278 },
      { id: 16, name: "Digital Dreams", category: "Abstract", image: "/egg9.png", premium: false, featured: false, likes: 201 },
      { id: 17, name: "Abstract Geometric", category: "Abstract", image: "/egg1.png", premium: true, featured: false, likes: 156 },
      { id: 18, name: "Modern Minimalist", category: "Abstract", image: "/egg2.png", premium: true, featured: false, likes: 145 }
    ]
  },
  'nature-inspired': {
    title: 'Nature Inspired Collection',
    description: 'Beautiful designs inspired by the natural world',
    icon: '🌿',
    designs: [
      { id: 19, name: "Forest Friends", category: "Nature", image: "/egg3.png", premium: false, featured: true, likes: 223 },
      { id: 20, name: "Spring Flower Garden", category: "Nature", image: "/egg4.png", premium: false, featured: true, likes: 189 },
      { id: 21, name: "Mountain Majesty", category: "Nature", image: "/egg5.png", premium: true, featured: false, likes: 167 },
      { id: 22, name: "Ocean Waves", category: "Nature", image: "/egg6.png", premium: false, featured: false, likes: 145 },
      { id: 23, name: "Desert Sunset", category: "Nature", image: "/egg7.png", premium: true, featured: true, likes: 234 },
      { id: 24, name: "Tropical Paradise", category: "Nature", image: "/egg9.png", premium: false, featured: false, likes: 178 }
    ]
  },
  'classic-collection': {
    title: 'Classic Collection',
    description: 'Timeless and elegant designs that never go out of style',
    icon: '✨',
    designs: [
      { id: 25, name: "Classic Stripes", category: "Classics", image: "/egg1.png", premium: false, featured: false, likes: 134 },
      { id: 26, name: "Vintage Elegance", category: "Classics", image: "/egg2.png", premium: true, featured: true, likes: 178 },
      { id: 27, name: "Timeless Beauty", category: "Classics", image: "/egg3.png", premium: true, featured: false, likes: 156 },
      { id: 28, name: "Heritage Design", category: "Classics", image: "/egg4.png", premium: false, featured: true, likes: 189 }
    ]
  },
  'top-10': {
    title: 'Top 10 Designs',
    description: 'Our most popular and beloved egg designs',
    icon: '🌟',
    designs: [
      { id: 29, name: "Easter Bunny Delight", category: "Easter", image: "/egg1.png", premium: true, featured: true, likes: 245 },
      { id: 30, name: "Spring Flower Garden", category: "Nature", image: "/egg2.png", premium: false, featured: true, likes: 189 },
      { id: 31, name: "Abstract Geometric", category: "Abstract", image: "/egg3.png", premium: true, featured: false, likes: 156 },
      { id: 32, name: "Classic Stripes", category: "Classics", image: "/egg4.png", premium: false, featured: false, likes: 134 },
      { id: 33, name: "Pop Culture Icons", category: "Pop Culture", image: "/egg5.png", premium: true, featured: true, likes: 298 },
      { id: 34, name: "Pastel Dream", category: "Easter", image: "/egg6.png", premium: false, featured: false, likes: 167 },
      { id: 35, name: "Forest Friends", category: "Nature", image: "/egg7.png", premium: false, featured: true, likes: 223 },
      { id: 36, name: "Modern Minimalist", category: "Abstract", image: "/egg9.png", premium: true, featured: false, likes: 145 },
      { id: 37, name: "Vintage Elegance", category: "Classics", image: "/egg1.png", premium: true, featured: true, likes: 178 },
      { id: 38, name: "Galaxy Dreams", category: "Abstract", image: "/egg2.png", premium: false, featured: false, likes: 201 }
    ]
  },
  'cute-holiday-eggs': {
    title: 'Cute Holiday Eggs',
    description: 'Adorable holiday-themed designs perfect for celebrations',
    icon: '🥚',
    designs: [
      { id: 11, name: "Christmas Magic", category: "Holiday", image: "/egg3.png", premium: false, featured: true, likes: 267 },
      { id: 12, name: "Valentine Hearts", category: "Holiday", image: "/egg4.png", premium: true, featured: false, likes: 189 },
      { id: 13, name: "Halloween Spooky", category: "Holiday", image: "/egg5.png", premium: false, featured: true, likes: 234 },
      { id: 14, name: "New Year Sparkle", category: "Holiday", image: "/egg6.png", premium: true, featured: true, likes: 156 },
      { id: 15, name: "Birthday Bash", category: "Holiday", image: "/egg7.png", premium: false, featured: false, likes: 198 },
      { id: 16, name: "Thanksgiving Harvest", category: "Holiday", image: "/egg9.png", premium: true, featured: false, likes: 145 }
    ]
  },
  'abstract-art': {
    title: 'Abstract Art Collection',
    description: 'Modern and artistic designs for creative minds',
    icon: '🎨',
    designs: [
      { id: 17, name: "Colorful Chaos", category: "Abstract", image: "/egg1.png", premium: true, featured: true, likes: 312 },
      { id: 18, name: "Geometric Harmony", category: "Abstract", image: "/egg2.png", premium: false, featured: true, likes: 245 },
      { id: 19, name: "Fluid Motion", category: "Abstract", image: "/egg3.png", premium: true, featured: false, likes: 189 },
      { id: 20, name: "Minimalist Lines", category: "Abstract", image: "/egg4.png", premium: false, featured: false, likes: 167 },
      { id: 21, name: "Organic Shapes", category: "Abstract", image: "/egg5.png", premium: true, featured: true, likes: 278 },
      { id: 22, name: "Digital Dreams", category: "Abstract", image: "/egg6.png", premium: false, featured: false, likes: 201 }
    ]
  },
  'staff-picks': {
    title: 'Staff Picks',
    description: 'Curated favorites from our design team',
    icon: '✨',
    designs: [
      { id: 23, name: "Designer's Choice", category: "Curated", image: "/egg7.png", premium: true, featured: true, likes: 345 },
      { id: 24, name: "Editor's Favorite", category: "Curated", image: "/egg9.png", premium: true, featured: true, likes: 298 },
      { id: 25, name: "Artist's Vision", category: "Curated", image: "/egg1.png", premium: false, featured: true, likes: 267 },
      { id: 26, name: "Creative Director's Pick", category: "Curated", image: "/egg2.png", premium: true, featured: false, likes: 234 },
      { id: 27, name: "Team Favorite", category: "Curated", image: "/egg3.png", premium: false, featured: true, likes: 289 },
      { id: 28, name: "Award Winner", category: "Curated", image: "/egg4.png", premium: true, featured: true, likes: 356 }
    ]
  }
};

const sizes = [
  { name: 'L', cards: 24, price: 29.99 },
  { name: 'XL', cards: 48, price: 49.99 },
  { name: 'XXL', cards: 96, price: 89.99 }
];

export default function PresetPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedDesigns, setSelectedDesigns] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<number[]>([]);

  // Load saved selections from localStorage
  useEffect(() => {
    const savedDesigns = localStorage.getItem('selectedDesigns');
    const savedSize = localStorage.getItem('selectedSize');
    
    if (savedDesigns) {
      setSelectedDesigns(JSON.parse(savedDesigns));
    }
    if (savedSize) {
      setSelectedSize(savedSize);
    }
  }, []);

  // Save selections to localStorage
  useEffect(() => {
    localStorage.setItem('selectedDesigns', JSON.stringify(selectedDesigns));
    localStorage.setItem('selectedSize', selectedSize);
  }, [selectedDesigns, selectedSize]);

  const preset = presetCollections[slug as keyof typeof presetCollections];

  if (!preset) {
    return (
      <div className="min-h-screen bg-white">
        <Header cartItems={0} cartTotal={0} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Preset Not Found</h1>
          <p className="text-gray-600 mb-8">The preset collection you're looking for doesn't exist.</p>
          <Link href="/catalog" className="bg-[#f6e79e] hover:bg-[#f4e285] text-gray-900 px-6 py-3 rounded-xl font-semibold transition-all">
            Back to Catalog
          </Link>
        </div>
              <Footer />
    </div>
  );
}

  const selectedDesignObjects = preset.designs.filter(design => selectedDesigns.includes(design.id));

  const calculateOrderTotal = () => {
    const selectedSizeData = sizes.find(s => s.name === selectedSize);
    const basePrice = selectedSizeData?.price || 0;
    const totalCards = selectedSizeData?.cards || 24;
    const selectedCount = selectedDesigns.length;
    
    const pricePerCard = basePrice / totalCards;
    return selectedCount * pricePerCard;
  };

  const handleDesignSelect = (designId: number) => {
    setSelectedDesigns(prev => 
      prev.includes(designId) 
        ? prev.filter(id => id !== designId)
        : [...prev, designId]
    );
  };

  const handleSizeSelect = (sizeName: string) => {
    setSelectedSize(sizeName);
    const selectedSizeData = sizes.find(s => s.name === sizeName);
    const totalCards = selectedSizeData?.cards || 24;
    
    // Add more designs to reach the total cards needed
    const currentSelected = selectedDesigns.length;
    const additionalNeeded = totalCards - currentSelected;
    
    if (additionalNeeded > 0) {
      // Get designs that are not already selected
      const availableDesigns = preset.designs.filter(design => !selectedDesigns.includes(design.id));
      const additionalDesigns = availableDesigns.slice(0, additionalNeeded).map(design => design.id);
      
      setSelectedDesigns(prev => [...prev, ...additionalDesigns]);
    }
  };

  const handleAddPresetToCart = () => {
    const selectedSizeData = sizes.find(s => s.name === selectedSize);
    const totalCards = selectedSizeData?.cards || 24;
    
    // If we don't have enough designs selected, add more
    if (selectedDesigns.length < totalCards) {
      const additionalNeeded = totalCards - selectedDesigns.length;
      const availableDesigns = preset.designs.filter(design => !selectedDesigns.includes(design.id));
      const additionalDesigns = availableDesigns.slice(0, additionalNeeded).map(design => design.id);
      
      setSelectedDesigns(prev => [...prev, ...additionalDesigns]);
    }
    
    // Redirect to checkout with all designs
    const allSelectedDesigns = selectedDesigns.length >= totalCards 
      ? selectedDesigns.slice(0, totalCards)
      : [...selectedDesigns, ...preset.designs.slice(0, totalCards - selectedDesigns.length).map(d => d.id)];
    
    const queryParams = new URLSearchParams({
      designs: allSelectedDesigns.join(','),
      size: selectedSize,
      count: totalCards.toString(),
      preset: slug
    });
    window.location.href = `/checkout?${queryParams.toString()}`;
  };

  const handleAddToCart = () => {
    if (selectedDesigns.length === 0) {
      alert('Please select at least one design before adding to cart.');
      return;
    }
    // Redirect to checkout with selected designs
    const queryParams = new URLSearchParams({
      designs: selectedDesigns.join(','),
      size: selectedSize,
      count: selectedDesigns.length.toString(),
      preset: slug
    });
    window.location.href = `/checkout?${queryParams.toString()}`;
  };

  return (
    <div className="min-h-screen ">
      <Header cartItems={selectedDesigns.length} cartTotal={calculateOrderTotal()} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/catalog" className="inline-flex items-center text-gray-600 hover:text-[#f6e79e] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Link>
        </div>

        {/* Preset Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{preset.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-manrope">{preset.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{preset.description}</p>
        </div>

        {/* Size Selection */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center font-manrope">Choose Set Size</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {sizes.map((size) => (
              <div 
                key={size.name}
                onClick={() => handleSizeSelect(size.name)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedSize === size.name
                    ? 'border-[#f6e79e] bg-[#f6e79e]/10'
                    : 'border-gray-200 hover:border-[#f6e79e]/50'
                }`}
              >
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900">{size.name}</h3>
                  <p className="text-sm text-gray-600">{size.cards} cards</p>
                  <p className="text-xl font-bold text-[#f6e79e] mt-2">€{size.price}</p>
                  {selectedSize === size.name && (
                    <div className="mt-2 text-xs text-[#f6e79e] font-medium">
                      {selectedDesigns.length >= size.cards ? '✓ Complete' : `${selectedDesigns.length}/${size.cards} selected`}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preset Purchase Section */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-8 mb-8 border-2 border-purple-200/50">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 font-manrope">Buy Complete Preset</h2>
            <p className="text-gray-600">Get all {sizes.find(s => s.name === selectedSize)?.cards} designs in this collection</p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
                                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-manrope">{preset.title}</h3>
              <p className="text-gray-600 mb-4">{preset.description}</p>
              <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-600">
                <span>✨ {preset.designs.length} curated designs</span>
                <span>🎨 Premium quality</span>
                <span>🚀 Instant download</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                €{sizes.find(s => s.name === selectedSize)?.price}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {sizes.find(s => s.name === selectedSize)?.cards} cards • Complete collection
              </p>
              <button 
                onClick={handleAddPresetToCart}
                className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 w-full lg:w-auto"
              >
                Buy Complete Preset
              </button>
            </div>
          </div>
        </div>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {preset.designs.map((design) => (
            <div 
              key={design.id} 
              className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl border-2 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                selectedDesigns.includes(design.id) 
                  ? 'border-[#f6e79e] shadow-lg' 
                  : 'border-gray-200/50'
              }`}
              onClick={() => handleDesignSelect(design.id)}
            >
              {/* Badges */}
              <div className="absolute top-3 left-3 z-10 flex gap-2">
                {design.premium && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                    <Star className="w-3 h-3" />
                    Premium
                  </span>
                )}
                {design.featured && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </span>
                )}
              </div>

              {/* Design Image */}
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
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxoAPwCdABmX/9k="
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(design.image, '_blank');
                      }}
                      className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all transform hover:scale-110"
                      title="Preview Design"
                    >
                      <Eye className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
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
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Added "${design.name}" to favorites!`);
                      }}
                      className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all transform hover:scale-110"
                      title="Add to Favorites"
                    >
                      <Heart className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedDesigns.includes(design.id) && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-[#f6e79e] rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                  </div>
                )}
              </div>

              {/* Design Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 truncate">{design.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{design.category}</span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Heart className="w-4 h-4 fill-current" />
                    <span>{design.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Area */}
        {selectedDesigns.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Selected Designs ({selectedDesigns.length})</h3>
              <p className="text-gray-600">Preview your selection before adding to cart</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
              {selectedDesignObjects.map((design) => (
                <div key={design.id} className="relative group">
                  <div className="relative bg-gradient-to-br from-[#f7fcee] to-[#f6e79e]/30 rounded-2xl p-4 border-2 border-[#f6e79e]/50 shadow-lg">
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
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxoAPwCdABmX/9k="
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium text-gray-900 truncate">{design.name}</p>
                      <button
                        onClick={() => handleDesignSelect(design.id)}
                        className="mt-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-r from-[#f6e79e]/20 to-[#f7fcee]/30 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 font-manrope">Order Summary</h4>
                  <p className="text-sm text-gray-600">{selectedDesigns.length} designs selected</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Selected Price</p>
                  <p className="text-2xl font-bold text-[#f6e79e]">€{calculateOrderTotal().toFixed(2)}</p>
                </div>
              </div>
              
              {/* Preset Summary */}
              <div className="border-t border-gray-300/50 pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-semibold text-gray-900 font-manrope">Complete Preset</h5>
                    <p className="text-sm text-gray-600">{sizes.find(s => s.name === selectedSize)?.cards} cards total</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Preset Price</p>
                    <p className="text-xl font-bold text-purple-600">€{sizes.find(s => s.name === selectedSize)?.price}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleAddPresetToCart}
                className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500"
              >
                Add Preset to Cart - €{sizes.find(s => s.name === selectedSize)?.price}
              </button>
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
                  : `Add Selected - €${calculateOrderTotal().toFixed(2)}`
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

      <Footer />
    </div>
  );
} 