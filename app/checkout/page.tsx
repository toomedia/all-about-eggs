
'use client';

import useTranslation from '@/lib/useTranslation';
import { useState, useEffect, Suspense } from 'react';
import { CreditCard, Truck, Shield, ArrowLeft, X, Check, Plus, Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

// Separate component for URL parameter handling
function CheckoutContent() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [orderType, setOrderType] = useState<'custom' | 'preset'>('custom');
  const [selectedDesigns, setSelectedDesigns] = useState<any[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedSize, setSelectedSize] = useState('L');
  const [displayCount, setDisplayCount] = useState(8); // Show 4 rows initially (2x4 grid)
  const [isEditing, setIsEditing] = useState(false);
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [replacingIndex, setReplacingIndex] = useState<number | null>(null);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  // Mock egg designs data (same as catalog)
  const eggDesigns = [
    { id: 1, name: "Easter Bunny Delight", category: "Easter", image: "/egg1.png" },
    { id: 2, name: "Spring Flower Garden", category: "Nature", image: "/egg2.png" },
    { id: 3, name: "Abstract Geometric", category: "Abstract", image: "/egg3.png" },
    { id: 4, name: "Classic Stripes", category: "Classics", image: "/egg4.png" },
    { id: 5, name: "Pop Culture Icons", category: "Pop Culture", image: "/egg5.png" },
    { id: 6, name: "Pastel Dream", category: "Easter", image: "/egg6.png" },
    { id: 7, name: "Forest Friends", category: "Nature", image: "/egg7.png" },
    { id: 8, name: "Modern Minimalist", category: "Abstract", image: "/egg9.png" },
  ];

  const sizes = [
    { name: 'L', cards: 24, price: 29.99 },
    { name: 'XL', cards: 48, price: 49.99 },
    { name: 'XXL', cards: 96, price: 89.99 }
  ];

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const designsParam = urlParams.get('designs');
    const presetParam = urlParams.get('preset');
    const sizeParam = urlParams.get('size');
    const countParam = urlParams.get('count');

    if (presetParam) {
      setOrderType('preset');
      // For preset, use first 10 designs
      setSelectedDesigns(eggDesigns.slice(0, 10));
    } else if (designsParam) {
      setOrderType('custom');
      const designIds = designsParam.split(',').map(Number);
      const designs = eggDesigns.filter(design => designIds.includes(design.id));
      setSelectedDesigns(designs);
    } else {
      // Load from cart in localStorage if no URL parameters
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const cartItems = JSON.parse(savedCart);
          if (cartItems.length > 0) {
            // Use the most recent cart item
            const latestCartItem = cartItems[cartItems.length - 1];
            setSelectedDesigns(latestCartItem.designs || []);
            setSelectedSize(latestCartItem.size || 'XL');
            setOrderType('custom');
            
            // If the cart item has a price, use it
            if (latestCartItem.price) {
              // Store the price for later use
              localStorage.setItem('cartItemPrice', latestCartItem.price.toString());
            }
          }
        }
      }
    }

    if (sizeParam) {
      setSelectedSize(sizeParam);
    }

    // Load saved form data from localStorage
    if (typeof window !== 'undefined') {
      const savedFormData = localStorage.getItem('checkoutFormData');
      const savedSize = localStorage.getItem('checkoutSelectedSize');

      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
      if (savedSize) {
        setSelectedSize(savedSize);
      }
    }
  }, []);

  const calculateOrderTotal = () => {
    // Check if we have a stored price from cart
    if (typeof window !== 'undefined') {
      const storedPrice = localStorage.getItem('cartItemPrice');
      if (storedPrice) {
        return parseFloat(storedPrice);
      }
    }

    const selectedSizeData = sizes.find(s => s.name === selectedSize);
    const basePrice = selectedSizeData?.price || 0;
    const totalCards = selectedSizeData?.cards || 24;
    const selectedCount = selectedDesigns.length;

    // If we have designs, calculate based on the actual designs
    if (selectedCount > 0) {
      const pricePerCard = basePrice / totalCards;
      return selectedCount * pricePerCard;
    }

    // If no designs, return the base price
    return basePrice;
  };

  const handleOrderNow = async () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'postalCode'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (selectedDesigns.length < 2) {
      alert("A minimum of 2 eggs are required to proceed");
      return;
    }

    // Show confirmation modal first
    setShowConfirmationModal(true);
  };

  const handleConfirmOrder = async () => {
    setIsProcessingOrder(true);
    setShowConfirmationModal(false);
    setOrderPlaced(true);
    
    const orderDetails = {
      customer: formData,
      designs: selectedDesigns,
      size: selectedSize,
      total: calculateOrderTotal().toFixed(2),
    };
    
    console.log("Order submitted:", orderDetails);
    
    try {
      // ✅ Step 4: Make Stripe session request
      const res = await axios.post<{ url: string }>(
        'https://all-about-eggs.vercel.app/api/create-checkout-session',
        { orderDetails }
      );

      console.log("Stripe session response:", res.data);

      // ✅ Step 5: Redirect to Stripe checkout
      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error("No checkout URL received from Stripe");
      }

    } catch (error) {
      console.error("Error creating Stripe session:", error);
      alert("There was a problem processing your order. Please try again.");
      setOrderPlaced(false);
      setIsProcessingOrder(false);
    }
  };

  const clearLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('selectedDesigns');
      localStorage.removeItem('selectedSize');
      localStorage.removeItem('checkoutFormData');
      localStorage.removeItem('checkoutSelectedSize');
    }
  };

  const handleCompletePreset = () => {
    // Save current form data to localStorage before redirecting
    if (typeof window !== 'undefined') {
      localStorage.setItem('checkoutFormData', JSON.stringify(formData));
      localStorage.setItem('checkoutSelectedSize', selectedSize);
    }
    // Redirect to success page
    window.location.href = '/success';
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Functions for editing designs
  const handleRemoveDesign = (index: number) => {
    const updatedDesigns = selectedDesigns.filter((_, i) => i !== index);
    setSelectedDesigns(updatedDesigns);
    // Update localStorage
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        if (cartItems.length > 0) {
          cartItems[cartItems.length - 1].designs = updatedDesigns;
          localStorage.setItem('cart', JSON.stringify(cartItems));
          // Dispatch cart update event for header
          window.dispatchEvent(new CustomEvent('eggfinity-cart-updated'));
        }
      }
    }
  };

  const handleReplaceDesign = (index: number, newDesign: any) => {
    const updatedDesigns = [...selectedDesigns];
    updatedDesigns[index] = newDesign;
    setSelectedDesigns(updatedDesigns);
    // Update localStorage
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        if (cartItems.length > 0) {
          cartItems[cartItems.length - 1].designs = updatedDesigns;
          localStorage.setItem('cart', JSON.stringify(cartItems));
          // Dispatch cart update event for header
          window.dispatchEvent(new CustomEvent('eggfinity-cart-updated'));
        }
      }
    }
  };

  const handleReplaceWithCatalog = (index: number) => {
    setReplacingIndex(index);
    setShowReplaceModal(true);
  };

  const handleReplaceFromCatalog = (newDesign: any) => {
    if (replacingIndex !== null) {
      handleReplaceDesign(replacingIndex, newDesign);
      setShowReplaceModal(false);
      setReplacingIndex(null);
    }
  };

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + 8, selectedDesigns.length));
  };

  const handleShowAll = () => {
    setDisplayCount(selectedDesigns.length);
  };

  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-purple-50/50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/catalog" className="inline-flex items-center transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.Checkout.backToCatalog}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Options */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 font-manrope">{t.Checkout.orderOptions}</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#f6e79e] text-gray-900 rounded-lg font-medium hover:bg-[#f4e285] transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  {isEditing ? 'Done Editing' : 'Edit Designs'}
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#f6e79e]/20 to-[#f7fcee]/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{t.Checkout.yourSelection}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {selectedDesigns.slice(0, displayCount).map((design, index) => (
                      <div key={design.id} className="relative bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                        {isEditing && (
                          <div className="absolute top-2 right-2 flex gap-1 z-10">
                            <button
                              onClick={() => handleReplaceWithCatalog(index)}
                              className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                              title="Replace Design"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleRemoveDesign(index)}
                              className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                              title="Remove Design"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                        <div className="relative w-full h-20 bg-gray-50 rounded-lg overflow-hidden mb-2">
                          <Image
                            src={design.image}
                            alt={design.name}
                            fill
                            className="object-contain p-2"
                            quality={50}
                          />
                        </div>
                        <p className="text-xs font-medium text-gray-900 truncate">{design.name}</p>
                        <p className="text-xs text-gray-600">{design.category}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Load More Button */}
                  {selectedDesigns.length > displayCount && (
                    <div className="text-center">
                      <button
                        onClick={handleLoadMore}
                        className="px-4 py-2 my-1 bg-[#f6e79e] text-gray-900 rounded-lg font-medium hover:bg-[#f4e285] transition-colors"
                      >
                        Load More ({selectedDesigns.length - displayCount} remaining)
                      </button>
                    </div>
                  )}
                  
                  {/* Show All Button */}
                  {displayCount < selectedDesigns.length && (
                    <div className="text-center">
                      <button
                        onClick={handleShowAll}
                        className="px-4 py-2 my-1 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        Show All Designs
                      </button>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-600">{t.Checkout.selected} {selectedDesigns.length} {t.Checkout.designs}</span>
                    <span className="text-lg font-bold text-[#f6e79e]">€{calculateOrderTotal().toFixed(2)}</span>
                  </div>
                </div>

             {/* Action Buttons */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
  <button
    onClick={handleOrderNow}
    className="bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 py-4 px-6 rounded-xl font-semibold text-lg hover:from-[#f4e285] hover:to-[#f6e79e] transition-all transform hover:scale-105 shadow-lg"
  >
    {t.Checkout.orderCards} {selectedDesigns.length} {t.Checkout.now}
  </button>
</div>

{/* Customer Information Form */}
<div className="bg-white p-8 rounded-2xl shadow-lg">

  {/* Confirmation message if order is placed */}
  {orderPlaced && (
 <p className="text-xs sm:text-sm md:text-base text-center text-gray-600 font-light mb-2">
  Thank you for your order – we hope it’s an egg-stra special one! 🐣
</p>


  )}

  <h2 className="text-2xl font-bold text-gray-900 mb-6 font-manrope">
    {t.Checkout.customerInfo}
  </h2>

  <form className="space-y-6">
    {/* First Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.Checkout.firstName} *
        </label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-[#f6e79e]"
          placeholder={t.Checkout.firstName}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.Checkout.lastName} *
        </label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-[#f6e79e]"
          placeholder={t.Checkout.lastName}
        />
      </div>
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t.Checkout.email} *
      </label>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-[#f6e79e]"
        placeholder={t.Checkout.email}
      />
    </div>

    {/* Phone */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t.Checkout.phone}
      </label>
      <input
        type="tel"
        value={formData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-[#f6e79e]"
        placeholder={t.Checkout.phone}
      />
    </div>

    {/* Address */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t.Checkout.address} *
      </label>
      <input
        type="text"
        value={formData.address}
        onChange={(e) => handleInputChange('address', e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-[#f6e79e]"
        placeholder={t.Checkout.address}
      />
    </div>

    {/* City / Postal / Country */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.Checkout.city} *
        </label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-[#f6e79e]"
          placeholder={t.Checkout.city}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.Checkout.postalCode} *
        </label>
        <input
          type="text"
          value={formData.postalCode}
          onChange={(e) => handleInputChange('postalCode', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-[#f6e79e]"
          placeholder={t.Checkout.postalCode}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.Checkout.country}
        </label>
        <input
          type="text"
          value={formData.country}
          onChange={(e) => handleInputChange('country', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-[#f6e79e]"
          placeholder={t.Checkout.country}
        />
      </div>
    </div>
  </form>
</div>
</div>
</div>
</div>
          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-manrope">{t.Checkout.orderSummary}</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.Checkout.setSize}:</span>
                  <span className="font-medium">{selectedSize} ({sizes.find(s => s.name === selectedSize)?.cards} {t.Checkout.cards})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.Checkout.selectedCards}:</span>
                  <span className="font-medium">{selectedDesigns.length} {t.Checkout.designs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.Checkout.pricePerCard}:</span>
                  <span className="font-medium">€{((sizes.find(s => s.name === selectedSize)?.price || 0) / (sizes.find(s => s.name === selectedSize)?.cards || 24)).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">{t.Checkout.total}:</span>
                    <span className="text-2xl font-bold text-[#f6e79e]">€{calculateOrderTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#f6e79e]" />
                  <span className="text-sm text-gray-600">{t.Checkout.sslSecure}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#f6e79e]" />
                  <span className="text-sm text-gray-600">{t.Checkout.freeShipping}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[#f6e79e]" />
                  <span className="text-sm text-gray-600">{t.Checkout.moneyBackGuarantee}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 font-manrope">{t.Checkout.confirmOrder}</h2>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 font-manrope">{t.Checkout.orderSummary}</h3>
                  
                  {/* Selected Designs */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">{t.Checkout.selectedDesigns} ({selectedDesigns.length})</h4>
                    <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                      {selectedDesigns.map((design) => (
                        <div key={design.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="relative w-full h-20 bg-white rounded-lg overflow-hidden mb-2">
                            <Image
                              src={design.image}
                              alt={design.name}
                              fill
                              className="object-contain p-1"
                              quality={50}
                            />
                          </div>
                          <p className="text-xs font-medium text-gray-900 truncate">{design.name}</p>
                          <p className="text-xs text-gray-600">{design.category}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="bg-gradient-to-r from-[#f6e79e]/20 to-[#f7fcee]/30 rounded-xl p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.Checkout.setSize}:</span>
                        <span className="font-medium">{selectedSize} ({sizes.find(s => s.name === selectedSize)?.cards} {t.Checkout.cards})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.Checkout.selectedCards}:</span>
                       <span className="font-medium">
  {selectedDesigns.length === 0
    ? t.Checkout.noEggs
    : `${t.Checkout.yourSelection} - ${selectedDesigns.length} ${t.Checkout.designs}`}
  
</span>

                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.Checkout.pricePerCard}:</span>
                        <span className="font-medium">€{((sizes.find(s => s.name === selectedSize)?.price || 0) / (sizes.find(s => s.name === selectedSize)?.cards || 24)).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-300 pt-3">
                        <div className="flex justify-between">
                          <span className="text-lg font-semibold text-gray-900">{t.Checkout.total}:</span>
                          <span className="text-2xl font-bold text-[#f6e79e]">€{calculateOrderTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 font-manrope">{t.Checkout.paymentInfo}</h3>
                  
                  {/* Payment Methods */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">{t.Checkout.paymentMethod}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center p-4 border-2 border-[#f6e79e] rounded-xl bg-[#f6e79e]/10">
                        <CreditCard className="w-6 h-6 text-[#f6e79e] mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">Credit Card (Stripe)</p>
                          <p className="text-sm text-gray-600">{t.Checkout.securePayment}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-[#f6e79e]" />
                      <span>{t.Checkout.sslSecure}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Truck className="w-4 h-4 text-[#f6e79e]" />
                      <span>{t.Checkout.freeShipping}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CreditCard className="w-4 h-4 text-[#f6e79e]" />
                      <span>{t.Checkout.moneyBackGuarantee}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <button 
                      onClick={handleConfirmOrder}
                      className="w-full bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 py-4 px-6 rounded-xl font-semibold text-lg hover:from-[#f4e285] hover:to-[#f6e79e] transition-all transform hover:scale-105 shadow-lg"
                    >
                      {t.Checkout.pay} €{calculateOrderTotal().toFixed(2)} - {t.Checkout.secureCheckout}
                    </button>
                    <button 
                      onClick={() => setShowOrderModal(false)}
                      className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                    >
                      {t.Checkout.continueShopping}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 font-manrope">Confirm Your Order</h2>
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="bg-gradient-to-r from-[#f6e79e]/20 to-[#f7fcee]/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {selectedDesigns.slice(0, 8).map((design, index) => (
                      <div key={design.id} className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="relative w-full h-16 bg-gray-50 rounded-lg overflow-hidden mb-2">
                          <Image
                            src={design.image}
                            alt={design.name}
                            fill
                            className="object-contain p-1"
                            quality={50}
                          />
                        </div>
                        <p className="text-xs font-medium text-gray-900 truncate">{design.name}</p>
                      </div>
                    ))}
                    {selectedDesigns.length > 8 && (
                      <div className="bg-gray-100 rounded-lg p-3 shadow-sm flex items-center justify-center">
                        <span className="text-sm text-gray-600">+{selectedDesigns.length - 8} more</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Set Size:</span>
                      <span className="font-medium">{selectedSize} ({sizes.find(s => s.name === selectedSize)?.cards} cards)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Selected Designs:</span>
                      <span className="font-medium">{selectedDesigns.length} designs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per Card:</span>
                      <span className="font-medium">€{((sizes.find(s => s.name === selectedSize)?.price || 0) / (sizes.find(s => s.name === selectedSize)?.cards || 24)).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total:</span>
                        <span className="text-2xl font-bold text-[#f6e79e]">€{calculateOrderTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Info Preview */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <p className="font-medium">{formData.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Address:</span>
                      <p className="font-medium">{formData.address}, {formData.city} {formData.postalCode}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleConfirmOrder}
                    disabled={isProcessingOrder}
                    className="flex-1 bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 py-4 px-6 rounded-xl font-semibold text-lg hover:from-[#f4e285] hover:to-[#f6e79e] transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessingOrder ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing Order...
                      </>
                    ) : (
                      `Confirm Order - €${calculateOrderTotal().toFixed(2)}`
                    )}
                  </button>
                  <button
                    onClick={() => setShowConfirmationModal(false)}
                    disabled={isProcessingOrder}
                    className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay for Order Processing */}
      {isProcessingOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#f6e79e] mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Your Order</h3>
            <p className="text-gray-600">Please wait while we redirect you to secure payment...</p>
          </div>
        </div>
      )}

      {/* Replace Modal */}
      {showReplaceModal && replacingIndex !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 font-manrope">Replace Design</h2>
              <button
                onClick={() => {
                  setShowReplaceModal(false);
                  setReplacingIndex(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {eggDesigns.map((design) => (
                    <div
                      key={design.id}
                      onClick={() => handleReplaceFromCatalog(design)}
                      className="bg-white rounded-lg p-3 shadow-sm cursor-pointer hover:shadow-lg transition-all border-2 border-transparent hover:border-[#f6e79e]"
                    >
                      <div className="relative w-full h-20 bg-gray-50 rounded-lg overflow-hidden mb-2">
                        <Image
                          src={design.image}
                          alt={design.name}
                          fill
                          className="object-contain p-2"
                          quality={50}
                        />
                      </div>
                      <p className="text-xs font-medium text-gray-900 truncate">{design.name}</p>
                      <p className="text-xs text-gray-600">{design.category}</p>
                    </div>
                  ))}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Loading component for Suspense fallback
function CheckoutLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#f6e79e] mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading checkout...</p>
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}