
'use client';


import useTranslation from '@/lib/useTranslation';
import { useState, useEffect } from 'react';
import { CreditCard, Truck, Shield, ArrowLeft, X, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
export default function CheckoutPage() {
const [paymentMethod, setPaymentMethod] = useState('card');
const [showOrderModal, setShowOrderModal] = useState(false);
const [orderType, setOrderType] = useState<'custom' | 'preset'>('custom');
const [selectedDesigns, setSelectedDesigns] = useState<any[]>([]);
const [selectedSize, setSelectedSize] = useState('L');
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
}

if (sizeParam) {
  setSelectedSize(sizeParam);
}

// Load saved form data from localStorage
const savedFormData = localStorage.getItem('checkoutFormData');
const savedSize = localStorage.getItem('checkoutSelectedSize');

if (savedFormData) {
  setFormData(JSON.parse(savedFormData));
}
if (savedSize) {
  setSelectedSize(savedSize);
}

}, []);


const calculateOrderTotal = () => {
const selectedSizeData = sizes.find(s => s.name === selectedSize);
const basePrice = selectedSizeData?.price || 0;
const totalCards = selectedSizeData?.cards || 24;
const selectedCount = selectedDesigns.length;


const pricePerCard = basePrice / totalCards;
return selectedCount * pricePerCard;

};


// const handleOrderNow = async () => {
// const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'postalCode'];
// const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);


// if (missingFields.length > 0) {
// alert(`Please fill in all required fields: ${missingFields.join(', ')}`);

// return;
// }


// type StripeSessionResponse = {
//   url: string;
// };

// const orderDetails = {
//   customer: formData,
//   designs: selectedDesigns,
//   size: selectedSize,
//   total: calculateOrderTotal().toFixed(2),
// };


//   const res = await axios.post<StripeSessionResponse>(
//   'https://all-about-eggs.vercel.app/api/create-checkout-session',
//   { orderDetails
//   });



//   console.log("Stripe session response:", res.data);

//   if (res.data.url) {
//     window.location.href = res.data.url; 
//   } 


// }

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

  const orderDetails = {
    customer: formData,
    designs: selectedDesigns,
    size: selectedSize,
    total: calculateOrderTotal().toFixed(2),
  };

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
    }

  } catch (error) {
    console.error("Error creating Stripe session:", error);
    alert("There was a problem processing your order. Please try again.");
  }
};

const clearLocalStorage = () => {
localStorage.removeItem('selectedDesigns');
localStorage.removeItem('selectedSize');
localStorage.removeItem('checkoutFormData');
localStorage.removeItem('checkoutSelectedSize');
};


const handleCompletePreset = () => {
// Save current form data to localStorage before redirecting
localStorage.setItem('checkoutFormData', JSON.stringify(formData));
localStorage.setItem('checkoutSelectedSize', selectedSize);
window.location.href = '/catalog';
};


const handleInputChange = (field: string, value: string) => {
setFormData(prev => ({
...prev,
[field]: value
}));
};

const { t } = useTranslation();
return (
<div className="min-h-screen">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-manrope">{t.Checkout.orderOptions}</h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#f6e79e]/20 to-[#f7fcee]/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.Checkout.yourSelection}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {selectedDesigns.map((design) => (
                  <div key={design.id} className="bg-white rounded-lg p-3 shadow-sm">
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
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t.Checkout.selected}: {selectedDesigns.length} {t.Checkout.designs}</span>
                <span className="text-lg font-bold text-[#f6e79e]">€{calculateOrderTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleOrderNow}
                className="bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900 py-4 px-6 rounded-xl font-semibold text-lg hover:from-[#f4e285] hover:to-[#f6e79e] transition-all transform hover:scale-105 shadow-lg"
              >
                {t.Checkout.orderCards} {selectedDesigns.length} {t.Checkout.now}
              </button>
              <button
                onClick={handleCompletePreset}
                className="bg-white border-2 border-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all"
              >
                {t.Checkout.completePreset} ({sizes.find(s => s.name === selectedSize)?.cards} {t.Checkout.cards})
              </button>
            </div>
          </div>
        </div>

        {/* Customer Information Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-manrope">{t.Checkout.customerInfo}</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.Checkout.firstName} *</label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-[#f6e79e]"
                  placeholder={t.Checkout.firstName}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.Checkout.lastName} *</label>
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-[#f6e79e]"
                  placeholder={t.Checkout.lastName}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.Checkout.email} *</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-[#f6e79e]"
                placeholder={t.Checkout.email}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.Checkout.phone}</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-[#f6e79e]"
                placeholder={t.Checkout.phone}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.Checkout.address} *</label>
              <input 
                type="text" 
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-[#f6e79e]"
                placeholder={t.Checkout.address}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.Checkout.city} *</label>
                <input 
                  type="text" 
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-[#f6e79e]"
                  placeholder={t.Checkout.city}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.Checkout.postalCode} *</label>
                <input 
                  type="text" 
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6e79e] focus:border-[#f6e79e]"
                  placeholder={t.Checkout.postalCode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.Checkout.country}</label>
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
                    <span className="font-medium">{selectedDesigns.length} {t.Checkout.designs}</span>
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
                  onClick={() => {
                    clearLocalStorage();
                    alert(t.Checkout.orderComplete);
                    window.location.href = '/';
                  }}
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
</div>

);
}