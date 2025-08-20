import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Gift, Cake } from 'lucide-react';

interface WishesPageProps {
  onBack: () => void;
}

const WishesPage: React.FC<WishesPageProps> = ({ onBack }) => {
  const [currentWish, setCurrentWish] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const wishes = [
    {
      icon: <Cake className="text-pink-500" size={48} />,
      title: "Happy Birthday, Beautiful! 🎂",
      message: "Today is all about celebrating the amazing person you are. Your kindness, your laughter, your beautiful soul – everything about you makes the world brighter!"
    },
    {
      icon: <Heart className="text-red-500" size={48} fill="currentColor" />,
      title: "You Mean Everything to Me 💕",
      message: "Thank you for being the most incredible person in my life. Your love, support, and friendship mean more to me than words could ever express."
    },
    {
      icon: <Sparkles className="text-yellow-500" size={48} />,
      title: "Shine Bright Today! ✨",
      message: "May this new year of your life be filled with endless joy, amazing adventures, and all the happiness your heart can hold. You deserve nothing but the best!"
    },
    {
      icon: <Gift className="text-purple-500" size={48} />,
      title: "Here's to Another Year! 🎁",
      message: "Another year of your wonderful existence is something to celebrate! Here's to more laughter, more adventures, and more beautiful memories together."
    }
  ];

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const nextWish = () => {
    setCurrentWish((prev) => (prev + 1) % wishes.length);
  };

  const prevWish = () => {
    setCurrentWish((prev) => (prev === 0 ? wishes.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            {Math.random() > 0.5 ? '🎈' : '🎉'}
          </div>
        ))}
      </div>

      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            >
              🎊
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero image section */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <img
              src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=500"
              alt="Birthday girl"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-xl border-4 border-white/70"
            />
            <div className="absolute -top-2 -right-2 text-2xl animate-spin">🎂</div>
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-6 bg-white/70 hover:bg-white/90 text-purple-600 px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            ← Back to Navigation
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 text-center">
            <div className="mb-8">
              {wishes[currentWish].icon}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-8">
              {wishes[currentWish].title}
            </h1>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto">
              {wishes[currentWish].message}
            </p>

            <div className="flex justify-center items-center space-x-4 mb-8">
              <button
                onClick={prevWish}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                ← Previous
              </button>
              
              <div className="flex space-x-2">
                {wishes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentWish(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentWish 
                        ? 'bg-pink-500 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextWish}
                className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Next →
              </button>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-pink-600 mb-2">You're Amazing</h3>
              <p className="text-gray-700">Your spirit lights up every room you enter</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="text-4xl mb-4">💖</div>
              <h3 className="text-xl font-bold text-purple-600 mb-2">So Grateful</h3>
              <p className="text-gray-700">Having you in my life is the greatest gift</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="text-4xl mb-4">🎊</div>
              <h3 className="text-xl font-bold text-yellow-600 mb-2">Celebrate You</h3>
              <p className="text-gray-700">Today we celebrate everything wonderful about you</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes confetti {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-confetti {
          animation: confetti 3s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default WishesPage;