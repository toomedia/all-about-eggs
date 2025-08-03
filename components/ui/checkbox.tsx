'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Star, Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  description?: string;
  premium?: boolean;
  featured?: boolean;
  price?: number;
  category?: string;
  orderSummary?: {
    selectedDesigns: number;
    totalCards: number;
    pricePerCard: number;
    totalPrice: number;
    setSize: string;
  };
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, description, premium, featured, price, category, orderSummary, ...props }, ref) => (
  <div className="flex items-start space-x-3">
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'peer h-5 w-5 shrink-0 rounded-md border-2 border-gray-300 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f6e79e] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#f6e79e] data-[state=checked]:border-[#f6e79e] data-[state=checked]:text-gray-900 transition-all duration-200 hover:border-[#f6e79e]/50',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-current')}
      >
        <Check className="h-3 w-3 font-bold" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    
    {(label || description || premium || featured || price || category || orderSummary) && (
      <div className="flex-1 min-w-0">
        {orderSummary ? (
          // Order Summary Display
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-gray-900 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                Order Summary
              </label>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900">
                <Sparkles className="w-3 h-3" />
                Real Data
              </span>
            </div>
            
            <div className="bg-gradient-to-r from-[#f6e79e]/10 to-[#f7fcee]/20 rounded-lg p-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Set Size:</span>
                <span className="font-medium">{orderSummary.setSize} ({orderSummary.totalCards} cards)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Selected:</span>
                <span className="font-medium">{orderSummary.selectedDesigns} designs</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Price per Card:</span>
                <span className="font-medium">€{orderSummary.pricePerCard.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 pt-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-[#f6e79e] font-bold">€{orderSummary.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Regular Design Info Display
          <>
            <div className="flex items-center gap-2 mb-1">
              {label && (
                <label className="text-sm font-medium text-gray-900 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                  {label}
                </label>
              )}
              
              {/* Badges */}
              <div className="flex items-center gap-1">
                {premium && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                    <Star className="w-3 h-3" />
                    Premium
                  </span>
                )}
                {featured && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-[#f6e79e] to-[#f4e285] text-gray-900">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </span>
                )}
              </div>
            </div>
            
            {description && (
              <p className="text-xs text-gray-600 mb-1">{description}</p>
            )}
            
            <div className="flex items-center gap-3 text-xs text-gray-500">
              {category && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#f6e79e]"></span>
                  {category}
                </span>
              )}
              {price && (
                <span className="font-medium text-[#f6e79e]">€{price}</span>
              )}
            </div>
          </>
        )}
      </div>
    )}
  </div>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
