'use client';

import { useEffect, useState } from 'react';
import { Sprout, Loader2 } from 'lucide-react';

const loadingMessages = [
  'Analyzing community data...',
  'Consulting environmental best practices...',
  'Tailoring recommendations to your community...',
  'Calculating resource requirements...',
  'Generating your personalized action plan...',
];

export default function LoadingSpinner() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="glass-card p-12 text-center max-w-md">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-cyan-500 opacity-20 animate-pulse"></div>
          </div>
          <div className="relative flex items-center justify-center">
            <Sprout className="w-16 h-16 text-green-600 animate-bounce" />
          </div>
        </div>

        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
        </div>

        {/* Loading Message */}
        <h3 className="text-xl font-semibold mb-2">Creating Your Action Plan</h3>
        <p className="text-gray-600 fade-in" key={messageIndex}>
          {loadingMessages[messageIndex]}
        </p>

        {/* Progress Indicator */}
        <div className="mt-6">
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i === messageIndex ? 'bg-green-600' : 'bg-gray-300'
                  }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
