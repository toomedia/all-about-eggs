"use client";

import Button from "./Button";

export default function AiWaitlistSection() {
  return (
    <section className="bg-[#fef6ff] py-20 px-4 text-center">
      <div className="max-w-3xl mx-auto">
 <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center font-manrope">
  Coming Soon: Design your own egg with AI!
</h2>

        <p className="text-gray-600 mb-8 text-lg md:text-xl">
          Soon you’ll be able to create your own personalized egg designs using our AI. Join the waitlist and be one of the first!
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Your email address"
            className="px-5 py-3 rounded-xl border border-gray-300 text-gray-800 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <Button className="w-full sm:w-auto">
            Join Waitlist
          </Button>
        </div>
      </div>
    </section>
  );
}
