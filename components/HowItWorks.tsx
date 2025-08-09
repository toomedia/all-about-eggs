
import useTranslation from '@/lib/useTranslation';
import { Egg, Palette, CreditCard, Truck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Button from './Button';
export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      number: 1,
      icon: <Egg className="w-6 h-6" />,
      title: t.howItWorks.step1.title,
      description: t.howItWorks.step1.description,
      detail: t.howItWorks.step1.descrip,
    },
    {
      number: 2,
      icon: <Palette className="w-6 h-6" />,
      title: t.howItWorks.step2.title,
      description: t.howItWorks.step2.description,
      detail: t.howItWorks.step2.descrip,
    },
    {
      number: 3,
      icon: <CreditCard className="w-6 h-6" />,
      title: t.howItWorks.step3.title,
      description: t.howItWorks.step3.description,
      detail: t.howItWorks.step3.descrip,
    },
    {
      number: 4,
      icon: <Truck className="w-6 h-6" />,
      title: t.howItWorks.step4.title,
      description: t.howItWorks.step4.description,
      detail: t.howItWorks.step4.descrip,
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-manrope">
            {t.howItWorks.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* Process Steps Line */}
        <div className="relative mb-16">
          {/* Main Process Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 transform -translate-y-1/2 z-0"></div>
          
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={step.number} className="relative group">
                <div className="relative bg-white rounded-lg p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md h-full mt-8">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#f6e79e] flex items-center justify-center text-black font-semibold text-sm">
                    {step.number}
                  </div>

            {/* Icon */}
<div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#fffbea] shadow-sm text-[#f6e79e] mb-6 transition-colors duration-300">
  {step.icon}
</div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 font-manrope">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                    <p className="text-sm text-gray-500 bg-gray-50 rounded-md px-3 py-2">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-gray-50 rounded-xl px-8 py-6 border border-gray-200">
            <span className="text-gray-700 font-medium">
              Ready to start your journey?
            </span>
         <Link href="/catalog">
  <Button className="inline-flex items-center gap-2 px-6 py-3 bg-[#f6e79e] text-black rounded-lg font-medium transition-colors hover:bg-[#e5d46e]">
    Get Started
    <ArrowRight className="w-4 h-4" />
  </Button>
</Link>

          </div>
        </div>
      </div>
    </section>
  );
}
