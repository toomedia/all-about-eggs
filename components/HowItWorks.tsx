
import useTranslation from '@/lib/useTranslation';
export default function HowItWorks() {
 const { t } = useTranslation();

  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center font-manrope">
        {t.howItWorks.title}
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-full bg-[#f8e89c] flex items-center justify-center text-xl font-bold text-gray-900 mb-4">
            1
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t.howItWorks.step1.title}
          </h3>
          <p className="text-gray-600 text-sm max-w-xs">
            {t.howItWorks.step1.description}
          </p>
          <span className="text-gray-600 text-sm max-w-xs">
             {t.howItWorks.step1.descrip}
          </span>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-full bg-[#94a987] flex items-center justify-center text-xl font-bold text-white mb-4">
            2
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t.howItWorks.step2.title}
          </h3>
          <p className="text-gray-600 text-sm max-w-xs">
            {t.howItWorks.step2.description}
          </p>
              <span className="text-gray-600 text-sm max-w-xs">
             {t.howItWorks.step2.descrip}
          </span>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-full bg-[#6ba9ff] flex items-center justify-center text-xl font-bold text-white mb-4">
            3
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t.howItWorks.step3.title}
          </h3>
          <p className="text-gray-600 text-sm max-w-xs">
            {t.howItWorks.step3.description}
          </p>
              <span className="text-gray-600 text-sm max-w-xs">
             {t.howItWorks.step3.descrip}
          </span>
        </div>
      </div>
    </section>
  );
}
