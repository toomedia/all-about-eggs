export default function HowItWorks() {
  return (
    <section className=" py-16 px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">
        How It Works
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-full bg-[#f8e89c] flex items-center justify-center text-xl font-bold text-gray-900 mb-4">
            1
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Choose Your Design
          </h3>
          <p className="text-gray-600 text-sm max-w-xs">
            Pick your favorite egg designs from our collection or use the randomizer.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-full bg-[#94a987] flex items-center justify-center text-xl font-bold text-white mb-4">
            2
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            We Print On-Demand
          </h3>
          <p className="text-gray-600 text-sm max-w-xs">
            Your personalized memory game is printed in top quality just for you.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-full bg-[#6ba9ff] flex items-center justify-center text-xl font-bold text-white mb-4">
            3
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Ships in 3–5 Days
          </h3>
          <p className="text-gray-600 text-sm max-w-xs">
            Fast, safe delivery right to your door—or as a gift!
          </p>
        </div>
      </div>
    </section>
  );
}
