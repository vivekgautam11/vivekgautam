import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';

interface SpecialMessagePageProps {
  onBack: () => void;
}

const SpecialMessagePage: React.FC<SpecialMessagePageProps> = ({ onBack }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  const messages = [
    {
      title: "To My Incredible Friend/Love 💕",
      content: "From the moment you came into my life, everything became brighter, more colorful, and infinitely more beautiful. Your laugh is my favorite sound, your smile is my daily sunshine, and your friendship/love is my greatest treasure."
    },
    {
      title: "You Are So Special 🌟",
      content: "There's something magical about the way you see the world – with such kindness, wonder, and joy. You have this incredible ability to make everyone around you feel valued and loved. That's a rare and beautiful gift."
    },
    {
      title: "Thank You For Being You ✨",
      content: "Thank you for all the late-night conversations, the spontaneous adventures, the shoulder to cry on, and the endless laughter. Thank you for believing in me when I couldn't believe in myself, and for always knowing just what to say."
    },
    {
      title: "Here's to Your Special Day! 🎉",
      content: "Today isn't just another day – it's a celebration of the wonderful person you are and all the joy you bring to this world. I hope this birthday brings you as much happiness as you've brought into my life every single day."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowHearts(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 relative overflow-hidden">
      {/* Floating hearts animation */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-red-400 animate-float-up"
              size={20}
              fill="currentColor"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-6 bg-white/70 hover:bg-white/90 text-purple-600 px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            ← Back to Navigation
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Beautiful girl image section */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <img
                src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Beautiful girl"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-2xl border-8 border-white/50 mx-auto"
              />
              <div className="absolute -top-4 -right-4 text-4xl animate-bounce">✨</div>
              <div className="absolute -bottom-4 -left-4 text-4xl animate-pulse">💖</div>
            </div>
          </div>

          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <Star className="text-yellow-500 animate-pulse" size={32} fill="currentColor" />
              <Sparkles className="text-pink-500 animate-bounce" size={40} />
              <Star className="text-yellow-500 animate-pulse" size={32} fill="currentColor" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              A Special Message 💌
            </h1>
            <p className="text-lg text-gray-700">
              Straight from my heart to yours
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-6">
                {messages[currentMessage].title}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                {messages[currentMessage].content}
              </p>
            </div>

            <div className="flex justify-center items-center space-x-4 mt-8">
              {messages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMessage(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    index === currentMessage 
                      ? 'bg-pink-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-between items-center mb-12">
            <button
              onClick={() => setCurrentMessage(prev => prev === 0 ? messages.length - 1 : prev - 1)}
              className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              ← Previous Message
            </button>
            
            <button
              onClick={() => setCurrentMessage(prev => (prev + 1) % messages.length)}
              className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Next Message →
            </button>
          </div>

          {/* Final message */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <Heart className="mx-auto mb-6 animate-pulse" size={64} fill="currentColor" />
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Happy Birthday, Beautiful Soul! 🎂✨
            </h2>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              May this special day be filled with love, laughter, and all your favorite things. 
              You deserve every bit of happiness that comes your way today and always. 
              Here's to celebrating YOU! 🥳💖
            </p>
            <div className="mt-8 text-6xl">
              🎉🎂🎈🎁💕
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
          }
        }
        
        .animate-float-up {
          animation: float-up 4s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SpecialMessagePage;